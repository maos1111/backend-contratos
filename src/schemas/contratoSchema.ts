import { z } from 'zod';

export const crearContratoSchema = z.object({
  tipoContrato: z.enum(['alquiler', 'compraventa', 'comodato'], {
    message: 'El tipo de contrato debe ser alquiler, compraventa o comodato',
  }),
  locador: z.string().min(1, 'El locador es requerido'),
  locatario: z.string().min(1, 'El locatario es requerido'),
  inmueble: z.string().min(1, 'El inmueble es requerido'),
  fechaInicio: z.string().datetime('Formato de fecha inválido'),
  fechaFin: z.string().datetime('Formato de fecha inválido').optional(),
  monto: z.number().positive('El monto debe ser mayor a 0'),
});

export const actualizarContratoSchema = crearContratoSchema.partial();
