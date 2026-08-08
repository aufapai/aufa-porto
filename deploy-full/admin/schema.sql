-- =====================================================
-- Portfolio Admin CMS - Database Schema
-- Database: aufarafi_porto
-- Import this file via phpMyAdmin
-- =====================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+07:00";

-- ─── ADMIN USERS TABLE ──────────────────────────────
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT 'Admin',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `admin_users` (`email`, `password`, `name`) VALUES
('aufatea1@gmail.com', '$2y$10$placeholder.hash.will.be.set.by.setup', 'Aufa Rafii');

-- ─── BLOG POSTS TABLE ───────────────────────────────
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `title` varchar(500) NOT NULL,
  `category` varchar(100) DEFAULT '',
  `excerpt` text,
  `content` longtext,
  `cover_image` varchar(1000) DEFAULT '',
  `author` varchar(255) DEFAULT 'Aufa Rafii',
  `read_time` varchar(50) DEFAULT '5 min read',
  `published` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_published` (`published`),
  KEY `idx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `blog_posts` (`slug`, `title`, `category`, `excerpt`, `content`, `cover_image`, `author`, `read_time`, `published`, `created_at`) VALUES
('transformasi-bisnis', 'Transformasi Bisnis Digital: Kisah Sukses Aufa Rafii Hadibrata', 'Business',
'Membangun fondasi kuat di dunia pemasaran dan kewirausahaan, mulai dari Zero Cost Shop hingga manajemen strategi digital.',
'Halo, saya Aufa Rafii Hadibrata, seorang lulusan bisnis dari IPB University dengan minat mendalam pada desain grafis, pengembangan merek, dan pemasaran digital.\n\nPerjalanan saya dimulai dari rasa ingin tahu yang besar terhadap desain dan branding, yang kemudian membawa saya menjelajahi dunia streetwear, strategi konten, dan pengembangan bisnis secara menyeluruh.\n\n## Pengalaman Kunci\n\n### Zero Cost Shop (2016-Now)\n**Pemilik Bisnis | Bogor**\n- Mengelola operasional harian toko online di Tokopedia Marketplace.\n- Mengembangkan strategi promosi dan kampanye diskon.\n- Analisis kinerja toko menggunakan alat analitik Tokopedia.\n\n### Loekis.in (2021-Now)\n**Manajer Pengembangan Bisnis**\n- Mengembangkan sistem bisnis dan strategi pertumbuhan.\n- Melakukan riset pasar dan analisis tren.\n- Memulai diskusi B2B dan bernegosiasi dengan mitra.\n\n### Puffin Store ID (2018-2020)\n**Manajer Konten**\n- Mengelola distribusi konten ke berbagai saluran online.\n- Memanfaatkan sistem manajemen konten untuk menganalisis engagement.\n- Editing visual menggunakan Adobe Premiere dan Photoshop.\n\n## Kesimpulan\nSetiap merek memiliki cerita, dan tugas saya adalah membantu menceritakan kisah tersebut dengan cara yang paling efektif di ranah digital.',
'https://images.pexels.com/photos/7289746/pexels-photo-7289746.jpeg?cs=srgb&dl=pexels-kampus-7289746.jpg&fm=jpg',
'Aufa Rafii', '5 min read', 1, '2025-12-21 00:00:00'),

('cari-duit', '"Bagaimana Cara Cari Duit di Internet": A 2010 Story', 'Personal Journey',
'Hal yang pertama kali gw cari di internet adalah "Bagaimana Cara Cari Duit di Internet". Di era 2010 warnet Peanut.net.',
'Hal yang pertama kali gw cari di internet adalah "Bagaimana Cara Cari Duit di Internet". Di era 2010 warnet Peanut.net, speed 1mbps, dan awal mula mengenal dunia digital.\n\nDari warnet ke marketplace, dari marketplace ke brand sendiri. Perjalanan yang panjang tapi worth it.',
'', 'Aufa Rafii', '3 min read', 1, '2025-12-20 00:00:00');

-- ─── CV DATA TABLE ──────────────────────────────────
CREATE TABLE IF NOT EXISTS `cv_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `cv_data` (`content`) VALUES
('# CV Personal – Aufa Rafii Hadibrata\n\n## Profil Singkat\n\nCreative entrepreneur yang fokus di desain, streetwear, dan tren digital. Memiliki pengalaman lebih dari 6 tahun sebagai graphic designer, dengan ketertarikan pada eksplorasi gaya unik untuk brand maupun project pribadi.\n\nNyaman berdiskusi soal industri kreatif, desain, dan tren digital. Cenderung berpikir dalam, analitis, dan suka membangun sesuatu yang punya value jangka panjang.\n\n---\n\n## Data Diri\n\n| Field | Detail |\n|---|---|\n| **Nama** | Aufa Rafii Hadibrata |\n| **Panggilan** | Aufa, Pai, Fi, Rafi |\n| **Tanggal Lahir** | 1 Januari 2000 |\n| **Domisili** | Bogor, Indonesia |\n| **Tinggi/Berat** | 173 cm / 55 kg |\n| **Kepribadian** | INTP (Koleris – Melankolis) |\n\n---\n\n## Karakter Personal\n\n- Terlihat santai, tapi serius kalau sudah masuk topik yang dalam\n- Lebih suka deep talk daripada small talk\n- Introvert, tapi tetap bisa bersosialisasi secara selektif\n- Cenderung logis, namun tetap punya empati\n\n---\n\n## Kelebihan\n\n- Kreatif dan memiliki selera unik\n- Paham business & trend analysis\n- Open-minded dan menyenangkan diajak diskusi\n- Mandiri dan produktif\n- Memiliki visi jangka panjang\n- Suka menulis (puisi/musik)\n- Bisa jadi partner belajar dan berkembang\n\n---\n\n## Kekurangan\n\n- Cenderung terlalu tenggelam dalam pekerjaan (workaholic)\n- Perfeksionis di beberapa aspek\n- Kurang suka keramaian / nongkrong\n- Kadang terlihat dingin atau kurang romantis\n- Mudah kehilangan fokus\n- Mood-based\n- Gengsi untuk mengakui kesalahan (masih dalam proses belajar)\n\n---\n\n## Minat & Ketertarikan\n\n- Creative entrepreneurship\n- Gaming & pop culture\n- Trend analysis & digital marketing\n- Podcast & deep conversation\n- Kuliner\n- Blockchain & Web3 art\n- Filosofi & pemikiran mendalam');

-- ─── ABOUT ME TABLE ─────────────────────────────────
CREATE TABLE IF NOT EXISTS `about_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT 'Aufa Rafii Hadibrata',
  `title` varchar(500) DEFAULT 'Creative Entrepreneur & Digital Strategist',
  `bio` text,
  `skills` text COMMENT 'JSON array of skills',
  `social` text COMMENT 'JSON object of social links',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `about_data` (`name`, `title`, `bio`, `skills`, `social`) VALUES
('Aufa Rafii Hadibrata', 'Creative Entrepreneur & Digital Strategist',
'Creative entrepreneur yang fokus di desain, streetwear, dan tren digital. Memiliki pengalaman lebih dari 6 tahun sebagai graphic designer.',
'["Graphic Design","Business Strategy","Digital Marketing","UI/UX","Streetwear Design","Web3 Art"]',
'{"instagram":"@aufapai","email":"aufatea1@gmail.com"}');

-- ─── TRAFFIC LOG TABLE ──────────────────────────────
CREATE TABLE IF NOT EXISTS `traffic_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page` varchar(500) NOT NULL,
  `referrer` varchar(1000) DEFAULT 'Direct',
  `user_agent` text,
  `screen_size` varchar(50) DEFAULT '',
  `ip_address` varchar(45) DEFAULT '',
  `country` varchar(100) DEFAULT '',
  `visit_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_page` (`page`(191)),
  KEY `idx_date` (`visit_date`),
  KEY `idx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── SESSIONS TABLE ─────────────────────────────────
CREATE TABLE IF NOT EXISTS `admin_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `idx_expires` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

COMMIT;
