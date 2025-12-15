import { Router } from 'express';
import {
  actualizarContrato,
  crearContrato,
  eliminarContrato,
  obtenerContratoPorId,
  obtenerContratos,
} from '../controllers/contratoController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', obtenerContratos);
router.get('/:id', obtenerContratoPorId);

router.post('/', authMiddleware, crearContrato);
router.put('/:id', authMiddleware, actualizarContrato);
router.delete('/:id', authMiddleware, eliminarContrato);

export default router;
