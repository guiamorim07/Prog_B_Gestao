import { Router } from "express";
import * as controller from "./produtos.controller.js";


const router = Router();

router.post( "/", controller.criarProduto);

export default router;