/**
 * Admin Store - Synced with PHP MySQL Backend
 * Handles blog posts, CV data, about me, and traffic analytics
 * 
 * Data flow: React Frontend ↔ PHP API ↔ MySQL Database
 * Falls back to localStorage when API is unavailable (dev mode)
 */

import { API, apiFetch } from './apiConfig';

// ─── AUTH ───────────────────────────────────────────
export const adminAuth = {
  async login(email, password) {
    // Try PHP API first
    const res = await apiFetch(API.login, 'POST', { email, password });
    if (res.ok && res.data?.success) {
      localStorage.setItem('admin_token', res.data.token);
      localStorage.setItem('admin_session', JSON.stringify({
        authenticated: true,
        email: res.data.user?.email || email,
        name: res.data.user?.name || '',
        token: res.data.token,
      }));
      return { success: true, session: res.data };
    }
    
    // Fallback to local auth (dev mode)
    if (res.status === 0) {
      if (email === 'aufatea1@gmail.com' && password === 'Itsmeaufa517') {
        const session = { authenticated: true, email, loginTime: new Date().toISOString() };
        localStorage.setItem('admin_session', JSON.stringify(session));
        return { success: true, session };
      }
    }
    
    return { success: false, error: res.data?.error || 'Email atau password salah' };
  },

  async logout() {
    await apiFetch(API.logout, 'POST').catch(() => {});
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_session');
  },

  async isAuthenticated() {
    const token = localStorage.getItem('admin_token');
    if (token) {
      const res = await apiFetch(API.authCheck);
      if (res.ok && res.data?.authenticated) return true;
    }
    // Fallback: check local session
    try {
      const session = JSON.parse(localStorage.getItem('admin_session'));
      return session?.authenticated === true;
    } catch {
      return false;
    }
  },

  getSession() {
    try {
      return JSON.parse(localStorage.getItem('admin_session'));
    } catch {
      return null;
    }
  },
};

// ─── BLOG POSTS ─────────────────────────────────────
const DEFAULT_BLOGS = [
  {
    id: 'sistem-dan-proyek',
    title: 'Sistem & Proyek: Otomasi Alur Kerja dari Sekolah hingga Enterprise',
    slug: 'sistem-dan-proyek',
    category: 'Business Strategy',
    excerpt: 'Rangkuman studi kasus nyata: dari sistem pendaftaran siswa SPMB, penjadwalan multi-gedung Lare, otomasi workflow 1 minggu jadi 3 hari, hingga dataset sertifikasi hotel bintang 5.',
    content: `Gw suka bikin sesuatu yang bisa jalan sendiri. Bukan sekadar rapi di atas kertas atau bagus di slide presentasi, tapi beneran kepakai dan mempermudah orang tiap hari. Di bawah ini beberapa sistem dan proyek yang pernah gw rancang dan bangun, lengkap dengan akar masalahnya, pendekatan solusinya, tools yang digunakan, hingga hasil nyata yang dicapai.

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

**Tools:** AppSheet · Google Sheets · Google Drive · Google Docs Automation

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

**Tools:** AppSheet · Google Sheets · Google Calendar Integration

---

## 3. Digitalisasi Sistem Sekolah & Efisiensi Workflow Lare

![Digitalisasi Workflow Lare](https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80)

**Masalah:**  
Sistem operasional yang tersendat biasanya bukan hanya persoalan software. Sering kali akar masalahnya berada pada alur kerja (workflow) yang tidak jelas: tidak ada batasan jelas siapa mengerjakan apa, kapan tenggat waktunya, dan ke mana data diserahterimakan antar divisi.

**Yang gw kerjain:**  
Gw membedah alur lama yang bermasalah, menyusun standard operating procedure (SOP) digital, dan membangun logika alur kerja (workflow logic) baru untuk Lare. Sistem ini menghubungkan bagian front desk, koordinator guru, keuangan, dan pimpinan sekolah dalam satu rantai informasi yang transparan dan akuntabel.

**Hasil:**  
Mampu mempersingkat waktu kerja operasional dan koordinasi manajemen secara signifikan—dari yang sebelumnya membutuhkan waktu hingga 1 minggu penuh hanya untuk sinkronisasi data antar divisi, kini selesai dalam 3 hari saja berkat alur kerja yang terstruktur dan terotomatisasi.

**Tools:** AppSheet · Google Workspace · Process Flowchart Architecture · Digital SOP

---

## 4. Survival.ID — Smart Personal Finance Analytics

![Survival.ID Finance App](https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80)

**Ide & Masalah:**  
Sebagian besar aplikasi pencatat keuangan pribadi di luar sana hanya sekadar tabel pencatat angka. Jarang ada yang bisa memberikan insight cerdas tentang perilaku belanja atau memberi rekomendasi alokasi dana secara personal tanpa ribet.

**Yang gw bangun:**  
Aplikasi berbasis Progressive Web App (PWA) yang memadukan input pengeluaran harian dengan kecerdasan buatan Google AI Studio (Gemini API). Aplikasi ini mampu membaca pola transaksi, mengelompokkan pengeluaran tak terduga, dan menyajikan rekomendasi penghematan, serta tersinkronisasi otomatis dengan ekosistem Google Workspace pribadi.

**Status & Hasil:**  
Saat ini berupa versi demo fungsional untuk kebutuhan analisis dan eksperimen pribadi, membuktikan potensi integrasi model LLM Gemini dalam pengelolaan finansial harian yang ringkas dan bebas friksi.

**Tools:** Progressive Web App (PWA) · Google AI Studio (Gemini API) · Google Workspace · JavaScript

---

## 5. Dataset Sertifikasi 600+ Item untuk Hotel Bintang 5

![Hotel Bintang 5 Dataset](https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80)

**Tantangan:**  
Sebuah hotel bintang lima terkemuka di Jakarta memerlukan penyusunan dataset sertifikasi standar mutu dan kepatuhan dengan volume besar (lebih dari 600 butir parameter audit). Dokumen ini memiliki hierarki ketat, parameter regulasi yang rumit, dan harus segera siap diuji di lapangan tanpa ada celah inkonsistensi data.

**Cara gw ngerjain:**  
Alih-alih menginput dan memvalidasi manual satu per satu, gw merancang pipeline otomasi menggunakan Google Flow, Google AI Studio, dan Gemini. Alur ini secara otomatis memvalidasi klasifikasi klausul sertifikasi, mengecek silang regulasi, dan mengekspor hasilnya secara instan ke format PDF, Word, dan spreadsheet Excel agar fleksibel digunakan oleh auditor lapangan.

**Hasil:**  
Memangkas waktu pengerjaan proyek secara drastis—pekerjaan yang normalnya memakan waktu lebih dari 2 minggu kerja berhasil dituntaskan hanya dalam kurun waktu 3 hari, dengan akurasi klasifikasi data yang presisi sesuai standar kepatuhan hotel bintang 5.

**Tools:** Google Flow · Google AI Studio · Gemini API · Google Sheets · Document Automation

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

**Tools:** Adobe Illustrator · Adobe Photoshop · Canva · Social Media Calendar Planning

---

## 7. StarTech — Enterprise Software Copywriting & Module Visualization

![StarTech Enterprise Software](https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80)

**Konteks:**  
StarTech merupakan perusahaan penyedia solusi software untuk segmen korporat (enterprise). Produk software enterprise sering kali sulit dikomunikasikan ke pimpinan bisnis karena bahasanya terlalu teknis dan visual modulnya kaku.

**Yang gw bangun:**  
- Copywriting pemasaran berbahasa Inggris (English marketing copy) yang persuasif dan berbobot bisnis untuk booklet profil perusahaan (Company Profile).
- Rekayasa prompt generatif AI untuk menciptakan visualisasi antarmuka modul-modul software enterprise yang futuristik, bersih, dan profesional.
- Penataan struktur materi presentasi B2B agar mudah dicerna oleh para pengambil keputusan (C-level & manajer IT).

**Hasil:**  
Booklet profil perusahaan StarTech tampil berstandar internasional, dengan bahasa bisnis yang meyakinkan serta visual modul software yang premium untuk mendukung presentasi penawaran proyek enterprise.

**Tools:** B2B English Copywriting · Generative AI Art Direction · Prompt Engineering · Figma

---

## Penutup

Kalau bisnis atau institusi kamu punya masalah operasional yang rumit, alur kerja yang berceceran, atau butuh sistem digital yang bikin kerjaan lebih cepat dan akurat, gw selalu terbuka untuk diskusi. Hubungi gw langsung melalui halaman kontak di website ini atau lewat LinkedIn.`,
    cover_image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    author: 'Aufa Rafii Hadibrata',
    date: '2026-09-28',
    read_time: '7 min read',
    published: true,
    created_at: '2026-09-28T12:00:00.000Z',
  },
  {
    id: 'transformasi-bisnis',
    title: 'Transformasi Bisnis Digital: Kisah Sukses Aufa Rafii Hadibrata',
    slug: 'transformasi-bisnis',
    category: 'Business',
    excerpt: 'Membangun fondasi kuat di dunia pemasaran dan kewirausahaan, mulai dari Zero Cost Shop hingga manajemen strategi digital.',
    content: 'Halo, saya Aufa Rafii Hadibrata, seorang lulusan bisnis dari IPB University...',
    cover_image: 'https://images.pexels.com/photos/7289746/pexels-photo-7289746.jpeg?cs=srgb&dl=pexels-kampus-7289746.jpg&fm=jpg',
    author: 'Aufa Rafii',
    date: '2025-12-21',
    read_time: '5 min read',
    published: true,
    created_at: '2025-12-21T00:00:00.000Z',
  },
  {
    id: 'cari-duit',
    title: '"Bagaimana Cara Cari Duit di Internet": A 2010 Story',
    slug: 'cari-duit',
    category: 'Personal Journey',
    excerpt: 'Hal yang pertama kali gw cari di internet adalah "Bagaimana Cara Cari Duit di Internet".',
    content: 'Hal yang pertama kali gw cari di internet...',
    cover_image: '',
    author: 'Aufa Rafii',
    date: '2025-12-20',
    read_time: '3 min read',
    published: true,
    created_at: '2025-12-20T00:00:00.000Z',
  },
];

export const blogStore = {
  // Fetch from PHP API → fallback to defaults
  async getAll() {
    const res = await apiFetch(API.blogs);
    if (res.ok && Array.isArray(res.data)) {
      return res.data.map(normalizePost);
    }
    return DEFAULT_BLOGS;
  },

  async getPublished() {
    const res = await apiFetch(API.blogsPublished);
    if (res.ok && Array.isArray(res.data)) {
      return res.data.map(normalizePost);
    }
    return DEFAULT_BLOGS.filter(b => b.published);
  },

  async getBySlug(slug) {
    const res = await apiFetch(API.blogBySlug(slug));
    if (res.ok && res.data && !res.data.error) {
      return normalizePost(res.data);
    }
    return DEFAULT_BLOGS.find(b => b.slug === slug || b.id === slug) || null;
  },

  async getById(id) {
    const res = await apiFetch(API.blogById(id));
    if (res.ok && res.data && !res.data.error) {
      return normalizePost(res.data);
    }
    return null;
  },

  async save(blog) {
    if (blog.id && blog.id !== 'new') {
      // Update
      const res = await apiFetch(`${API.blogs}?id=${blog.id}`, 'PUT', blog);
      return res.ok ? res.data : null;
    } else {
      // Create
      const res = await apiFetch(API.blogs, 'POST', blog);
      return res.ok ? res.data : null;
    }
  },

  async delete(id) {
    await apiFetch(`${API.blogs}?id=${id}`, 'DELETE');
  },
};

// Normalize blog post from API to consistent format
function normalizePost(post) {
  return {
    ...post,
    id: post.id,
    slug: post.slug || post.id,
    date: post.created_at?.split(' ')[0] || post.created_at?.split('T')[0] || '',
    published: post.published == 1 || post.published === true,
    coverImage: post.cover_image || post.coverImage || '',
    readTime: post.read_time || post.readTime || '5 min read',
  };
}

// ─── CV DATA ────────────────────────────────────────
export const cvStore = {
  async get() {
    const res = await apiFetch(API.cv);
    if (res.ok && res.data?.content) {
      return res.data.content;
    }
    // Fallback: load from static file
    return this.loadDefault();
  },

  async save(markdownContent) {
    const res = await apiFetch(API.cv, 'PUT', { content: markdownContent });
    return res.ok;
  },

  async loadDefault() {
    try {
      const res = await fetch('/data/cv-aufa.md');
      return await res.text();
    } catch {
      return '# CV Data not found';
    }
  },
};

export const LINKEDIN_ABOUT_DATA = {
  name: "Aufa Rafii' Hadibrata",
  title: "Business Development @HOTs_Trading | Business Growth Consultant | Digital Marketing",
  bio: "Hi, I’m Aufa Rafii Hadibrata (Pai), a business graduate from IPB University with hands-on experience in business development, digital marketing, and operational improvement.\n\nI specialize in helping businesses grow by building better systems — from strategy, market research, and digital execution to workflow optimization and performance tracking.\n\nMy background spans across content management, branding execution, growth strategy, and process improvement, which allows me to connect business goals with real execution on the ground.\n\nI’m particularly interested in Business Process Improvement, Digital Transformation, and AI/Automation tools to improve efficiency and scalability for SMEs and growing companies.\n\nCore strengths:\n• Business Development & Strategic Planning\n• Market Research & Competitor Analysis\n• Digital Marketing & Content Strategy\n• Workflow Optimization & System Building\n• Cross-functional Execution (Business x Creative x Tech)\n\nCurrently open to opportunities in Business Analyst, Business Development, Growth, or Digital Transformation roles.",
  skills: [
    "Business Development",
    "Sales",
    "Customer Relationship Management (CRM)",
    "Digital Marketing",
    "Growth Strategy",
    "Workflow Optimization",
    "Graphic Design",
    "Business Process Improvement"
  ],
  social: {
    instagram: "@aufapai",
    email: "aufatea1@gmail.com",
    linkedin: "https://www.linkedin.com/in/aufa-hadibrata/",
    blog: "https://aufatea.my.id/",
    linktree: "https://linktr.ee/aufarh"
  },
  experience: [
    {
      role: "Business Development Manager",
      company: "Hots Trading",
      period: "January 2026 - Present",
      location: "Kelurahan Penjaringan",
      details: [
        "Research market trends and competitor movements.",
        "Build partnerships with traders, communities, affiliates, and strategic partners.",
        "Handle outreach, pitching, and deal negotiations.",
        "Collaborate with marketing and product teams on growth initiatives.",
        "Track performance metrics and optimize strategies based on data."
      ]
    },
    {
      role: "Business Growth Consultant",
      company: "Freelance (Self employed)",
      period: "January 2024 - July 2026",
      location: "Kota Bogor, Jawa Barat, Indonesia",
      details: [
        "Help businesses identify growth opportunities through market research, customer analysis, and competitor benchmarking.",
        "Design and execute data-driven growth strategies to increase revenue, customer acquisition, and market reach.",
        "Advise founders and management teams on business models, pricing strategies, go-to-market plans, and process optimization.",
        "Support partnership development and strategic collaborations.",
        "Monitor key performance indicators (KPIs) and provide actionable recommendations based on performance insights."
      ]
    },
    {
      role: "Digital Strategist",
      company: "PT Bayarkilat Apps Indonesia",
      period: "June 2025 - December 2025",
      location: "Kota Bogor, Jawa Barat, Indonesia",
      details: [
        "Developed and implemented performance-driven digital marketing campaigns across Meta Ads and Google Ads.",
        "Built a cohesive content strategy for multi-channel presence (Instagram, Tiktok, Blog, WhatsApp Broadcast), improving brand awareness and organic engagement.",
        "Conducted market and competitor analysis to fine-tune product positioning and user targeting.",
        "Collaborated with cross-functional teams (design, tech, CS) to optimize user journey from ad to onboarding.",
        "Introduced data dashboards and simple funnel tracking to monitor and improve campaign effectiveness.",
        "Initiated user education content to reduce bounce rates and increase app conversion (1 content for youtube reach 1% conversion).",
        "Make more 10% conversion sales with Organic Social Media, in 2 months."
      ]
    },
    {
      role: "Desainer Grafis",
      company: "Freelance",
      period: "January 2018 - June 2025",
      location: "Bogor, West Java, Indonesia",
      details: [
        "Designed visual identities and brand logos tailored to client needs across diverse industries.",
        "Created custom merchandise designs, including apparel, stickers, packaging, and promotional items.",
        "Collaborated with clients to develop consistent visual branding and enhance brand recognition.",
        "Delivered production-ready assets with attention to print specifications and scalability.",
        "Managed end-to-end design process, from concept development to final execution, while maintaining brand consistency."
      ]
    },
    {
      role: "Business Owner",
      company: "Zero Cost Shop",
      period: "October 2016 - June 2025",
      location: "Kota Bogor, Jawa Barat, Indonesia",
      details: [
        "Oversaw day-to-day operations of an online store on Tokopedia, including product listings, pricing, and descriptions.",
        "Developed promotional strategies and discount campaigns to increase sales and product visibility.",
        "Handled inventory management, shipping logistics, and customer service.",
        "Analyzed store performance using Tokopedia's analytics tools and optimized product keywords for search ranking.",
        "Designed promotional materials including thumbnails, banners, and campaign visuals."
      ]
    },
    {
      role: "Manajer Pengembangan Bisnis",
      company: "Loekis.in",
      period: "June 2021 - July 2024",
      location: "Bogor",
      details: [
        "Developed business systems and growth strategies to support brand expansion.",
        "Conducted market research and trend analysis to design targeted marketing strategies.",
        "Initiated B2B discussions and negotiated with partners, vendors, and collaborators to drive business opportunities.",
        "Created detailed customer segmentation and proposed frameworks for new product launches.",
        "Designed and implemented operational SOPs to improve internal efficiency and workflow.",
        "Collaborated with content, design, and production teams to align business goals with marketing execution."
      ]
    },
    {
      role: "Liaison Officer Pertukaran Mahasiswa Merdeka 2",
      company: "Kampus Merdeka",
      period: "August 2022 - December 2022",
      location: "Bogor, West Java, Indonesia",
      details: [
        "Assisted inbound exchange students from various regions across Indonesia during their academic and cultural immersion at IPB University.",
        "Coordinated academic schedules, student logistics, and communication with lecturers and university staff.",
        "Acted as a bridge between students and university stakeholders to ensure smooth execution of both academic and extracurricular activities.",
        "Supported cultural exchange initiatives, including batik workshops and local heritage exploration.",
        "Compiled periodic reports and provided feedback for program improvement."
      ]
    },
    {
      role: "Content Manager",
      company: "Puffin Store ID",
      period: "June 2018 - March 2020",
      location: "Bogor, West Java, Indonesia",
      details: [
        "Managed content distribution to online channels and social media platforms.",
        "Used content management system to analyze user engagement and website traffic metrics.",
        "Edited and sourced images and videos using Adobe Premiere and Adobe Photoshop.",
        "Conceptualized, planned and executed original designs for Social Media."
      ]
    },
    {
      role: "Staff Intern",
      company: "HepiPop",
      period: "March 2018 - July 2018",
      location: "Bogor, West Java, Indonesia",
      details: [
        "Supported brand merchandise operations and social media promotional campaigns."
      ]
    },
    {
      role: "Packaging Intern",
      company: "CV. Multigrafika",
      period: "August 2016 - October 2016",
      location: "Bogor, West Java, Indonesia",
      details: [
        "Minimized waste and reduced volume of packaging materials used to prepare shipments.",
        "Inspected incoming and outgoing shipments to verify accuracy and prevent errors.",
        "Completed daily orders with expert picking and packing of shipments.",
        "Reviewed orders by inspecting labeling, packaging and contents.",
        "Measured product sizes, packaging equipment needed and packing options."
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Business Administration - BBA",
      major: "Business/Commerce, General",
      school: "Institut Pertanian Bogor (IPB)",
      period: "2018 - January 2025"
    },
    {
      degree: "SMK (Vocational High School)",
      major: "Intermedia / Multimedia",
      school: "SMK TARUNA TERPADU 1",
      period: "2016 - 2018"
    }
  ],
  details: {
    age: "25 years",
    website: "aufarafii.id",
    email1: "aufatea1@gmail.com",
    email2: "me@aufarafii.id",
    phone: "+6287770050793",
    location: "Jakarta Metropolitan Area / Bogor, Indonesia"
  },
  portfolio_links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/aufa-hadibrata/" },
    { label: "Personal Linktree", url: "https://linktr.ee/aufarh" },
    { label: "Blog", url: "https://aufatea.my.id/" },
    { label: "Instagram", url: "https://www.instagram.com/aufapai/" },
    { label: "Tokopedia (Zero Cost Shop)", url: "https://www.tokopedia.com/zerocostshop" }
  ],
  achievements: [
    "Make more 10% conversion sales with Organic Social Media in 2 months at PT Bayarkilat Apps Indonesia",
    "Educational YouTube video content reached 1% app conversion rate",
    "Built and operated Zero Cost Shop on Tokopedia for 8+ years (2016-2025)",
    "Grew Instagram brand reach from 500 to 8,000+ followers in <1 year",
    "Liaison Officer Pertukaran Mahasiswa Merdeka 2 di IPB University"
  ],
  section_order: ['profile', 'experience', 'education', 'skills', 'portfolio', 'details', 'achievements'],
  custom_skills: [
    {
      category: "Core Strengths",
      items: [
        { name: "Sales & CRM", text: "CRM", bg: "#0D9488" },
        { name: "Business Development", text: "BD", bg: "#7C3AED" },
        { name: "Growth Strategy", text: "GS", bg: "#2563EB" },
        { name: "Workflow Optimization", text: "WO", bg: "#EA580C" }
      ]
    },
    {
      category: "Marketing & Growth",
      items: [
        { name: "Meta Ads (FB/IG)", text: "Meta", bg: "#0081FB" },
        { name: "Google Ads", text: "GAds", bg: "#4285F4" },
        { name: "TikTok Marketing", text: "TT", bg: "#010101" },
        { name: "WhatsApp Marketing", text: "WA", bg: "#25D366" },
        { name: "Tokopedia Marketplace", text: "TP", bg: "#03AC0E" }
      ]
    },
    {
      category: "Design & Multimedia",
      items: [
        { name: "Adobe Photoshop", text: "Ps", bg: "#31A8FF" },
        { name: "Adobe Illustrator", text: "Ai", bg: "#FF9A00" },
        { name: "Adobe InDesign", text: "Id", bg: "#FF3366" },
        { name: "Adobe Premiere Pro", text: "Pr", bg: "#9999FF" },
        { name: "Adobe After Effects", text: "Ae", bg: "#9999FF" },
        { name: "Canva", text: "Cn", bg: "#00D4AA" }
      ]
    },
    {
      category: "Languages",
      items: [
        { name: "Indonesian (Native or Bilingual)", text: "ID", bg: "#DC2626" },
        { name: "English (Professional Working)", text: "EN", bg: "#1D4ED8" }
      ]
    }
  ],
  contact_menu_target: 'section'
};

const DEFAULT_ABOUT = LINKEDIN_ABOUT_DATA;

export const aboutStore = {
  async get() {
    const res = await apiFetch(API.about);
    if (res.ok && res.data && res.data.name) {
      const parsedExperience = Array.isArray(res.data.experience) ? res.data.experience : JSON.parse(res.data.experience || '[]');
      const parsedEducation = Array.isArray(res.data.education) ? res.data.education : JSON.parse(res.data.education || '[]');
      const parsedDetails = typeof res.data.details === 'object' ? res.data.details : JSON.parse(res.data.details || '{}');
      const parsedLinks = Array.isArray(res.data.portfolio_links) ? res.data.portfolio_links : JSON.parse(res.data.portfolio_links || '[]');
      const parsedOrder = Array.isArray(res.data.section_order) ? res.data.section_order : JSON.parse(res.data.section_order || '[]');
      const parsedCustomSkills = Array.isArray(res.data.custom_skills) ? res.data.custom_skills : JSON.parse(res.data.custom_skills || '[]');
      const parsedAchievements = Array.isArray(res.data.achievements) ? res.data.achievements : JSON.parse(res.data.achievements || '[]');
      const parsedSkills = Array.isArray(res.data.skills) ? res.data.skills : JSON.parse(res.data.skills || '[]');

      return {
        ...res.data,
        name: res.data.name || LINKEDIN_ABOUT_DATA.name,
        title: res.data.title || LINKEDIN_ABOUT_DATA.title,
        bio: res.data.bio || LINKEDIN_ABOUT_DATA.bio,
        skills: parsedSkills.length > 0 ? parsedSkills : LINKEDIN_ABOUT_DATA.skills,
        social: typeof res.data.social === 'object' ? res.data.social : JSON.parse(res.data.social || '{}'),
        experience: parsedExperience.length > 0 ? parsedExperience : LINKEDIN_ABOUT_DATA.experience,
        education: parsedEducation.length > 0 ? parsedEducation : LINKEDIN_ABOUT_DATA.education,
        details: Object.keys(parsedDetails).length > 0 ? parsedDetails : LINKEDIN_ABOUT_DATA.details,
        portfolio_links: parsedLinks.length > 0 ? parsedLinks : LINKEDIN_ABOUT_DATA.portfolio_links,
        achievements: parsedAchievements.length > 0 ? parsedAchievements : LINKEDIN_ABOUT_DATA.achievements,
        section_order: parsedOrder.length > 0 ? parsedOrder : LINKEDIN_ABOUT_DATA.section_order,
        custom_skills: parsedCustomSkills.length > 0 ? parsedCustomSkills : LINKEDIN_ABOUT_DATA.custom_skills,
        contact_menu_target: res.data.contact_menu_target || 'section'
      };
    }
    return DEFAULT_ABOUT;
  },

  async save(data) {
    const res = await apiFetch(API.about, 'PUT', data);
    return res.ok;
  },

  getLinkedInPreset() {
    return JSON.parse(JSON.stringify(LINKEDIN_ABOUT_DATA));
  }
};

// ─── TRAFFIC ANALYTICS ──────────────────────────────
export const trafficStore = {
  // Track page view → sends to PHP API → saved in MySQL
  track(page) {
    const data = {
      page,
      referrer: document.referrer || 'Direct',
      user_agent: navigator.userAgent,
      screen_size: `${window.innerWidth}x${window.innerHeight}`,
    };

    // Use sendBeacon for non-blocking (best for page unloads)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(API.trackVisit, JSON.stringify(data));
    } else {
      fetch(API.trackVisit, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true,
      }).catch(() => {});
    }
  },

  async getStats() {
    const res = await apiFetch(API.trafficStats);
    if (res.ok && res.data) {
      return {
        totalViews: res.data.totalViews || 0,
        todayViews: res.data.todayViews || 0,
        weekViews: res.data.weekViews || 0,
        monthViews: res.data.monthViews || 0,
        pageViews: (res.data.pageViews || []).map(p => ({ page: p.page, views: parseInt(p.views) })),
        dailyViews: (res.data.dailyViews || []).map(d => ({ date: d.date, views: parseInt(d.views) })),
        referrers: (res.data.referrers || []).map(r => ({ source: r.source, views: parseInt(r.views) })),
        devices: res.data.devices || { desktop: 0, mobile: 0, tablet: 0 },
        recentVisits: [],
      };
    }
    return { totalViews: 0, todayViews: 0, weekViews: 0, monthViews: 0, pageViews: [], dailyViews: [], referrers: [], devices: { desktop: 0, mobile: 0, tablet: 0 }, recentVisits: [] };
  },

  async getRecent() {
    const res = await apiFetch(API.trafficRecent);
    return res.ok && Array.isArray(res.data) ? res.data : [];
  },

  async clear() {
    await apiFetch(API.trafficClear, 'DELETE');
  },
};

// ─── MESSAGES (CONTACT) ──────────────────────────────
export const messageStore = {
  async send(data) {
    const res = await apiFetch(API.messagesSend, 'POST', data);
    return res.ok && res.data ? res.data : { success: false, error: 'Gagal mengirim pesan' };
  },
  async getList() {
    const res = await apiFetch(API.messagesList);
    return res.ok && Array.isArray(res.data) ? res.data : [];
  },
  async delete(id) {
    await apiFetch(API.messageDelete(id), 'DELETE');
  }
};

// ─── PORTFOLIO PROJECTS ─────────────────────────────
export const DEFAULT_PORTFOLIO = [
  {
    id: 'spmb-pgri-12',
    title: 'Sistem SPMB Terpadu — SMP PGRI 12 Bogor',
    category: 'business',
    image_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    description: `## Overview
Sistem SPMB (Seleksi Penerimaan Murid Baru) terpadu berbasis AppSheet dan Google Workspace untuk mengatasi keruwetan pendataan formulir, cicilan keuangan, dan pembagian seragam siswa baru di SMP PGRI 12 Bogor.

### Masalah & Tantangan
Pendaftaran murid baru sering menghadapi masalah data pendaftar, bukti transfer, cicilan biaya masuk, dan pembagian seragam yang berceceran di berbagai chat WhatsApp dan spreadsheet terpisah. Hal ini menyebabkan risiko salah data, sulitnya melacak tunggakan, dan merekap secara manual.

### Solusi yang Dibangun
- Form pendaftaran online dan pelacakan status bertahap: pendaftaran awal, verifikasi berkas, daftar ulang, hingga status pelunasan.
- Skema pelunasan fleksibel dengan 3 kolom cicilan otomatis terhitung.
- Kategorisasi jalur pendaftaran: Domisili, Afirmasi, Prestasi, dan Mutasi.
- Otomasi pembuatan Surat Tanda Diterima berformat PDF resmi berkop sekolah yang ter-generate otomatis lengkap dengan nama siswa.
- Hak akses panitia terpisah berbasis username dan password per divisi (keuangan, seragam, dan administrasi berkas).
- Sistem audit log aktivitas dan recycle bin (pemulihan data terhapus) untuk keamanan data.
- Dashboard visual rekap penerimaan dan total keuangan secara real-time, plus export Excel siap cetak.

### Hasil & Status
Saat ini sistem masih dalam tahap uji coba & debugging (pilot testing) namun on-going proses aktif digunakan. Berhasil mengintegrasikan data pendaftar dan mempermudah panitia sekolah tanpa rekap manual berceceran.

**Tools:** AppSheet · Google Sheets · Google Drive · Google Docs Automation`,
    external_link: ''
  },
  {
    id: 'penjadwalan-lare-music',
    title: 'Sistem Penjadwalan Guru Multi-Gedung — Lare Music School',
    category: 'business',
    image_url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80',
    description: `## Overview
Dashboard penjadwalan cerdas untuk mengkoordinasikan jadwal mengajar puluhan guru musik di 3 gedung cabang (Depok & Kota Wisata), menghilangkan jadwal bentrok dan kelelahan mobilitas pengajar.

### Masalah & Tantangan
Di lembaga pendidikan musik dengan 3 cabang gedung, para pengajar sering kali harus berpindah lokasi gedung dengan jadwal yang tidak berurutan. Jarak antar cabang bervariasi dari 500 meter hingga 3 kilometer. Hasilnya, jadwal bentrok antar studio sering terjadi, pengajar kelelahan mobilitas, dan operasional kelas sempat terganggu.

### Pendekatan & Solusi
- Memetakan matriks jarak tempuh, ketersediaan ruang studio per alat musik, serta jam preferensi tiap pengajar.
- Satu jadwal baku yang konsisten untuk 1 semester penuh.
- Logika validasi otomatis agar tidak ada jadwal guru maupun ruangan studio yang bertabrakan.
- Informasi jadwal real-time yang mudah diakses dan dibagikan ke seluruh tim pengajar via mobile.

### Hasil & Status
Sistem saat ini sudah berhasil dibangun dalam bentuk prototipe fungsional. Pihak manajemen Lare Music School (Depok & Kota Wisata) sangat menyukai dan mengapresiasi sistem ini karena berhasil menuntaskan masalah jadwal bentrok yang selama ini menjadi komplain berkepanjangan.

**Tools:** AppSheet · Google Sheets · Google Calendar Integration`,
    external_link: ''
  },
  {
    id: 'workflow-lare-music',
    title: 'Digitalisasi Sistem Sekolah & Efisiensi Workflow Lare',
    category: 'business',
    image_url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    description: `## Overview
Transformasi digital alur kerja sekolah musik Lare untuk merampingkan birokrasi operasional dan koordinasi antar divisi dari 1 minggu menjadi hanya 3 hari.

### Masalah & Tantangan
Sistem operasional yang tersendat biasanya bukan hanya persoalan software. Sering kali akar masalahnya berada pada alur kerja (workflow) yang tidak jelas: tidak ada batasan jelas siapa mengerjakan apa, kapan tenggat waktunya, dan ke mana data diserahterimakan antar divisi.

### Solusi yang Dikerjakan
- Membedah bottleneck alur kerja lama yang tumpang tindih.
- Menyusun Standard Operating Procedure (SOP) digital yang aplikatif.
- Membangun logika alur kerja (workflow logic) terpadu yang menghubungkan bagian front desk, koordinator guru, keuangan, dan pimpinan sekolah dalam satu rantai informasi transparan dan akuntabel.

### Hasil Nyata
Mampu mempersingkat waktu kerja operasional dan koordinasi manajemen secara signifikan—dari yang sebelumnya membutuhkan waktu hingga 1 minggu penuh hanya untuk sinkronisasi data antar divisi, kini selesai dalam 3 hari saja berkat alur kerja yang terstruktur dan terotomatisasi.

**Tools:** AppSheet · Google Workspace · Process Flowchart Architecture · Digital SOP`,
    external_link: ''
  },
  {
    id: 'survival-id',
    title: 'Survival.ID — Smart Personal Finance Analytics',
    category: 'business',
    image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    description: `## Overview
Aplikasi Progressive Web App (PWA) cerdas yang memadukan pencatatan keuangan harian dengan model AI Gemini dari Google AI Studio untuk menganalisis pola belanja dan efisiensi pengeluaran.

### Ide & Tantangan
Sebagian besar aplikasi pencatat keuangan pribadi di luar sana hanya sekadar tabel pencatat angka. Jarang ada yang bisa memberikan insight cerdas tentang perilaku belanja atau memberi rekomendasi alokasi dana secara personal tanpa ribet.

### Solusi yang Dibangun
- Antarmuka responsif PWA yang ringan dan cepat diakses di perangkat mobile maupun desktop.
- Integrasi Google AI Studio (Gemini API) untuk membaca pola transaksi, mengelompokkan pos pengeluaran tak terduga, dan menyajikan insight keuangan mingguan.
- Sinkronisasi cloud otomatis ke Google Workspace pribadi untuk fleksibilitas backup data jangka panjang.

### Hasil & Status
Saat ini berupa versi demo fungsional untuk kebutuhan analisis dan eksperimen pribadi, membuktikan potensi integrasi AI dalam manajemen finansial harian yang ringkas dan bebas friksi.

**Tools:** Progressive Web App (PWA) · Google AI Studio (Gemini API) · Google Workspace · JavaScript`,
    external_link: ''
  },
  {
    id: 'dataset-hotel-bintang-5',
    title: 'Otomasi Dataset Sertifikasi 600+ Item — Hotel Bintang 5',
    category: 'business',
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    description: `## Overview
Pipeline otomasi data menggunakan Google Flow, AI Studio, dan Gemini untuk memproses dan memvalidasi dataset sertifikasi standar mutu 600+ item untuk hotel bintang 5 di Jakarta dalam 3 hari (dari estimasi normal 2 minggu lebih).

### Tantangan
Sebuah hotel bintang lima terkemuka di Jakarta memerlukan penyusunan dataset sertifikasi standar mutu dan kepatuhan dengan volume besar (lebih dari 600 butir parameter audit). Dokumen ini memiliki hierarki ketat, parameter regulasi yang rumit, dan harus segera siap diuji di lapangan tanpa ada celah inkonsistensi data.

### Solusi & Pendekatan Otomasi
Alih-alih menginput dan memvalidasi manual satu per satu, dibangun pipeline otomasi cerdas menggunakan Google Flow, Google AI Studio, dan Gemini. Alur ini secara otomatis memvalidasi klasifikasi klausul sertifikasi, mengecek silang regulasi, dan mengekspor hasilnya secara instan ke format PDF, Word, dan spreadsheet Excel agar fleksibel digunakan oleh auditor lapangan.

### Hasil & Dampak
Memangkas waktu pengerjaan proyek secara drastis—pekerjaan yang normalnya memakan waktu lebih dari 2 minggu kerja berhasil dituntaskan hanya dalam kurun waktu 3 hari, dengan akurasi klasifikasi data yang presisi sesuai standar kepatuhan hotel bintang 5.

**Tools:** Google Flow · Google AI Studio · Gemini API · Google Sheets · Document Automation`,
    external_link: ''
  },
  {
    id: 'sambalin-aza',
    title: 'Sambalin Aza — Resto Branding & Operational SOP System',
    category: 'business',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    description: `## Overview
Pengembangan identitas visual, buku menu eksklusif, SOP operasional konten, dan perencanaan kalender konten 6 bulan untuk restoran kuliner Sunda Sambalin Aza.

### Konteks & Kebutuhan
Sambalin Aza adalah bisnis restoran kuliner Sunda yang sedang berkembang. Tantangannya adalah bagaimana menyajikan cita rasa tradisional namun dengan pengalaman merek yang modern, rapi, dan operasional promosi yang tertib.

### Yang Dibangun
- Desain Buku Menu (Menu Book) eksklusif dengan tata letak visual yang menggugah selera dan mudah dipahami konsumen.
- Standard Operating Procedure (SOP) operasional konten untuk sinkronisasi tim outlet dan tim media sosial.
- Kalender Konten (Content Calendar) komprehensif selama 6 bulan penuh yang mencakup pilar konten edukasi, promo tematik, dan video interaktif.

### Hasil Nyata
Restoran memiliki panduan identitas visual yang solid di meja makan konsumen, serta ritme publikasi media sosial yang konsisten dan terencana rapi tanpa kebingungan membuat konten harian.

**Tools:** Adobe Illustrator · Adobe Photoshop · Canva · Social Media Calendar Planning`,
    external_link: ''
  },
  {
    id: 'startech-enterprise',
    title: 'StarTech — Enterprise Software Marketing & Visual System',
    category: 'business',
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    description: `## Overview
Perancangan materi pemasaran B2B berstandar global untuk StarTech Software, mencakup copywriting bahasa Inggris profil perusahaan dan visualisasi modul software enterprise menggunakan AI prompt engineering.

### Konteks & Kebutuhan
StarTech merupakan perusahaan penyedia solusi software untuk segmen korporat (enterprise). Produk software enterprise sering kali sulit dikomunikasikan ke pimpinan bisnis karena bahasanya terlalu teknis dan visual modulnya kaku.

### Yang Dibangun
- Copywriting pemasaran berbahasa Inggris (English marketing copy) yang persuasif dan berbobot bisnis untuk booklet profil perusahaan (Company Profile).
- Rekayasa prompt generatif AI untuk menciptakan visualisasi antarmuka modul-modul software enterprise yang futuristik, bersih, dan profesional.
- Penataan struktur materi presentasi B2B agar mudah dicerna oleh para pengambil keputusan (C-level & manajer IT).

### Hasil Nyata
Booklet profil perusahaan StarTech tampil berstandar internasional, dengan bahasa bisnis yang meyakinkan serta visual modul software yang premium untuk mendukung presentasi penawaran proyek enterprise.

**Tools:** B2B English Copywriting · Generative AI Art Direction · Prompt Engineering · Figma`,
    external_link: ''
  }
];

export const portfolioStore = {
  async getAll() {
    const res = await apiFetch(API.portfolio);
    if (res.ok && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    return DEFAULT_PORTFOLIO;
  },
  async getById(id) {
    const res = await apiFetch(`${API.portfolio}?id=${id}`);
    if (res.ok && res.data && !res.data.error) {
      return res.data;
    }
    return DEFAULT_PORTFOLIO.find(p => String(p.id) === String(id) || p.slug === id) || null;
  },
  async getByCategory(cat) {
    const res = await apiFetch(API.portfolioCategory(cat));
    if (res.ok && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    return DEFAULT_PORTFOLIO.filter(p => p.category === cat);
  },
  async save(project) {
    if (project.id && project.id !== 'new') {
      const res = await apiFetch(`${API.portfolio}?id=${project.id}`, 'PUT', project);
      return res.ok;
    } else {
      const res = await apiFetch(API.portfolio, 'POST', project);
      return res.ok;
    }
  },
  async delete(id) {
    await apiFetch(`${API.portfolio}?id=${id}`, 'DELETE');
  }
};
