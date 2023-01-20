import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { createAnEvent } from "./events.controller.js";

const router = Router();

router.post("/:id/event", verifyToken, createAnEvent);

export default router;
