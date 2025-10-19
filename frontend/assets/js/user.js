// === KONFIGURASI DASAR ===
const API_URL = "http://localhost:3000/api";
const token = localStorage.getItem("token");

// kalau belum login, kembalikan ke index.html
if (!token) {
  alert("Harap login terlebih dahulu!");
  window.location.href = "index.html";
}

// elemen-elemen form
const namaInput = document.getElementById("nama");
const nimInput = document.getElementById("nim");
const jurusanInput = document.getElementById("jurusan");
const angkatanInput = document.getElementById("angkatan");
const form = document.getElementById("formProfile");
const logoutBtn = document.getElementById("btnLogout");

// === AMBIL DATA MAHASISWA LOGIN ===
async function loadMahasiswa() {
  try {
    const res = await fetch(`${API_URL}/mahasiswa`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Gagal memuat data mahasiswa");
    const data = await res.json();

    // ambil data sesuai user login
    const userData = data.data.find((m) => m.user_id === getUserIdFromToken());
    if (!userData) {
      alert("Data mahasiswa tidak ditemukan!");
      return;
    }

    // isi form dengan data
    namaInput.value = userData.nama || "";
    nimInput.value = userData.nim || "";
    jurusanInput.value = userData.jurusan || "";
    angkatanInput.value = userData.angkatan || "";

    // simpan ID mahasiswa di session
    sessionStorage.setItem("mahasiswa_id", userData.id);
  } catch (err) {
    console.error("loadMahasiswa error:", err);
    alert("Gagal memuat data mahasiswa.");
  }
}

// === SIMPAN PERUBAHAN ===
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = sessionStorage.getItem("mahasiswa_id");
  if (!id) return alert("Data mahasiswa tidak ditemukan");

  const body = {
    nama: namaInput.value.trim(),
    nim: nimInput.value.trim(),
    jurusan: jurusanInput.value.trim(),
    angkatan: angkatanInput.value.trim(),
  };

  try {
    const res = await fetch(`${API_URL}/mahasiswa/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Gagal update data");

    alert("Data berhasil diperbarui!");
    loadMahasiswa(); // refresh data
  } catch (err) {
    console.error("update error:", err);
    alert("Gagal menyimpan perubahan.");
  }
});

// === LOGOUT ===
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  sessionStorage.clear();
  window.location.href = "index.html";
});

// === DECODE USER ID DARI TOKEN ===
function getUserIdFromToken() {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.id;
}

// === MULAI ===
loadMahasiswa();
