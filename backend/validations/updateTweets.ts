import { body } from "express-validator";

export const updateTweetValidations = [
  body("text", "Введите текст вашего сообщения")
    .isString()
    .withMessage("Неверный тип данных")
    .isLength({
      max: 280,
    })
    .withMessage("Максимальная длина сообщения - 280 символов"),
];
