import { Router } from "express";
import { getData, getStockData } from "../controllers/stockController";

const router = Router();

router.get("/data", getData);
router.get("/list/:page", getStockData);


export default router;
