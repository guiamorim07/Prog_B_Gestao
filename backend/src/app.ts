import express, {Express, Request, Response} from 'express';
import produtosRoutes from "./modules/Produtos/produtos.routes.js";



const app : Express = express();


app.use(express.json());
app.use("/produtos", produtosRoutes);

app.get('/', (_req : Request, res : Response) => {
  res.send('working');
});


// Rota temporaria de teste 
app.get('/health', (_req : Request, res : Response) => {
  res.json({ status: 'ok' });
});



export default app;