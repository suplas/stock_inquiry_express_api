// webCrawlerRoutes.ts
import { Router } from 'express';
import { crawlWebsite, getWebCrawlerData } from '../controllers/stockController';

const router = Router();

router.get('/crawl', crawlWebsite);
router.get('/data', getWebCrawlerData);

export default router;