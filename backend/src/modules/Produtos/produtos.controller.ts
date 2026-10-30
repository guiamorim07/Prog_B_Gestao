import { Request, Response } from "express";
import * as service from "./produtos.service.js";
import * as repository from "./produtos.repository.js";
import type { CriarProdutoDados } from "./produtos.repository.js";


export async function criarProduto(req: Request, res: Response) {
    const { nome, descricao, categoria } = (req.body ?? {}) as Partial<CriarProdutoDados>;

    if (!nome || !categoria) {
        return res.status(400).json({ error: "Nome e categoria são obrigatórios" });
    }

    const produto = await repository.criar({nome, categoria, descricao});

    return res.status(201).json(produto);
}





// GET - Listar
export async function listarProdutos(req: Request, res: Response) {
    const produtos = await repository.listar();
    return res.status(200).json(produtos);
}

//DELETE - Apagar
export async function deletarProduto(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || typeof id !== "number") {
        return res.status(400).json({ error: "O ID do produto é obrigatório e deve ser válido." });
    }

    try {
        await repository.deletar(id);
        
        return res.status(204).send(); 
    } catch (error) {
        return res.status(404).json({ error: "Produto não encontrado ou já foi apagado." });
    }
}