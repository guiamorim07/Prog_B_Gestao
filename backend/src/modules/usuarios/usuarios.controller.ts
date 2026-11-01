import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError.js";
import * as service from "./usuarios.service.js";

export async function cadastrar(req: Request, res: Response, next: NextFunction) {
  try {
    const { nome, email, senha } = (req.body ?? {}) as Record<string, unknown>;

    if (
      typeof nome !== "string" || !nome.trim() ||
      typeof email !== "string" || !email.includes("@") ||
      typeof senha !== "string" || senha.length < 6
    ) {
      throw new AppError("Nome, e-mail válido e senha (mínimo 6 caracteres) são obrigatórios.");
    }

    const usuario = await service.cadastrar(nome.trim(), email.trim().toLowerCase(), senha);
    return res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
}