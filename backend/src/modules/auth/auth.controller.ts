import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError.js";
import * as service from "./auth.service.js";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, senha } = (req.body ?? {}) as Record<string, unknown>;

    if (typeof email !== "string" || !email || typeof senha !== "string" || !senha) {
      throw new AppError("E-mail e senha são obrigatórios.");
    }

    const resultado = await service.login(email.trim().toLowerCase(), senha);
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}