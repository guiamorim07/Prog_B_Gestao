import type { Request, Response } from "express";
import * as repository from "./produtos.repository.js";
import type { CriarProdutoDados, AtualizarProdutoDados} from "./produtos.repository.js";

function parseId(valor: unknown): number | null {
  const id = Number(valor);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function codigoPrisma(error: unknown): string | undefined {
  return typeof error === "object" && error !== null
    ? (error as { code?: string }).code
    : undefined;
}

// POST /produtos - para facilitar a identificação

export async function criarProduto(req: Request, res: Response) {
    const { nome, descricao, categoria } = (req.body ?? {}) as Partial<CriarProdutoDados>;

    if (typeof nome !== "string" || !nome.trim() || typeof categoria !== "string" || !categoria.trim()) {
    return res.status(400).json({ error: "Nome e categoria são obrigatórios" });
  }
  if (descricao !== undefined && descricao !== null && typeof descricao !== "string") {
    return res.status(400).json({ error: "Descrição deve ser texto" });
  }

  try {
    const produto = await repository.criar({
      nome: nome.trim(),
      categoria: categoria.trim(),
      descricao,
    });
    return res.status(201).json(produto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar produto" });
  }
}

// GET /produtos

export async function listarProdutos(req: Request, res: Response) {
  const pagina = Math.max(1, Number(req.query.pagina) || 1);
  const limite = Math.min(100, Math.max(1, Number(req.query.limite) || 10));
  const categoria = typeof req.query.categoria === "string" ? req.query.categoria : undefined;
  const busca = typeof req.query.busca === "string" ? req.query.busca : undefined;
  const ativo =
    req.query.ativo === "true" ? true : req.query.ativo === "false" ? false : undefined;

  try {
    const resultado = await repository.listar({ pagina, limite, categoria, busca, ativo });
    return res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao listar produtos" });
  }
}


// GET /produtos/:id
export async function buscarProduto(req: Request, res: Response) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: "O ID do produto deve ser um número válido." });
  }

  try {
    const produto = await repository.buscarPorId(id);
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    return res.status(200).json(produto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar produto" });
  }
}

// PATCH /produtos/:id
export async function atualizarParcial(req: Request, res: Response) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: "O ID do produto deve ser um número válido." });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const dados: AtualizarProdutoDados = {};

  if (body.nome !== undefined) {
    if (typeof body.nome !== "string" || !body.nome.trim()) {
      return res.status(400).json({ error: "Nome inválido" });
    }
    dados.nome = body.nome.trim();
  }
  if (body.categoria !== undefined) {
    if (typeof body.categoria !== "string" || !body.categoria.trim()) {
      return res.status(400).json({ error: "Categoria inválida" });
    }
    dados.categoria = body.categoria.trim();
  }
  if (body.descricao !== undefined) {
    if (body.descricao !== null && typeof body.descricao !== "string") {
      return res.status(400).json({ error: "Descrição inválida" });
    }
    dados.descricao = body.descricao as string | null;
  }
  if (body.ativo !== undefined) {
    if (typeof body.ativo !== "boolean") {
      return res.status(400).json({ error: "Ativo deve ser true ou false" });
    }
    dados.ativo = body.ativo;
  }

  if (Object.keys(dados).length === 0) {
    return res.status(400).json({ error: "Envie ao menos um campo para atualizar" });
  }

  try {
    const produtoAtualizado = await repository.atualizarParcial(id, dados);
    return res.status(200).json(produtoAtualizado);
  } catch (error) {
    if (codigoPrisma(error) === "P2025") {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    console.error(error);
    return res.status(500).json({ error: "Erro ao atualizar produto" });
  }
}

// DELETE /produtos/:id
export async function deletarProduto(req: Request, res: Response) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: "O ID do produto deve ser um número válido." });
  }

  try {
    await repository.deletar(id);
    return res.status(204).send();
  } catch (error) {
    const codigo = codigoPrisma(error);
    if (codigo === "P2025") {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    if (codigo === "P2003") {
      return res.status(409).json({ error: "Produto possui variações e não pode ser apagado." });
    }
    console.error(error);
    return res.status(500).json({ error: "Erro ao apagar produto" });
  }
}

// PUT / produtos / :id

export async function atualizarTotal(req: Request, res: Response) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ error: "O ID do produto deve ser um número válido." });
  }

  const { nome, categoria, descricao } = (req.body ?? {}) as Partial<CriarProdutoDados>;

  if (typeof nome !== "string" || !nome.trim() || typeof categoria !== "string" || !categoria.trim()) {
    return res.status(400).json({ error: "Nome e categoria são obrigatórios" });
  }
  if (descricao !== undefined && descricao !== null && typeof descricao !== "string") {
    return res.status(400).json({ error: "Descrição deve ser texto" });
  }

  try {
    const produtoAtualizado = await repository.atualizarTotal(id, {
      nome: nome.trim(),
      categoria: categoria.trim(),
      descricao: descricao ?? null,
    });
    return res.status(200).json(produtoAtualizado);
  } catch (error) {
    if (codigoPrisma(error) === "P2025") {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    console.error(error);
    return res.status(500).json({ error: "Erro ao atualizar produto" });
  }
}



