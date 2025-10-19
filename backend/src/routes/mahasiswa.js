import express from "express";
import {
  listMahasiswa,
  getMahasiswa,
  createMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
  updateSelf,
} from "../controllers/mahasiswaController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Public read
router.get("/", listMahasiswa);
router.get("/:id", getMahasiswa);

// Protected write
router.post("/", authMiddleware, createMahasiswa); // admin can create with username/password
router.put("/:id", authMiddleware, updateMahasiswa); // admin or owner
router.delete("/:id", authMiddleware, adminOnly, deleteMahasiswa); // admin only
router.put("/update-self", authMiddleware, updateSelf); // user update self

export default router;
