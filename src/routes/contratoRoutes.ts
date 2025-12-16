import { Router } from 'express';
import {
  actualizarContrato,
  crearContrato,
  eliminarContrato,
  obtenerContratoPorId,
  obtenerContratos,
} from '../controllers/contratoController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validarZod } from '../middleware/validationMiddleware';
import { actualizarContratoSchema, crearContratoSchema } from '../schemas/contratoSchema';

const router = Router();

router.get('/', obtenerContratos);
router.get('/:id', obtenerContratoPorId);

router.post('/', authMiddleware, validarZod(crearContratoSchema), crearContrato);
router.put('/:id', authMiddleware, validarZod(actualizarContratoSchema), actualizarContrato);
router.delete('/:id', authMiddleware, eliminarContrato);

export default router;
