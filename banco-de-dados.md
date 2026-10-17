# Documentação do banco de dados (v1)

Aplicativo de gestão de negócios. Esta primeira versão é voltada a uma loja de roupas.

Stack: Node.js, Express e Prisma, com PostgreSQL como banco. A API é desenhada com a abordagem contract first.

## Tabelas

- **Usuario**
- **Produto**
- **Variacao**: variações de um produto. Possui uma chave estrangeira que referencia um campo único de `Produto`.
- **Assinantes**: tabela única, para monitoramento das assinaturas. A loja tem um serviço de assinatura que dá desconto nas camisas.
- **Contas**: tabela única, para identificar as contas a pagar e as já pagas do estabelecimento.

## Relações

```
Produto 1 ──── N Variacao
```

Esta é a única relação definida na primeira versão.

## Campos

> Sugestões de campos. Os que não fizerem sentido podem ser removidos.

### Usuario

| Campo | Tipo | Observações |
|---|---|---|
| `id` | inteiro, autoincremento | Chave primária |
| `nome` | texto | |
| `email` | texto | Único; usado no login |
| `senhaHash` | texto | Senha guardada apenas como hash |
| `criadoEm` | data/hora | |
| `atualizadoEm` | data/hora | |

### Produto

| Campo | Tipo | Observações |
|---|---|---|
| `id` | inteiro, autoincremento | Chave primária |
| `nome` | texto | |
| `descricao` | texto, opcional | |
| `categoria` | texto | Permite identificar as camisas para o desconto da assinatura |
| `ativo` | booleano | Padrão `true` |
| `criadoEm` | data/hora | |
| `atualizadoEm` | data/hora | |

### Variacao

| Campo | Tipo | Observações |
|---|---|---|
| `id` | inteiro, autoincremento | Chave primária |
| `produtoId` | inteiro | Chave estrangeira para `Produto.id` |
| `sku` | texto | Único |
| `tamanho` | texto | Ex.: P, M, G |
| `cor` | texto | |
| `preco` | decimal | |
| `quantidadeEstoque` | inteiro | Padrão 0 |
| `estoqueMinimo` | inteiro | Base para o alerta de estoque mínimo |
| `ativo` | booleano | Padrão `true` |
| `criadoEm` | data/hora | |
| `atualizadoEm` | data/hora | |

### Assinantes

| Campo | Tipo | Observações |
|---|---|---|
| `id` | inteiro, autoincremento | Chave primária |
| `nome` | texto | |
| `email` | texto, opcional | |
| `telefone` | texto, opcional | |
| `status` | enum | Ex.: ATIVA, CANCELADA |
| `dataInicio` | data | Início da assinatura |
| `dataFim` | data, opcional | Preenchida quando a assinatura termina |
| `criadoEm` | data/hora | |
| `atualizadoEm` | data/hora | |

### Contas

| Campo | Tipo | Observações |
|---|---|---|
| `id` | inteiro, autoincremento | Chave primária |
| `descricao` | texto | Ex.: "Aluguel de outubro" |
| `valor` | decimal | |
| `dataVencimento` | data | |
| `dataPagamento` | data, opcional | Vazia enquanto a conta não foi paga |
| `criadoEm` | data/hora | |
| `atualizadoEm` | data/hora | |
