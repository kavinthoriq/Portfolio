# 🌌 Swallowed Star — Portfolio Terminal

> Portfolio website Kavin Thoriq bertema *Swallowed Star (吞噬星空)* — Luo Feng universe.  
> Dibangun dengan **vanilla HTML + CSS + JavaScript** murni, tanpa framework atau build tool.

---

## ✨ Fitur

- Intro sinematik 4-fase dengan animasi typewriter, glitch, & efek reveal karakter
- Halaman utama dengan custom cursor *Singularity* (black hole + orbit bulan emas)
- Canvas starfield animasi, HUD status bar realtime, bottom ticker
- Filter proyek dinamis, skill bar + radial chart teranimasi
- Entry sound (Web Audio API) saat pertama masuk dari intro
- Hover & click SFX di seluruh halaman utama
- Responsif mobile + aksesibel (`prefers-reduced-motion`)

---

## 📁 Struktur Folder

```
portfolio/
├── index.html              ← Halaman utama
├── intro.html              ← Intro sinematik (Tailwind CDN)
├── README.md
├── .gitignore
├── assets/
│   ├── css/
│   │   ├── base.css              ← Variables, reset, scrollbar, layout, scroll-reveal
│   │   ├── components.css        ← Glass, hud-box, chamfer, btn, badge, ticker
│   │   ├── cursor.css            ← Custom cursor Singularity
│   │   ├── intro.css             ← Semua style khusus intro.html
│   │   └── sections/
│   │       ├── navbar.css
│   │       ├── hero.css
│   │       ├── about.css
│   │       ├── education.css
│   │       ├── skills.css
│   │       ├── projects.css
│   │       ├── contact.css
│   │       └── footer.css
│   ├── js/
│   │   ├── shared/
│   │   │   ├── starfield.js      ← Canvas bintang (dipakai kedua halaman)
│   │   │   ├── hud-clock.js      ← Jam & tanggal realtime
│   │   │   └── audio-engine.js   ← Base AudioContext & mute toggle
│   │   ├── intro/
│   │   │   └── intro.js          ← Typewriter, 4-fase, exitIntro, keyboard
│   │   └── main/
│   │       ├── entry-sound.js    ← Epic entry sound dari intro → index
│   │       ├── navigation.js     ← Navbar scroll, scrollToSection, hamburger
│   │       ├── typewriter.js     ← Hero tagline typewriter
│   │       ├── reveal.js         ← IntersectionObserver, counter, skill bar, radial chart
│   │       ├── projects.js       ← Render kartu proyek + filter
│   │       ├── sfx.js            ← Hover/click sound index
│   │       └── cursor.js         ← Singularity cursor engine
│   └── img/
│       ├── characters/
│       │   ├── luo-feng.webp         ← Karakter hero (index)
│       │   └── luo-feng-full.webp    ← Karakter fullscreen (intro)
│       └── projects/
│           ├── go-to-school.png
│           ├── plengertosmart.png
│           ├── geometry-dash.png
│           ├── vynz-news.png
│           ├── studynote.png
│           └── smk-ti-dwiguna.png
└── data/
    └── projects.js         ← Array `window.PROJECTS` — data proyek saja
```

---

## 🚀 Cara Menjalankan

### Lokal (paling mudah)
Gunakan **VS Code Live Server** atau ekstensi serupa:
1. Buka folder project di VS Code
2. Klik kanan `index.html` → **Open with Live Server**

> **Jangan buka langsung via `file://`** — beberapa browser memblokir audio autoplay dan redirect `sessionStorage` di protokol `file://`. Gunakan Live Server atau server HTTP lokal.

### Server HTTP sederhana (Python)
```bash
cd "d:\swallowed star - Copy"
python -m http.server 8080
# Buka: http://localhost:8080
```

---

## ➕ Cara Menambah Proyek Baru

1. Tambahkan screenshot ke `assets/img/projects/` dengan nama **kebab-case** (misal: `nama-proyek.png`)
2. Buka `data/projects.js` dan tambahkan satu objek baru di array `window.PROJECTS`:

```js
{
  id:     'P-007',
  title:  'Nama Proyek',
  desc:   'Deskripsi singkat proyek.',
  tags:   ['Web'],           // 'Web' | 'Game' | 'Design'
  img:    'assets/img/projects/nama-proyek.png',
  demo:   'https://link-demo.com',
  repo:   'https://github.com/kavinthoriq/nama-repo',
  status: 'COMPLETED',       // 'COMPLETED' | 'IN PROGRESS'
  year:   '2025'
}
```

3. Simpan — proyek langsung muncul di halaman tanpa rebuild.

---

## 🌐 Deploy ke GitHub Pages

1. Push seluruh folder ini ke repository GitHub (branch `main` atau `gh-pages`)
2. Di Settings repo → **Pages** → Source: branch `main`, folder `/root`
3. GitHub Pages akan deploy otomatis. URL: `https://<username>.github.io/<repo-name>/`

> **Catatan:** GitHub Pages bersifat case-sensitive. Pastikan semua path (`assets/`, `data/`) menggunakan huruf kecil.

---

## 🛠️ Stack & Aturan Teknis

| Aspek | Detail |
|---|---|
| HTML | Semantic HTML5, `lang="id"` |
| CSS | Vanilla CSS, cascade biasa, tanpa preprocessor |
| JavaScript | Vanilla ES5/ES6 — `<script defer>`, **bukan** `type="module"` |
| Font | Orbitron, Share Tech Mono, Inter — via Google Fonts CDN |
| Tailwind | CDN hanya di `intro.html` (utility classes pada overlay) |
| Audio | Web Audio API — tanpa file audio eksternal |
| Gambar | WebP untuk karakter, PNG untuk screenshot proyek |

---

*"Dalam alam semesta ini, yang lemah tidak memiliki hak untuk hidup dengan nyaman." — Luo Feng*
