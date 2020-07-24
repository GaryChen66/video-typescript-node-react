import { Router } from 'express';
import videoRoutes from './video';

const router = Router();

router.use('/videos', videoRoutes);

export default router;
