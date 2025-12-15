import { Router } from 'express';
import { loginUsuario, obtenerPerfil, registrarUsuario } from '../controllers/authController';

const router = Router();

router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/perfil', obtenerPerfil);

export default router;
