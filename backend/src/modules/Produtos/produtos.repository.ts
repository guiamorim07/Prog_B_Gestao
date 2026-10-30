import { prisma } from "../../lib/prisma.js";


export interface CriarProdutoDados {
  nome: string;
  descricao?: string;
  categoria: string;
}

export interface AtualizarProdutoDados {
  nome?: string;
  categoria?: string;
  descricao?: string;
}



export function buscarPorId(id: number) {
  return prisma.produto.findUnique({ where: { id } });
}



// POST - Criar
export async function criar( dados : CriarProdutoDados ) {
    return prisma.produto.create({data: dados});
}


// GET - Listar
export async function listar() {
    return prisma.produto.findMany();
}

// DELETE - Deletar
export async function deletar(id: number) {
    return prisma.produto.delete({ 
        where: { id } 
    });
}

// PATCH - Atualizar parcial 
export async function atualizarParcial(id: number, fieldsToUpdate: Partial<AtualizarProdutoDados>){

    return prisma.produto.update({
      where : {id},
      data : fieldsToUpdate
    });
};

// PUT - Atualizar total
export async function atualizarTotal(id : number, fullData : Partial<AtualizarProdutoDados>){

    return prisma.produto.update({
      where : {id},
      data : {
        nome : fullData.nome,
        descricao : fullData.descricao !== undefined ? fullData.descricao : null,
        categoria : fullData.categoria }
    });

}
