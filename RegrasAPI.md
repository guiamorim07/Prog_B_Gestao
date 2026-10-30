# Regras da API (contrato)

Documentação do contrato da API do aplicativo de gestão da loja de roupas, seguindo a abordagem contract first. Para cada operação, são definidos o que ela recebe e o que ela retorna.

## Produto

### Operações

| Operação | Rota | Recebe | Retorna |
|---|---|---|---|
| Criar | `POST /produtos` | Corpo: `nome`, `categoria`, `descricao` (opcional) | `201` + produto completo (com `id`, `ativo` e datas). Erro `400` se o corpo for inválido |
| Listar | `GET /produtos` | Query (todas opcionais): página, limite, `categoria`, `ativo`, busca por nome | `200` + lista de produtos e dados de paginação |
| Buscar um | `GET /produtos/{id}` | `id` na URL | `200` + produto. Erro `404` se não existir |
| Atualizar | `PATCH /produtos/{id}` | `id` na URL + corpo com os campos a alterar (todos opcionais) | `200` + produto atualizado. Erros `400` e `404` |
| Remover | `DELETE /produtos/{id}` | `id` na URL | `204` sem corpo. Erro `404` se não existir |
| Substituir | `PUT /produtos/{id}` | `id` na URL + corpo: `nome`, `categoria`, `descricao` (opcional) | `200` + produto atualizado. Erros `400` e `404` |