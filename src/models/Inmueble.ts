import mongoose, { Schema } from 'mongoose';
import { IInmueble } from '../types/models';

const inmuebleSchema = new Schema<IInmueble>({
  tipo: {
    type: String,
    enum: ['casa', 'campo'],
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  ubicacion: {
    type: String,
    required: true
  },
  hectareas: {
    type: Number,
  }
}, {
  timestamps: true
});

export default mongoose.model<IInmueble>('Inmueble', inmuebleSchema);
