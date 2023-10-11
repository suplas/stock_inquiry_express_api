import { Router } from "express";
import { getData, getStocList} from "../controllers/krxStockController";

const router = Router();

router.get("/pull/:basDd", getData);
router.get("/list/:page/:limit?/:basDd?", getStocList);

export default router;
