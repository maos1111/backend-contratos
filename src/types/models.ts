import { Document } from 'mongoose';

export interface IUsuario extends Document {
  nombre: string;
  email: string;
  password: string;
  rol: 'usuario' | 'admin';
  matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface IPersona extends Document {
  tipoPersona: 'fisica' | 'juridica';
  nombreCompleto: string;
  documento: string;
  email: string;
  telefono: string;
}

export interface IInmueble extends Document {
  tipo: 'casa' | 'campo';
  descripcion: string;
  ubicacion: string;
  hectareas: number;
}

export interface IContrato extends Document {
  tipoContrato: string;
  locador: IPersona['_id'];
  locatario: IPersona['_id'];
  inmueble: IInmueble['_id'];
  fechaInicio: Date;
  fechaFin: Date;
  monto: number;
  creadoPor: IUsuario['_id'];
}
