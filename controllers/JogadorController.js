import express from "express";
import Jogador from "../models/Jogador.js";
import Partida from "../models/Partida.js";

const router = express.Router();

router.get("/jogadores", async (req, res) => {
  try {
    const jogadores = await Jogador.findAll();
    res.render("jogadores", { jogadores });
  } catch (error) {
    console.error(`Ocorreu um erro ao listar os jogadores: ${error}`);
    res.status(500).send("Erro ao listar os jogadores.");
  }
});

router.post("/jogadores/cadastrar", async (req, res) => {
  try {
    await Jogador.create({
      nick: req.body.nick,
      id_jogador: req.body.id_jogador,
      clube_regiao: req.body.clube_regiao,
    });
    res.redirect("/jogadores");
  } catch (error) {
    console.error(`Ocorreu um erro ao cadastrar o jogador: ${error}`);
    res.status(500).send("Erro ao cadastrar o jogador.");
  }
});

router.get("/jogadores/:id/editar", async (req, res) => {
  try {
    const jogador = await Jogador.findByPk(req.params.id);
    if (!jogador) {
      return res.status(404).send("Jogador não encontrado.");
    }
    res.render("jogador-editar", { jogador });
  } catch (error) {
    console.error(`Ocorreu um erro ao carregar o jogador: ${error}`);
    res.status(500).send("Erro ao carregar o jogador.");
  }
});

router.post("/jogadores/:id/atualizar", async (req, res) => {
  try {
    const jogador = await Jogador.findByPk(req.params.id);
    if (!jogador) {
      return res.status(404).send("Jogador não encontrado.");
    }
    await jogador.update({
      nick: req.body.nick,
      id_jogador: req.body.id_jogador,
      clube_regiao: req.body.clube_regiao,
    });
    res.redirect("/jogadores");
  } catch (error) {
    console.error(`Ocorreu um erro ao atualizar o jogador: ${error}`);
    res.status(500).send("Erro ao atualizar o jogador.");
  }
});

router.post("/jogadores/:id/excluir", async (req, res) => {
  try {
    const jogador = await Jogador.findByPk(req.params.id);
    if (!jogador) {
      return res.status(404).send("Jogador não encontrado.");
    }

    const partidasVinculadas = await Partida.count({
      where: { jogador_id: jogador.id },
    });
    if (partidasVinculadas > 0) {
      return res
        .status(409)
        .send("Apague as partidas vinculadas antes de excluir este jogador.");
    }

    await jogador.destroy();
    res.redirect("/jogadores");
  } catch (error) {
    console.error(`Ocorreu um erro ao excluir o jogador: ${error}`);
    res.status(500).send("Erro ao excluir o jogador.");
  }
});

export default router;
