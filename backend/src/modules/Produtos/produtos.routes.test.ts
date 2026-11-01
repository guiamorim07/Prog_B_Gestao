import { describe, it, expect } from 'vitest';
import request from 'supertest';
import  app  from '../../app.js';

import jwt from "jsonwebtoken";

process.env.JWT_SECRET ??= "segredo-de-teste";
const token = jwt.sign({ id: 1, email: "teste@email.com" }, process.env.JWT_SECRET);

describe('POST /produtos', () => {
  it('retorna 400 quando nao tem corpo', async () => {
    // aqui ele faz a requisiçao no app
    const res = await request(app)
      .post('/produtos')
      .set("Authorization", `Bearer ${token}`)
      .send({});
    // aqui ele printa o status da requisicao e o seu body pra investigar onde ta o erro
    console.log(res.status, res.body);
    // verifica se o status foi o esperado : tobe(400) = valor esperado
    expect(res.status).toBe(400);
  });

  it("retorna 400 quando falta a categoria do produto", async () => {
    const res = await request(app)
      .post("/produtos")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: 'x' });
    console.log(res.status, res.body);

    expect(res.status).toBe(400);
  });

  it("retorna 400 quando falta o nome do produto", async () => {
    const res = await request(app)
      .post("/produtos")
      .set("Authorization", `Bearer ${token}`)
      .send({ categoria: 'y' });
    console.log(res.status, res.body);

    expect(res.status).toBe(400);
  });

  it('retorna 400 quando nome e categoria estão vazios', async () => {
    const res = await request(app)
      .post('/produtos')
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: '', categoria: '' });

    console.log(res.status, res.body);

    expect(res.status).toBe(400);
  });

  it('retorna 401 quando não envia token', async () => {
    const res = await request(app)
      .post('/produtos')
      .send({ nome: 'X', categoria: 'Y' });

    console.log(res.status, res.body);

    expect(res.status).toBe(401);
  });
});





 
