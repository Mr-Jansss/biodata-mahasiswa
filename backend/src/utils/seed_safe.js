import { Mahasiswa } from "../models/mahasiswa.js";
import { User } from "../models/user.js";
import { sequelize } from "../config/db.js";

const jurusanList = [
  "Informatika",
  "Sistem Informasi",
  "Teknik Komputer",
  "Data Science",
  "Cyber Security"
];

function generateNIM(i) {
  return "23" + String(1000 + i);
}

function randomAngkatan() {
  const years = [2019, 2020, 2021, 2022, 2023];
  return years[Math.floor(Math.random() * years.length)];
}

function randomJurusan() {
  return jurusanList[Math.floor(Math.random() * jurusanList.length)];
}

async function seedMahasiswa() {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected, seeding data...");

    const existing = await Mahasiswa.count();
    if (existing > 0) {
      console.log(`ℹ️ Sudah ada ${existing} data mahasiswa, skip seeding.`);
      process.exit(0);
    }

    // tambahkan 50 mahasiswa dummy
    const mahasiswaData = [];
    for (let i = 1; i <= 50; i++) {
      mahasiswaData.push({
        nama: `Mahasiswa ${i}`,
        nim: generateNIM(i),
        jurusan: randomJurusan(),
        angkatan: randomAngkatan(),
      });
    }

    await Mahasiswa.bulkCreate(mahasiswaData);
    console.log("🎉 50 data mahasiswa berhasil ditambahkan!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error saat seeding:", err);
    process.exit(1);
  }
}

seedMahasiswa();
