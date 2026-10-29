import * as repository from "./produtos.repository.js";
import type { CriarProdutoDados } from "./produtos.repository.js";

// POST - Criar
export function criar(dados: CriarProdutoDados) {
    return repository.criar(dados);
}

// GET - Listar
export function listar() {
    return repository.listar();
}

// DELETE - Apagar
export function deletar(id: string) {
    return repository.deletar(id);
}