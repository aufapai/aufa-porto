/**
 * API Configuration
 * Central config for connecting React frontend ↔ PHP backend
 * 
 * IMPORTANT: Update API_BASE_URL to your actual domain before deployment
 */

// ─── CHANGE THIS to your actual hosting URL ─────────
// Examples:
//   'https://aufarafii.com/admin'
//   'https://yourdomain.com/admin'  
//   '/admin'  (if same domain)
const API_BASE_URL = '/admin';

export const API = {
  base: API_BASE_URL,
  
  // Auth
  login: `${API_BASE_URL}/api/auth.php?action=login`,
  logout: `${API_BASE_URL}/api/auth.php?action=logout`,
  authCheck: `${API_BASE_URL}/api/auth.php?action=check`,
  
  // Blog
  blogs: `${API_BASE_URL}/api/blogs.php`,
  blogsPublished: `${API_BASE_URL}/api/blogs.php?published=1`,
  blogBySlug: (slug) => `${API_BASE_URL}/api/blogs.php?slug=${slug}`,
  blogById: (id) => `${API_BASE_URL}/api/blogs.php?id=${id}`,
  
  // CV
  cv: `${API_BASE_URL}/api/cv.php`,
  
  // About
  about: `${API_BASE_URL}/api/about.php`,
  
  // Traffic
  trackVisit: `${API_BASE_URL}/api/traffic.php?action=track`,
  trafficStats: `${API_BASE_URL}/api/traffic.php?action=stats`,
  trafficRecent: `${API_BASE_URL}/api/traffic.php?action=recent`,
  trafficClear: `${API_BASE_URL}/api/traffic.php?action=clear`,
  
  // Messages
  messagesSend: `${API_BASE_URL}/api/messages.php?action=send`,
  messagesList: `${API_BASE_URL}/api/messages.php?action=list`,
  messageDelete: (id) => `${API_BASE_URL}/api/messages.php?id=${id}`,
  
  // Portfolio
  portfolio: `${API_BASE_URL}/api/portfolio.php`,
  portfolioCategory: (cat) => `${API_BASE_URL}/api/portfolio.php?category=${cat}`,
};

/**
 * Fetch wrapper with auth token support
 */
export async function apiFetch(url, method = 'GET', body = null) {
  const token = localStorage.getItem('admin_token') || '';
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (token) opts.headers['Authorization'] = `Bearer ${token}`;
  if (body) opts.body = JSON.stringify(body);

  try {
    const res = await fetch(url, opts);
    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    console.warn('API fetch error:', err);
    return { ok: false, status: 0, data: null, error: err.message };
  }
}
