import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';

export const validarZod = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errores = error.issues.map((err) => ({
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
