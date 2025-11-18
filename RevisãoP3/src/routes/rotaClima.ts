import { Router, Request, Response } from 'express';
import { importarTemperatura } from '../services/climaService';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        // Chama a função que vai no OpenWeatherMap e salva no Banco
        const climaSalvo = await importarTemperatura();
        
        // Retorna o sucesso para você ver no ThunderClient
        res.status(201).json({
            mensagem: 'Clima importado com sucesso!',
            dados: climaSalvo
        });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao conectar com a API de clima.' });
    }
});

export default router;