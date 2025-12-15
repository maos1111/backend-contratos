import { Router } from 'express';
import authRoutes from './authRoutes';
import contratoRoutes from './contratoRoutes';
import inmuebleRoutes from './inmuebleRoutes';
import personaRoutes from './personaRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/personas', personaRoutes);
router.use('/inmuebles', inmuebleRoutes);
router.use('/contratos', contratoRoutes);

export default router;
