import express from "express";

import dotenv from "dotenv";

import "./core/db";

import { registerValidations } from "./validations/register";
// import { validator } from 'express-validator';

import { UserController } from "./controllers/UserController";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/users", UserController.index);
app.post("/users", registerValidations, UserController.create);
// app.patch('/users', UserController.update);
// app.delete('/users', UserController.delete);

// app.get('/hello', (req: express.Request, res: express.Response) => {
// app.get('/hello', (_, res: express.Response) => {
//     res.send('Hello');
// });

// app.get('/users', (req: express.Request, res: express.Response) => {
//     res.send('Hello');
// });

app.listen(8081, (): void => {
  // if(err){
  //     throw new Error(err);
  // }
  console.log("Server is running");
});
