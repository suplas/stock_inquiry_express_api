import { Router } from "express";
import { getData, getStockData } from "../controllers/stockController";
import { catGetData } from "../controllers/crawlingController";

const router = Router();

router.get("/data", getData);
router.get("/list/:page", getStockData);
router.get("/cat/:page", catGetData);

export default router;
