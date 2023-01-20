import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { createACommunity, joinACommunity } from "./join_community.controller.js";
import { mul } from "../utils/multer.js";

const router = Router();

router.post("/join/:community_id", verifyToken, joinACommunity);
router.post("/create", verifyToken, mul.single("logo"), createACommunity);

export default router;
