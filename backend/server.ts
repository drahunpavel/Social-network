import express from 'express';

const app = express();

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
    console.log('Server is running');
});