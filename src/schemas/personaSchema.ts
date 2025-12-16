import { z } from 'zod';

export const crearPersonaSchema = z.object({
  nombreCompleto: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  documento: z.string().min(7, 'El documento debe tener al menos 7 caracteres'),
  tipoPersona: z.enum(['fisica', 'juridica'], {
    message: 'El tipo de persona debe ser fisica o juridica',
  }),
  email: z.string().email('Email inválido').optional(),
  telefono: z.string().optional(),
});

export const actualizarPersonaSchema = crearPersonaSchema.partial();
