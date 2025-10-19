USE db_mahasiswa;

-- ====================================================
-- TRUNCATE & RESET AUTO_INCREMENT
-- ====================================================
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE mahasiswa;
TRUNCATE TABLE users;
ALTER TABLE mahasiswa AUTO_INCREMENT = 1;
ALTER TABLE users AUTO_INCREMENT = 1;
SET FOREIGN_KEY_CHECKS = 1;

-- ====================================================
-- INSERT ADMIN (username: admin, password: 123)
-- password_hash ialah bcrypt hash untuk "123"
-- ====================================================
INSERT INTO users (username, password_hash, role)
VALUES ('admin', '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'admin');

-- ====================================================
-- INSERT 50 USERS (username = nama pendek yang kamu minta)
-- All users use password "123" (same bcrypt hash)
-- Note: after admin, user IDs will be 2..51
-- ====================================================
INSERT INTO users (username, password_hash, role) VALUES
('jansen', '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('rusdi',  '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('anis',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('anisa',  '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('budi',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('sari',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('rio',    '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('lisa',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('tono',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('ayu',    '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('dedi',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('rani',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('fera',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('nisa',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('wira',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('tina',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('aldi',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('nina',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('riko',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('dina',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('yoga',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('mega',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('agus',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('rina',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('fahri',  '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('sinta',  '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('eko',    '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('lila',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('bima',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('rara',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('joni',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('lina',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('fikri',  '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('nela',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('wati',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('dika',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('tari',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('iman',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('vika',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('ardy',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('nando',  '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('citra',  '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('reza',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('nindy',  '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('gilang', '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('maia',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('rendy',  '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('lulu',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('hari',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user'),
('mita',   '$2b$10$iSz4sJwzm0hBJbus3M4AoOVzO5qi87plYmZip163FdAfyVl.VYlJu', 'user');

-- ====================================================
-- INSERT MAHASISWA: map user_id = 2..51 to the 50 names above
-- nama capitalized, nim = 2025 + zero-padded index (001..050)
-- jurusan = 'Ilmu Komputer', angkatan cyclical 2021..2024
-- ====================================================
INSERT INTO mahasiswa (user_id, nama, nim, jurusan, angkatan) VALUES
(2, 'Jansen',  '2025001', 'Ilmu Komputer', 2021),
(3, 'Rusdi',   '2025002', 'Ilmu Komputer', 2022),
(4, 'Anis',    '2025003', 'Ilmu Komputer', 2023),
(5, 'Anisa',   '2025004', 'Ilmu Komputer', 2024),
(6, 'Budi',    '2025005', 'Ilmu Komputer', 2021),
(7, 'Sari',    '2025006', 'Ilmu Komputer', 2022),
(8, 'Rio',     '2025007', 'Ilmu Komputer', 2023),
(9, 'Lisa',    '2025008', 'Ilmu Komputer', 2024),
(10, 'Tono',   '2025009', 'Ilmu Komputer', 2021),
(11, 'Ayu',    '2025010', 'Ilmu Komputer', 2022),
(12, 'Dedi',   '2025011', 'Ilmu Komputer', 2023),
(13, 'Rani',   '2025012', 'Ilmu Komputer', 2024),
(14, 'Fera',   '2025013', 'Ilmu Komputer', 2021),
(15, 'Nisa',   '2025014', 'Ilmu Komputer', 2022),
(16, 'Wira',   '2025015', 'Ilmu Komputer', 2023),
(17, 'Tina',   '2025016', 'Ilmu Komputer', 2024),
(18, 'Aldi',   '2025017', 'Ilmu Komputer', 2021),
(19, 'Nina',   '2025018', 'Ilmu Komputer', 2022),
(20, 'Riko',   '2025019', 'Ilmu Komputer', 2023),
(21, 'Dina',   '2025020', 'Ilmu Komputer', 2024),
(22, 'Yoga',   '2025021', 'Ilmu Komputer', 2021),
(23, 'Mega',   '2025022', 'Ilmu Komputer', 2022),
(24, 'Agus',   '2025023', 'Ilmu Komputer', 2023),
(25, 'Rina',   '2025024', 'Ilmu Komputer', 2024),
(26, 'Fahri',  '2025025', 'Ilmu Komputer', 2021),
(27, 'Sinta',  '2025026', 'Ilmu Komputer', 2022),
(28, 'Eko',    '2025027', 'Ilmu Komputer', 2023),
(29, 'Lila',   '2025028', 'Ilmu Komputer', 2024),
(30, 'Bima',   '2025029', 'Ilmu Komputer', 2021),
(31, 'Rara',   '2025030', 'Ilmu Komputer', 2022),
(32, 'Joni',   '2025031', 'Ilmu Komputer', 2023),
(33, 'Lina',   '2025032', 'Ilmu Komputer', 2024),
(34, 'Fikri',  '2025033', 'Ilmu Komputer', 2021),
(35, 'Nela',   '2025034', 'Ilmu Komputer', 2022),
(36, 'Wati',   '2025035', 'Ilmu Komputer', 2023),
(37, 'Dika',   '2025036', 'Ilmu Komputer', 2024),
(38, 'Tari',   '2025037', 'Ilmu Komputer', 2021),
(39, 'Iman',   '2025038', 'Ilmu Komputer', 2022),
(40, 'Vika',   '2025039', 'Ilmu Komputer', 2023),
(41, 'Ardy',   '2025040', 'Ilmu Komputer', 2024),
(42, 'Nando',  '2025041', 'Ilmu Komputer', 2021),
(43, 'Citra',  '2025042', 'Ilmu Komputer', 2022),
(44, 'Reza',   '2025043', 'Ilmu Komputer', 2023),
(45, 'Nindy',  '2025044', 'Ilmu Komputer', 2024),
(46, 'Gilang', '2025045', 'Ilmu Komputer', 2021),
(47, 'Maia',   '2025046', 'Ilmu Komputer', 2022),
(48, 'Rendy',  '2025047', 'Ilmu Komputer', 2023),
(49, 'Lulu',   '2025048', 'Ilmu Komputer', 2024),
(50, 'Hari',   '2025049', 'Ilmu Komputer', 2021),
(51, 'Mita',   '2025050', 'Ilmu Komputer', 2022);
