import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError.js";

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return next(new Error("JWT_SECRET não definido no ambiente."));
  }

  const [esquema, token] = (req.headers.authorization ?? "").split(" ");

  if (esquema !== "Bearer" || !token) {
    return next(new AppError("Token de autenticação não fornecido.", 401, "UNAUTHORIZED"));
  }

  try {
    const decoded = jwt.verify(token, secret) as unknown as { id: number; email: string };
    req.user = { id: decoded.id, email: decoded.email };
    return next();
  } catch {
    return next(new AppError("Token inválido ou expirado.", 401, "UNAUTHORIZED"));
  }
}