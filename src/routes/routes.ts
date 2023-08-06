import { Router } from 'express';
import { getData } from '../controllers/stockController';

const router = Router();

router.get('/data', getData);
// router.get('/data', getWebCrawlerData);

export default router;