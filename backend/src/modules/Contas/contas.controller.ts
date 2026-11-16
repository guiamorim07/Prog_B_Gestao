import type { Request, Response } from "express";
import * as repository from "./contas.repository.js";
import type { FiltrosContas } from "./contas.repository.js"

function converterData(valor: unknown): Date | undefined | null {
  if (valor === undefined) return undefined;
  if (typeof valor !== "string") return null;
  const data = new Date(valor);
  return Number.isNaN(data.getTime()) ? null : data;
}

export async function criarConta(req: Request, res: Response) {
  const { descricao, valor, ativo, dataVencimento, dataPagamento } = req.body ?? {};

  if (!descricao || typeof descricao !== "string") {
    return res.status(400).json({ mensagem: "descricao é obrigatória" });
  }

  if (valor === undefined || valor === null || valor === "" || !Number.isFinite(Number(valor))) {
    return res.status(400).json({ mensagem: "valor é obrigatório e deve ser numérico" });
  }

  const vencimento = converterData(dataVencimento);
  if (!vencimento) {
    return res.status(400).json({ mensagem: "dataVencimento é obrigatória e deve ser uma data válida (AAAA-MM-DD)" });
  }

  const conta = await repository.criarConta({ descricao, valor, ativo, dataVencimento , dataPagamento});
  return res.status(201).json(conta);
}

export async function desativar(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ mensagem: "O ID da conta deve ser um número inteiro." });
  }

  const conta = await repository.desativar({ id });
  return res.status(200).json(conta);
}

export async function listartodasContas(req: Request, res: Response) {
  const contas = await repository.listartodasContas();
  return res.status(200).json(contas);
}

export async function listarContas(req: Request, res: Response) {
  const filtros: FiltrosContas = {};
  const { descricao, ativo } = req.query;

  if (typeof descricao === "string" && descricao) {
    filtros.descricao = descricao;
  }

  if (ativo !== undefined) {
    if (ativo !== "true" && ativo !== "false") {
      return res.status(400).json({ mensagem: "ativo deve ser true ou false" });
    }
    filtros.ativo = ativo === "true";
  }

  const dataVencimento = converterData(req.query.dataVencimento);
  if (dataVencimento === null) {
    return res.status(400).json({ mensagem: "dataVencimento deve ser uma data válida (AAAA-MM-DD)" });
  }
  if (dataVencimento) filtros.dataVencimento = dataVencimento;

  const dataPagamento = converterData(req.query.dataPagamento);
  if (dataPagamento === null) {
    return res.status(400).json({ mensagem: "dataPagamento deve ser uma data válida (AAAA-MM-DD)" });
  }
  if (dataPagamento) filtros.dataPagamento = dataPagamento;

  const contas = await repository.listarContas(filtros);
  return res.status(200).json(contas);
}

export async function deletarRegistroConta(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ mensagem: "O ID da conta deve ser um número inteiro." });
  }

  await repository.deletarRegistroConta(id);
  return res.status(204).send();
}


