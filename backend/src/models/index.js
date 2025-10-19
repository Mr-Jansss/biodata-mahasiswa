// src/models/index.js
import { User } from "./user.js";
import { Mahasiswa } from "./mahasiswa.js";

// Hubungan kebalikan hanya didefinisikan di sini
User.hasOne(Mahasiswa, { foreignKey: "user_id", as: "mahasiswa" });

export { User, Mahasiswa };
