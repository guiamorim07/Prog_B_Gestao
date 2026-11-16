import { Router } from "express";
import * as controller from "./contas.controller.js";

const router = Router();

router.post("/", controller.criarConta);
router.get("/", controller.listarContas);
router.patch("/:id/desativar", controller.desativar);
router.delete("/:id", controller.deletarRegistroConta);

export default router;