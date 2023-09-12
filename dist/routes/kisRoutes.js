"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const kisStockContoller_1 = require("../controllers/kisStockContoller");
const router = (0, express_1.Router)();
router.get("/volume-rank", kisStockContoller_1.getVolumeRank);
exports.default = router;
