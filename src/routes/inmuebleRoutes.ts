import { Router } from 'express';
import {
  actualizarInmueble,
  crearInmueble,
  eliminarInmueble,
  obtenerInmueblePorId,
  obtenerInmuebles,
} from '../controllers/inmuebleController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validarZod } from '../middleware/validationMiddleware';
import { actualizarInmuebleSchema, crearInmuebleSchema } from '../schemas/inmuebleSchema';

const router = Router();

router.get('/', authMiddleware, obtenerInmuebles);
router.post('/', authMiddleware, validarZod(crearInmuebleSchema), crearInmueble);
router.get('/:id', authMiddleware, obtenerInmueblePorId);
router.put('/:id', authMiddleware, validarZod(actualizarInmuebleSchema), actualizarInmueble);
router.delete('/:id', authMiddleware, eliminarInmueble);

export default router;
