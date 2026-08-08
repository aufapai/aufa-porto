<?php
/**
 * Admin Panel - Portfolio CMS
 * Standalone HTML+CSS+PHP Admin Dashboard
 * 
 * URL: /deploy-admin/index.php
 * Login: aufatea1@gmail.com / Itsmeaufa517
 */

require_once __DIR__ . '/config.php';

// Set noindex header
header('X-Robots-Tag: noindex, nofollow');
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>🔒 Admin Panel - Aufa Portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        /* ─── RESET & BASE ─────────────────────────────── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #0a0a1a;
            color: #fff;
            min-height: 100vh;
            overflow-x: hidden;
        }
        a { color: inherit; text-decoration: none; }
        button { cursor: pointer; border: none; outline: none; font-family: inherit; }
        input, textarea, select { font-family: inherit; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

        /* ─── LOGIN SCREEN ─────────────────────────────── */
        .login-wrapper {
            min-height: 100vh; display: flex; align-items: center; justify-content: center;
            position: relative; overflow: hidden;
        }
        .login-bg-1, .login-bg-2 {
            position: absolute; width: 400px; height: 400px; border-radius: 50%; filter: blur(120px);
            animation: pulse 4s infinite alternate;
        }
        .login-bg-1 { top: 20%; left: 20%; background: rgba(139,92,246,0.1); }
        .login-bg-2 { bottom: 20%; right: 20%; background: rgba(6,182,212,0.1); animation-delay: 1s; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.1); opacity: 1; } }

        .login-card {
            position: relative; z-index: 10; width: 100%; max-width: 420px;
            background: rgba(255,255,255,0.03); backdrop-filter: blur(40px);
            border: 1px solid rgba(255,255,255,0.08); border-radius: 24px;
            padding: 40px 32px; box-shadow: 0 25px 50px rgba(0,0,0,0.5);
        }
        .login-logo {
            width: 64px; height: 64px; margin: 0 auto 20px; border-radius: 16px;
            background: linear-gradient(135deg, #8b5cf6, #06b6d4);
            display: flex; align-items: center; justify-content: center;
            font-size: 24px; font-weight: 800; box-shadow: 0 8px 24px rgba(139,92,246,0.25);
        }
        .login-title { text-align: center; font-size: 24px; font-weight: 700; margin-bottom: 4px; }
        .login-sub { text-align: center; font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 28px; }
        .login-error {
            padding: 10px 14px; border-radius: 12px; background: rgba(239,68,68,0.1);
            border: 1px solid rgba(239,68,68,0.2); color: #f87171; font-size: 13px;
            text-align: center; margin-bottom: 20px; display: none;
        }
        .login-error.show { display: block; }

        /* ─── FORM ELEMENTS ────────────────────────────── */
        .form-group { margin-bottom: 18px; }
        .form-label {
            display: block; font-size: 11px; font-weight: 600; text-transform: uppercase;
            letter-spacing: 0.5px; color: rgba(255,255,255,0.5); margin-bottom: 8px;
        }
        .form-input {
            width: 100%; padding: 12px 16px; background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08); border-radius: 12px;
            color: #fff; font-size: 14px; transition: all 0.2s;
        }
        .form-input:focus {
            outline: none; border-color: rgba(139,92,246,0.5);
            background: rgba(255,255,255,0.06);
        }
        .form-input::placeholder { color: rgba(255,255,255,0.2); }
        textarea.form-input { resize: vertical; min-height: 100px; }
        select.form-input { appearance: auto; }
        .form-input-mono { font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.6; }

        /* ─── BUTTONS ──────────────────────────────────── */
        .btn {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 10px 20px; border-radius: 12px; font-size: 14px;
            font-weight: 600; transition: all 0.3s;
        }
        .btn-primary {
            background: linear-gradient(135deg, #8b5cf6, #06b6d4); color: #fff;
            box-shadow: 0 4px 16px rgba(139,92,246,0.25);
        }
        .btn-primary:hover { box-shadow: 0 6px 24px rgba(139,92,246,0.35); transform: translateY(-1px); }
        .btn-full { width: 100%; justify-content: center; padding: 14px; }
        .btn-ghost { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.6); }
        .btn-ghost:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .btn-danger { background: rgba(239,68,68,0.1); color: #f87171; }
        .btn-danger:hover { background: rgba(239,68,68,0.2); }
        .btn-success { background: #059669; color: #fff; }
        .btn-sm { padding: 8px 14px; font-size: 13px; border-radius: 10px; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* ─── ADMIN LAYOUT ─────────────────────────────── */
        .admin-layout { display: flex; min-height: 100vh; }
        .sidebar {
            position: fixed; left: 0; top: 0; bottom: 0; width: 256px; z-index: 50;
            background: #0d0d20; border-right: 1px solid rgba(255,255,255,0.06);
            display: flex; flex-direction: column; transition: transform 0.3s;
        }
        .sidebar-header { padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .sidebar-brand { display: flex; align-items: center; gap: 12px; }
        .sidebar-brand-icon {
            width: 40px; height: 40px; border-radius: 12px;
            background: linear-gradient(135deg, #8b5cf6, #06b6d4);
            display: flex; align-items: center; justify-content: center;
            font-weight: 800; font-size: 16px;
        }
        .sidebar-brand-text { font-size: 14px; font-weight: 600; }
        .sidebar-brand-sub { font-size: 11px; color: rgba(255,255,255,0.3); }
        .sidebar-nav { flex: 1; padding: 16px; }
        .nav-item {
            display: flex; align-items: center; gap: 10px; width: 100%;
            padding: 12px 16px; border-radius: 12px; font-size: 14px; font-weight: 500;
            color: rgba(255,255,255,0.4); background: transparent;
            transition: all 0.2s; margin-bottom: 4px; border: 1px solid transparent;
        }
        .nav-item:hover { color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.04); }
        .nav-item.active {
            color: #fff;
            background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2));
            border-color: rgba(139,92,246,0.2);
        }
        .nav-item span:first-child { font-size: 18px; }
        .sidebar-footer { padding: 16px; border-top: 1px solid rgba(255,255,255,0.06); }
        .sidebar-user { display: flex; align-items: center; gap: 10px; padding: 0 8px; margin-bottom: 12px; }
        .sidebar-user-avatar {
            width: 32px; height: 32px; border-radius: 50%;
            background: linear-gradient(135deg, #8b5cf6, #06b6d4);
            display: flex; align-items: center; justify-content: center;
            font-size: 12px; font-weight: 700;
        }
        .sidebar-user-email { font-size: 12px; color: rgba(255,255,255,0.5); overflow: hidden; text-overflow: ellipsis; }
        .sidebar-user-status { font-size: 10px; color: rgba(255,255,255,0.2); }

        .main-content { flex: 1; margin-left: 256px; }
        .topbar {
            position: sticky; top: 0; z-index: 30; padding: 16px 24px;
            background: rgba(10,10,26,0.8); backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255,255,255,0.06);
            display: flex; align-items: center; justify-content: space-between;
        }
        .topbar h1 { font-size: 18px; font-weight: 700; }
        .topbar-sub { font-size: 11px; color: rgba(255,255,255,0.3); }
        .content-area { padding: 24px; max-width: 1200px; }

        /* ─── CARDS ────────────────────────────────────── */
        .card {
            background: rgba(255,255,255,0.03); backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.06); border-radius: 20px;
            padding: 20px; transition: border-color 0.3s;
        }
        .card:hover { border-color: rgba(255,255,255,0.12); }
        .card-title { font-size: 16px; font-weight: 600; margin-bottom: 16px; }

        .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
        .stat-card { padding: 20px; }
        .stat-card .stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .stat-card .stat-icon { font-size: 24px; }
        .stat-card .stat-badge {
            padding: 2px 8px; border-radius: 8px; font-size: 10px; font-weight: 700; color: #fff;
        }
        .stat-card .stat-value { font-size: 32px; font-weight: 800; margin-bottom: 4px; }
        .stat-card .stat-label { font-size: 13px; color: rgba(255,255,255,0.4); }

        /* ─── BLOG LIST ────────────────────────────────── */
        .blog-item {
            padding: 20px; margin-bottom: 12px;
            display: flex; align-items: center; justify-content: space-between; gap: 16px;
        }
        .blog-item-info { flex: 1; min-width: 0; }
        .blog-item-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
        .blog-item-dot { width: 8px; height: 8px; border-radius: 50%; }
        .blog-item-dot.published { background: #34d399; }
        .blog-item-dot.draft { background: #fbbf24; }
        .badge {
            display: inline-block; padding: 2px 10px; border-radius: 8px;
            font-size: 11px; font-weight: 700;
        }
        .badge-green { background: rgba(52,211,153,0.1); color: #34d399; }
        .badge-yellow { background: rgba(251,191,36,0.1); color: #fbbf24; }
        .blog-item-title { font-size: 15px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .blog-item-excerpt { font-size: 13px; color: rgba(255,255,255,0.4); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 4px; }
        .blog-item-date { font-size: 11px; color: rgba(255,255,255,0.2); margin-top: 6px; }
        .blog-item-actions { display: flex; gap: 8px; flex-shrink: 0; }

        /* ─── FLEX & GRID HELPERS ───────────────────────── */
        .flex { display: flex; }
        .flex-between { display: flex; align-items: center; justify-content: space-between; }
        .flex-center { display: flex; align-items: center; }
        .gap-2 { gap: 8px; }
        .gap-4 { gap: 16px; }
        .mb-4 { margin-bottom: 16px; }
        .mb-6 { margin-bottom: 24px; }
        .mt-4 { margin-top: 16px; }
        .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .text-center { text-align: center; }
        .text-muted { color: rgba(255,255,255,0.4); }
        .text-sm { font-size: 13px; }
        .text-xs { font-size: 11px; }
        .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .hidden { display: none !important; }

        /* ─── CHART ────────────────────────────────────── */
        .chart-bar-container { display: flex; align-items: flex-end; gap: 3px; height: 140px; overflow-x: auto; padding-bottom: 8px; }
        .chart-bar {
            min-width: 20px; border-radius: 4px 4px 0 0;
            background: linear-gradient(to top, #8b5cf6, #06b6d4);
            transition: all 0.3s; cursor: pointer; position: relative;
        }
        .chart-bar:hover { opacity: 0.8; }
        .chart-label { font-size: 9px; color: rgba(255,255,255,0.3); transform: rotate(-45deg); transform-origin: top left; white-space: nowrap; margin-top: 4px; }

        /* ─── TABLE ────────────────────────────────────── */
        .data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .data-table th { text-align: left; padding: 8px; color: rgba(255,255,255,0.4); font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .data-table td { padding: 8px; color: rgba(255,255,255,0.6); border-bottom: 1px solid rgba(255,255,255,0.03); max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .data-table tr:hover td { background: rgba(255,255,255,0.02); }

        /* ─── PROGRESS BAR ─────────────────────────────── */
        .progress-track { height: 4px; background: rgba(255,255,255,0.04); border-radius: 2px; overflow: hidden; margin-top: 4px; }
        .progress-fill { height: 100%; border-radius: 2px; transition: width 0.5s; }
        .progress-violet { background: linear-gradient(90deg, #8b5cf6, #06b6d4); }
        .progress-amber { background: linear-gradient(90deg, #f59e0b, #f97316); }

        /* ─── TAGS ─────────────────────────────────────── */
        .tag {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 6px 12px; border-radius: 8px; font-size: 13px;
            background: rgba(139,92,246,0.1); color: #a78bfa;
            border: 1px solid rgba(139,92,246,0.2);
        }
        .tag-remove { cursor: pointer; color: #a78bfa; transition: color 0.2s; }
        .tag-remove:hover { color: #f87171; }

        /* ─── LOADING ──────────────────────────────────── */
        .spinner {
            display: inline-block; width: 20px; height: 20px;
            border: 2px solid rgba(255,255,255,0.2); border-top-color: rgba(139,92,246,0.8);
            border-radius: 50%; animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ─── RESPONSIVE ───────────────────────────────── */
        .mobile-toggle { display: none; }
        @media (max-width: 768px) {
            .sidebar { transform: translateX(-100%); }
            .sidebar.open { transform: translateX(0); }
            .main-content { margin-left: 0; }
            .mobile-toggle { display: block; }
            .mobile-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 40; }
            .mobile-overlay.show { display: block; }
            .stat-grid { grid-template-columns: repeat(2, 1fr); }
            .grid-2, .grid-3 { grid-template-columns: 1fr; }
        }

        /* ─── ANIMATIONS ───────────────────────────────── */
        .fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    </style>
</head>
<body>

<!-- ═══ LOGIN SCREEN ═══ -->
<div id="loginScreen" class="login-wrapper">
    <div class="login-bg-1"></div>
    <div class="login-bg-2"></div>
    <div class="login-card">
        <div class="login-logo">🔒</div>
        <div class="login-title">Admin Panel</div>
        <div class="login-sub">Masuk untuk mengelola portfolio</div>
        <div id="loginError" class="login-error"></div>
        <form id="loginForm">
            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" id="loginEmail" class="form-input" placeholder="admin@email.com" required>
            </div>
            <div class="form-group">
                <label class="form-label">Password</label>
                <input type="password" id="loginPassword" class="form-input" placeholder="••••••••" required>
            </div>
            <button type="submit" id="loginBtn" class="btn btn-primary btn-full">Sign In</button>
        </form>
        <p class="text-center text-muted text-xs" style="margin-top:20px">🔐 Halaman ini tidak terindex oleh search engine</p>
    </div>
</div>

<!-- ═══ ADMIN DASHBOARD ═══ -->
<div id="adminPanel" class="admin-layout hidden">
    <!-- Mobile overlay -->
    <div id="mobileOverlay" class="mobile-overlay" onclick="toggleMobileSidebar()"></div>

    <!-- Sidebar -->
    <aside id="sidebar" class="sidebar">
        <div class="sidebar-header">
            <div class="sidebar-brand">
                <div class="sidebar-brand-icon">A</div>
                <div>
                    <div class="sidebar-brand-text">Aufa Admin</div>
                    <div class="sidebar-brand-sub">Portfolio CMS</div>
                </div>
            </div>
        </div>
        <nav class="sidebar-nav">
            <button class="nav-item active" data-tab="dashboard" onclick="switchTab('dashboard')">
                <span>📊</span> Dashboard
            </button>
            <button class="nav-item" data-tab="blogs" onclick="switchTab('blogs')">
                <span>📝</span> Blog Posts
            </button>
            <button class="nav-item" data-tab="cv" onclick="switchTab('cv')">
                <span>📄</span> CV Editor
            </button>
            <button class="nav-item" data-tab="about" onclick="switchTab('about')">
                <span>👤</span> About Me
            </button>
            <button class="nav-item" data-tab="traffic" onclick="switchTab('traffic')">
                <span>📈</span> Traffic
            </button>
        </nav>
        <div class="sidebar-footer">
            <div class="sidebar-user">
                <div class="sidebar-user-avatar">A</div>
                <div style="flex:1;min-width:0">
                    <div id="sidebarEmail" class="sidebar-user-email"></div>
                    <div class="sidebar-user-status">Active Session</div>
                </div>
            </div>
            <button class="btn btn-danger btn-sm btn-full" onclick="logout()">🚪 Logout</button>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
        <header class="topbar">
            <div class="flex-center gap-4">
                <button class="btn btn-ghost btn-sm mobile-toggle" onclick="toggleMobileSidebar()">☰</button>
                <div>
                    <h1 id="topbarTitle">📊 Dashboard</h1>
                    <div class="topbar-sub" id="topbarTime"></div>
                </div>
            </div>
            <a href="/" target="_blank" class="btn btn-ghost btn-sm">🌐 View Site</a>
        </header>

        <div class="content-area">
            <!-- ─── DASHBOARD TAB ─── -->
            <div id="tab-dashboard" class="tab-content fade-in">
                <h2 style="font-size:22px;font-weight:700;margin-bottom:20px">Dashboard Overview</h2>
                <div class="stat-grid" id="dashboardStats"></div>
                <div class="card mb-6">
                    <div class="card-title">📋 Recent Blog Posts</div>
                    <div id="dashboardBlogs"></div>
                </div>
                <div class="grid-2">
                    <div class="card">
                        <div class="card-title">🌐 Top Pages</div>
                        <div id="dashboardPages"><span class="text-muted text-sm">No data yet</span></div>
                    </div>
                    <div class="card">
                        <div class="card-title">📱 Referrers</div>
                        <div id="dashboardReferrers"><span class="text-muted text-sm">No data yet</span></div>
                    </div>
                </div>
            </div>

            <!-- ─── BLOGS TAB ─── -->
            <div id="tab-blogs" class="tab-content hidden fade-in">
                <div class="flex-between mb-6">
                    <h2 style="font-size:22px;font-weight:700">📝 Blog Posts</h2>
                    <button class="btn btn-primary btn-sm" onclick="showBlogEditor()">+ New Post</button>
                </div>
                <div id="blogList"></div>
            </div>

            <!-- ─── BLOG EDITOR ─── -->
            <div id="tab-blog-editor" class="tab-content hidden fade-in">
                <div class="flex-between mb-6">
                    <h2 id="blogEditorTitle" style="font-size:22px;font-weight:700">✍️ New Blog Post</h2>
                    <button class="btn btn-ghost btn-sm" onclick="switchTab('blogs')">← Back</button>
                </div>
                <div class="card">
                    <input type="hidden" id="blogEditId">
                    <div class="grid-2 mb-4">
                        <div class="form-group">
                            <label class="form-label">Title</label>
                            <input id="blogTitle" class="form-input" placeholder="Blog title...">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Category</label>
                            <input id="blogCategory" class="form-input" placeholder="Business, Personal Journey, etc.">
                        </div>
                    </div>
                    <div class="grid-3 mb-4">
                        <div class="form-group">
                            <label class="form-label">Author</label>
                            <input id="blogAuthor" class="form-input" value="Aufa Rafii">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Read Time</label>
                            <input id="blogReadTime" class="form-input" value="5 min read">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Status</label>
                            <select id="blogPublished" class="form-input">
                                <option value="1">Published</option>
                                <option value="0">Draft</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Cover Image URL</label>
                        <input id="blogCoverImage" class="form-input" placeholder="https://...">
                        <div id="blogImagePreview" style="margin-top:12px"></div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Excerpt</label>
                        <textarea id="blogExcerpt" class="form-input" rows="2" placeholder="Short description..."></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Content (Markdown)</label>
                        <textarea id="blogContent" class="form-input form-input-mono" rows="15" placeholder="Write your blog content..."></textarea>
                    </div>
                    <div class="flex gap-2 mt-4">
                        <button class="btn btn-primary" onclick="saveBlog()">💾 Save Post</button>
                        <button class="btn btn-ghost" onclick="switchTab('blogs')">Cancel</button>
                    </div>
                </div>
            </div>

            <!-- ─── CV EDITOR TAB ─── -->
            <div id="tab-cv" class="tab-content hidden fade-in">
                <div class="flex-between mb-6">
                    <h2 style="font-size:22px;font-weight:700">📄 CV Editor</h2>
                    <div class="flex gap-2">
                        <button class="btn btn-ghost btn-sm" onclick="resetCV()">🔄 Reset Default</button>
                        <button id="cvSaveBtn" class="btn btn-primary btn-sm" onclick="saveCV()">💾 Save CV</button>
                    </div>
                </div>
                <div class="card" style="padding:4px">
                    <textarea id="cvContent" class="form-input form-input-mono" style="min-height:calc(100vh - 240px);border:none;background:transparent;resize:vertical" placeholder="Write your CV in markdown..."></textarea>
                </div>
                <p class="text-center text-muted text-xs mt-4">Format: Markdown (.md) — Edit langsung, klik Save untuk menyimpan</p>
            </div>

            <!-- ─── ABOUT ME TAB ─── -->
            <div id="tab-about" class="tab-content hidden fade-in">
                <div class="flex-between mb-6">
                    <h2 style="font-size:22px;font-weight:700">👤 About Me Editor</h2>
                    <button id="aboutSaveBtn" class="btn btn-primary btn-sm" onclick="saveAbout()">💾 Save About</button>
                </div>
                <div class="card">
                    <div class="grid-2 mb-4">
                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input id="aboutName" class="form-input">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Title / Tagline</label>
                            <input id="aboutTitle" class="form-input">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Bio</label>
                        <textarea id="aboutBio" class="form-input" rows="4"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Skills</label>
                        <div id="aboutSkills" class="flex gap-2 mb-4" style="flex-wrap:wrap"></div>
                        <div class="flex gap-2">
                            <input id="aboutSkillInput" class="form-input" style="flex:1" placeholder="Add a skill..." onkeydown="if(event.key==='Enter'){event.preventDefault();addSkill()}">
                            <button class="btn btn-ghost btn-sm" onclick="addSkill()">+ Add</button>
                        </div>
                    </div>
                    <div class="grid-2">
                        <div class="form-group">
                            <label class="form-label">Instagram</label>
                            <input id="aboutInstagram" class="form-input">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input id="aboutEmail" class="form-input">
                        </div>
                    </div>
                </div>
            </div>

            <!-- ─── TRAFFIC TAB ─── -->
            <div id="tab-traffic" class="tab-content hidden fade-in">
                <div class="flex-between mb-6">
                    <h2 style="font-size:22px;font-weight:700">📈 Traffic Analytics</h2>
                    <button class="btn btn-danger btn-sm" onclick="clearTraffic()">🗑️ Clear Data</button>
                </div>
                <div class="stat-grid" id="trafficStats"></div>

                <div class="card mb-6">
                    <div class="card-title">📊 Daily Views (Last 30 Days)</div>
                    <div id="trafficChart" class="chart-bar-container"></div>
                </div>

                <div class="grid-2 mb-6">
                    <div class="card">
                        <div class="card-title">🔝 Top Pages</div>
                        <div id="trafficPages"></div>
                    </div>
                    <div class="card">
                        <div class="card-title">🌐 Traffic Sources</div>
                        <div id="trafficSources"></div>
                    </div>
                </div>

                <div class="card mb-6">
                    <div class="card-title">📱 Device Breakdown</div>
                    <div id="trafficDevices" class="grid-3"></div>
                </div>

                <div class="card">
                    <div class="card-title">🕐 Recent Visits</div>
                    <div style="overflow-x:auto">
                        <table class="data-table" id="trafficTable">
                            <thead><tr><th>Page</th><th>Time</th><th>Referrer</th><th>IP</th></tr></thead>
                            <tbody id="trafficTableBody"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>

<script>
// ─── CONFIG ─────────────────────────────────────────
const API_BASE = './api';
let authToken = localStorage.getItem('admin_token') || '';
let currentAboutSkills = [];

// ─── API Helper ─────────────────────────────────────
async function api(endpoint, method = 'GET', body = null) {
    const opts = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };
    if (authToken) opts.headers['Authorization'] = 'Bearer ' + authToken;
    if (body) opts.body = JSON.stringify(body);
    
    const res = await fetch(API_BASE + endpoint, opts);
    const data = await res.json();
    
    if (res.status === 401 && endpoint !== '/auth.php?action=login') {
        logout();
        return null;
    }
    return { status: res.status, data };
}

// ─── AUTH ────────────────────────────────────────────
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const btn = document.getElementById('loginBtn');
    const errEl = document.getElementById('loginError');
    
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Authenticating...';
    errEl.classList.remove('show');
    
    try {
        const res = await api('/auth.php?action=login', 'POST', { email, password });
        if (res.data.success) {
            authToken = res.data.token;
            localStorage.setItem('admin_token', authToken);
            document.getElementById('sidebarEmail').textContent = res.data.user.email;
            showAdmin();
        } else {
            errEl.textContent = res.data.error || 'Login failed';
            errEl.classList.add('show');
        }
    } catch (err) {
        errEl.textContent = 'Connection error. Check your server.';
        errEl.classList.add('show');
    }
    
    btn.disabled = false;
    btn.textContent = 'Sign In';
});

async function checkAuth() {
    if (!authToken) return;
    try {
        const res = await api('/auth.php?action=check');
        if (res && res.data.authenticated) {
            document.getElementById('sidebarEmail').textContent = res.data.email;
            showAdmin();
        }
    } catch {}
}

function logout() {
    api('/auth.php?action=logout', 'POST');
    authToken = '';
    localStorage.removeItem('admin_token');
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
}

function showAdmin() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('adminPanel').classList.remove('hidden');
    loadDashboard();
}

// ─── TAB SWITCHING ──────────────────────────────────
function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    
    const tabEl = document.getElementById('tab-' + tab);
    if (tabEl) {
        tabEl.classList.remove('hidden');
        tabEl.classList.add('fade-in');
    }
    
    const navEl = document.querySelector(`.nav-item[data-tab="${tab}"]`);
    if (navEl) navEl.classList.add('active');
    
    const titles = { dashboard: '📊 Dashboard', blogs: '📝 Blog Posts', cv: '📄 CV Editor', about: '👤 About Me', traffic: '📈 Traffic' };
    document.getElementById('topbarTitle').textContent = titles[tab] || tab;
    document.getElementById('topbarTime').textContent = 'Last updated: ' + new Date().toLocaleString('id-ID');
    
    // Load data for tab
    if (tab === 'dashboard') loadDashboard();
    else if (tab === 'blogs') loadBlogs();
    else if (tab === 'cv') loadCV();
    else if (tab === 'about') loadAbout();
    else if (tab === 'traffic') loadTraffic();
    
    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('mobileOverlay').classList.remove('show');
}

function toggleMobileSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('mobileOverlay').classList.toggle('show');
}

// ─── DASHBOARD ──────────────────────────────────────
async function loadDashboard() {
    const [blogsRes, statsRes] = await Promise.all([
        api('/blogs.php'),
        api('/traffic.php?action=stats'),
    ]);
    
    const blogs = blogsRes?.data || [];
    const stats = statsRes?.data || {};
    const published = Array.isArray(blogs) ? blogs.filter(b => b.published == 1).length : 0;
    
    document.getElementById('dashboardStats').innerHTML = [
        { label: 'Total Blog Posts', value: Array.isArray(blogs) ? blogs.length : 0, icon: '📝', color: '#8b5cf6' },
        { label: 'Published', value: published, icon: '✅', color: '#10b981' },
        { label: 'Total Page Views', value: stats.totalViews || 0, icon: '👀', color: '#06b6d4' },
        { label: 'Today Views', value: stats.todayViews || 0, icon: '📅', color: '#f59e0b' },
    ].map(s => `<div class="card stat-card"><div class="stat-top"><span class="stat-icon">${s.icon}</span><span class="stat-badge" style="background:${s.color}">LIVE</span></div><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`).join('');
    
    // Recent blogs
    const recentBlogs = Array.isArray(blogs) ? blogs.slice(0, 5) : [];
    document.getElementById('dashboardBlogs').innerHTML = recentBlogs.length ? recentBlogs.map(b => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);margin-bottom:8px">
            <div class="flex-center gap-2" style="min-width:0"><div class="blog-item-dot ${b.published == 1 ? 'published' : 'draft'}"></div><div style="min-width:0"><div class="text-sm" style="font-weight:500">${b.title}</div><div class="text-xs text-muted">${b.category} • ${b.created_at?.split(' ')[0] || ''}</div></div></div>
            <span class="badge ${b.published == 1 ? 'badge-green' : 'badge-yellow'}">${b.published == 1 ? 'Published' : 'Draft'}</span>
        </div>
    `).join('') : '<span class="text-muted text-sm">No posts yet</span>';
    
    // Top pages & referrers
    const pages = stats.pageViews || [];
    document.getElementById('dashboardPages').innerHTML = pages.length ? pages.slice(0,5).map(p => `<div class="flex-between text-sm" style="margin-bottom:4px"><span class="text-muted truncate" style="max-width:200px">${p.page}</span><span>${p.views}</span></div>`).join('') : '<span class="text-muted text-sm">No data yet</span>';
    
    const refs = stats.referrers || [];
    document.getElementById('dashboardReferrers').innerHTML = refs.length ? refs.slice(0,5).map(r => `<div class="flex-between text-sm" style="margin-bottom:4px"><span class="text-muted truncate" style="max-width:200px">${r.source}</span><span>${r.views}</span></div>`).join('') : '<span class="text-muted text-sm">No data yet</span>';
}

// ─── BLOGS ──────────────────────────────────────────
async function loadBlogs() {
    const res = await api('/blogs.php');
    const blogs = Array.isArray(res?.data) ? res.data : [];
    
    document.getElementById('blogList').innerHTML = blogs.length ? blogs.map(b => `
        <div class="card blog-item">
            <div class="blog-item-info">
                <div class="blog-item-meta"><div class="blog-item-dot ${b.published == 1 ? 'published' : 'draft'}"></div><span class="badge ${b.published == 1 ? 'badge-green' : 'badge-yellow'}">${b.published == 1 ? 'Published' : 'Draft'}</span><span class="text-xs text-muted">${b.category}</span></div>
                <div class="blog-item-title">${b.title}</div>
                <div class="blog-item-excerpt">${b.excerpt || ''}</div>
                <div class="blog-item-date">${b.created_at?.split(' ')[0] || ''} • ${b.read_time} • by ${b.author}</div>
            </div>
            <div class="blog-item-actions">
                <button class="btn btn-ghost btn-sm" onclick="editBlog(${b.id})">✏️ Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteBlog(${b.id})">🗑️</button>
            </div>
        </div>
    `).join('') : '<div class="text-center text-muted" style="padding:60px 0"><p style="font-size:40px;margin-bottom:12px">📝</p><p>No blog posts yet. Create your first one!</p></div>';
}

function showBlogEditor(blog = null) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('tab-blog-editor').classList.remove('hidden');
    
    if (blog) {
        document.getElementById('blogEditorTitle').textContent = '✏️ Edit Blog Post';
        document.getElementById('blogEditId').value = blog.id;
        document.getElementById('blogTitle').value = blog.title || '';
        document.getElementById('blogCategory').value = blog.category || '';
        document.getElementById('blogAuthor').value = blog.author || 'Aufa Rafii';
        document.getElementById('blogReadTime').value = blog.read_time || '5 min read';
        document.getElementById('blogPublished').value = blog.published;
        document.getElementById('blogCoverImage').value = blog.cover_image || '';
        document.getElementById('blogExcerpt').value = blog.excerpt || '';
        document.getElementById('blogContent').value = blog.content || '';
    } else {
        document.getElementById('blogEditorTitle').textContent = '✍️ New Blog Post';
        document.getElementById('blogEditId').value = '';
        document.getElementById('blogTitle').value = '';
        document.getElementById('blogCategory').value = '';
        document.getElementById('blogAuthor').value = 'Aufa Rafii';
        document.getElementById('blogReadTime').value = '5 min read';
        document.getElementById('blogPublished').value = '1';
        document.getElementById('blogCoverImage').value = '';
        document.getElementById('blogExcerpt').value = '';
        document.getElementById('blogContent').value = '';
    }
}

async function editBlog(id) {
    const res = await api('/blogs.php?id=' + id);
    if (res?.data) showBlogEditor(res.data);
}

async function saveBlog() {
    const id = document.getElementById('blogEditId').value;
    const body = {
        title: document.getElementById('blogTitle').value,
        category: document.getElementById('blogCategory').value,
        author: document.getElementById('blogAuthor').value,
        read_time: document.getElementById('blogReadTime').value,
        published: parseInt(document.getElementById('blogPublished').value),
        cover_image: document.getElementById('blogCoverImage').value,
        excerpt: document.getElementById('blogExcerpt').value,
        content: document.getElementById('blogContent').value,
    };
    
    if (!body.title.trim()) return alert('Title is required');
    
    if (id) {
        await api('/blogs.php?id=' + id, 'PUT', body);
    } else {
        await api('/blogs.php', 'POST', body);
    }
    
    switchTab('blogs');
}

async function deleteBlog(id) {
    if (!confirm('Hapus blog post ini?')) return;
    await api('/blogs.php?id=' + id, 'DELETE');
    loadBlogs();
}

// ─── CV ─────────────────────────────────────────────
async function loadCV() {
    const res = await api('/cv.php');
    document.getElementById('cvContent').value = res?.data?.content || '';
}

async function saveCV() {
    const btn = document.getElementById('cvSaveBtn');
    const content = document.getElementById('cvContent').value;
    await api('/cv.php', 'PUT', { content });
    btn.textContent = '✅ Saved!';
    btn.classList.add('btn-success');
    setTimeout(() => { btn.textContent = '💾 Save CV'; btn.classList.remove('btn-success'); }, 2000);
}

async function resetCV() {
    if (!confirm('Reset CV ke default?')) return;
    try {
        const res = await fetch('../public/data/cv-aufa.md');
        const text = await res.text();
        document.getElementById('cvContent').value = text;
    } catch {
        alert('Default CV file not found');
    }
}

// ─── ABOUT ME ───────────────────────────────────────
async function loadAbout() {
    const res = await api('/about.php');
    const data = res?.data || {};
    document.getElementById('aboutName').value = data.name || '';
    document.getElementById('aboutTitle').value = data.title || '';
    document.getElementById('aboutBio').value = data.bio || '';
    document.getElementById('aboutInstagram').value = data.social?.instagram || '';
    document.getElementById('aboutEmail').value = data.social?.email || '';
    
    currentAboutSkills = data.skills || [];
    renderSkills();
}

function renderSkills() {
    document.getElementById('aboutSkills').innerHTML = currentAboutSkills.map(s => 
        `<span class="tag">${s}<span class="tag-remove" onclick="removeSkill('${s.replace(/'/g, "\\'")}')">×</span></span>`
    ).join('');
}

function addSkill() {
    const input = document.getElementById('aboutSkillInput');
    const skill = input.value.trim();
    if (skill && !currentAboutSkills.includes(skill)) {
        currentAboutSkills.push(skill);
        renderSkills();
        input.value = '';
    }
}

function removeSkill(skill) {
    currentAboutSkills = currentAboutSkills.filter(s => s !== skill);
    renderSkills();
}

async function saveAbout() {
    const btn = document.getElementById('aboutSaveBtn');
    const body = {
        name: document.getElementById('aboutName').value,
        title: document.getElementById('aboutTitle').value,
        bio: document.getElementById('aboutBio').value,
        skills: currentAboutSkills,
        social: {
            instagram: document.getElementById('aboutInstagram').value,
            email: document.getElementById('aboutEmail').value,
        },
    };
    await api('/about.php', 'PUT', body);
    btn.textContent = '✅ Saved!';
    btn.classList.add('btn-success');
    setTimeout(() => { btn.textContent = '💾 Save About'; btn.classList.remove('btn-success'); }, 2000);
}

// ─── TRAFFIC ────────────────────────────────────────
async function loadTraffic() {
    const [statsRes, recentRes] = await Promise.all([
        api('/traffic.php?action=stats'),
        api('/traffic.php?action=recent'),
    ]);
    
    const stats = statsRes?.data || {};
    const recent = Array.isArray(recentRes?.data) ? recentRes.data : [];
    
    // Stats cards
    document.getElementById('trafficStats').innerHTML = [
        { label: 'Today', value: stats.todayViews || 0, color: '#06b6d4' },
        { label: 'This Week', value: stats.weekViews || 0, color: '#8b5cf6' },
        { label: 'This Month', value: stats.monthViews || 0, color: '#f59e0b' },
        { label: 'All Time', value: stats.totalViews || 0, color: '#10b981' },
    ].map(s => `<div class="card text-center"><div style="font-size:32px;font-weight:800;color:${s.color}">${s.value}</div><div class="text-sm text-muted" style="margin-top:4px">${s.label}</div></div>`).join('');
    
    // Daily chart
    const daily = stats.dailyViews || [];
    const maxViews = Math.max(...daily.map(d => parseInt(d.views)), 1);
    document.getElementById('trafficChart').innerHTML = daily.length ? daily.map(d => {
        const h = Math.max((parseInt(d.views) / maxViews) * 120, 4);
        return `<div style="display:flex;flex-direction:column;align-items:center;min-width:20px" title="${d.date}: ${d.views} views"><div class="chart-bar" style="height:${h}px;width:16px"></div><span class="chart-label">${d.date.slice(5)}</span></div>`;
    }).join('') : '<span class="text-muted text-sm" style="padding:40px">No data yet</span>';
    
    // Top pages
    const pages = stats.pageViews || [];
    document.getElementById('trafficPages').innerHTML = pages.length ? pages.slice(0,10).map((p,i) => `
        <div class="flex-center gap-2" style="margin-bottom:8px">
            <span class="text-xs text-muted" style="width:20px;text-align:right">${i+1}.</span>
            <div style="flex:1;min-width:0">
                <div class="flex-between text-sm"><span class="text-muted truncate">${p.page}</span><span>${p.views}</span></div>
                <div class="progress-track"><div class="progress-fill progress-violet" style="width:${(parseInt(p.views)/(parseInt(pages[0]?.views)||1))*100}%"></div></div>
            </div>
        </div>
    `).join('') : '<span class="text-muted text-sm">No data yet</span>';
    
    // Sources
    const sources = stats.referrers || [];
    document.getElementById('trafficSources').innerHTML = sources.length ? sources.slice(0,10).map((r,i) => `
        <div class="flex-center gap-2" style="margin-bottom:8px">
            <span class="text-xs text-muted" style="width:20px;text-align:right">${i+1}.</span>
            <div style="flex:1;min-width:0">
                <div class="flex-between text-sm"><span class="text-muted truncate">${r.source}</span><span>${r.views}</span></div>
                <div class="progress-track"><div class="progress-fill progress-amber" style="width:${(parseInt(r.views)/(parseInt(sources[0]?.views)||1))*100}%"></div></div>
            </div>
        </div>
    `).join('') : '<span class="text-muted text-sm">No data yet</span>';
    
    // Devices
    const devices = stats.devices || { desktop: 0, mobile: 0, tablet: 0 };
    const total = (devices.desktop + devices.mobile + devices.tablet) || 1;
    document.getElementById('trafficDevices').innerHTML = [
        { label: 'Desktop', value: devices.desktop, icon: '🖥️', color: 'progress-violet' },
        { label: 'Mobile', value: devices.mobile, icon: '📱', color: 'progress-violet' },
        { label: 'Tablet', value: devices.tablet, icon: '📟', color: 'progress-amber' },
    ].map(d => {
        const pct = Math.round((d.value / total) * 100);
        return `<div class="text-center"><p style="font-size:32px;margin-bottom:8px">${d.icon}</p><p style="font-size:24px;font-weight:800">${pct}%</p><p class="text-sm text-muted">${d.label}</p><p class="text-xs text-muted">${d.value} visits</p><div class="progress-track mt-4"><div class="progress-fill ${d.color}" style="width:${pct}%"></div></div></div>`;
    }).join('');
    
    // Recent visits table
    document.getElementById('trafficTableBody').innerHTML = recent.length ? recent.map(v => `
        <tr><td>${v.page}</td><td style="white-space:nowrap">${new Date(v.created_at).toLocaleString('id-ID')}</td><td>${v.referrer}</td><td>${v.ip_address || '-'}</td></tr>
    `).join('') : '<tr><td colspan="4" class="text-center text-muted" style="padding:20px">No visits recorded yet</td></tr>';
}

async function clearTraffic() {
    if (!confirm('Clear all traffic data?')) return;
    await api('/traffic.php?action=clear', 'DELETE');
    loadTraffic();
}

// ─── INIT ───────────────────────────────────────────
document.getElementById('topbarTime').textContent = 'Last updated: ' + new Date().toLocaleString('id-ID');

// Check if already authenticated
checkAuth();

// Cover image preview
document.getElementById('blogCoverImage').addEventListener('input', (e) => {
    const url = e.target.value;
    document.getElementById('blogImagePreview').innerHTML = url ? `<img src="${url}" style="height:100px;width:100%;object-fit:cover;border-radius:12px;border:1px solid rgba(255,255,255,0.06)" onerror="this.style.display='none'">` : '';
});
</script>

</body>
</html>
