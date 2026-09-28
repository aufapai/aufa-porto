<?php
/**
 * One-click Database Updater for Blog & Portfolio Systems
 * Updates MySQL tables (blog_posts & portfolio_projects) with the new systems & case studies:
 * 1. SPMB Pilot SMP PGRI 12
 * 2. Lare Music School Multi-Building Scheduling (Depok & Kota Wisata)
 * 3. Lare Music Operational Workflow Reduction (1 week -> 3 days)
 * 4. Survival.ID AI Studio & Google Workspace Demo
 * 5. Dataset Audit Hotel Bintang 5 (2 weeks -> 3 days)
 * 6. Sambalin Aza Sunda Branding & Recipe SOP
 * 7. StarTech Enterprise Software Copy & AI Visual Modules
 * Plus Blog Article: "Implementasi Sistem & Transformasi Alur Kerja Proyek Nyata: Dari Edukasi, PWA AI, hingga Enterprise"
 * 
 * URL: /admin/update_projects_blog.php
 */

require_once __DIR__ . '/db.php';
handleCORS();

$db = Database::getInstance()->getConnection();

echo "<!DOCTYPE html><html><head><title>Update Projects & Blog - Aufa Portfolio</title>";
echo "<style>body{font-family:system-ui,sans-serif;background:#0f172a;color:#e2e8f0;padding:2rem;line-height:1.6} .card{background:#1e293b;padding:1.5rem;border-radius:12px;border:1px solid #334155;max-width:800px;margin:0 auto} h1{color:#38bdf8} .success{color:#4ade80} .item{background:#0f172a;padding:0.75rem 1rem;border-radius:8px;margin-bottom:0.5rem;border-left:4px solid #38bdf8} a{color:#38bdf8;text-decoration:none} a:hover{text-decoration:underline}</style></head><body>";
echo "<div class='card'>";
echo "<h1>🚀 Syncing Portfolio & Blog Systems...</h1>";

// 1. Ensure `slug` column exists in `portfolio_projects`
$stmt = $db->query("SHOW COLUMNS FROM portfolio_projects");
$columns = $stmt->fetchAll(PDO::FETCH_COLUMN);

if (!in_array('slug', $columns)) {
    $db->exec("ALTER TABLE portfolio_projects ADD COLUMN `slug` VARCHAR(255) DEFAULT NULL UNIQUE AFTER `id`");
    echo "<p class='success'>✓ Added <code>slug</code> column to portfolio_projects table.</p>";
}

// 2. Insert or update Blog Post: sistem-dan-proyek
$blogContent = <<<EOT
Sebagai praktisi Business Development dan Process Improvement, membangun sistem bukan sekadar menulis baris kode atau membuat tampilan visual yang estetik. Kunci utamanya adalah bagaimana teknologi dan alur operasional dapat memangkas inefisiensi, mengeliminasi human error, dan mempercepat ritme bisnis.

Berikut adalah rangkuman dari 6 studi kasus nyata serta modul sistem operasional yang telah dan sedang saya kembangkan:

---

## 1. Pilot Sistem SPMB SMP PGRI 12 (Debug & Ongoing Testing)
- **Status:** Fase Uji Debug Internal & Ongoing Process Enhancement.
- **Konteks:** Sistem Penerimaan Murid Baru (SPMB) berbasis web mandiri untuk mendigitalkan pendaftaran dan verifikasi berkas.
- **Tantangan:** Proses manual sebelumnya menyita waktu verifikasi hingga 5-7 hari per gelombang berkas dan rentan salah rekap.
- **Solusi & Alur:** Arsitektur database terpusat dengan portal orang tua, validasi berkas otomatis (NISN, KK, Akta), dan dashboard panitia seleksi.
- **Metrik:** Mengurangi waktu verifikasi calon siswa dari 5 hari menjadi hitungan jam, serta eliminasi duplikasi data calon murid baru.

---

## 2. Multi-Building Scheduling Lare Music School (Depok & Kota Wisata)
- **Status:** Prototyping Disetujui & Diterima Klien.
- **Konteks:** Sekolah musik modern dengan dua cabang utama di Depok dan Kota Wisata Cibubur yang menghadapi kompleksitas penjadwalan tutor dan studio kedap suara.
- **Tantangan:** Instruktur sering mengajar lintas cabang (Depok - Kota Wisata), memicu tabrakan jam mengajar (*double booking*) dan pemborosan waktu tempuh.
- **Solusi:** Matriks penjadwalan dinamis terpusat dengan filter lokasi, ketersediaan studio instrumen (Piano, Gitar, Vokal, Drum), dan buffer waktu transit tutor.
- **Metrik:** 0 tabrakan jadwal (*zero-clash*), transparansi alokasi ruangan 100%, dan kepuasan guru serta wali murid meningkat drastis.

---

## 3. Optimasi Workflow Operasional Lare Music: Pangkas Waktu 1 Minggu jadi 3 Hari
- **Status:** Berhasil Diimplementasikan.
- **Konteks:** Rekapitulasi absensi siswa, perhitungan honor pengajar per sesi/grade, dan penagihan SPP bulanan.
- **Tantangan:** Sebelum adanya sistem, staff admin memerlukan waktu 7 hari kerja di akhir bulan hanya untuk memvalidasi presensi fisik dan invoice manual.
- **Solusi:** Automasi logging presensi via web, kalkulasi honor tutor otomatis berdasarkan grade instrumen, dan penerbitan slip konfirmasi digital.
- **Hasil:** Waktu penyelesaian administrasi bulanan terpangkas drastis dari **1 minggu (7 hari) menjadi hanya 3 hari** (efisiensi waktu kerja >57%).

---

## 4. Survival.ID: AI Studio & Google Workspace Connected PWA
- **Status:** Live Prototype / Demo Analisis Personal.
- **Konteks:** Progressive Web Application (PWA) yang terintegrasi dengan Google AI Studio (Gemini API) dan Google Workspace.
- **Tujuan:** Asisten audit analitik bisnis personal untuk mengolah ide, merangkum insight kompetitor, dan mengorganisir dokumen cloud secara instan.
- **Fitur Utama:** Offline-first PWA caching, natural language prompt audit via Gemini Pro, dan direct sync ke Google Sheets & Drive untuk dokumentasi otomatis.

---

## 5. Audit & Pembersihan Dataset Sertifikasi 600+ Hotel Bintang 5
- **Status:** Selesai / Terverifikasi.
- **Konteks:** Standardisasi lebih dari 600 sertifikasi staf, audit HACCP/K3, dan dokumen kelayakan di jaringan hotel bintang lima.
- **Tantangan:** Estimasi manual memakan waktu lebih dari 2 minggu (14+ hari kerja) dengan resiko tinggi kesalahan pencatatan masa berlaku sertifikat.
- **Solusi:** Pipeline pembersihan data otomatis menggunakan formula terstruktur, regex audit, deduplikasi data, dan dashboard monitoring masa berlaku (kadaluarsa).
- **Hasil:** Waktu pengerjaan dipangkas dari **2 minggu lebih menjadi hanya 3 hari**, dengan akurasi rekonsiliasi data mencapai 100%.

---

## 6. Branding & SOP Sambalin Aza (Khas Sunda) vs. Modul Enterprise StarTech
Untuk kebutuhan portofolio dan eksekusi komersial, kedua sistem ini dikembangkan secara modular dan terpisah:

### A. Sambalin Aza (Branding Kuliner Sunda)
- **Fokus:** Identitas visual hangat khas Jawa Barat, desain kemasan higienis, dan SOP standardisasi resep sambal terasi matang & geprek.
- **Tujuan:** Menjaga *quality control* rasa dan ketahanan produk di suhu ruang tanpa bahan pengawet berlebih.

### B. StarTech (Enterprise Software & AI Modules)
- **Fokus:** Corporate branding modern, technical sales copywriting B2B, dan modul visual interaktif berstandar enterprise.
- **Tujuan:** Menjembatani kapabilitas software backend yang kompleks agar mudah dipahami dan diadopsi oleh C-Level eksekutif & tim operasional klien.

---

## Rangkuman Dampak
Inovasi sistem yang baik adalah sistem yang langsung menjawab titik sakit (*pain points*) operasional. Mulai dari menekan waktu kerja 1 minggu ke 3 hari hingga standarisasi audit ribuan baris data, pendekatan terstruktur selalu menghasilkan lompatan produktivitas nyata.
EOT;

$blogData = [
    'slug' => 'sistem-dan-proyek',
    'title' => 'Implementasi Sistem & Transformasi Alur Kerja Proyek Nyata: Dari Edukasi, PWA AI, hingga Enterprise',
    'category' => 'Business Transformation',
    'excerpt' => 'Rangkuman studi kasus nyata: SPMB SMP PGRI 12, sistem penjadwalan & operasional Lare Music School (hemat 1 minggu ke 3 hari), PWA Survival.ID, audit dataset hotel bintang 5, serta branding Sambalin Aza & StarTech Enterprise.',
    'content' => $blogContent,
    'cover_image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'author' => 'Aufa Rafii',
    'read_time' => '7 min read',
    'published' => 1
];

$stmtBlog = $db->prepare("SELECT id FROM blog_posts WHERE slug = ?");
$stmtBlog->execute([$blogData['slug']]);
$existingBlog = $stmtBlog->fetch();

if ($existingBlog) {
    $updBlog = $db->prepare("UPDATE blog_posts SET title = ?, category = ?, excerpt = ?, content = ?, cover_image = ?, author = ?, read_time = ?, published = ? WHERE id = ?");
    $updBlog->execute([
        $blogData['title'],
        $blogData['category'],
        $blogData['excerpt'],
        $blogData['content'],
        $blogData['cover_image'],
        $blogData['author'],
        $blogData['read_time'],
        $blogData['published'],
        $existingBlog['id']
    ]);
    echo "<div class='item'><strong>Blog Post Updated:</strong> {$blogData['title']}</div>";
} else {
    $insBlog = $db->prepare("INSERT INTO blog_posts (slug, title, category, excerpt, content, cover_image, author, read_time, published, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
    $insBlog->execute([
        $blogData['slug'],
        $blogData['title'],
        $blogData['category'],
        $blogData['excerpt'],
        $blogData['content'],
        $blogData['cover_image'],
        $blogData['author'],
        $blogData['read_time'],
        $blogData['published']
    ]);
    echo "<div class='item'><strong>Blog Post Created:</strong> {$blogData['title']}</div>";
}

// 3. 7 Portfolio Projects
$projects = [
    [
        'slug' => 'spmb-pgri-12',
        'title' => 'Sistem SPMB Pilot SMP PGRI 12',
        'category' => 'business',
        'image_url' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
        'description' => "Pengembangan dan uji debug sistem SPMB berbasis web terpusat untuk SMP PGRI 12. Mengotomatisasi alur pendaftaran, upload berkas, dan validasi data calon siswa dengan verifikasi instan.\n\nStatus: Tahap Uji Debug & Ongoing Development.",
        'external_link' => '/blog/sistem-dan-proyek'
    ],
    [
        'slug' => 'penjadwalan-lare-music',
        'title' => 'Sistem Penjadwalan Multi-Cabang Lare Music School',
        'category' => 'business',
        'image_url' => 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
        'description' => "Perancangan matriks penjadwalan studio musik multi-cabang (Depok & Kota Wisata Cibubur). Menghilangkan risiko tabrakan jadwal tutor lintas cabang dan meningkatkan utilisasi ruangan studio.\n\nStatus: Prototype disetujui & diterima klien.",
        'external_link' => '/blog/sistem-dan-proyek'
    ],
    [
        'slug' => 'workflow-lare-music',
        'title' => 'Optimasi Alur Kerja & Administrasi Lare Music',
        'category' => 'business',
        'image_url' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
        'description' => "Restrukturisasi alur verifikasi presensi, honor instruktur, dan invoice wali murid. Menghemat waktu administrasi bulanan dari sebelumnya 1 minggu penuh menjadi hanya 3 hari kerja (efisiensi >57%).\n\nStatus: Terimplementasi.",
        'external_link' => '/blog/sistem-dan-proyek'
    ],
    [
        'slug' => 'survival-id',
        'title' => 'Survival.ID - AI Studio & Google Workspace PWA',
        'category' => 'business',
        'image_url' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
        'description' => "Aplikasi demo personal berbasis Progressive Web App (PWA) yang terhubung dengan Google AI Studio (Gemini) dan Google Workspace API untuk audit cepat strategi bisnis dan otomatisasi catatan cloud.\n\nStatus: Live Interactive Demo.",
        'external_link' => '/blog/sistem-dan-proyek'
    ],
    [
        'slug' => 'dataset-hotel-bintang-5',
        'title' => 'Audit & Pembersihan Dataset Sertifikasi Hotel Bintang 5',
        'category' => 'business',
        'image_url' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
        'description' => "Proyek audit dan pembersihan 600+ baris data sertifikasi staf & fasilitas hotel bintang 5. Memangkas estimasi pengerjaan dari 2 minggu lebih menjadi hanya 3 hari berkat pipeline regex dan otomatisasi validasi.\n\nStatus: Selesai dengan akurasi 100%.",
        'external_link' => '/blog/sistem-dan-proyek'
    ],
    [
        'slug' => 'sambalin-aza',
        'title' => 'Sambalin Aza - Culinary Branding & Recipe SOP',
        'category' => 'business',
        'image_url' => 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1000&q=80',
        'description' => "Branding kuliner khas Sunda terpisah yang mencakup identitas visual kemasan, storytelling kearifan lokal, serta standarisasi SOP produksi resep sambal terasi matang & geprek.\n\nStatus: Brand Identity & Kitchen SOP Siap Skala.",
        'external_link' => '/blog/sistem-dan-proyek'
    ],
    [
        'slug' => 'startech-enterprise',
        'title' => 'StarTech - Enterprise Copywriting & AI Visual Modules',
        'category' => 'business',
        'image_url' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
        'description' => "Modul sistem enterprise dan copywriting B2B untuk lini software StarTech. Mengemas arsitektur teknis rumit ke dalam visual UI modern yang siap dipresentasikan kepada C-Level eksekutif.\n\nStatus: Enterprise Design & Copy System.",
        'external_link' => '/blog/sistem-dan-proyek'
    ]
];

foreach ($projects as $proj) {
    $stmtP = $db->prepare("SELECT id FROM portfolio_projects WHERE slug = ?");
    $stmtP->execute([$proj['slug']]);
    $existing = $stmtP->fetch();

    if ($existing) {
        $upd = $db->prepare("UPDATE portfolio_projects SET title = ?, category = ?, image_url = ?, description = ?, external_link = ? WHERE id = ?");
        $upd->execute([
            $proj['title'],
            $proj['category'],
            $proj['image_url'],
            $proj['description'],
            $proj['external_link'],
            $existing['id']
        ]);
        echo "<div class='item'><strong>Project Updated:</strong> {$proj['title']} (Slug: {$proj['slug']})</div>";
    } else {
        $ins = $db->prepare("INSERT INTO portfolio_projects (slug, title, category, image_url, description, external_link, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())");
        $ins->execute([
            $proj['slug'],
            $proj['title'],
            $proj['category'],
            $proj['image_url'],
            $proj['description'],
            $proj['external_link']
        ]);
        echo "<div class='item'><strong>Project Created:</strong> {$proj['title']} (Slug: {$proj['slug']})</div>";
    }
}

echo "<h2 class='success'>🎉 All 7 Projects & Blog Post Synced Successfully!</h2>";
echo "<p><a href='/business'>👉 Visit Business Portfolio</a> | <a href='/blog/sistem-dan-proyek'>👉 Read Blog Case Study</a></p>";
echo "</div></body></html>";
