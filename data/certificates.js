/* ═══════════════════════════════════════
   data/certificates.js
   Data sertifikasi saja — tidak ada logika render/lightbox.
   Tambah sertifikat baru: tambah satu objek di array ini,
   lalu taruh gambar di assets/img/certificates/
   dan PDF di docs/certificates/ (opsional).
═══════════════════════════════════════ */
window.CERTIFICATES = [
  {
    id:        'C-001',
    title:     'Java Fundamentals – Bahasa Indonesia',
    issuer:    'Oracle Academy',
    date:      '7 November 2026',
    dateISO:   '2026-11-07',
    signer:    'M. Wijaya Saputra',
    signerRole:'Oracle Academy Instructor',
    award:     'Award of Completion',
    desc:      'Satisfactory Completion of All Coursework dalam mata kuliah Java Fundamentals berbahasa Indonesia, diselenggarakan oleh Oracle Academy bersama SMK TI Dwiguna.',
    tags:      ['Java', 'Oracle Academy', 'Programming'],
    img:       'assets/img/certificates/java-fundamentals.png',
    pdf:       'docs/certificates/Kavin Thoriq_Java_Fundamentals_–_Bahasa_Indonesia_Award_Of_Completion_on_the_7th_of_November__2026.webp'
  },
  {
    id:        'C-002',
    title:     'Database Foundations – Bahasa Indonesia',
    issuer:    'Oracle Academy',
    date:      '20 November 2026',
    dateISO:   '2026-11-20',
    signer:    'M. Wijaya Saputra',
    signerRole:'Oracle Academy Instructor',
    award:     'Award of Completion',
    desc:      'Satisfactory Completion of All Coursework dalam mata kuliah Database Foundations berbahasa Indonesia, diselenggarakan oleh Oracle Academy bersama SMK TI Dwiguna.',
    tags:      ['Database', 'Oracle Academy', 'SQL'],
    img:       'assets/img/certificates/database-foundations.png',
    pdf:       'docs/certificates/Kavin Thoriq_Database_Foundations_–_Bahasa_Indonesia_Award_Of_Completion_on_the_20th_of_November__2026.webp'
  }
];
