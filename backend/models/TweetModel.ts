import { model, Schema, Document } from "mongoose";
import { UserModelDocumentInterface } from "./UserModel";

export interface TweetModelInterface {
  _id?: string;
  text: string;
  user: UserModelDocumentInterface | string;
};

// отдельный интерфейс, который содержит и TweetModelInterface, и Document-интерфейс из mongoose
// для того, чтобы у сущности были свойства и от TweetModelInterface, и от mongoose
// Document - типизация из mongoose
export type TweetModelDocumentInterface = TweetModelInterface & Document;

//схема для монги
const TweetSchema = new Schema<TweetModelDocumentInterface>({
  text: {
    required: true, //обязательность поля
    type: String,
    maxlength: 280,
  },
  user: {
    required: true,
    ref: 'User', // этот ObjectId ссылается на модель User
    type: Schema.Types.ObjectId, // ObjectId нашего пользователя
    //Schema.Types.ObjectId с помощью этой записи можно делать связь в БД между нашими моделями 
  },
  images: [{
    type: String, //массив ссылок картинок на cloudinary
  }]
},
  {
    timestamps: true
  }
);

export const TweetModel = model<TweetModelDocumentInterface>("Tweet", TweetSchema);
