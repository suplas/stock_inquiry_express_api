import { Router } from "express";
import { getData, getStockData } from "../controllers/stockController";
import { catGetData } from "../controllers/crawlingController";

const router = Router();

router.get("/:page", catGetData);

export default router;
