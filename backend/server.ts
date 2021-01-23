//dotenv нужно запускать в самом начале срипта
import dotenv from "dotenv";
dotenv.config();

import express from "express";

import "./core/db";

import { UserController } from "./controllers/UserController";
import { registerValidations } from "./validations/register";

const app = express();

app.use(express.json());

app.get("/users", UserController.index);
app.post("/users", registerValidations, UserController.create);
app.get("/users/:id", registerValidations, UserController.show);
app.get("/users/verify", registerValidations, UserController.verify);
// app.patch('/users', UserController.update);
// app.delete('/users', UserController.delete);

app.listen(process.env.PORT, (): void => {
  // if(err){
  //     throw new Error(err);
  // }
  console.log("Server is running");
});
