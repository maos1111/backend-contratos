import { Router } from 'express';
import {
  actualizarInmueble,
  crearInmueble,
  eliminarInmueble,
  obtenerInmueblePorId,
  obtenerInmuebles,
} from '../controllers/inmuebleController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, obtenerInmuebles);
router.post('/', authMiddleware, crearInmueble);
router.get('/:id', authMiddleware, obtenerInmueblePorId);
router.put('/:id', authMiddleware, actualizarInmueble);
router.delete('/:id', authMiddleware, eliminarInmueble);

export default router;
