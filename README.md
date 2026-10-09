# Brawl Arena

Aplicação CRUD para gerenciar jogadores, brawlers e partidas com Express, EJS,
Sequelize e MySQL.

## Executar

Configure a conexão MySQL em `config/sequelize-config.js` e inicie a aplicação:

```sh
npm start
```

A aplicação fica disponível em `http://localhost:8080`.

## Dados

As tabelas usam os nomes `jogadores`, `brawlers` e `partidas`. Na primeira
inicialização, tabelas legadas (`clientes`, `produtos` e `pedidos`) e seus
campos são renomeados automaticamente, preservando os registros. O banco
`loja_relacional` continua com o mesmo nome para manter a conexão com os dados
já existentes.
