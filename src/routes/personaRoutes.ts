import { Router } from 'express';
import {
  actualizarPersona,
  crearPersona,
  eliminarPersona,
  obtenerPersonaPorId,
  obtenerPersonas,
} from '../controllers/personaController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, obtenerPersonas);
router.post('/', authMiddleware, crearPersona);
router.get('/:id', authMiddleware, obtenerPersonaPorId);
router.put('/:id', authMiddleware, actualizarPersona);
router.delete('/:id', authMiddleware, eliminarPersona);

export default router;
