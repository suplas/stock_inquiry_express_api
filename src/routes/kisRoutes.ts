import { Router } from "express";
import { getVolumeRank} from "../controllers/kisStockContoller";

const router = Router();

router.get("/volume-rank", getVolumeRank);

export default router;
