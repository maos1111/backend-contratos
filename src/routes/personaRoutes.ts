import { Router } from 'express';
import {
  actualizarPersona,
  crearPersona,
  eliminarPersona,
  obtenerPersonaPorId,
  obtenerPersonas,
} from '../controllers/personaController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validarZod } from '../middleware/validationMiddleware';
import { actualizarPersonaSchema, crearPersonaSchema } from '../schemas/personaSchema';

const router = Router();

router.get('/', authMiddleware, obtenerPersonas);
router.post('/', authMiddleware, validarZod(crearPersonaSchema), crearPersona);
router.get('/:id', authMiddleware, obtenerPersonaPorId);
router.put('/:id', authMiddleware, validarZod(actualizarPersonaSchema), actualizarPersona);
router.delete('/:id', authMiddleware, eliminarPersona);

export default router;
