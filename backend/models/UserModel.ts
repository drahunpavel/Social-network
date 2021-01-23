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
    select: false,
  },
  confirmHash: {
    required: true,
    type: String,
    select: false,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  location: String,
  about: String,
  website: String,
});

//мидлвора для удаления полей при возвращении объекта пользователя
UserSchema.set("toJSON", {
  transform: function (_: any, obj: any) {
    delete obj.password;
    delete obj.confirmHash;
    return obj;
  },
});

export const UserModel = model<UserModelDocumentInterface>("User", UserSchema);
