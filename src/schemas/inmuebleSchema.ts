import { z } from 'zod';

export const crearInmuebleSchema = z.object({
  tipo: z.enum(['casa', 'campo'], {
    message: 'El tipo de inmueble debe ser casa o campo',
  }),
  descripcion: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  ubicacion: z.string().min(5, 'La ubicación es requerida'),
  hectareas: z.number().positive('Las hectáreas deben ser mayor a 0').optional(),
});

export const actualizarInmuebleSchema = crearInmuebleSchema.partial();
