import { Router } from "express";
import { getData} from "../controllers/krxStockController";

const router = Router();

router.get("/pull/:basDd", getData);

export default router;
