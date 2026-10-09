import express from "express";
import Partida from "../models/Partida.js";
import Jogador from "../models/Jogador.js";
const router = express.Router();

router.get("/partidas", async (req, res) => {
  try {
    const [partidas, jogadores] = await Promise.all([
      Partida.findAll({
        include: { model: Jogador, as: "jogador", required: true },
      }),
      Jogador.findAll(),
    ]);
    res.render("partidas", { partidas, jogadores });
  } catch (error) {
    console.error(`Ocorreu um erro ao carregar as partidas: ${error}`);
    res.status(500).send("Erro ao carregar as partidas.");
  }
});

router.post("/partidas/cadastrar", async (req, res) => {
  try {
    await Partida.create({
      numero: req.body.numero,
      recompensa: req.body.recompensa,
      jogador_id: req.body.jogador_id,
    });
    res.redirect("/partidas");
  } catch (error) {
    console.error(`Ocorreu um erro ao cadastrar a partida: ${error}`);
    res.status(500).send("Erro ao cadastrar a partida.");
  }
});

router.get("/partidas/:id/editar", async (req, res) => {
  try {
    const [partida, jogadores] = await Promise.all([
      Partida.findByPk(req.params.id),
      Jogador.findAll(),
    ]);
    if (!partida) {
      return res.status(404).send("Partida não encontrada.");
    }
    res.render("partida-editar", { partida, jogadores });
  } catch (error) {
    console.error(`Ocorreu um erro ao carregar a partida: ${error}`);
    res.status(500).send("Erro ao carregar a partida.");
  }
});

router.post("/partidas/:id/atualizar", async (req, res) => {
  try {
    const partida = await Partida.findByPk(req.params.id);
    if (!partida) {
      return res.status(404).send("Partida não encontrada.");
    }
    await partida.update({
      numero: req.body.numero,
      recompensa: req.body.recompensa,
      jogador_id: req.body.jogador_id,
    });
    res.redirect("/partidas");
  } catch (error) {
    console.error(`Ocorreu um erro ao atualizar a partida: ${error}`);
    res.status(500).send("Erro ao atualizar a partida.");
  }
});

router.post("/partidas/:id/excluir", async (req, res) => {
  try {
    const removidas = await Partida.destroy({ where: { id: req.params.id } });
    if (!removidas) {
      return res.status(404).send("Partida não encontrada.");
    }
    res.redirect("/partidas");
  } catch (error) {
    console.error(`Ocorreu um erro ao excluir a partida: ${error}`);
    res.status(500).send("Erro ao excluir a partida.");
  }
});

export default router;
