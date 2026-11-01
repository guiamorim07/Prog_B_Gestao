import { Router } from "express";
import * as controller from "./usuarios.controller.js";

const router = Router();

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha]
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *                 description: Mínimo 6 caracteres
 *             example:
 *               nome: "Ana Silva"
 *               email: "ana@email.com"
 *               senha: "ana123"
 *     responses:
 *       201:
 *         description: Usuário criado (a senha nunca é retornada)
 *       400:
 *         description: Dados inválidos ou ausentes
 *       409:
 *         description: E-mail já cadastrado
 */
router.post("/", controller.cadastrar);

export default router;