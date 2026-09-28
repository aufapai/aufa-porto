---
title: "Sistem & Proyek"
subtitle: "Kumpulan sistem operasional, digitalisasi alur kerja, dan otomasi yang dibangun untuk memecahkan masalah nyata"
author: Aufa Rafii Hadibrata
---

# Sistem & Proyek

Gw suka bikin sesuatu yang bisa jalan sendiri. Bukan sekadar rapi di atas kertas atau bagus di slide presentasi, tapi beneran kepakai dan mempermudah orang tiap hari. Di bawah ini beberapa sistem dan proyek yang pernah gw rancang dan bangun, lengkap dengan akar masalahnya, pendekatan solusinya, tools yang digunakan, hingga hasil nyata yang dicapai.

---

## 1. Sistem SPMB SMP PGRI 12 Bogor

![Sistem SPMB SMP PGRI 12 Bogor](https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80)

**Masalah:**  
Pendaftaran murid baru (SPMB) kelihatannya simpel, sampai data formulir masuk, bukti transfer cicilan, verifikasi berkas, dan pembagian seragam berceceran di berbagai chat WhatsApp dan spreadsheet terpisah. Akibatnya rentan data ganda, sulit melacak siswa yang belum lunas, dan panitia kelelahan merekap data manual.

**Yang gw bangun:**  
Sistem SPMB terintegrasi berbasis AppSheet, Google Sheets, dan Google Drive. Fitur utamanya meliputi:
- Form pendaftaran online dan pelacakan status bertahap: pendaftaran awal, verifikasi berkas, daftar ulang, hingga status pelunasan.
- Skema pelunasan fleksibel dengan 3 kolom cicilan otomatis terhitung.
- Kategorisasi jalur pendaftaran: Domisili, Afirmasi, Prestasi, dan Mutasi.
- Otomasi pembuatan Surat Tanda Diterima berformat PDF resmi berkop sekolah yang ter-generate otomatis lengkap dengan nama siswa.
- Hak akses panitia terpisah berbasis username dan password per divisi (keuangan, seragam, dan administrasi berkas).
- Sistem audit log aktivitas dan recycle bin (pemulihan data terhapus) untuk keamanan data.
- Dashboard visual rekap penerimaan dan total keuangan secara real-time, plus export Excel siap cetak.

**Hasil & Status:**  
Saat ini sistem masih dalam tahap uji coba & debugging (pilot testing) namun on-going proses aktif digunakan. Sistem ini berhasil memangkas keruwetan administrasi panitia dan menyatukan seluruh alur data siswa dalam satu portal terpusat.

**Tools:**  
AppSheet · Google Sheets · Google Drive · Google Docs Automation

---

## 2. Sistem Penjadwalan Guru Multi-Gedung — Lare Music School

![Sistem Penjadwalan Guru Multi-Gedung](https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80)

**Masalah:**  
Di lembaga pendidikan musik dengan 3 gedung cabang (bertempat di Depok dan Kota Wisata), para pengajar sering kali harus berpindah lokasi gedung dengan jadwal yang tidak berurutan. Jarak antar cabang bervariasi dari 500 meter hingga 3 kilometer. Hasilnya, jadwal bentrok antar studio sering terjadi, pengajar kelelahan mobilitas, dan operasional kelas sempat terganggu.

**Pendekatan gw:**  
Gw mulai dengan memetakan matriks jarak tempuh, ketersediaan ruang studio per alat musik, serta jam preferensi tiap pengajar. Dari data tersebut, gw rancang dashboard penjadwalan terpadu dengan aturan ketat:
- Satu jadwal baku yang konsisten untuk 1 semester penuh.
- Logika validasi otomatis agar tidak ada jadwal guru maupun ruangan studio yang bertabrakan.
- Informasi jadwal real-time yang mudah diakses dan dibagikan ke seluruh tim pengajar via mobile.

**Hasil & Status:**  
Sistem saat ini sudah berhasil dibangun dalam bentuk prototipe fungsional. Pihak manajemen Lare Music School (Depok & Kota Wisata) sangat menyukai dan mengapresiasi sistem ini karena berhasil menuntaskan masalah jadwal bentrok yang selama ini menjadi komplain berkepanjangan.

**Tools:**  
AppSheet · Google Sheets · Google Calendar Integration

---

## 3. Digitalisasi Sistem Sekolah & Efisiensi Workflow Lare

![Digitalisasi Workflow Lare](https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80)

**Masalah:**  
Sistem operasional yang tersendat biasanya bukan hanya persoalan software. Sering kali akar masalahnya berada pada alur kerja (workflow) yang tidak jelas: tidak ada batasan jelas siapa mengerjakan apa, kapan tenggat waktunya, dan ke mana data diserahterimakan antar divisi.

**Yang gw kerjain:**  
Gw membedah alur lama yang bermasalah, menyusun standard operating procedure (SOP) digital, dan membangun logika alur kerja (workflow logic) baru untuk Lare. Sistem ini menghubungkan bagian front desk, koordinator guru, keuangan, dan pimpinan sekolah dalam satu rantai informasi yang transparan dan akuntabel.

**Hasil:**  
Mampu mempersingkat waktu kerja operasional dan koordinasi manajemen secara signifikan—dari yang sebelumnya membutuhkan waktu hingga 1 minggu penuh hanya untuk sinkronisasi data antar divisi, kini selesai dalam 3 hari saja berkat alur kerja yang terstruktur dan terotomatisasi.

**Tools:**  
AppSheet · Google Workspace · Process Flowchart Architecture · Digital SOP

---

## 4. Survival.ID — Smart Personal Finance Analytics

![Survival.ID Finance App](https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80)

**Ide & Masalah:**  
Sebagian besar aplikasi pencatat keuangan pribadi di luar sana hanya sekadar tabel pencatat angka. Jarang ada yang bisa memberikan insight cerdas tentang perilaku belanja atau memberi rekomendasi alokasi dana secara personal tanpa ribet.

**Yang gw bangun:**  
Aplikasi berbasis Progressive Web App (PWA) yang memadukan input pengeluaran harian dengan kecerdasan buatan Google AI Studio (Gemini API). Aplikasi ini mampu membaca pola transaksi, mengelompokkan pengeluaran tak terduga, dan menyajikan rekomendasi penghematan, serta tersinkronisasi otomatis dengan ekosistem Google Workspace pribadi.

**Status & Hasil:**  
Saat ini berupa versi demo fungsional untuk kebutuhan analisis dan eksperimen pribadi, membuktikan potensi integrasi model LLM Gemini dalam pengelolaan finansial harian yang ringkas dan bebas friksi.

**Tools:**  
Progressive Web App (PWA) · Google AI Studio (Gemini API) · Google Workspace · JavaScript

---

## 5. Dataset Sertifikasi 600+ Item untuk Hotel Bintang 5

![Hotel Bintang 5 Dataset](https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80)

**Tantangan:**  
Sebuah hotel bintang lima terkemuka di Jakarta memerlukan penyusunan dataset sertifikasi standar mutu dan kepatuhan dengan volume besar (lebih dari 600 butir parameter audit). Dokumen ini memiliki hierarki ketat, parameter regulasi yang rumit, dan harus segera siap diuji di lapangan tanpa ada celah inkonsistensi data.

**Cara gw ngerjain:**  
Alih-alih menginput dan memvalidasi manual satu per satu, gw merancang pipeline otomasi menggunakan Google Flow, Google AI Studio, dan Gemini. Alur ini secara otomatis memvalidasi klasifikasi klausul sertifikasi, mengecek silang regulasi, dan mengekspor hasilnya secara instan ke format PDF, Word, dan spreadsheet Excel agar fleksibel digunakan oleh auditor lapangan.

**Hasil:**  
Memangkas waktu pengerjaan proyek secara drastis—pekerjaan yang normalnya memakan waktu lebih dari 2 minggu kerja berhasil dituntaskan hanya dalam kurun waktu 3 hari, dengan akurasi klasifikasi data yang presisi sesuai standar kepatuhan hotel bintang 5.

**Tools:**  
Google Flow · Google AI Studio · Gemini API · Google Sheets · Document Automation

---

## 6. Sambalin Aza — Resto Branding & Operational SOP System

![Sambalin Aza Branding](https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80)

**Konteks:**  
Sambalin Aza adalah bisnis restoran kuliner Sunda yang sedang berkembang. Tantangannya adalah bagaimana menyajikan cita rasa tradisional namun dengan pengalaman merek yang modern, rapi, dan operasional promosi yang tertib.

**Yang gw bangun:**  
- Desain Buku Menu (Menu Book) eksklusif dengan tata letak visual yang menggugah selera dan mudah dipahami konsumen.
- Standard Operating Procedure (SOP) operasional konten untuk sinkronisasi tim outlet dan tim media sosial.
- Kalender Konten (Content Calendar) komprehensif selama 6 bulan penuh yang mencakup pilar konten edukasi, promo tematik, dan video interaktif.

**Hasil:**  
Restoran memiliki panduan identitas visual yang solid di meja makan konsumen, serta ritme publikasi media sosial yang konsisten dan terencana rapi tanpa kebingungan membuat konten harian.

**Tools:**  
Adobe Illustrator · Adobe Photoshop · Canva · Social Media Calendar Planning

---

## 7. StarTech — Enterprise Software Copywriting & Module Visualization

![StarTech Enterprise Software](https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80)

**Konteks:**  
StarTech merupakan perusahaan penyedia solusi software untuk segmen korporat (enterprise). Produk software enterprise sering kali sulit dikomunikasikan ke pimpinan bisnis karena bahasanya terlalu teknis dan visual modulnya kaku.

**Yang gw bangun:**  
- Copywriting pemasaran berbahasa Inggris (English marketing copy) yang persuasif dan berbobot bisnis untuk booklet profil perusahaan (*Company Profile*).
- Rekayasa prompt generatif AI untuk menciptakan visualisasi antarmuka modul-modul software enterprise yang futuristik, bersih, dan profesional.
- Penataan struktur materi presentasi B2B agar mudah dicerna oleh para pengambil keputusan (C-level & manajer IT).

**Hasil:**  
Booklet profil perusahaan StarTech tampil berstandar internasional, dengan bahasa bisnis yang meyakinkan serta visual modul software yang premium untuk mendukung presentasi penawaran proyek enterprise.

**Tools:**  
B2B English Copywriting · Generative AI Art Direction · Prompt Engineering · Figma

---

## Penutup

Kalau bisnis atau institusi kamu punya masalah operasional yang rumit, alur kerja yang berceceran, atau butuh sistem digital yang bikin kerjaan lebih cepat dan akurat, gw selalu terbuka untuk diskusi. Hubungi gw langsung melalui halaman kontak di website ini atau lewat LinkedIn.
