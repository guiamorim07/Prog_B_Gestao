import { Request, Response } from "express";
import * as service from "./produtos.service.js";
import * as repository from "./produtos.repository.js";
import type { CriarProdutoDados, AtualizarProdutoDados} from "./produtos.repository.js";


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


// PATCH 

export async function atualizarParcial(req : Request, res : Response) {
    const {id} = req.params;
    const dados = (req.body ?? {}) as AtualizarProdutoDados;

    if (!id || typeof id !== "number") {
        return res.status(400).json({ error: "O ID do produto é obrigatório e deve ser válido."})
    }

    const produtoAtualizado = await repository.atualizarParcial(id,dados);
    return res.status(200).json(produtoAtualizado)
}


// PUT

export async function atualizarTotal(req : Request, res : Response){
    const {id} = (req.params) ;
    const { nome, categoria, descricao } = (req.body ?? {}) as Partial<CriarProdutoDados>;


    if (!id || typeof id !== "number"){
        return res.status(400).json({ error: "O ID do produto é obrigatório e deve ser válido."})
    }

      if (!nome || !categoria) {
    return res.status(400).json({ mensagem: "nome e categoria são obrigatórios" });
  }

    const produtoExistente = await repository.buscarPorId(id);
  if (!produtoExistente) {
    return res.status(404).json({ mensagem: "produto não encontrado" });
  }
    const produtoAtualizado = await repository.atualizarTotal(id, {nome, categoria, descricao});
    return res.status(200).json(produtoAtualizado)

}