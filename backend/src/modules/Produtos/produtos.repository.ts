import { prisma } from "../../lib/prisma.js";


export interface CriarProdutoDados {
  nome: string;
  categoria: string;
  descricao?: string | null;
}

export interface AtualizarProdutoDados {
  nome?: string;
  categoria?: string;
  descricao?: string | null;
  ativo?: boolean;
}



export function buscarPorId(id: number) {
  return prisma.produto.findUnique({ where: { id } });
}



// POST - Criar
export async function criar( dados : CriarProdutoDados ) {
    return prisma.produto.create({data: dados});
}


// GET - Listar

export interface FiltrosProduto {
  pagina: number;
  limite: number;
  categoria?: string;
  busca?: string;
  ativo?: boolean;
}

export async function listar(filtros: FiltrosProduto) {
  const { pagina, limite, categoria, busca, ativo } = filtros;

  const where = {
    ...(categoria && { categoria }),
    ...(ativo !== undefined && { ativo }),
    ...(busca && { nome: { contains: busca, mode: "insensitive" as const } }),
  };

  const [itens, total] = await Promise.all([
    prisma.produto.findMany({
      where,
      skip: (pagina - 1) * limite,
      take: limite,
      orderBy: { id: "asc" },
    }),
    prisma.produto.count({ where }),
  ]);

  return {
    itens,
    paginacao: { pagina, limite, total, totalPaginas: Math.ceil(total / limite) },
  };
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
export async function atualizarTotal(id: number, dados: CriarProdutoDados) {
  return prisma.produto.update({
    where: { id },
    data: {
      nome: dados.nome,
      categoria: dados.categoria,
      descricao: dados.descricao ?? null,
    },
  });
}
