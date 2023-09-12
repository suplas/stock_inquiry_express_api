"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const krxStockController_1 = require("../controllers/krxStockController");
const router = (0, express_1.Router)();
router.get("/pull/:basDd", krxStockController_1.getData);
exports.default = router;
