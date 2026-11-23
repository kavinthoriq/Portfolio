/* ═══════════════════════════════════════
   data/projects.js
   Data proyek saja — tidak ada logika render/filter.
   Tambah proyek baru: tambah satu objek di array ini,
   lalu taruh screenshot di assets/img/projects/.
═══════════════════════════════════════ */
window.PROJECTS = [
  {
    id:     'P-001',
    title:  'Go To School: Mathemagic Adventure',
    desc:   'Game edukasi bergenre RPG petualangan bertema matematika, dibuat dengan RPG Maker MZ. Ikuti perjalanan Vynz berangkat ke sekolah, melewati berbagai ujian karakter, belajar tentang sifat operasi hitung, lalu menjelajah Dunia Bilangan yang penuh tantangan angka.',
    tags:   ['Game', 'RPG Maker MZ', 'JavaScript'],
    img:    'assets/img/projects/go-to-school.png',
    demo:   'https://kavinthoriq.github.io/go-to-school-mathemagic-adventure/',
    repo:   'https://github.com/kavinthoriq/go-to-school-mathemagic-adventure',
    status: 'COMPLETED',
    year:   '2024'
  },
  {
    id:     'P-002',
    title:  'PlengerToSmart',
    desc:   'Website edukasi berbasis PHP yang membuat belajar terasa santai tapi tetap nyerap. Fitur utamanya: materi video, kuis berwaktu dengan penilaian otomatis dan papan peringkat, artikel inspiratif, serta ruang diskusi komunitas ala forum.',
    tags:   ['Web', 'PHP', 'MySQL'],
    img:    'assets/img/projects/plengertosmart.png',
    demo:   'https://edukasi-vynz.page.gd/',
    repo:   'https://github.com/kavinthoriq/edukasi',
    status: 'IN PROGRESS',
    year:   '2025'
  },
  {
    id:     'P-003',
    title:  'Geometry Dash (Fan Game)',
    desc:   'Game platformer bertema ritme ala Geometry Dash yang bisa dimainkan langsung di browser. Lompat, hindari rintangan, dan bertahan sampai akhir level!',
    tags:   ['Game', 'Scratch'],
    img:    'assets/img/projects/geometry-dash.png',
    demo:   'https://kavinthoriq.github.io/geometry-dash/',
    repo:   'https://github.com/kavinthoriq/geometry-dash',
    status: 'COMPLETED',
    year:   '2024'
  },
  {
    id:     'P-004',
    title:  'Vynz News',
    desc:   'Website portal berita teknologi berbasis HTML, CSS, dan JavaScript murni (tanpa framework). Vynz News menyajikan artikel seputar teknologi, kecerdasan buatan, startup, pengembangan web, edukasi digital, dan keamanan siber, lengkap dengan mode gelap dan tampilan responsif.',
    tags:   ['Web', 'HTML', 'CSS', 'JavaScript'],
    img:    'assets/img/projects/vynz-news.png',
    demo:   'https://kavinthoriq.github.io/vynz-news/',
    repo:   'https://github.com/kavinthoriq/vynz-news',
    status: 'COMPLETED',
    year:   '2025'
  },
  {
    id:     'P-005',
    title:  'StudyNote',
    desc:   'Desain antarmuka (UI) aplikasi catatan sekolah dan pengingat tugas untuk siswa SMA/SMK. Aplikasi ini membantu siswa mengumpulkan tugas dari semua mata pelajaran, menyimpan ringkasan materi, dan mengatur pengingat supaya tidak ada tugas yang terlewat — semuanya dalam satu tempat.',
    tags:   ['Design', 'Figma'],
    img:    'assets/img/projects/studynote.png',
    demo:   '',
    repo:   'https://github.com/kavinthoriq/note-app',
    status: 'COMPLETED',
    year:   '2025'
  },
  {
    id:     'P-006',
    title:  'SMK TI Dwiguna — Website Design',
    desc:   'Desain antarmuka (UI) website resmi SMK TI Dwiguna Depok, dengan slogan "Forging Future Mechanics". Desain dibuat di Figma dan mencakup tiga halaman utama: Beranda, Galeri, dan Kontak.',
    tags:   ['Design', 'Figma'],
    img:    'assets/img/projects/smk-ti-dwiguna.png',
    demo:   '',
    repo:   'https://github.com/kavinthoriq/smk.sch.id',
    status: 'COMPLETED',
    year:   '2025'
  }
];
