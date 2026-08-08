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
('# CV Personal – Aufa Rafii Hadibrata\n\n## Profil Singkat\n\nMy name is **Aufa Rafii'' Hadibrata**, a self-taught business growth consultant and digital marketing strategist with 4+ years of experience creating modern, clean, and minimal brands that make a lasting impression.\n\n**Interests:** Gaming, Film Making, Traveling\n\n---\n\n## Experience\n\n### Digital Strategist\n**PT Bayarkilat Apps Indonesia** | *2025*\n- Developed performance-driven digital marketing campaigns.\n- Built content strategy for multi-channel presence.\n- Achieved 10% more conversion with Organic Social Media.\n\n### Business Development Manager\n**Lockis.in** | *2021 - now*\n- Developed business systems and growth strategies.\n- Conducted market research and trend analysis.\n- Initiated B2B discussions and partner negotiations.\n\n### Graphic Designer\n**Freelance** | *2018 - now*\n- Designed visual identities and brand logos.\n- Created custom merchandise designs.\n- Managed end-to-end design process.\n\n### Business Owner\n**Zero Cost Shop (Tokopedia)** | *2018 - 2025*\n- Oversaw online store operations on Tokopedia.\n- Developed promotional strategies and campaigns.\n- Analyzed store performance using analytics tools.\n\n---\n\n## Skills & Tools\n\n| Category | Skills / Tools |\n|---|---|\n| **Design Tools** | Ai, Ps, Id, Xd, Cn |\n| **Editing Tools** | Ae, Pr, DaVinci Resolve |\n| **Marketing** | fb, ig, G, TP |\n| **Languages** | ID (Indonesian), GB (English) |\n\n---\n\n## Education\n\n### Bachelor Degree\n**Business & Entrepreneurship** | *2019 - 2024*  \nIPB University, Bogor\n\n### Vocational High School\n**Multimedia / Business** | *2014 - 2017*  \nSMK, Bogor\n\n---\n\n## Details & Contact\n\n| Field | Detail |\n|---|---|\n| **Age** | 25 years |\n| **Website** | aufarafii.id |\n| **Email 1** | me@aufarafii.id |\n| **Email 2** | aufatea1@gmail.com |\n| **Phone** | +6287770050793 |\n| **Location** | Indonesia |\n\n**Portfolio Links:**\n- [LinkedIn](#)\n- [Instagram](#)\n- [Tokopedia](#)\n\n---\n\n## Achievements\n\n- 🏆 Grew Instagram followers from 500 to 8,000 in <1 year\n- 🏆 Best Student Nominee in IPB Entrepreneurship 2018\n- 🏆 Successful Tokopedia store owner since 2016');

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

-- ─── CONTACT MESSAGES TABLE ────────────────────────
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(500) DEFAULT '',
  `message` text NOT NULL,
  `status` enum('unread','read','replied') DEFAULT 'unread',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── PORTFOLIO PROJECTS TABLE ────────────────────────
CREATE TABLE IF NOT EXISTS `portfolio_projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `category` varchar(100) NOT NULL,
  `image_url` varchar(1000) DEFAULT '',
  `description` text,
  `external_link` varchar(1000) DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_category` (`category`),
  KEY `idx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample portfolio data
INSERT INTO `portfolio_projects` (`title`, `category`, `image_url`, `description`, `external_link`) VALUES
('Brand Identity Refresh', 'graphic-design', 'https://images.pexels.com/photos/1749303/pexels-photo-1749303.jpeg', 'Membuat ulang identitas visual untuk brand ritel modern.', ''),
('Social Media Campaign Q3', 'digital-marketing', 'https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg', 'Kampanye FB Ads scale up dengan ROAS 4.5x.', ''),
('Fintech App Interface', 'ui-ux', 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg', 'Desain UI/UX untuk aplikasi pembayaran digital B2B.', ''),
('Zero Cost Shop Expansion', 'business', 'https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg', 'Strategi ekspansi operasional ke gudang baru.', '');

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
