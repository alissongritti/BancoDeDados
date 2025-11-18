import { Router, Request, Response } from 'express';
import Leitura, { ILeitura } from '../models/Leitura';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const { carro, sensor, valor } = req.body;

    if (!carro || !sensor || valor === undefined) {
        res.status(400).json({
            erro: "Dados inválidos. Campos obrigatórios: 'carro', 'sensor', 'valor'."
        });
        return;
    }

    try {
        const novaLeitura: ILeitura = new Leitura({
            carro,
            sensor,
            valor,
            data: req.body.data
        });

        await novaLeitura.save();

        res.status(201).json(novaLeitura);

    } catch (erro: any) {
        res.status(500).json({
            erro: "Erro ao registrar leitura",
            detalhes: erro.message || erro
        });
    }
});

export default router;