import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Imports para o Backup (Slide 21)
import cron from 'node-cron';
import { exec } from 'child_process';

import rotaLeituras from './routes/rotaLeituras';
import rotaClima from './routes/rotaClima';

const app = express();

app.use(express.json());
app.use(cors());

const MONGO_URI = "mongodb://localhost:27017/autodb";

mongoose.connect(MONGO_URI)
    .then(() => console.log("LOG: Conectado ao MongoDB com sucesso!"))
    .catch((err) => console.error("LOG: Erro ao conectar:", err));

app.use('/leituras', rotaLeituras);
app.use('/clima', rotaClima);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

cron.schedule("0 2 * * *", () => {
    console.log("⏳ Iniciando backup diário agendado (02:00)...");

    // Comando de backup para o banco 'autodb'
    const comando = "mongodump --db autodb --out ./backups_automaticos";

    exec(comando, (erro, stdout, stderr) => {
        if (erro) {
            console.error(`❌ Erro ao realizar backup: ${erro.message}`);
            return;
        }
        console.log("✅ Backup diário (autodb) realizado com sucesso!");
        if (stderr) {
            console.log(`Log do Backup: ${stderr}`);
        }
    });
});

console.log("Sistema de backup agendado para as 02:00 AM.");