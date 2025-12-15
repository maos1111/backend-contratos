import { Router } from 'express';
import {
  actualizarPersona,
  crearPersona,
  eliminarPersona,
  obtenerPersonaPorId,
  obtenerPersonas,
} from '../controllers/personaController';

const router = Router();

router.route('/').get(obtenerPersonas).post(crearPersona);

router.route('/:id').get(obtenerPersonaPorId).put(actualizarPersona).delete(eliminarPersona);

export default router;
