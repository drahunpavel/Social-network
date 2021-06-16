import { UserModelInterface } from './../models/UserModel';
import express from "express";

import { TweetModel, TweetModelInterface } from './../models/TweetModel';

import { validationResult } from "express-validator";
import { isValidObjectId } from "../utils/isValidObjectId";

class _TweetController {
  async index(_: any, res: express.Response): Promise<void> {
    //получение всех твитов из БД
    try {
      const tweets = await TweetModel.find({}).populate('user').sort({'createdAt': '-1'}).exec(); //populate('user') - добавить к каждому ответу модель user

      res.json({
        status: "succes",
        data: tweets,
      });
    } catch (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
  };
  
  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const tweetId = req.params.id;

      //проверка на корректность id в БД
      if (!isValidObjectId(tweetId)) {
        res.status(400).json({
          status: "error",
          message: "TweetId is not valid",
        });
        return;
      };

      //поиск в БД конкретного твита по его ID
      const tweet = await TweetModel.findById(tweetId).populate('user').exec();

      if (!tweet) {
        // res.status(400).json({
        //   status: "error",
        //   message: "Tweet not found",
        // });
        res.status(404).send();
        return;
      };

      res.json({
        status: "succes",
        data: tweet,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err,
      });
    }
  };

  async create(req: express.Request, res: express.Response): Promise<void> {
    try{
        //у экспресса есть свои свойства user, поэтому явно указываю, откуда берется модель пользователя
        //в запросе нет своего user, появляется он благодаря миддлваре  passport.authenticate('jwt')
        const user = req.user as UserModelInterface;

        //user?._id - ругается typescript, чтобы избежать ошибки
        if(user?._id){
            const errors = validationResult(req); //проверка, если ли ошибки какие-либо в запросе

            if (!errors.isEmpty()) {
                res.status(400).json({
                  status: "error",
                  message: errors.array(),
                });
                return;
            };

            //создаю объект для передачи в БД
            const data: TweetModelInterface = {
                    text: req.body.text,
                    images: req.body.images,
                    user: user._id,
            };

            const tweet = await TweetModel.create(data);

            res.json({
                status: "succes",
                data: await tweet.populate('user').execPopulate(),
            });
        };
    }catch(error){
        res.status(500).json({
            status: "error",
            message: error,
          });
    };
  };

  async delete(req: express.Request, res: express.Response): Promise<void> {
    try{
        const user = req.user as UserModelInterface;

        if(user){
            const tweetId = req.params.id;

            //проверка на корректность id в БД
            if (!isValidObjectId(tweetId)) {
                res.status(400).json({
                    status: "error",
                    message: "TweetId is not valid",
                });
                return;
            };

            const tweet = await TweetModel.findById(tweetId);

            //tweet.user === user._id - условие, что пользователь может удалять только свои посты
            if(tweet){
                if(String(tweet.user._id) == String(user._id)){
                    tweet.remove();
                    res.send(200).send({
                      status: "succes",
                      message: "Post deleted",
                    });
                }else{
                    res.status(403).send({
                      status: "error",
                      message: "This is not your post",
                    });
                };
            }else{
                res.status(404).send();
            };
        };
    }catch(error){
        res.status(500).json({
            status: "error",
            message: error,
          });
    };
  };

  async update(req: express.Request, res: express.Response): Promise<void> {
    try{
        const user = req.user as UserModelInterface;

        if(user){
            const tweetId = req.params.id;

            //проверка на корректность id в БД
            if (!isValidObjectId(tweetId)) {
                res.status(400).json({
                    status: "error",
                    message: "TweetId is not valid",
                });
                return;
            };

            const tweet = await TweetModel.findById(tweetId);

            //tweet.user === user._id - условие, что пользователь может удалять только свои посты
            if(tweet){
                if(String(tweet.user._id) == String(user._id)){
                    const newText = req.body.text; 
                    tweet.text = newText;
                    tweet.save();
                    res.send();
                }else{
                    res.status(403).send();
                };
            }else{
                res.status(404).send();
            };
        };
    }catch(error){
        res.status(500).json({
            status: "error",
            message: error,
          });
    };
  };
};

export const TweetController = new _TweetController();
