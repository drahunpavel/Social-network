import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTstrategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "../models/UserModel";
import { UserModelInterface } from './../models/UserModel';
import { generateMD5 } from "../utils/generateHash";

//локальная стратегия
passport.use(
  new LocalStrategy(
    async (username, password, done): Promise<void> => {
      try {
        //ниже свойства передаются - email, username для поиска юзера в бд
        const user = await UserModel.findOne({
          $or: [{ email: username }, { username }],
        }).exec();

        if (!user) {
          return done(null, false);
        }

        //проверка на совпадение полученного пароля с пароллем юзера в бд
        if (user.password === generateMD5(password + process.env.SECRET_KEY)) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET_KEY || "123",
      jwtFromRequest: ExtractJwt.fromHeader("token"), //теперь токен будет передаваться в хедаре каждого запроса
    },
    async (payload: {data: UserModelInterface}, done): Promise<void> => {
      try {
        //нахожу пользователя из БД по id. json token каждый раз расшифровывается, если ключи совпадают 
        const user = await UserModel.findById(payload.data._id).exec();

        //если пользователь найден, просто возращается информация о нем
        if(user){
          return done (null, user);
        };

        //если пользователя нет, возращается false
        done(null, false);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

//todo проблемы с UserModelInterface
// passport.serializeUser((user: UserModelInterface, done) => {
//serializeUser преобразование пользователя в объект
passport.serializeUser((user: any, done) => {
  //получаем id пользователя
  done(null, user?._id);
});

//получает id и проверяет ее наличие в БД
passport.deserializeUser((id, done) => {
  //по id получаем нужного пользователя
  UserModel.findById(id, (err: any, user: any) => {
    //на этом этапе возращает модель пользователя
    done(err, user);
  });
});

export { passport };
