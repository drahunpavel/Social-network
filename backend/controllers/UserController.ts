import express from "express";
import { validationResult } from "express-validator";

import { UserModel } from "../models/UserModel";

import { generateMD5 } from "../utils/generateHash";
import { sendEmail } from "../utils/sendEmail";

class _UserController {
  async index(_: any, res: express.Response): Promise<void> {
    //получение всех пользователей из БД
    try {
      const users = await UserModel.find({}).exec();

      res.json({
        // errorCode: 0,
        status: "succes",
        message: "OK",
        data: users,
      });
    } catch (err) {
      res.json({
        // errorCode: 110,
        status: "error",
        message: err,
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          // errorCode: 400,
          status: "error",
          message: errors.array(),
        });
        return;
      }

      const data = {
        email: req.body.email,
        fullname: req.body.fullname,
        username: req.body.username,
        password: req.body.password,
        confirmHash: generateMD5(
          process.env.SECRET_KEY || Math.random().toString()
        ),
      };

      const user = await UserModel.create(data);

      sendEmail(
        {
          emailFrom: "admin@soc-net.com",
          emailTo: data.email,
          subject: "Подтверждение почты social-network",
          html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:${
            process.env.PORT || 8081
          }/users/verify?hash=${data.confirmHash}">по этой ссылке</a>`,
        },
        (err: Error | null) => {
          if (err) {
            res.status(500).json({
              status: "error",
              message: err,
            });
          } else {
            res.status(201).json({
              status: "succes",
              message: "OK",
              data: user,
            });
          }
        }
      );
    } catch (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
  }

  async verify(req: any, res: express.Response): Promise<void> {
    //confirmHash
    //confirmed
    try {
      const hash = req.query.hash;

      if (!hash) {
        res.status(400).json({
          status: "error",
          message: "Missing hash",
        });
        return;
      }

      //нахожу пользователя по хеш-сумме
      const user = await UserModel.findOne({ confirmHash: hash }).exec();

      if (user) {
        //меняю его состояние и сохраняю
        user.confirmed = true;
        user.save();

        res.json({
          status: "succes",
          message: "OK",
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
}

export const UserController = new _UserController();
