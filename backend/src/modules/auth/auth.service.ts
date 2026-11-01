import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError.js";
import * as usuarios from "../usuarios/usuarios.repository.js";

export async function login(email: string, senha: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET não definido no ambiente.");
  }

  const usuario = await usuarios.buscarPorEmail(email);
  const senhaValida = usuario ? await bcrypt.compare(senha, usuario.senhaHash) : false;

  // Mensagem genérica: não revela se o e-mail existe
  if (!usuario || !senhaValida) {
    throw new AppError("E-mail ou senha incorretos.", 401, "UNAUTHORIZED");
  }

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, secret, { expiresIn: "2h" });

  return {
    token,
    usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
  };
}