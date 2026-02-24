import axios from 'axios';
import { Request, Response } from 'express';
import { auth } from '../config/firebase';
import Usuario from '../models/Usuario';

interface FirebaseAuthResponse {
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  localId?: string;
  error?: {
    message: string;
  };
}

// @desc    Crear usuario con Firebase (solo para testing)
// @route   POST /api/usuarios/create
export const crearUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, nombre } = req.body;

    // Crear usuario en Firebase
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: nombre,
    });

    // Guardar usuario en MongoDB con el UID de Firebase
    await Usuario.create({
      firebaseUid: userRecord.uid,
      nombre,
      email,
      password: 'firebase_auth', // Password manejado por Firebase
      rol: 'usuario',
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
// @route   POST /api/usuarios/login
export const loginUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ mensaje: 'Email y contraseña son requeridos' });
      return;
    }

    // Autenticar con Firebase usando email y password
    const { data } = await axios.post<FirebaseAuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    if (data.error) {
      res.status(401).json({ mensaje: 'Credenciales inválidas', error: data.error.message });
      return;
    }

    // Buscar usuario en MongoDB por firebaseUid
    const usuario = await Usuario.findOne({ firebaseUid: data.localId });

    res.json({
      mensaje: 'Login exitoso',
      idToken: data.idToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
      uid: data.localId,
      email,
      nombre: usuario?.nombre,
    });
  } catch (error: any) {
    res.status(401).json({
      mensaje: 'Error al generar token',
      error: error.message,
    });
  }
};
