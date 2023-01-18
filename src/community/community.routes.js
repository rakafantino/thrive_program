import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { getAllCommunity, createACommunity } from "./community.controller.js";

const router = Router();

router.get("/", verifyToken, getAllCommunity);

export default router;
