import { model, Schema, Document } from "mongoose";

export interface TweetModelInterface {
  _id?: string;
  text: string;
  user: string;
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
  }
});

export const TweetModel = model<TweetModelDocumentInterface>("Tweet", TweetSchema);
