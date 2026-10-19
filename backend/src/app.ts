import express, {Express, Request, Response} from 'express';

const app : Express = express();

app.get('/', (req : Request, res : Response) => {
  res.send('working');
});


// Rota temporaria de teste 
app.get('/health', (req : Request, res : Response) => {
  res.json({ status: 'ok' });
});



export default app;