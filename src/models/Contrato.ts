import mongoose, { Schema } from 'mongoose';
import { IContrato } from '../types/models';

const contratoSchema = new Schema<IContrato>({
  tipoContrato: {
    type: String,
    required: true
  },
  locador: {
    type: Schema.Types.ObjectId,
    ref: 'Persona',
    required: true
  },
  locatario: {
    type: Schema.Types.ObjectId,
    ref: 'Persona',
    required: true
  },
  inmueble: {
    type: Schema.Types.ObjectId,
    ref: 'Inmueble',
    required: true
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFin: {
    type: Date,
    required: true
  },
  monto: {
    type: Number,
    required: true
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IContrato>('Contrato', contratoSchema);
