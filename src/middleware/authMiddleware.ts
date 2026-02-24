import { NextFunction, Request, Response } from 'express';
import { auth } from '../config/firebase';
import Usuario from '../models/Usuario';

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

    // Buscar usuario en MongoDB por firebaseUid
    let usuario = await Usuario.findOne({ firebaseUid: decodedToken.uid });

    // Si no existe, crearlo automáticamente (sync con Firebase)
    if (!usuario) {
      usuario = await Usuario.create({
        firebaseUid: decodedToken.uid,
        nombre: decodedToken.name || decodedToken.email?.split('@')[0] || 'Usuario',
        email: decodedToken.email || '',
        password: 'firebase_auth',
        rol: 'usuario',
      });
    }

    res.locals.usuario = {
      id: usuario._id, // Usar el ObjectId de MongoDB
      email: usuario.email,
      rol: usuario.rol,
    };

    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'No autorizado, token inválido' });
    return;
  }
};
