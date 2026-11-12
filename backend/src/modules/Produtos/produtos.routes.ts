import { Router } from "express";
import * as controller from "./produtos.controller.js";
import { requireAuth } from "../auth/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista produtos com paginação e filtros
 *     tags: [Produtos]
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limite
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: categoria
 *         schema: { type: string }
 *       - in: query
 *         name: busca
 *         schema: { type: string }
 *         description: Busca parcial no nome
 *       - in: query
 *         name: ativo
 *         schema: { type: boolean }
 *     responses:
 *       200:
 *         description: Lista de produtos e dados de paginação
 */
router.get("/", controller.listarProdutos);

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Produto não encontrado
 */
router.get("/:id", controller.buscarProduto);

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Nome e categoria são obrigatórios
 *       401:
 *         description: Token ausente ou inválido
 */
router.post("/", requireAuth, controller.criarProduto);

/**
 * @swagger
 * /produtos/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome: { type: string }
 *               categoria: { type: string }
 *               descricao: { type: string, nullable: true }
 *               ativo: { type: boolean }
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       400:
 *         description: ID ou dados inválidos
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Produto não encontrado
 */
router.patch("/:id", requireAuth, controller.atualizarParcial);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Substitui os dados de um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       400:
 *         description: ID ou dados inválidos
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Produto não encontrado
 */
router.put("/:id", requireAuth, controller.atualizarTotal);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Produto removido
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Produto não encontrado
 *       409:
 *         description: Produto possui variações e não pode ser apagado
 */
router.delete("/:id", requireAuth, controller.deletarProduto);



export default router;