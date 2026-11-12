import { Router } from "express";
import * as controller from "./auth.controller.js";

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica o usuário e retorna um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *             example:
 *               email: "ana@email.com"
 *               senha: "ana123"
 *     responses:
 *       200:
 *         description: Login realizado, retorna token e dados do usuário
 *       400:
 *         description: E-mail ou senha não informados
 *       401:
 *         description: Credenciais incorretas
 */
router.post("/", controller.login);

export default router;