# ⚡ Aufa Rafi — Personal Portfolio & Creative Showcase

<div align="center">

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.1-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![cPanel Git](https://img.shields.io/badge/cPanel-Git_Deploy-FF6C2C?style=for-the-badge&logo=cpanel&logoColor=white)

**Modern, High-Performance, and Dynamic Personal Portfolio Website**

🌐 **Live Website:** [https://aufarafii.id](https://aufarafii.id)

</div>

---

## 📌 Ringkasan Proyek

Website portofolio interaktif dan modern yang dibangun untuk merepresentasikan karya, keahlian, dan layanan profesional dari **Aufa Rafi**. Dibangun dengan teknologi frontend mutakhir (**React 19**, **Vite 7**, **Tailwind CSS**, dan **React Router 7**) dengan sistem deployment otomatis langsung melalui **cPanel Git Version Control**.

---

## ✨ Fitur Utama

- 🎨 **Modern Dark Aesthetic**: Desain gelap premium dengan kontras tinggi, aksen dinamis, dan tipografi modern.
- 📱 **Fully Responsive**: Tampilan adaptif sempurna untuk Smartphone, Tablet, hingga Desktop/Ultra-wide.
- 🧭 **Multi-Category Creative Showcase**:
  - **Streetwear**: Desain visual dan identitas produk fashion/streetwear.
  - **Business**: Portofolio strategi & operasional bisnis.
  - **Graphic Design**: Karya visual branding, logo, dan periklanan.
  - **Digital Marketing**: Kampanye pemasaran digital dan analitik performa.
  - **UI/UX**: Desain antarmuka pengguna interaktif dan ramah pengguna.
- 📝 **Blog & Insights**: Artikel mendalam seputar transformasi bisnis dan industri kreatif.
- 📬 **Interactive Contact**: Form dan navigasi kontak langsung yang responsif.
- 🚀 **Production-Ready SPA Routing**: Terintegrasi dengan `.htaccess` Apache Rewrite Engine sehingga reload/refresh URL tidak akan menghasilkan error 404 di hosting cPanel.
- ⚡ **Zero-Friction Git Deployment**: Deploy otomatis ke server cPanel menggunakan `.cpanel.yml` tanpa perlu FTP / WinSCP manual.

---

## 🛠️ Tech Stack & Ekosistem

| Lapisan | Teknologi | Kegunaan |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 | UI Component Architecture |
| **Build Tool & Bundler** | Vite 7 | Lightning-fast HMR & Production Minification |
| **Styling** | Tailwind CSS 3 + PostCSS | Utility-first CSS dengan custom palet tema |
| **Routing** | React Router DOM 7 | Client-side routing dengan hashless Clean URLs |
| **Hosting & Web Server** | cPanel Apache Server | HTTP/2 Server Hosting di `aufarafii.id` |
| **Automation** | cPanel Git Engine (`.cpanel.yml`) | Automated continuous deployment pipeline |

---

## 📂 Struktur Direktori

```text
aufa-porto/
├── .cpanel.yml            # Skrip otomatisasi deployment cPanel
├── .gitignore             # File-file yang dikecualikan dari Git
├── index.html             # Entry point HTML aplikasi
├── package.json           # Dependensi dan scripts
├── postcss.config.cjs     # Konfigurasi PostCSS
├── tailwind.config.cjs    # Konfigurasi kustom tema Tailwind
├── vite.config.js         # Konfigurasi Vite bundler
├── public/                # Asset publik statis
│   ├── .htaccess          # Konfigurasi mod_rewrite untuk React Router di Apache
│   ├── robots.txt         # Konfigurasi SEO crawler
│   ├── sitemap.xml        # Peta situs untuk Google Search Console
│   └── images/            # Asset gambar publik
├── src/                   # Source code utama
│   ├── App.jsx            # Routing dan root container
│   ├── main.jsx           # React bootstrap entry
│   ├── index.css          # Tailwind base & global styles
│   ├── components/        # Komponen UI modular (Navbar, Card, dll.)
│   └── pages/             # Halaman-halaman website (Home, About, Showcase, Blog)
└── dist/                  # Hasil kompilasi produksi siap rilis (di-deploy ke cPanel)
```

---

## 🚀 Panduan Pengembangan Lokal

### 1. Prasyarat
- **Node.js**: Versi 18.x atau 20.x+
- **npm** atau **yarn/pnpm**
- **Git**

### 2. Instalasi Dependensi
```bash
git clone https://github.com/aufapai/aufa-porto.git
cd aufa-porto
npm install
```

### 3. Menjalankan Mode Development
```bash
npm run dev
```
Buka browser pada alamat `http://localhost:5173`.

### 4. Melakukan Build untuk Produksi
```bash
npm run build
```
Hasil build akan ter-generate di folder `dist/` yang mencakup file HTML, CSS/JS ter-minifikasi, asset gambar, dan `.htaccess`.

---

## 🚢 Panduan Deployment cPanel Git (Otomatis & Anti Ribet)

Website ini telah dikonfigurasi dengan file `.cpanel.yml` agar dapat langsung di-deploy melalui fitur **Git™ Version Control** di cPanel tanpa perlu upload manual melalui File Manager atau WinSCP.

### ⚙️ Cara Kerja `.cpanel.yml`
File `.cpanel.yml` di-root repository bertindak sebagai instruksi eksekusi bagi cPanel:
```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/aufarafi/public_html/
    - /bin/cp -rf dist/* $DEPLOYPATH
    - /bin/cp -f dist/.htaccess $DEPLOYPATH
```
Saat Anda menekan tombol **Deploy**, cPanel akan mengekstrak file dari folder `dist/` dan memindahkannya ke target folder `/home/aufarafi/public_html/` lengkap beserta konfigurasi `.htaccess`.

---

### 📋 Alur Rilis / Update Website (Workflow)

Setiap kali Anda selesai melakukan perubahan kode:

#### Langkah 1: Build dan Commit dari Lokal
```bash
# 1. Jalankan build produksi
npm run build

# 2. Stage seluruh perubahan (termasuk folder dist dan .cpanel.yml)
git add .

# 3. Buat commit
git commit -m "feat: deskripsi perubahan fitur"

# 4. Push ke GitHub repository
git push origin main
```

#### Langkah 2: Deploy di cPanel
1. Buka **cPanel** akun Anda (`https://aufarafii.id:2083`).
2. Masuk ke menu **Git™ Version Control**.
3. Klik tombol **Manage** pada repository `aufa-porto` (`/home/aufarafi/repositories/aufa-porto`).
4. Klik tab **Pull or Deploy**.
5. Klik **Update from Remote** (untuk menarik commit terbaru dari GitHub).
6. Klik **Deploy HEAD Commit**.
7. Selesai! Perubahan langsung aktif di [https://aufarafii.id](https://aufarafii.id).

---

### ⚡ Opsional: Setup Auto-Deploy via GitHub Webhook (100% Otomatis)
Jika Anda ingin agar setiap kali Anda `git push origin main` website langsung ter-update otomatis tanpa perlu login ke cPanel:

1. Di cPanel **Git™ Version Control** > **Manage** repository Anda.
2. Cari bagian **Clone URL** atau **Webhook URL**. cPanel menyediakan URL webhook khusus.
3. Buka repository Anda di **GitHub** > **Settings** > **Webhooks** > **Add webhook**.
4. Masukkan **Payload URL** dari cPanel tersebut, pilih `application/json`, dan trigger pada event `Just the push event`.
5. Sekarang setiap kali ada push ke branch `main`, cPanel akan otomatis menjalankan pull dan deploy!

---

## 🌐 Konfigurasi React Router Apache (.htaccess)

Agar rute halaman seperti `/about`, `/contact`, `/streetwear`, dan artikel blog tidak mengalami error **404 Not Found** saat halaman di-refresh, file `public/.htaccess` telah dikonfigurasi:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```
File ini otomatis tersalin ke dalam folder `dist/` saat proses build, dan dipindahkan ke `public_html` oleh `.cpanel.yml`.

---

## 👤 Author & Kontak

- **Aufa Rafi**
- Website: [aufarafii.id](https://aufarafii.id)
- GitHub: [@aufapai](https://github.com/aufapai)

---
*Dikelola dengan ❤️ menggunakan React, Vite, dan cPanel Git Deployment.*
