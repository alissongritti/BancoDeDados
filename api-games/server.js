const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/api_games")
  .then(() => console.log("Conectado ao MongoDB (api_games)!"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

const jogosRoutes = require("./routes/jogos");
app.use("/jogos", jogosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
