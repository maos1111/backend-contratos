import mongoose, { Schema } from 'mongoose';
import { IPersona } from '../types/models';

const personaSchema = new Schema<IPersona>({
  tipoPersona: {
    type: String,
    enum: ['fisica', 'juridica'],
    required: true
  },
  nombreCompleto: {
    type: String,
    required: true
  },
  documento: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IPersona>('Persona', personaSchema);
