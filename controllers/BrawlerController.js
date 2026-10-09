import express from "express";
import Brawler from "../models/Brawler.js";
const router = express.Router();

router.get("/brawlers", async (req, res) => {
  try {
    const brawlers = await Brawler.findAll();
    res.render("brawlers", { brawlers });
  } catch (error) {
    console.error(`Ocorreu um erro ao listar os brawlers: ${error}`);
    res.status(500).send("Erro ao listar os brawlers.");
  }
});

router.post("/brawlers/cadastrar", async (req, res) => {
  try {
    await Brawler.create({
      nome: req.body.nome,
      poder: req.body.poder,
      classe: req.body.classe,
    });
    res.redirect("/brawlers");
  } catch (error) {
    console.error(`Ocorreu um erro ao cadastrar o brawler: ${error}`);
    res.status(500).send("Erro ao cadastrar o brawler.");
  }
});

router.get("/brawlers/:id/editar", async (req, res) => {
  try {
    const brawler = await Brawler.findByPk(req.params.id);
    if (!brawler) {
      return res.status(404).send("Brawler não encontrado.");
    }
    res.render("brawler-editar", { brawler });
  } catch (error) {
    console.error(`Ocorreu um erro ao carregar o brawler: ${error}`);
    res.status(500).send("Erro ao carregar o brawler.");
  }
});

router.post("/brawlers/:id/atualizar", async (req, res) => {
  try {
    const brawler = await Brawler.findByPk(req.params.id);
    if (!brawler) {
      return res.status(404).send("Brawler não encontrado.");
    }
    await brawler.update({
      nome: req.body.nome,
      poder: req.body.poder,
      classe: req.body.classe,
    });
    res.redirect("/brawlers");
  } catch (error) {
    console.error(`Ocorreu um erro ao atualizar o brawler: ${error}`);
    res.status(500).send("Erro ao atualizar o brawler.");
  }
});

router.post("/brawlers/:id/excluir", async (req, res) => {
  try {
    const removidos = await Brawler.destroy({ where: { id: req.params.id } });
    if (!removidos) {
      return res.status(404).send("Brawler não encontrado.");
    }
    res.redirect("/brawlers");
  } catch (error) {
    console.error(`Ocorreu um erro ao excluir o brawler: ${error}`);
    res.status(500).send("Erro ao excluir o brawler.");
  }
});

export default router;
