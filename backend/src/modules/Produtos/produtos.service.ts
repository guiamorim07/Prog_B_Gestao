import * as repository from "./produtos.repository.js";
import type { CriarProdutoDados } from "./produtos.repository.js";

export function criar(dados : CriarProdutoDados) {

    return repository.criar(dados);
}