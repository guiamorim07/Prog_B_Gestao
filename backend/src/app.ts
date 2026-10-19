import express, {Express, Request, Response} from 'express';
import produtosRoutes from "./modules/Produtos/produtos.routes.js";



const app : Express = express();


app.use(express.json());
app.use("/Produtos", produtosRoutes);

app.get('/', (req : Request, res : Response) => {
  res.send('working');
});


// Rota temporaria de teste 
app.get('/health', (req : Request, res : Response) => {
  res.json({ status: 'ok' });
});



export default app;