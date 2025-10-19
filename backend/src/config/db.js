import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Auto-switch antara local dan Railway
const sequelize = new Sequelize(
  process.env.MYSQLDATABASE || process.env.DB_NAME,
  process.env.MYSQLUSER || process.env.DB_USER,
  process.env.MYSQLPASSWORD || process.env.DB_PASS,
  {
    host: process.env.MYSQLHOST || process.env.DB_HOST,
    port: process.env.MYSQLPORT || 3306,
    dialect: "mysql",
    logging: false,
  }
);

export { sequelize };
