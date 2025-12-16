import { Router } from 'express';
import { crearUsuario, loginUsuario } from '../controllers/userController';

const router = Router();

router.post('/create', crearUsuario);
router.post('/login', loginUsuario);

export default router;
