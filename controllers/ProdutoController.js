// Importando o framework Express
import express from "express";
// router(); método do Express para criar rotas
import Produto from "../models/Produto.js";
const router = express.Router();

// ROTA PRODUTOS
router.get("/produtos", function (req, res) {
  Produto.findAll()
    .then((produtos) => {
      res.render("produtos", {
        produtos: produtos,
      });
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao listar os produtos. Erro:${error}`);
    });
});

router.post("/produtos/cadastrar", (req, res) => {
  const nome = req.body.nome;
  const preco = req.body.preco;
  const categoria = req.body.categoria;

  Produto.create({
    nome: nome,
    preco: preco,
    categoria: categoria,
  })
    .then(() => {
      res.redirect("/produtos");
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao cadastrar o produto. Erro: ${error}`);
    });
});

export default router;
