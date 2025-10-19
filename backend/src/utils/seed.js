import dotenv from "dotenv";
dotenv.config();
import bcryptjs from "bcryptjs";
import { sequelize } from "../config/db.js";
import { User } from "../models/user.js";
import { Mahasiswa } from "../models/mahasiswa.js";

const sampleNames = [
  "Andi", "Budi", "Chandra", "Dewi", "Eka", "Fajar", "Gina", "Hendra", "Ika", "Joko",
  "Kevin", "Lina", "Maria", "Nina", "Oktav", "Putu", "Rina", "Sinta", "Tomi", "Usman",
  "Vina", "Wawan", "Xena", "Yusuf", "Zara", "Agus", "Bella", "Citra", "Dina", "Edo",
  "Fiona", "Guntur", "Hana", "Ikhsan", "Jihan", "Kristo", "Lili", "Mawar", "Nando", "Oki",
  "Putri", "Rudi", "Sari", "Tata", "Uli", "Vito", "Widia", "Xavier", "Yuni", "Zain"
];

async function run() {
  try {
    await sequelize.authenticate();
    console.log("✅ Terhubung ke database");
    await sequelize.sync({ force: true }); // reset semua tabel biar bersih

    // === 1. Buat akun admin ===
    const adminHash = await bcryptjs.hash("123", 10);
    const admin = await User.create({
      username: "admin",
      password_hash: adminHash,
      role: "admin"
    });
    console.log("✅ Admin dibuat: admin / 123");

    // === 2. Buat 50 mahasiswa lengkap (user + mahasiswa) ===
    for (let i = 0; i < 50; i++) {
      const nama = sampleNames[i % sampleNames.length] + " " + (100 + i);
      const nim = "2025" + String(1000 + i);
      const jurusan = "Ilmu Komputer";
      const angkatan = 2021 + (i % 4);
      const username = "mhs" + (i + 1);
      const passHash = await bcryptjs.hash("123", 10);

      const user = await User.create({
        username,
        password_hash: passHash,
        role: "user"
      });

      await Mahasiswa.create({
        user_id: user.id,
        nama,
        nim,
        jurusan,
        angkatan
      });

      console.log(`Mahasiswa ${nama} (${username}/123) dibuat`);
    }

    console.log("🎓 Semua data dummy (50 mahasiswa + admin) berhasil dibuat!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

run();