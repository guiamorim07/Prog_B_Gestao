import { prisma } from "../../lib/prisma.js";

export interface CriarProdutoDados {
  nome: string;
  descricao?: string;
  categoria: string;
}

// POST - Criar
export async function criar(dados: CriarProdutoDados) {
    return prisma.produto.create({ data: dados });
}

// GET - Listar
export async function listar() {
    return prisma.produto.findMany();
}

// DELETE - Deletar
export async function deletar(id: string) {
    return prisma.produto.delete({ 
        where: { id } 
    });
}