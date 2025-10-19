import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { User } from "../models/user.js";
import { Mahasiswa } from "../models/mahasiswa.js";

/** REGISTER (user/mahasiswa - public) */
export const register = async (req, res) => {
  try {
    const { username, password, nama, nim, jurusan, angkatan } = req.body;
    if (!username || !password || !nama || !nim || !jurusan) {
      return res.status(400).json({ message: "Field tidak lengkap" });
    }

    const existing = await User.findOne({ where: { username } });
    if (existing) return res.status(400).json({ message: "Username sudah digunakan" });

    const hash = await bcryptjs.hash(password, 10);
    const user = await User.create({ username, password_hash: hash, role: "user" });

    const mahasiswa = await Mahasiswa.create({
      user_id: user.id,
      nama,
      nim,
      jurusan,
      angkatan: angkatan || null,
    });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    return res.json({
      message: "Registrasi berhasil",
      token,
      user: { id: user.id, username: user.username, role: user.role },
      mahasiswa,
    });
  } catch (err) {
    console.error("✗ Error register:", err);
    return res.status(500).json({ message: "Server error", detail: err.message });
  }
};

/** LOGIN (public) */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Isi username dan password" });

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: "Username atau password salah" });

    const ok = await bcryptjs.compare(password, user.password_hash);
    if (!ok) return res.status(400).json({ message: "Username atau password salah" });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    // ambil mahasiswa kalau ada
    let mahasiswa = null;
    if (user.role === "user") {
      mahasiswa = await Mahasiswa.findOne({ where: { user_id: user.id } });
    }

    return res.json({
      message: "Login berhasil",
      token,
      user: { id: user.id, username: user.username, role: user.role, mahasiswa },
    });
  } catch (err) {
    console.error("✗ Error login:", err);
    return res.status(500).json({ message: "Server error", detail: err.message });
  }
};

/** GET /api/auth/me (protected) */
export const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "username", "role"],
      include: [{ model: Mahasiswa, as: "mahasiswa" }],
    });

    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    return res.json(user);
  } catch (err) {
    console.error("✗ Error getMe:", err);
    return res.status(500).json({ message: "Server error", detail: err.message });
  }
};

/** CREATE ADMIN (protected - admin only) */
export const createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Isi username dan password" });

    const existing = await User.findOne({ where: { username } });
    if (existing) return res.status(400).json({ message: "Username sudah digunakan" });

    const hash = await bcryptjs.hash(password, 10);
    const admin = await User.create({ username, password_hash: hash, role: "admin" });

    return res.json({ message: "Akun admin dibuat", admin: { id: admin.id, username: admin.username } });
  } catch (err) {
    console.error("✗ Error createAdmin:", err);
    return res.status(500).json({ message: "Server error", detail: err.message });
  }
};