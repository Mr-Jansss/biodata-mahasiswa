import express from "express";
import { register, login, getMe, createAdmin } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.post("/create-admin", authMiddleware, adminOnly, createAdmin); // admin-only
export default router;
