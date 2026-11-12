import { prisma } from "../../lib/prisma.js";

export interface CriarContaDados {
  descricao: string;
  valor: number | string;
  ativo: boolean;                
  dataVencimento: Date;
  dataPagamento?: Date;
}


interface AlterarContaDados{

    ativo? : Boolean;
    dataVencimento? : Date;
    dataPagamento? : Date;
}


export interface DesativarContaDto {
  id: number;
}

export interface BuscarPorDataPagamento{
    dataPagamento : string | Date
}

export interface BuscarPorDataVencimento{
    dataVencimento : string | Date
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


