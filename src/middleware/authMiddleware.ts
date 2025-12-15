import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener token del header
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      // Agregar usuario al request
      req.usuario = {
        id: decoded.id,
        rol: 'usuario',
      };

      next();
    } catch (error) {
      res.status(401).json({ mensaje: 'No autorizado, token inválido' });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ mensaje: 'No autorizado, no hay token' });
    return;
  }
};
