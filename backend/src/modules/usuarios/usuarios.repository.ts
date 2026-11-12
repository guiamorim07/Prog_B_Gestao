import { prisma } from "../../lib/prisma.js";

export function buscarPorEmail(email: string) {
  return prisma.usuario.findUnique({ where: { email } });
}

export function criar(dados: { nome: string; email: string; senhaHash: string }) {
  return prisma.usuario.create({
    data: dados,
    select: { id: true, nome: true, email: true, criadoEm: true },
  });
}