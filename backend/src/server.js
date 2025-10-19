// src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { sequelize } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import mahasiswaRoutes from "./routes/mahasiswa.js";
import "./models/index.js"; // pastikan ini load semua model & relasi

// Konfigurasi dasar
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "5mb" }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/mahasiswa", mahasiswaRoutes);

// --- FRONTEND HANDLER (gabung frontend & backend) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path ke folder frontend kamu (ubah sesuai posisi folder kamu)
app.use(express.static(path.join(__dirname, "../../frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});
// ----------------------------------------------------

// Health check endpoint (untuk test API)
app.get("/api", (req, res) => res.json({ message: "API running" }));

// Start server
const startServer = async () => {
  try {
    // Tes koneksi database
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");

    // Sync model ke DB (bisa dihapus alter:true kalau sudah stabil)
    await sequelize.sync({ alter: true });
    console.log("📦 Models synchronized!");

    // Jalankan server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to the database:", err);
    process.exit(1);
  }
};

startServer();
