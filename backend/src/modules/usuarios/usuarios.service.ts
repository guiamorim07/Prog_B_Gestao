import bcrypt from "bcrypt";
import { AppError } from "../../errors/AppError.js";
import * as repository from "./usuarios.repository.js";

export async function cadastrar(nome: string, email: string, senha: string) {
  const existente = await repository.buscarPorEmail(email);
  if (existente) {
    throw new AppError("E-mail já cadastrado.", 409, "EMAIL_IN_USE");
  }
  const senhaHash = await bcrypt.hash(senha, 10);
  return repository.criar({ nome, email, senhaHash });
}