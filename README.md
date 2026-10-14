# 🌌 Swallowed Star Portfolio: Kavin Thoriq

Website portfolio pribadi bertema **sci-fi HUD terminal** dengan inspirasi dari anime **Swallowed Star (Tunshi Xingkong)** dan karakter **Luo Feng**. Dibangun dengan HTML, CSS, dan JavaScript murni tanpa framework.

🔗 **Demo:** _(https://kavinthoriq.github.io/Portfolio)_

<!-- Tambahkan screenshot di sini, misalnya:
![Intro](screenshots/intro.png)
![Portfolio](screenshots/portfolio.png)
-->

---

## ✨ Fitur

### 🎬 Cinematic Intro (`intro.html`)
- Wallpaper karakter Luo Feng layar penuh dengan starfield partikel (canvas) dan bingkai sudut ala HUD.
- Jam dan tanggal realtime pada status bar atas.
- Urutan tiga fase: boot terminal dengan teks diketik otomatis, otentikasi dengan teks *glitch*, lalu tombol **[ ENTER TERMINAL ]**.
- Cincin hologram yang muncul di fase akhir, dan tombol mute audio.
- Tombol masuk mengarahkan ke halaman portfolio (`index.html`).

### 💼 Portfolio (`index.html`)
- **Hero:** teks ketik otomatis (*typewriter*), identitas operator, dan tombol navigasi cepat.
- **Data Profil (Bio-Scanner):** deskripsi diri, info pribadi, statistik animasi, dan grafik kemampuan.
- **Log Misi & Pendidikan:** riwayat sekolah dan proyek utama dalam bentuk kartu "mission".
- **Skill & Statistik:** *hard skill* dan *soft skill* dengan bar animasi, serta daftar teknologi yang dikuasai.
- **Project Archive:** kartu proyek dengan filter **All / Web / Game / Design**, lengkap dengan tombol demo dan source code. Datanya dikelola dari satu array JavaScript.
- **Transmission Hub (Kontak):** GitHub, email, dan lokasi, plus ajakan kolaborasi.
- **Marquee** informasi berjalan di bagian bawah.

### 🎮 Interaksi & Efek
- **Cursor kustom bertema singularity:** inti dengan cincin berputar, bereaksi saat hover dan klik. Hanya aktif di perangkat dengan mouse.
- **Sound effect** (Web Audio API) untuk hover, klik, dan navigasi, dengan tombol mute.
- Animasi muncul saat scroll (*scroll reveal*) dan efek kaca (*glassmorphism*) pada panel.
- Layout responsif dengan menu mobile.

---

## 🗂️ Proyek yang Ditampilkan

| ID | Proyek | Kategori | Status | Demo | Repo |
| --- | --- | --- | --- | --- | --- |
| P-001 | Go To School: Mathemagic Adventure | Game | Completed | [Main](https://kavinthoriq.github.io/go-to-school-mathemagic-adventure/) | [Repo](https://github.com/kavinthoriq/go-to-school-mathemagic-adventure) |
| P-002 | PlengerToSmart | Web | In Progress | [Buka](https://edukasi-vynz.page.gd/) | [Repo](https://github.com/kavinthoriq/edukasi) |
| P-003 | Geometry Dash (Fan Game) | Game | Completed | [Main](https://kavinthoriq.github.io/geometry-dash/) | [Repo](https://github.com/kavinthoriq/geometry-dash) |
| P-004 | Vynz News | Web | Completed | [Buka](https://kavinthoriq.github.io/vynz-news/) | [Repo](https://github.com/kavinthoriq/vynz-news) |
| P-005 | StudyNote | Design | Completed | - | [Repo](https://github.com/kavinthoriq/note-app) |
| P-006 | SMK TI Dwiguna (Desain Website) | Design | Completed | - | [Repo](https://github.com/kavinthoriq/smk.sch.id) |

---

## 🛠️ Teknologi

| Teknologi | Kegunaan |
| --- | --- |
| HTML5 | Struktur halaman |
| CSS3 | Tema HUD, animasi, glassmorphism, dan layout responsif |
| JavaScript (Vanilla) | Interaksi, filter proyek, cursor kustom, dan scroll reveal |
| Canvas API | Starfield dan partikel latar |
| Web Audio API | Sound effect tanpa file audio eksternal |
| IntersectionObserver | Animasi saat elemen terlihat |
| Tailwind CSS (CDN) | Styling pada halaman intro |
| Google Fonts | Orbitron, Share Tech Mono, dan Inter |

**Palet warna:** cyan `#00f5ff`, emas `#ffd700`, biru `#0099ff`, hijau terminal `#00ff88`, ungu `#b400ff`, latar `#020812`.

---

## 📁 Isi Repository

```
├── intro.html                 # Cinematic intro (pintu masuk)
├── index.html                 # Halaman utama portfolio
├── luo_feng.webp              # Gambar karakter (versi potret)
├── luo_feng_full.webp         # Gambar karakter (versi lebar, wallpaper intro)
├── img/
│   └── projects/              # Screenshot proyek di Project Archive
│       ├── Screenshot 2026-10-14 121306.png
│       ├── Screenshot 2026-10-14 122049.png
│       ├── Screenshot 2026-10-14 122349.png
│       ├── Screenshot 2026-10-14 122628.png
│       ├── Screenshot 2026-10-14 123129.png
│       └── Screenshot 2026-10-14 123421.png
└── README.md
```

> Mulai dari `intro.html` untuk pengalaman lengkap. `index.html` bisa dibuka langsung tanpa intro.

---

## 🚀 Cara Menjalankan

Tanpa instalasi apa pun:

1. **Clone repository**
   ```bash
   git clone https://github.com/kavinthoriq/NAMA-REPO.git
   cd NAMA-REPO
   ```
2. **Buka `intro.html`** di browser, atau gunakan ekstensi **Live Server** di VS Code.
3. Klik **[ ENTER TERMINAL ]** untuk masuk ke portfolio.

### Deploy ke GitHub Pages
1. Push project ke GitHub.
2. Buka **Settings → Pages**, pilih branch `main` dan folder `/ (root)`, lalu **Save**.
3. GitHub Pages membuka `index.html` sebagai halaman awal. Agar pengunjung melihat intro lebih dulu, ganti nama `index.html` menjadi `portfolio.html`, lalu ganti nama `intro.html` menjadi `index.html` (dan ubah tujuan tombol masuk di dalamnya ke `portfolio.html`).

---

## 🧩 Menambah Proyek Baru

Proyek dikelola dari array `projects` di `index.html`. Cukup tambah satu objek:

```js
{
  id: 'P-007',
  title: 'Nama Proyek',
  desc: 'Deskripsi singkat proyek.',
  tags: ['Web', 'HTML', 'CSS'],     // tag pertama menentukan kategori filter
  img: 'img/projects/nama-gambar.png',
  demo: 'https://link-demo',        // kosongkan jika tidak ada
  repo: 'https://github.com/kavinthoriq/nama-repo',
  status: 'COMPLETED'
}
```

---

## ⚙️ Kustomisasi

- **Cursor kustom:** konstanta di blok script *Custom Cursor: Singularity* (misalnya `ORBIT_MOON`). Untuk mematikannya, hapus class `has-custom-cursor` dari elemen `<html>`.
- **Warna tema:** ubah variabel CSS di `:root` pada `index.html`.
- **Volume dan mute:** diatur lewat tombol SFX di pojok kanan bawah.

---

## 👤 Author

**Kavin Thoriq**
Pelajar PPLG, SMK TI Dwiguna Kota Depok
- GitHub: [@kavinthoriq](https://github.com/kavinthoriq)

---

## 📜 Kredit & Disclaimer

Website ini adalah karya penggemar (*fan tribute*) dan tidak berafiliasi dengan pemilik resmi **Swallowed Star**. Karakter, gambar, dan kutipan Luo Feng adalah milik pemilik hak ciptanya. Jika repository ini dipublikasikan secara luas, pastikan kamu memiliki hak pakai atas gambar tersebut atau menggantinya dengan aset buatan sendiri.

---

⭐ Kalau portfolio ini bermanfaat, jangan lupa kasih **star** di repository ini!
