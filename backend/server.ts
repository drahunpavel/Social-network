//dotenv нужно запускать в самом начале срипта
import dotenv from "dotenv";
dotenv.config();

import express from "express";

import "./core/db";

import { UserController } from "./controllers/UserController";
import { TweetController } from "./controllers/TweetsController";

import { registerValidations } from "./validations/register";
import { createTweetValidations } from './validations/createTweets';
import { passport } from "./core/passport";


const app = express();

app.use(express.json());
app.use(passport.initialize());

app.get("/users", UserController.index);
app.post("/auth/create", registerValidations, UserController.create);
app.get("/users/me", passport.authenticate("jwt", {session: false}), UserController.getUserInfo);
app.get("/users/:id", UserController.show);

app.get('/tweets', TweetController.index);
app.get('/tweets/:id', TweetController.show);
app.delete('/tweets',passport.authenticate('jwt'), TweetController.delete);
app.post('/tweets', passport.authenticate('jwt'), createTweetValidations, TweetController.create); 
//passport.authenticate('jwt') - проверка на то, что пользователь авторизован
// createTweetValidations - промежуточная меддлевара для валидации поста при создании, можно указыват бесконечное кол-во меддлевар 

app.get("/auth/verify", registerValidations, UserController.verify);
app.post(
  "/auth/login",
  passport.authenticate("local"),
  UserController.afterLogin
);
// app.patch('/users', UserController.update);
// app.delete('/users', UserController.delete);

app.listen(process.env.PORT, (): void => {
  // if(err){
  //     throw new Error(err);
  // }
  console.log("Server is running");
});
