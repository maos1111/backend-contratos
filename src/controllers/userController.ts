import axios from 'axios';
import { Request, Response } from 'express';
import { auth } from '../config/firebase';

interface FirebaseAuthResponse {
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  error?: {
    message: string;
  };
}

// @desc    Crear usuario con Firebase (solo para testing)
// @route   POST /api/users/create
export const crearUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, nombre } = req.body;

    // Crear usuario en Firebase
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: nombre,
    });

    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      uid: userRecord.uid,
      email: userRecord.email,
      nombre: userRecord.displayName,
    });
  } catch (error: any) {
    res.status(400).json({
      mensaje: 'Error al crear usuario',
      error: error.message,
    });
  }
};

// @desc    Login - Obtener idToken para usar en el backend
// @route   POST /api/users/login
export const loginUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    // Buscar usuario por email
    const userRecord = await auth.getUserByEmail(email);

    // Generar custom token
    const customToken = await auth.createCustomToken(userRecord.uid);

    // Intercambiar customToken por idToken usando Firebase REST API
    const { data } = await axios.post<FirebaseAuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_API_KEY}`,
      {
        token: customToken,
        returnSecureToken: true,
      }
    );

    res.json({
      mensaje: 'Token generado exitosamente',
      idToken: data.idToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
      uid: userRecord.uid,
      email: userRecord.email,
    });
  } catch (error: any) {
    res.status(401).json({
      mensaje: 'Error al generar token',
      error: error.message,
    });
  }
};
