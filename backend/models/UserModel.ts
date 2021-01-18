import { model, Schema, Document } from "mongoose";

export interface UserModelInterface {
  email: string;
  fullname: string;
  username: string;
  password: string;
  confirmHash: string;
  confirmed?: boolean;
  location?: string;
  about?: string;
  website?: string;
}

type UserModelDocumentInterface = UserModelInterface & Document;

//todo разобраться, что с UserModelInterface
// const UserSchema = new Schema<UserModelInterface>({
const UserSchema = new Schema({
  email: {
    unique: true, //уникальность поля
    required: true, //обязательность поля
    type: String,
  },
  fullname: {
    required: true,
    type: String,
  },
  username: {
    unique: true,
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  confirmHash: {
    required: true,
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  location: String,
  about: String,
  website: String,
});

export const UserModel = model<UserModelDocumentInterface>("User", UserSchema);
