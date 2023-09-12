import { Router } from "express";
import { getData} from "../controllers/krxStockController";

const router = Router();

router.get("/pull", getData);

export default router;
