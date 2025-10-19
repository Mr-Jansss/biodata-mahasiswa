// src/models/mahasiswa.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./user.js";

export const Mahasiswa = sequelize.define(
  "Mahasiswa",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: true },
    nama: { type: DataTypes.STRING(255), allowNull: false },
    nim: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    jurusan: { type: DataTypes.STRING(100), allowNull: false },
    angkatan: { type: DataTypes.INTEGER, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: "mahasiswa",
    timestamps: false,
  }
);

// Relasi satu arah ke User
Mahasiswa.belongsTo(User, { foreignKey: "user_id", as: "user" });
