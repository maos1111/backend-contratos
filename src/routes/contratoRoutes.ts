import { Router } from 'express';
import {
  actualizarContrato,
  crearContrato,
  eliminarContrato,
  obtenerContratoPorId,
  obtenerContratos,
} from '../controllers/contratoController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validar } from '../middleware/validationMiddleware';
import { crearContratoSchema, actualizarContratoSchema } from '../schemas/contratoSchema';

const router = Router();

router.get('/', obtenerContratos);
router.get('/:id', obtenerContratoPorId);

router.post('/', authMiddleware, validar(crearContratoSchema), crearContrato);
router.put('/:id', authMiddleware, validar(actualizarContratoSchema), actualizarContrato);
router.delete('/:id', authMiddleware, eliminarContrato);

export default router;
