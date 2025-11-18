import axios from 'axios';
import Clima from '../models/Clima';

export const importarTemperatura = async () => {
    try {
        console.log("Iniciando busca de temperatura na API real...");

        // Configuração da API
        const API_KEY = '51047a763090b7fe509952f6216fa51f';
        const CIDADE = 'Sao Paulo';
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CIDADE}&appid=${API_KEY}&units=metric`;

        const response = await axios.get(URL);

        const temp = response.data.main.temp;

        console.log(`🌡️ Temperatura atual em ${CIDADE}: ${temp}°C`);

        const novoClima = new Clima({
            temperatura: temp,
            unidade: 'C',
            data: new Date()
        });

        await novoClima.save();
        console.log("✅ Sucesso: Temperatura real salva no MongoDB!");

        return novoClima;

    } catch (error) {
        console.error("❌ Erro ao buscar temperatura:", error);
        throw error;
    }
};