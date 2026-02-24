import { NextFunction, Request, Response } from 'express';
import { auth } from '../config/firebase';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ mensaje: 'No autorizado, no hay token' });
      return;
    }

    const token = authHeader.split(' ')[1];

    // Verificar token con Firebase
    const decodedToken = await auth.verifyIdToken(token);

    res.locals.usuario = {
      id: decodedToken.uid,
      email: decodedToken.email,
      rol: 'usuario',
    };

    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'No autorizado, token inválido' });
    return;
  }
};
