import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { deleteUser, editUser, userCreateRest, userGetByIDRest } from "./users.controller.js";

const router = Router();

router.post("/register", userCreateRest);
router.get("/user/profile", verifyToken, userGetByIDRest);
router.put("/user/profile", verifyToken, editUser);
router.delete("/user/profile", verifyToken, deleteUser);

export default router;
