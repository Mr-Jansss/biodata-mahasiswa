const API_URL = "http://localhost:3000/api/mahasiswa";

let currentPage = 1;
const limit = 10;
let searchQuery = "";

document.addEventListener("DOMContentLoaded", () => {
  const listEl = document.getElementById("mahasiswaList");
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageInfo = document.getElementById("pageInfo");

  const loadData = async () => {
    const res = await fetch(`${API_URL}?page=${currentPage}&limit=${limit}&search=${searchQuery}`);
    const data = await res.json();

    listEl.innerHTML = data.data.map(
      (mhs) => `
        <div class="card">
          <h3>${mhs.nama}</h3>
          <p><strong>NIM:</strong> ${mhs.nim}</p>
          <p><strong>Jurusan:</strong> ${mhs.jurusan}</p>
          <p><strong>Angkatan:</strong> ${mhs.angkatan ?? "-"}</p>
        </div>`
    ).join("");

    pageInfo.textContent = `Halaman ${data.meta.page} dari ${data.meta.totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage >= data.meta.totalPages;
  };

  searchBtn.addEventListener("click", () => {
    searchQuery = searchInput.value.trim();
    currentPage = 1;
    loadData();
  });

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      loadData();
    }
  });

  nextBtn.addEventListener("click", () => {
    currentPage++;
    loadData();
  });

  loadData();
});
