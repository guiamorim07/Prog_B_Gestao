import { describe, it, expect } from 'vitest';
import request from 'supertest';
import  app  from '../../app.js';

describe('POST /produtos', () => {
    it( 'retorna 400 quando nao tem corpo', async() => {
    // aqui ele faz a requisiçao no app
    const res = (await request(app).post('/produtos').send({}));
    // aqui ele printa o status da requisicao e o seu body pra investigar onde ta o erro
    console.log(res.status, res.body);
    // verifica se o status foi o esperado : tobe(400) = valor esperado
    expect(res.status).toBe(400);
  });
    it("retorna 400 quando falta a categoria do produto", async() =>{
        const res = (await request(app).post("/produtos").send({nome : 'x'}));
        console.log(res.status,res.body);

        expect(res.status).toBe(400);})
    it("retorna 400 quando falta o nome do produto", async() => {
        const res = (await request(app).post("/produtos").send({categoria : 'y'}));
        console.log(res.status, res.body);

        expect(res.status).toBe(400);
  });

     it('retorna 400 quando nome e categoria estão vazios', async () => {   // MUDA: descrição
    const res = await request(app)
      .post('/produtos')
      .send({ nome: '', categoria: '' });                               // MUDA: corpo

    console.log(res.status, res.body);

    expect(res.status).toBe(400);
  });

    

    });





 
