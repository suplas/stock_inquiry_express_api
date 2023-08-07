import { Router } from "express";
import { getData } from "../controllers/stockController";

const router = Router();

router.get("/data", getData);

export default router;
