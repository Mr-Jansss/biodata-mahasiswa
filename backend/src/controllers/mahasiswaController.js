import { Mahasiswa } from "../models/mahasiswa.js";
import { User } from "../models/user.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

/**
 * ===============================
 * LIST SEMUA MAHASISWA (Public)
 * ===============================
 */
export const listMahasiswa = async (req, res) => {
  try {
    const page = parseInt(req.query.page || "1");
    const limit = parseInt(req.query.limit || "10");
    const search = req.query.search || "";
    const offset = (page - 1) * limit;

    const where = search
      ? {
          [Op.or]: [
            { nama: { [Op.like]: `%${search}%` } },
            { nim: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const { count, rows } = await Mahasiswa.findAndCountAll({
      where,
      order: [["id", "ASC"]],
      limit,
      offset,
    });

    return res.json({
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (err) {
    console.error("listMahasiswa error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * ===============================
 * DETAIL MAHASISWA BY ID
 * ===============================
 */
export const getMahasiswa = async (req, res) => {
  try {
    const id = req.params.id;
    const m = await Mahasiswa.findByPk(id);
    if (!m) return res.status(404).json({ message: "Not found" });
    return res.json(m);
  } catch (err) {
    console.error("getMahasiswa error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * ===============================
 * CREATE MAHASISWA
 * Admin: bisa sekalian buat akun user mahasiswa
 * User: hanya buat data dirinya sendiri
 * ===============================
 */
export const createMahasiswa = async (req, res) => {
  try {
    const { nama, nim, jurusan, angkatan, username, password } = req.body;

    // Admin create mahasiswa + akun
    if (req.user && req.user.role === "admin" && username && password) {
      const existing = await User.findOne({ where: { username } });
      if (existing)
        return res.status(400).json({ message: "Username sudah digunakan" });

      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        password_hash: hash,
        role: "user",
      });

      const m = await Mahasiswa.create({
        user_id: user.id,
        nama,
        nim,
        jurusan,
        angkatan: angkatan || null,
      });

      return res.json({
        message: "Mahasiswa + akun user berhasil dibuat",
        data: m,
      });
    }

    // User create datanya sendiri
    if (req.user && req.user.role === "user") {
      const created = await Mahasiswa.create({
        user_id: req.user.id,
        nama,
        nim,
        jurusan,
        angkatan: angkatan || null,
      });
      return res.json({ message: "Mahasiswa dibuat", data: created });
    }

    return res.status(403).json({ message: "Akses ditolak" });
  } catch (err) {
    console.error("createMahasiswa error:", err);
    return res
      .status(500)
      .json({ message: "Server error", detail: err.message });
  }
};

/**
 * ===============================
 * UPDATE MAHASISWA
 * Admin: bisa ubah semua + username/password mahasiswa
 * User: hanya bisa ubah data sendiri
 * ===============================
 */
export const updateMahasiswa = async (req, res) => {
  try {
    const id = req.params.id;
    const m = await Mahasiswa.findByPk(id);
    if (!m) return res.status(404).json({ message: "Not found" });

    if (!req.user)
      return res.status(401).json({ message: "Unauthorized / token invalid" });
    if (req.user.role !== "admin" && m.user_id !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });

    const { nama, nim, jurusan, angkatan, username, password } = req.body;

    m.nama = nama ?? m.nama;
    m.nim = nim ?? m.nim;
    m.jurusan = jurusan ?? m.jurusan;
    m.angkatan = angkatan ?? m.angkatan;
    m.updated_at = new Date();
    await m.save();

    // Admin boleh ubah username & password user mahasiswa
    if (req.user.role === "admin" && m.user_id && (username || password)) {
      const user = await User.findByPk(m.user_id);
      if (user) {
        if (username && username !== user.username) {
          const exist = await User.findOne({ where: { username } });
          if (exist && exist.id !== user.id)
            return res.status(400).json({ message: "Username sudah digunakan" });
          user.username = username;
        }
        if (password) {
          user.password_hash = await bcrypt.hash(password, 10);
        }
        await user.save();
      }
    }

    return res.json({ message: "Updated successfully", data: m });
  } catch (err) {
    console.error("updateMahasiswa error:", err);
    return res
      .status(500)
      .json({ message: "Server error", detail: err.message });
  }
};

/**
 * ===============================
 * DELETE MAHASISWA
 * Admin only
 * Hapus permanen mahasiswa + user terkait
 * ===============================
 */
/** DELETE (admin only enforced by route) — hapus permanen mahasiswa + akun user terkait */
export const deleteMahasiswa = async (req, res) => {
  try {
    const id = req.params.id;
    const mahasiswa = await Mahasiswa.findByPk(id);

    if (!mahasiswa) {
      return res.status(404).json({ message: "Data mahasiswa tidak ditemukan" });
    }

    // Jika mahasiswa punya user_id, hapus juga akun user-nya
    if (mahasiswa.user_id) {
      const user = await User.findByPk(mahasiswa.user_id);
      if (user) {
        await user.destroy(); // hapus akun user dari tabel users
        console.log(`🗑️ Akun user ${user.username} dihapus permanen`);
      }
    }

    // Hapus data mahasiswa
    await mahasiswa.destroy();
    console.log(`🗑️ Mahasiswa ${mahasiswa.nama} dihapus permanen`);

    return res.json({ message: "Data mahasiswa & akun user berhasil dihapus permanen" });
  } catch (err) {
    console.error("deleteMahasiswa error:", err);
    return res.status(500).json({ message: "Gagal menghapus data", detail: err.message });
  }
};


/**
 * ===============================
 * USER UPDATE DIRI SENDIRI
 * ===============================
 */
export const updateSelf = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const mahasiswa = await Mahasiswa.findOne({
      where: { user_id: req.user.id },
    });
    if (!mahasiswa)
      return res.status(404).json({ message: "Data mahasiswa tidak ditemukan" });

    const { nama, jurusan, angkatan } = req.body;
    mahasiswa.nama = nama ?? mahasiswa.nama;
    mahasiswa.jurusan = jurusan ?? mahasiswa.jurusan;
    mahasiswa.angkatan = angkatan ?? mahasiswa.angkatan;
    mahasiswa.updated_at = new Date();
    await mahasiswa.save();

    return res.json({
      message: "Data berhasil diperbarui",
      data: mahasiswa,
    });
  } catch (err) {
    console.error("updateSelf error:", err);
    return res
      .status(500)
      .json({ message: "Server error", detail: err.message });
  }
};
