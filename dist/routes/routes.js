"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stockController_1 = require("../controllers/stockController");
const router = (0, express_1.Router)();
router.get("/data", stockController_1.getData);
exports.default = router;
