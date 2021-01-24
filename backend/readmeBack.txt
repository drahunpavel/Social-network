//TODO
1. при регистрации пользователя, нужно проверять совпадение по никнейму, по емайлу и отображать ошибку


    "username": "Admin",
    "password": "admin1",


    "username": "testUser",
    "password": "testUser",

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImNvbmZpcm1lZCI6dHJ1ZSwiX2lkIjoiNjAwZDFjY2E2NWJjNTIxM2JjODJhYmZjIiwiZW1haWwiOiJ0ZXN0VXNlcjJAZ21haWwuY29tIiwiZnVsbG5hbWUiOiJ0ZXN0IHVzZXIiLCJ1c2VybmFtZSI6InRlc3RVc2VyIiwiX192IjowfSwiaWF0IjoxNjExNTI1Njk4LCJleHAiOjE2MTQxMTc2OTh9.g1IoerMbqPZtr0a4HmX6ZOKi9F-xcOPGoQIJxrxx_q8






multer - для загрузки медиафайлов
Cloudinary - отдельное облако для хранение медиаконтента
Nodemailer - для почты

npm install --save @types/express - типизация для библиотеки

mailtrap.io использую для отправки почты

для отправки писем на реальную почту, нужно указывать реальные smpt сервера

в респонсах ответ в формате:
{
    status: "succes",
    message: "OK",
    data: {},
}


для чего нужно ставить после findOne метод exec() ?  Нужен для того, чтобы вернуть саму сущность в виде промиса. Потом await’ом вытаскиваешь результат промиса

npx kill-port 8888

laravel rest API

Чтобы скрыть некоторые поля в монге, но по необходимости их вытягивать,
нужно в моделе прописать select: false, а при запросе в БД прописывать example.findOne({_id: id}).select("+password")