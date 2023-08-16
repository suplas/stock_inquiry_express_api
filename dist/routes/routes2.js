"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crawlingController_1 = require("../controllers/crawlingController");
const router = (0, express_1.Router)();
router.get("/:page", crawlingController_1.catGetData);
exports.default = router;
