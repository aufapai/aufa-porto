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
'', 'Aufa Rafii', '3 min read', 1, '2025-12-20 00:00:00'),

('sistem-dan-proyek', 'Implementasi Sistem & Transformasi Alur Kerja Proyek Nyata: Dari Edukasi, PWA AI, hingga Enterprise', 'Business Transformation',
'Rangkuman studi kasus nyata: SPMB SMP PGRI 12, sistem penjadwalan & operasional Lare Music School (hemat 1 minggu ke 3 hari), PWA Survival.ID, audit dataset hotel bintang 5, serta branding Sambalin Aza & StarTech Enterprise.',
'Sebagai praktisi Business Development dan Process Improvement, membangun sistem bukan sekadar menulis baris kode atau membuat tampilan visual yang estetik. Kunci utamanya adalah bagaimana teknologi dan alur operasional dapat memangkas inefisiensi, mengeliminasi human error, dan mempercepat ritme bisnis.\n\n## 1. Pilot Sistem SPMB SMP PGRI 12 (Debug & Ongoing Testing)\n- Status: Fase Uji Debug Internal & Ongoing Process Enhancement.\n- Konteks: Sistem Penerimaan Murid Baru (SPMB) berbasis web mandiri.\n- Metrik: Mengurangi waktu verifikasi calon siswa dari 5 hari menjadi hitungan jam.\n\n## 2. Multi-Building Scheduling Lare Music School (Depok & Kota Wisata)\n- Status: Prototyping Disetujui & Diterima Klien.\n- Konteks: Penjadwalan tutor dan studio kedap suara di dua cabang utama.\n- Solusi: Matriks penjadwalan dinamis terpusat dengan filter lokasi dan buffer waktu transit tutor.\n\n## 3. Optimasi Workflow Operasional Lare Music: Pangkas Waktu 1 Minggu jadi 3 Hari\n- Status: Berhasil Diimplementasikan.\n- Hasil: Waktu penyelesaian administrasi bulanan terpangkas drastis dari 1 minggu (7 hari) menjadi hanya 3 hari.\n\n## 4. Survival.ID: AI Studio & Google Workspace Connected PWA\n- Status: Live Prototype / Demo Analisis Personal.\n- Konteks: PWA terhubung dengan Google AI Studio (Gemini) dan Google Workspace.\n\n## 5. Audit & Pembersihan Dataset Sertifikasi 600+ Hotel Bintang 5\n- Status: Selesai / Terverifikasi.\n- Hasil: Waktu pengerjaan dipangkas dari 2 minggu lebih menjadi hanya 3 hari.\n\n## 6. Branding & SOP Sambalin Aza (Khas Sunda) vs. Modul Enterprise StarTech\n- Sambalin Aza: Identitas visual khas Sunda & standardisasi SOP resep sambal terasi matang & geprek.\n- StarTech: Corporate branding modern, technical sales copywriting B2B, dan modul visual enterprise.',
'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
'Aufa Rafii', '7 min read', 1, '2026-09-28 00:00:00');

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
  `name` varchar(255) NOT NULL DEFAULT 'Aufa Rafii\' Hadibrata',
  `title` varchar(500) DEFAULT 'Business Development @HOTs_Trading | Business Growth Consultant | Digital Marketing',
  `bio` text,
  `skills` text COMMENT 'JSON array of skills',
  `social` text COMMENT 'JSON object of social links',
  `experience` longtext COMMENT 'JSON array of work experience',
  `education` longtext COMMENT 'JSON array of education',
  `details` longtext COMMENT 'JSON object of personal details',
  `portfolio_links` longtext COMMENT 'JSON array of portfolio/social links',
  `achievements` longtext COMMENT 'JSON array of achievements',
  `section_order` longtext COMMENT 'JSON array of section order',
  `custom_skills` longtext COMMENT 'JSON array of custom skills badges',
  `contact_menu_target` varchar(50) DEFAULT 'section',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `about_data` (`name`, `title`, `bio`, `skills`, `social`, `experience`, `education`, `details`, `portfolio_links`, `achievements`, `section_order`, `custom_skills`, `contact_menu_target`) VALUES
('Aufa Rafii\' Hadibrata', 'Business Development @HOTs_Trading | Business Growth Consultant | Digital Marketing',
'Hi, I’m Aufa Rafii Hadibrata (Pai), a business graduate from IPB University with hands-on experience in business development, digital marketing, and operational improvement.\n\nI specialize in helping businesses grow by building better systems — from strategy, market research, and digital execution to workflow optimization and performance tracking.\n\nMy background spans across content management, branding execution, growth strategy, and process improvement, which allows me to connect business goals with real execution on the ground.\n\nI’m particularly interested in Business Process Improvement, Digital Transformation, and AI/Automation tools to improve efficiency and scalability for SMEs and growing companies.\n\nCore strengths:\n• Business Development & Strategic Planning\n• Market Research & Competitor Analysis\n• Digital Marketing & Content Strategy\n• Workflow Optimization & System Building\n• Cross-functional Execution (Business x Creative x Tech)\n\nCurrently open to opportunities in Business Analyst, Business Development, Growth, or Digital Transformation roles.',
'["Business Development","Sales","Customer Relationship Management (CRM)","Digital Marketing","Growth Strategy","Workflow Optimization","Graphic Design","Business Process Improvement"]',
'{"instagram":"@aufapai","email":"aufatea1@gmail.com","linkedin":"https://www.linkedin.com/in/aufa-hadibrata/","blog":"https://aufatea.my.id/","linktree":"https://linktr.ee/aufarh"}',
'[{"role":"Business Development Manager","company":"Hots Trading","period":"January 2026 - Present","location":"Kelurahan Penjaringan","details":["Research market trends and competitor movements.","Build partnerships with traders, communities, affiliates, and strategic partners.","Handle outreach, pitching, and deal negotiations.","Collaborate with marketing and product teams on growth initiatives.","Track performance metrics and optimize strategies based on data."]},{"role":"Business Growth Consultant","company":"Freelance (Self employed)","period":"January 2024 - July 2026","location":"Kota Bogor, Jawa Barat, Indonesia","details":["Help businesses identify growth opportunities through market research, customer analysis, and competitor benchmarking.","Design and execute data-driven growth strategies to increase revenue, customer acquisition, and market reach.","Advise founders and management teams on business models, pricing strategies, go-to-market plans, and process optimization.","Support partnership development and strategic collaborations.","Monitor key performance indicators (KPIs) and provide actionable recommendations based on performance insights."]},{"role":"Digital Strategist","company":"PT Bayarkilat Apps Indonesia","period":"June 2025 - December 2025","location":"Kota Bogor, Jawa Barat, Indonesia","details":["Developed and implemented performance-driven digital marketing campaigns across Meta Ads and Google Ads.","Built a cohesive content strategy for multi-channel presence (Instagram, Tiktok, Blog, WhatsApp Broadcast), improving brand awareness and organic engagement.","Conducted market and competitor analysis to fine-tune product positioning and user targeting.","Collaborated with cross-functional teams (design, tech, CS) to optimize user journey from ad to onboarding.","Introduced data dashboards and simple funnel tracking to monitor and improve campaign effectiveness.","Initiated user education content to reduce bounce rates and increase app conversion (1 content for youtube reach 1% conversion).","Make more 10% conversion sales with Organic Social Media, in 2 months."]},{"role":"Desainer Grafis","company":"Freelance","period":"January 2018 - June 2025","location":"Bogor, West Java, Indonesia","details":["Designed visual identities and brand logos tailored to client needs across diverse industries.","Created custom merchandise designs, including apparel, stickers, packaging, and promotional items.","Collaborated with clients to develop consistent visual branding and enhance brand recognition.","Delivered production-ready assets with attention to print specifications and scalability.","Managed end-to-end design process, from concept development to final execution, while maintaining brand consistency."]},{"role":"Business Owner","company":"Zero Cost Shop","period":"October 2016 - June 2025","location":"Kota Bogor, Jawa Barat, Indonesia","details":["Oversaw day-to-day operations of an online store on Tokopedia, including product listings, pricing, and descriptions.","Developed promotional strategies and discount campaigns to increase sales and product visibility.","Handled inventory management, shipping logistics, and customer service.","Analyzed store performance using Tokopedia\'s analytics tools and optimized product keywords for search ranking.","Designed promotional materials including thumbnails, banners, and campaign visuals."]},{"role":"Manajer Pengembangan Bisnis","company":"Loekis.in","period":"June 2021 - July 2024","location":"Bogor","details":["Developed business systems and growth strategies to support brand expansion.","Conducted market research and trend analysis to design targeted marketing strategies.","Initiated B2B discussions and negotiated with partners, vendors, and collaborators to drive business opportunities.","Created detailed customer segmentation and proposed frameworks for new product launches.","Designed and implemented operational SOPs to improve internal efficiency and workflow.","Collaborated with content, design, and production teams to align business goals with marketing execution."]},{"role":"Liaison Officer Pertukaran Mahasiswa Merdeka 2","company":"Kampus Merdeka","period":"August 2022 - December 2022","location":"Bogor, West Java, Indonesia","details":["Assisted inbound exchange students from various regions across Indonesia during their academic and cultural immersion at IPB University.","Coordinated academic schedules, student logistics, and communication with lecturers and university staff.","Acted as a bridge between students and university stakeholders to ensure smooth execution of both academic and extracurricular activities.","Supported cultural exchange initiatives, including batik workshops and local heritage exploration.","Compiled periodic reports and provided feedback for program improvement."]},{"role":"Content Manager","company":"Puffin Store ID","period":"June 2018 - March 2020","location":"Bogor, West Java, Indonesia","details":["Managed content distribution to online channels and social media platforms.","Used content management system to analyze user engagement and website traffic metrics.","Edited and sourced images and videos using Adobe Premiere and Adobe Photoshop.","Conceptualized, planned and executed original designs for Social Media."]},{"role":"Staff Intern","company":"HepiPop","period":"March 2018 - July 2018","location":"Bogor, West Java, Indonesia","details":["Supported operational and promotional activities for retail streetwear merchandise."]},{"role":"Packaging Intern","company":"CV. Multigrafika","period":"August 2016 - October 2016","location":"Bogor, West Java, Indonesia","details":["Minimized waste and reduced volume of packaging materials used to prepare shipments.","Inspected incoming and outgoing shipments to verify accuracy and prevent errors.","Completed daily orders with expert picking and packing of shipments.","Reviewed orders by inspecting labeling, packaging and contents.","Measured product sizes, packaging equipment needed and packing options."]} ]',
'[{"degree":"Bachelor of Business Administration - BBA","major":"Business/Commerce, General","school":"Institut Pertanian Bogor (IPB)","period":"2018 - January 2025"},{"degree":"SMK (Vocational High School)","major":"Intermedia / Multimedia","school":"SMK TARUNA TERPADU 1","period":"2016 - 2018"}]',
'{"age":"25 years","website":"aufarafii.id","email1":"aufatea1@gmail.com","email2":"me@aufarafii.id","phone":"+6287770050793","location":"Jakarta Metropolitan Area / Bogor, Indonesia"}',
'[{"label":"LinkedIn Profile","url":"https://www.linkedin.com/in/aufa-hadibrata/"},{"label":"Personal Linktree","url":"https://linktr.ee/aufarh"},{"label":"Personal Blog","url":"https://aufatea.my.id/"},{"label":"Instagram","url":"https://www.instagram.com/aufapai/"},{"label":"Zero Cost Shop (Tokopedia)","url":"https://www.tokopedia.com/zerocostshop"}]',
'["Make more 10% conversion sales with Organic Social Media in 2 months at PT Bayarkilat Apps Indonesia","Educational YouTube video content reached 1% app conversion rate","Built and operated Zero Cost Shop on Tokopedia for 8+ years (2016-2025)","Grew Instagram brand reach from 500 to 8,000+ followers in <1 year","Liaison Officer Pertukaran Mahasiswa Merdeka 2 di IPB University"]',
'["profile","experience","education","skills","portfolio","details","achievements"]',
'[{"category":"Core Strengths","items":[{"name":"Sales & CRM","text":"CRM","bg":"#0D9488"},{"name":"Business Development","text":"BD","bg":"#7C3AED"},{"name":"Growth Strategy","text":"GS","bg":"#2563EB"},{"name":"Workflow Optimization","text":"WO","bg":"#EA580C"}]},{"category":"Marketing & Growth","items":[{"name":"Meta Ads (FB/IG)","text":"Meta","bg":"#0081FB"},{"name":"Google Ads","text":"GAds","bg":"#4285F4"},{"name":"TikTok Marketing","text":"TT","bg":"#010101"},{"name":"WhatsApp Marketing","text":"WA","bg":"#25D366"},{"name":"Tokopedia Marketplace","text":"TP","bg":"#03AC0E"}]},{"category":"Design & Multimedia","items":[{"name":"Adobe Photoshop","text":"Ps","bg":"#31A8FF"},{"name":"Adobe Illustrator","text":"Ai","bg":"#FF9A00"},{"name":"Adobe InDesign","text":"Id","bg":"#FF3366"},{"name":"Adobe Premiere Pro","text":"Pr","bg":"#9999FF"},{"name":"Adobe After Effects","text":"Ae","bg":"#9999FF"},{"name":"Canva","text":"Cn","bg":"#00D4AA"}]},{"category":"Languages","items":[{"name":"Indonesian (Native or Bilingual)","text":"ID","bg":"#DC2626"},{"name":"English (Professional Working)","text":"EN","bg":"#1D4ED8"}]}]',
'section');

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
  `slug` varchar(255) DEFAULT NULL,
  `title` varchar(500) NOT NULL,
  `category` varchar(100) NOT NULL,
  `image_url` varchar(1000) DEFAULT '',
  `description` text,
  `external_link` varchar(1000) DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_category` (`category`),
  KEY `idx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample portfolio data
INSERT INTO `portfolio_projects` (`slug`, `title`, `category`, `image_url`, `description`, `external_link`) VALUES
('spmb-pgri-12', 'Sistem SPMB Pilot SMP PGRI 12', 'business', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80', 'Pengembangan dan uji debug sistem SPMB berbasis web terpusat untuk SMP PGRI 12. Mengotomatisasi alur pendaftaran, upload berkas, dan validasi data calon siswa dengan verifikasi instan.\n\nStatus: Tahap Uji Debug & Ongoing Development.', '/blog/sistem-dan-proyek'),
('penjadwalan-lare-music', 'Sistem Penjadwalan Multi-Cabang Lare Music School', 'business', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80', 'Perancangan matriks penjadwalan studio musik multi-cabang (Depok & Kota Wisata Cibubur). Menghilangkan risiko tabrakan jadwal tutor lintas cabang dan meningkatkan utilisasi ruangan studio.\n\nStatus: Prototype disetujui & diterima klien.', '/blog/sistem-dan-proyek'),
('workflow-lare-music', 'Optimasi Alur Kerja & Administrasi Lare Music', 'business', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80', 'Restrukturisasi alur verifikasi presensi, honor instruktur, dan invoice wali murid. Menghemat waktu administrasi bulanan dari sebelumnya 1 minggu penuh menjadi hanya 3 hari kerja (efisiensi >57%).\n\nStatus: Terimplementasi.', '/blog/sistem-dan-proyek'),
('survival-id', 'Survival.ID - AI Studio & Google Workspace PWA', 'business', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80', 'Aplikasi demo personal berbasis Progressive Web App (PWA) yang terhubung dengan Google AI Studio (Gemini) dan Google Workspace API untuk audit cepat strategi bisnis dan otomatisasi catatan cloud.\n\nStatus: Live Interactive Demo.', '/blog/sistem-dan-proyek'),
('dataset-hotel-bintang-5', 'Audit & Pembersihan Dataset Sertifikasi Hotel Bintang 5', 'business', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80', 'Proyek audit dan pembersihan 600+ baris data sertifikasi staf & fasilitas hotel bintang 5. Memangkas estimasi pengerjaan dari 2 minggu lebih menjadi hanya 3 hari berkat pipeline regex dan otomatisasi validasi.\n\nStatus: Selesai dengan akurasi 100%.', '/blog/sistem-dan-proyek'),
('sambalin-aza', 'Sambalin Aza - Culinary Branding & Recipe SOP', 'business', 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1000&q=80', 'Branding kuliner khas Sunda terpisah yang mencakup identitas visual kemasan, storytelling kearifan lokal, serta standarisasi SOP produksi resep sambal terasi matang & geprek.\n\nStatus: Brand Identity & Kitchen SOP Siap Skala.', '/blog/sistem-dan-proyek'),
('startech-enterprise', 'StarTech - Enterprise Copywriting & AI Visual Modules', 'business', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80', 'Modul sistem enterprise dan copywriting B2B untuk lini software StarTech. Mengemas arsitektur teknis rumit ke dalam visual UI modern yang siap dipresentasikan kepada C-Level eksekutif.\n\nStatus: Enterprise Design & Copy System.', '/blog/sistem-dan-proyek'),
('brand-refresh', 'Brand Identity Refresh', 'graphic-design', 'https://images.pexels.com/photos/1749303/pexels-photo-1749303.jpeg', 'Membuat ulang identitas visual untuk brand ritel modern.', ''),
('social-media-q3', 'Social Media Campaign Q3', 'digital-marketing', 'https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg', 'Kampanye FB Ads scale up dengan ROAS 4.5x.', ''),
('fintech-app', 'Fintech App Interface', 'ui-ux', 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg', 'Desain UI/UX untuk aplikasi pembayaran digital B2B.', '');

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
