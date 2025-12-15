import { Router } from 'express';
import {
  actualizarContrato,
  crearContrato,
  eliminarContrato,
  obtenerContratoPorId,
  obtenerContratos,
} from '../controllers/contratoController';

const router = Router();

router.route('/').get(obtenerContratos).post(crearContrato);

router.route('/:id').get(obtenerContratoPorId).put(actualizarContrato).delete(eliminarContrato);

export default router;
