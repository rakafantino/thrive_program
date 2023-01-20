import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { deleteUser, editUser, userCreateRest, userGetByIDRest } from "./users.controller.js";
import { mul } from "../utils/multer.js";

const router = Router();

router.post("/register", userCreateRest);
router.get("/user/profile", verifyToken, userGetByIDRest);
router.put("/user/profile", verifyToken, mul.single("photo"), editUser);
router.delete("/user/profile", verifyToken, deleteUser);

export default router;
