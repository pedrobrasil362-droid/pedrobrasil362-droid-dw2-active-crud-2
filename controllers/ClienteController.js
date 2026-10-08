// Importando o framework Express
import express from "express";
// router(); método do Express para criar rotas
import Cliente from "../models/Cliente.js";
const router = express.Router();

// ROTA CLIENTES
router.get("/clientes", function (req, res) {
  // Selecionando todos os clientes do banco de dados
  Cliente.findAll()
    .then((clientes) => {
      res.render("clientes", {
        // Enviando a lista de clientes para a página HTML
        clientes: clientes,
      });
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao listar os clientes: Erro: ${error}`);
    });
});

// Rota de cadatro de cliente
router.post("/clientes/cadastrar", (req, res) => {
  // Capturando os dados vindo do formulário e gravando nas variáveis
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const endereco = req.body.endereco;
  // Chamando o model para gravar os dados no banco
  // Equivalente ao insert into
  Cliente.create({
    nome: nome,
    cpf: cpf,
    endereco: endereco,
  })
    .then(() => {
      res.redirect("/clientes");
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao cadastrar o cliente. Erro: ${error}`);
    });
});

// Exportando o módulo
export default router;
