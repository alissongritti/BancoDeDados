import mongoose, { Schema, Document } from 'mongoose';

export interface IClima extends Document {
    temperatura: number;
    unidade: string;
    data: Date;
}

const ClimaSchema: Schema = new Schema({
    temperatura: { type: Number, required: true },
    unidade: { type: String, default: 'C' },
    data: { type: Date, default: Date.now }
});

export default mongoose.model<IClima>('Clima', ClimaSchema);