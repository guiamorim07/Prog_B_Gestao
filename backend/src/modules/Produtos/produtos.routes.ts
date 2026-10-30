import { Router } from "express";
import * as controller from "./produtos.controller.js";


const router = Router();

router.post("/", controller.criarProduto);
router.get("/", controller.listarProdutos);
router.delete("/:id", controller.deletarProduto); 
router.patch("/:id", controller.atualizarParcial);
router.put("/:id", controller.atualizarTotal);


export default router;