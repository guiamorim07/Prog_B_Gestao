import { Router } from "express";
import * as controller from "./produtos.controller.js";


const router = Router();

router.post("/", controller.criarProduto);
router.get("/", controller.listarProdutos);
router.delete("/:id", controller.deletarProduto); 


export default router;