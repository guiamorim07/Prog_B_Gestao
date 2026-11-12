import type { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError.js";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error("LOG INTERNO DO SERVIDOR:", err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: { code: err.code, message: err.message },
    });
  }

  // JSON malformado no body
  if ((err as { type?: string }).type === "entity.parse.failed") {
    return res.status(400).json({
      error: { code: "BAD_REQUEST", message: "JSON inválido no corpo da requisição." },
    });
  }

  return res.status(500).json({
    error: { code: "INTERNAL_SERVER_ERROR", message: "Ocorreu um erro interno inesperado no servidor." },
  });
}