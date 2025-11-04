const express = require('express');
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; 
const dbName = "rede_games"; 
const client = new MongoClient(uri);

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/produtos', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const produtosCollection = db.collection('produtos');

        const produtos = await produtosCollection.find({})
            .project({ _id: 0, nome: 1, preco: 1 }) 
            .limit(5) 
            .toArray();

        res.json(produtos);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).send({ message: "Erro interno do servidor" });
    } finally {
        
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Rota de produtos: http://localhost:${port}/api/produtos`);
});
