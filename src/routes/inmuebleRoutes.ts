import { Router } from 'express';
import {
  actualizarInmueble,
  crearInmueble,
  eliminarInmueble,
  obtenerInmueblePorId,
  obtenerInmuebles,
} from '../controllers/inmuebleController';

const router = Router();

router.route('/').get(obtenerInmuebles).post(crearInmueble);

router.route('/:id').get(obtenerInmueblePorId).put(actualizarInmueble).delete(eliminarInmueble);

export default router;
