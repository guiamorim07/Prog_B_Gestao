import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";

export interface CriarContaDados {
  descricao: string;
  valor: number | string;
  ativo: boolean;                
  dataVencimento: Date;
  dataPagamento?: Date;
}



export interface DesativarContaDto {
  id: number;
}



export interface FiltrosContas {          
  descricao? : string                
  ativo? : boolean
  dataVencimento? : string | Date
  dataPagamento? : string  | Date        
}




export async function criarConta( dados : CriarContaDados){
    return prisma.contas.create({ data : dados });
}


export async function desativar(dados: DesativarContaDto ) {
    return await prisma.contas.update({
      where: { 
        id: dados.id 
      },
      data: {
        ativo: false, 
      },
    });
  }


export async function listartodasContas(   
    ) {
    return prisma.contas.findMany();
}



export async function listarContas(filtros: FiltrosContas) {
  const { descricao, ativo, dataVencimento, dataPagamento } = filtros;
  const where : Prisma.ContasWhereInput = {};

  if (descricao) {
    where.descricao = {contains : descricao, mode: "insensitive"
    }
  }

  if (dataPagamento){
    where.dataPagamento = dataPagamento
  } 

  if (dataVencimento){
    where.dataVencimento = dataVencimento
  }


  if (ativo !== undefined) {
    where.dataPagamento = ativo ? null : {not: null}

  }


  return prisma.contas.findMany({where})
}


export async function deletarRegistroConta(id :number) {
    return prisma.contas.delete({where : {id}});
    
}

