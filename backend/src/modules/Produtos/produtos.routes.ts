import { Router } from "express";
import * as controller from "./produtos.controller.js";

const router = Router();

// Define os endpoints associando a rota, o método HTTP e a função do controlador
router.post("/", controller.criarProduto);
router.get("/", controller.listarProdutos);
router.delete("/:id", controller.deletarProduto); 

export default router;