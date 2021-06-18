import { model, Schema, Document } from "mongoose";

export interface UserModelInterface extends Document {
  _id?: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  confirmHash: string;
  confirmed?: boolean;
  location?: string;
  about?: string;
  website?: string;
  tweets?: string[];
}

export type UserModelDocumentInterface = UserModelInterface & Document;

const UserSchema = new Schema<UserModelInterface>({
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
    // select: false,
  },
  confirmHash: {
    required: true,
    type: String,
    // select: false,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  location: String,
  about: String,
  website: String,
  tweets: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }],
},
{
  timestamps: true
}
);

//мидлвора для удаления полей при возвращении объекта пользователя
UserSchema.set("toJSON", {
  transform: function (_: any, obj: any) {
    delete obj.password;
    delete obj.confirmHash;
    return obj;
  },
});

export const UserModel = model<UserModelDocumentInterface>("User", UserSchema);
