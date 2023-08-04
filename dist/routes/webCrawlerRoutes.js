"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// webCrawlerRoutes.ts
const express_1 = require("express");
const webCrawlerController_1 = require("../controllers/webCrawlerController");
const router = (0, express_1.Router)();
router.get('/crawl', webCrawlerController_1.crawlWebsite);
router.get('/data', webCrawlerController_1.getWebCrawlerData);
exports.default = router;
