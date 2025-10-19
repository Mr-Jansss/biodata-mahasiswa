// admin.js
const API_BASE = "http://localhost:3000/api";
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token || role !== "admin") {
  alert("Harap login sebagai admin!");
  window.location.href = "index.html";
}

const formMahasiswa = document.getElementById("formMahasiswa");
const formAdmin = document.getElementById("formAdmin");
const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("search");
const logoutBtn = document.getElementById("logoutBtn");
let editingId = null;
let currentPage = 1;

logoutBtn.onclick = () => {
  localStorage.clear();
  window.location.href = "index.html";
};

// Load list (paginated)
async function loadData(page = 1, search = "") {
  const res = await fetch(`${API_BASE}/mahasiswa?page=${page}&limit=10&search=${encodeURIComponent(search)}`);
  const data = await res.json();
  tableBody.innerHTML = "";

  data.data.forEach(m => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${m.id}</td>
      <td>${m.nama}</td>
      <td>${m.nim}</td>
      <td>${m.jurusan}</td>
      <td>${m.angkatan ?? "-"}</td>
      <td>
        <button onclick="onEdit(${m.id})">✏️</button>
        <button onclick="onDelete(${m.id})">🗑️</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  // pagination display (simple)
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = data.meta.totalPages || 1;
  for (let i = 1; i <= totalPages; i++) {
    const b = document.createElement("button");
    b.textContent = i;
    if (i === page) b.disabled = true;
    b.onclick = () => loadData(i, search);
    pagination.appendChild(b);
  }
}

window.onEdit = async (id) => {
  // fetch mahasiswa detail
  const res = await fetch(`${API_BASE}/mahasiswa/${id}`);
  const m = await res.json();
  editingId = id;
  document.getElementById("idMahasiswa").value = id;
  document.getElementById("nama").value = m.nama;
  document.getElementById("nim").value = m.nim;
  document.getElementById("jurusan").value = m.jurusan;
  document.getElementById("angkatan").value = m.angkatan || "";
  // NOTE: username/password fields are empty: admin can fill to update account
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
};

window.onDelete = async (id) => {
  if (!confirm("Yakin hapus?")) return;
  await fetch(`${API_BASE}/mahasiswa/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  alert("Dihapus");
  loadData(currentPage);
};

// Submit mahasiswa create/update
formMahasiswa.onsubmit = async (e) => {
  e.preventDefault();
  const body = {
    nama: document.getElementById("nama").value,
    nim: document.getElementById("nim").value,
    jurusan: document.getElementById("jurusan").value,
    angkatan: document.getElementById("angkatan").value,
    username: document.getElementById("username").value || undefined, // optional
    password: document.getElementById("password").value || undefined,
  };

  if (editingId) {
    // update mahasiswa (admin can also pass username/password to update user)
    const res = await fetch(`${API_BASE}/mahasiswa/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) return alert(json.message || "Gagal update");
    alert("Update berhasil");
  } else {
    // create mahasiswa + user (admin route)
    const res = await fetch(`${API_BASE}/mahasiswa`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) return alert(json.message || "Gagal membuat mahasiswa");
    alert("Mahasiswa + akun dibuat");
  }

  formMahasiswa.reset();
  editingId = null;
  loadData();
};

// Create admin account (separate form)
formAdmin.onsubmit = async (e) => {
  e.preventDefault();
  const username = document.getElementById("adminUsername").value.trim();
  const password = document.getElementById("adminPassword").value.trim();
  if (!username || !password) return alert("Isi username & password admin");

  const res = await fetch(`${API_BASE}/auth/create-admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ username, password }),
  });
  const json = await res.json();
  if (!res.ok) return alert(json.message || "Gagal buat admin");
  alert("Admin baru dibuat");
  formAdmin.reset();
};

searchInput.addEventListener("input", (e) => loadData(1, e.target.value));

// initial load
loadData();
