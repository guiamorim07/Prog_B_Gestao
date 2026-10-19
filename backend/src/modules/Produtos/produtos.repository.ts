import { prisma } from "../../lib/prisma.js";


export interface CriarProdutoDados {
  nome: string;
  descricao?: string;
  categoria: string;
}


export async function criar( dados : CriarProdutoDados ) {
    return prisma.produto.create({data: dados});
}