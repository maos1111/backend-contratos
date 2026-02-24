import mongoose, { Schema } from 'mongoose';
import { IUsuario } from '../types/models';

const usuarioSchema = new Schema<IUsuario>(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    rol: {
      type: String,
      enum: ['usuario', 'admin'],
      default: 'usuario',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUsuario>('Usuario', usuarioSchema);
