import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validar = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errores = error.errors.map((err) => ({
          campo: err.path.join('.'),
          mensaje: err.message,
        }));
        res.status(400).json({ mensaje: 'Error de validación', errores });
        return;
      }
      res.status(500).json({ mensaje: 'Error en la validación' });
    }
  };
};
