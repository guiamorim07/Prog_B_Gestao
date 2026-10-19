import { Request, Response } from "express";
import * as service from "./produtos.service.js";
import * as repository from "./produtos.repository.js";
import type { CriarProdutoDados } from "./produtos.repository.js";


export async function criarProduto(req: Request, res: Response) {
    const { nome, descricao, categoria } = (req.body ?? {}) as Partial<CriarProdutoDados>;

    if (!nome || !categoria) {
        return res.status(400).json({ error: "Nome e categoria são obrigatórios" });
    }

    const produto = await service.criar({nome, categoria, descricao});

    return res.status(201).json(produto);
}
