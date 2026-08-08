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

// ─── ABOUT ME ───────────────────────────────────────
const DEFAULT_ABOUT = {
  name: 'Aufa Rafii Hadibrata',
  title: 'Creative Entrepreneur & Digital Strategist',
  bio: "My name is Aufa Rafii' Hadibrata, a self-taught business growth consultant and digital marketing strategist with 4+ years of experience creating modern, clean, and minimal brands that make a lasting impression.",
  skills: ['Strategic Planning', 'Content Management', 'Facebook for Business', 'Digital Marketing', 'Graphic Design', 'Brand Development', 'Performance Marketing'],
  social: { instagram: '@aufapai', email: 'aufatea1@gmail.com' },
  experience: [
    { role: "Digital Strategist", company: "PT Bayarkilat Apps Indonesia", period: "June 2025 - Present", details: ["Developed performance-driven digital marketing campaigns.", "Built content strategy for multi-channel presence.", "Achieved 10% more conversion with Organic Social Media."] },
    { role: "Business Development Manager", company: "Loekis.in", period: "June 2021 - Present", details: ["Developed business systems and growth strategies.", "Conducted market research and trend analysis.", "Initiated B2B discussions and partner negotiations."] },
    { role: "Business Owner", company: "Zero Cost Shop", period: "Oct 2016 - June 2025", details: ["Oversaw online store operations on Tokopedia.", "Developed promotional strategies and campaigns.", "Analyzed store performance using analytics tools."] }
  ],
  education: [
    { degree: "Institut Pertanian Bogor (IPB)", major: "Bachelor of Business Administration (2018 - 2025)", period: "2019 - 2024", school: "IPB University, Bogor" },
    { degree: "SMK TARUNA TERPADU 1", major: "Multimedia (2016 - 2018)", period: "2014 - 2017", school: "SMK, Bogor" }
  ],
  details: {
    age: "25 years",
    website: "aufarafii.id",
    email1: "me@aufarafii.id",
    email2: "aufatea1@gmail.com",
    phone: "+6287770050793",
    location: "Indonesia"
  },
  portfolio_links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/aufa-hadibrata/" },
    { label: "Instagram", url: "https://www.instagram.com/aufapai/" },
    { label: "Tokopedia", url: "https://www.tokopedia.com/zerocostshop" }
  ],
  achievements: [
    "Grew Instagram followers from 500 to 8,000 in <1 year",
    "Best Student Nominee in IPB Entrepreneurship 2018",
    "Successful Tokopedia store owner since 2016"
  ],
  section_order: ['profile', 'experience', 'skills', 'education', 'portfolio', 'details', 'achievements'],
  custom_skills: [
    { category: "Design Tools", items: ["Ai", "Ps", "Id", "Xd", "Cn"] },
    { category: "Editing Tools", items: ["Ae", "Pr", "🎨"] },
    { category: "Marketing", items: ["fb", "ig", "G", "TP"] },
    { category: "Languages", items: ["ID", "GB"] }
  ],
  contact_menu_target: 'section'
};

export const aboutStore = {
  async get() {
    const res = await apiFetch(API.about);
    if (res.ok && res.data && res.data.name) {
      return {
        ...res.data,
        skills: Array.isArray(res.data.skills) ? res.data.skills : JSON.parse(res.data.skills || '[]'),
        social: typeof res.data.social === 'object' ? res.data.social : JSON.parse(res.data.social || '{}'),
        experience: Array.isArray(res.data.experience) ? res.data.experience : JSON.parse(res.data.experience || '[]'),
        education: Array.isArray(res.data.education) ? res.data.education : JSON.parse(res.data.education || '[]'),
        details: typeof res.data.details === 'object' ? res.data.details : JSON.parse(res.data.details || '{}'),
        portfolio_links: Array.isArray(res.data.portfolio_links) ? res.data.portfolio_links : JSON.parse(res.data.portfolio_links || '[]'),
        achievements: Array.isArray(res.data.achievements) ? res.data.achievements : JSON.parse(res.data.achievements || '[]'),
        section_order: Array.isArray(res.data.section_order) ? res.data.section_order : JSON.parse(res.data.section_order || '[]'),
        custom_skills: Array.isArray(res.data.custom_skills) ? res.data.custom_skills : JSON.parse(res.data.custom_skills || '[]'),
        contact_menu_target: res.data.contact_menu_target || 'section'
      };
    }
    return DEFAULT_ABOUT;
  },

  async save(data) {
    const res = await apiFetch(API.about, 'PUT', data);
    return res.ok;
  },
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
export const portfolioStore = {
  async getAll() {
    const res = await apiFetch(API.portfolio);
    return res.ok && Array.isArray(res.data) ? res.data : [];
  },
  async getById(id) {
    const res = await apiFetch(`${API.portfolio}?id=${id}`);
    return res.ok ? res.data : null;
  },
  async getByCategory(cat) {
    const res = await apiFetch(API.portfolioCategory(cat));
    return res.ok && Array.isArray(res.data) ? res.data : [];
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
