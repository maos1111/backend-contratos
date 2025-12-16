import { Router } from 'express';
import contratoRoutes from './contratoRoutes';
import inmuebleRoutes from './inmuebleRoutes';
import personaRoutes from './personaRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/usuarios', userRoutes);
router.use('/personas', personaRoutes);
router.use('/inmuebles', inmuebleRoutes);
router.use('/contratos', contratoRoutes);

export default router;
