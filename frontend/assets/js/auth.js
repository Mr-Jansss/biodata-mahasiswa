// ========================
// === AUTHENTICATION JS ===
// ========================

// === REGISTER HANDLER ===
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector("#registerForm form");
  const loginForm = document.querySelector("#loginForm form");

  // === REGISTER ===
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nama = document.getElementById("regNama").value.trim();
      const nim = document.getElementById("regNim").value.trim();
      const jurusan = document.getElementById("regJurusan").value.trim();
      const angkatan = document.getElementById("regAngkatan").value.trim();
      const username = document.getElementById("regUsername").value.trim();
      const password = document.getElementById("regPassword").value.trim();

      try {
        const res = await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nama, nim, jurusan, angkatan, username, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Gagal mendaftar");

        alert("✅ Registrasi berhasil! Silakan login sekarang.");
        document.getElementById("registerForm").classList.add("hidden");
        document.getElementById("loginForm").classList.remove("hidden");
      } catch (err) {
        alert("❌ " + err.message);
      }
    });
  }

  // === LOGIN ===
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      try {
        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login gagal");

        // Simpan token & role
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("userId", data.user.id);

        alert("✅ Login berhasil!");

        // Arahkan berdasarkan role
        if (data.user.role === "admin") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "user.html";
        }
      } catch (err) {
        alert("❌ " + err.message);
      }
    });
  }
});
