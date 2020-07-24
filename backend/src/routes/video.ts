import { Router } from 'express';
import VideoController from '../controllers/Video';

const router = Router();

router.get('/', VideoController.list);
router.get('/:videoId', VideoController.get);

export default router;
