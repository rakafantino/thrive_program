import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { createACommunity, joinACommunity } from "./join_community.controller.js";

const router = Router();

router.post("/join/:community_id", verifyToken, joinACommunity);
router.post("/create", verifyToken, createACommunity);

export default router;
