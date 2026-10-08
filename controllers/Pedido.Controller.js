// Importando o framework Express
import express from "express";

// Importando os Models
import Pedido from "../models/Pedido.js";
import Cliente from "../models/Cliente.js";

// Criando o Router
const router = express.Router();

// ROTA: LISTAR PEDIDOS
router.get("/pedidos", function (req, res) {
  Promise.all([
    // Buscando todos os pedidos
    Pedido.findAll({
      // Trazendo os dados do cliente junto com o pedido
      include: [
        {
          model: Cliente,
          required: true,
        },
      ],
    }),

    // Buscando todos os clientes
    Cliente.findAll(),
  ])

    // Recebendo os dois resultados do Promise.all
    .then(([pedidos, clientes]) => {
      // Enviando os dados para a página pedidos.ejs
      res.render("pedidos", {
        pedidos: pedidos,
        clientes: clientes,
      });
    })

    // Tratando erros
    .catch((error) => {
      console.log(`Ocorreu um erro ao carregar os pedidos. Erro: ${error}`);

      res.status(500).send("Erro ao carregar os pedidos.");
    });
});

// ROTA: CADASTRAR PEDIDO
router.post("/pedidos/cadastrar", (req, res) => {
  // Capturando os dados do formulario
  const numero = req.body.numero;
  const valor = req.body.valor;
  const clienteId = req.body.clienteId;
  Pedido.create({
    numero: numero,
    valor: valor,
    cliente_id: clienteId,
  })
    .then(() => {
      res.redirect("/pedidos");
    })
    .catch((error) => {
      console.log(error);
    });
});

export default router;
