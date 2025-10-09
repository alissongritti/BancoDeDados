const express = require("express");
const router = express.Router();
const Jogo = require("../models/jogo");

router.get("/", async (req, res) => {
  try {
    const jogos = await Jogo.find();
    res.json(jogos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const jogo = new Jogo({
    nome: req.body.nome,
    categoria: req.body.categoria,
    preco: req.body.preco,
    estoque: req.body.estoque,
  });

  try {
    const novoJogo = await jogo.save();
    res.status(201).json(novoJogo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const jogoAtualizado = await Jogo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(jogoAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Jogo.findByIdAndDelete(req.params.id);
    res.json({ message: "Jogo deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
