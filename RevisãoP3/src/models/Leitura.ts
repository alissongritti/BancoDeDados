import mongoose, { Document, Schema } from 'mongoose';

export interface ILeitura extends Document {
    carro: string;
    sensor: string;
    valor: number;
    data: Date;
}

const LeituraSchema: Schema = new Schema({
    carro: { type: String, required: true },
    sensor: { type: String, required: true },
    valor: { type: Number, required: true },
    data: { type: Date, default: Date.now }
});

export default mongoose.model<ILeitura>('Leitura', LeituraSchema);