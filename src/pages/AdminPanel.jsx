import React, { useState, useEffect, useCallback } from 'react';
import { adminAuth, blogStore, cvStore, aboutStore, trafficStore, messageStore, portfolioStore } from '../utils/adminStore';

// ─── LOGIN SCREEN ───────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await adminAuth.login(email, password);
    if (result.success) {
      onLogin();
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/[0.08] p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Admin Panel</h1>
            <p className="text-sm text-white/40">Masuk untuk mengelola portfolio</p>
          </div>
          {error && <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all" placeholder="admin@email.com" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all pr-12" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">{showPass ? '🙈' : '👁️'}</button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold hover:from-violet-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-violet-500/25 disabled:opacity-50">
              {loading ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Connecting...</span> : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-white/20 text-xs mt-6">🔐 Synced dengan MySQL Database</p>
        </div>
      </div>
    </div>
  );
};

// ─── NAV ITEMS ──────────────────────────────────────
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'blogs', label: 'Blog Posts', icon: '📝' },
  { id: 'portfolio', label: 'Portfolio Projects', icon: '🎨' },
  { id: 'cv', label: 'CV Editor', icon: '📄' },
  { id: 'about', label: 'About Me', icon: '👤' },
  { id: 'messages', label: 'Messages', icon: '📨' },
  { id: 'traffic', label: 'Traffic', icon: '📈' },
];

// ─── DASHBOARD TAB ──────────────────────────────────
const DashboardTab = ({ blogs, stats, messages }) => {
  const cards = [
    { label: 'Total Blog Posts', value: blogs.length, icon: '📝', color: 'from-violet-500 to-purple-600' },
    { label: 'Unread Messages', value: messages?.length || 0, icon: '📨', color: 'from-emerald-500 to-teal-600' },
    { label: 'Total Page Views', value: stats.totalViews, icon: '👀', color: 'from-cyan-500 to-blue-600' },
    { label: 'Today Views', value: stats.todayViews, icon: '📅', color: 'from-amber-500 to-orange-600' },
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div key={i} className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-5 hover:border-white/[0.12] transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{card.icon}</span>
              <div className={`px-2 py-1 rounded-lg bg-gradient-to-r ${card.color} text-xs font-bold text-white`}>LIVE</div>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{card.value}</p>
            <p className="text-sm text-white/40">{card.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">📋 Recent Blog Posts</h3>
        <div className="space-y-3">
          {blogs.slice(0, 5).map((blog) => (
            <div key={blog.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-center gap-3"><div className={`w-2 h-2 rounded-full ${blog.published ? 'bg-emerald-400' : 'bg-amber-400'}`} /><div><p className="text-sm text-white font-medium">{blog.title}</p><p className="text-xs text-white/40">{blog.category} • {blog.date || blog.created_at?.split(' ')[0]}</p></div></div>
              <span className={`text-xs px-2 py-1 rounded-lg ${blog.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>{blog.published ? 'Published' : 'Draft'}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">🌐 Top Pages</h3>
          {stats.pageViews.slice(0, 5).map((pv, i) => (<div key={i} className="flex items-center justify-between text-sm mb-1"><span className="text-white/60 truncate max-w-[200px]">{pv.page}</span><span className="text-white font-medium">{pv.views}</span></div>))}
          {stats.pageViews.length === 0 && <p className="text-white/30 text-sm">No data yet — traffic dari website utama akan muncul di sini</p>}
        </div>
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">📱 Referrers</h3>
          {stats.referrers.slice(0, 5).map((ref, i) => (<div key={i} className="flex items-center justify-between text-sm mb-1"><span className="text-white/60 truncate max-w-[200px]">{ref.source}</span><span className="text-white font-medium">{ref.views}</span></div>))}
          {stats.referrers.length === 0 && <p className="text-white/30 text-sm">No data yet</p>}
        </div>
      </div>
    </div>
  );
};

// ─── BLOG EDITOR TAB ────────────────────────────────
const BlogsTab = ({ blogs, onRefresh }) => {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', category: '', excerpt: '', content: '', cover_image: '', author: 'Aufa Rafii', read_time: '5 min read', published: 1 });

  const startNew = () => { setForm({ title: '', category: '', excerpt: '', content: '', cover_image: '', author: 'Aufa Rafii', read_time: '5 min read', published: 1 }); setEditing('new'); };
  const startEdit = (blog) => { setForm({ title: blog.title, category: blog.category, excerpt: blog.excerpt, content: blog.content || '', cover_image: blog.cover_image || blog.coverImage || '', author: blog.author, read_time: blog.read_time || blog.readTime || '5 min read', published: blog.published ? 1 : 0 }); setEditing(blog.id); };

  const handleSave = async () => {
    if (!form.title.trim()) return alert('Title is required');
    if (editing === 'new') {
      await blogStore.save({ ...form });
    } else {
      await blogStore.save({ ...form, id: editing });
    }
    setEditing(null);
    onRefresh();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus blog post ini?')) {
      await blogStore.delete(id);
      onRefresh();
    }
  };

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{editing === 'new' ? '✍️ New Blog Post' : '✏️ Edit Blog Post'}</h2>
          <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl bg-white/[0.06] text-white/60 hover:bg-white/[0.1] transition-all text-sm">← Back</button>
        </div>
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all" placeholder="Blog title..." /></div>
            <div><label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Category</label><input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all" placeholder="Business, Personal, etc." /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div><label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Author</label><input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all" /></div>
            <div><label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Read Time</label><input value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all" /></div>
            <div><label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Status</label><select value={form.published} onChange={(e) => setForm({ ...form, published: parseInt(e.target.value) })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all"><option value="1" className="bg-[#0a0a1a]">Published</option><option value="0" className="bg-[#0a0a1a]">Draft</option></select></div>
          </div>
          <div><label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Cover Image URL</label><input value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all" placeholder="https://..." />{form.cover_image && <img src={form.cover_image} alt="preview" className="mt-3 h-32 w-full object-cover rounded-xl border border-white/[0.06]" />}</div>
          <div><label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Excerpt</label><textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all resize-none" /></div>
          <div><label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Content (Markdown)</label><textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={15} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all resize-y font-mono text-sm leading-relaxed" /></div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold hover:from-violet-500 hover:to-cyan-500 transition-all shadow-lg shadow-violet-500/25">💾 Save Post</button>
            <button onClick={() => setEditing(null)} className="px-6 py-3 rounded-xl bg-white/[0.06] text-white/60 hover:bg-white/[0.1] transition-all">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">📝 Blog Posts</h2>
        <button onClick={startNew} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold hover:from-violet-500 hover:to-cyan-500 transition-all shadow-lg shadow-violet-500/25 text-sm">+ New Post</button>
      </div>
      <div className="space-y-3">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-5 hover:border-white/[0.12] transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1"><div className={`w-2 h-2 rounded-full ${blog.published ? 'bg-emerald-400' : 'bg-amber-400'}`} /><span className={`text-xs px-2 py-0.5 rounded-lg ${blog.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>{blog.published ? 'Published' : 'Draft'}</span><span className="text-xs text-white/30">{blog.category}</span></div>
                <h3 className="text-white font-semibold truncate">{blog.title}</h3>
                <p className="text-sm text-white/40 truncate mt-1">{blog.excerpt}</p>
                <p className="text-xs text-white/20 mt-2">{blog.date || blog.created_at?.split(' ')[0]} • {blog.read_time || blog.readTime} • by {blog.author}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(blog)} className="px-4 py-2 rounded-xl bg-white/[0.06] text-white/60 hover:bg-violet-500/20 hover:text-violet-400 transition-all text-sm">✏️ Edit</button>
                <button onClick={() => handleDelete(blog.id)} className="px-4 py-2 rounded-xl bg-white/[0.06] text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-all text-sm">🗑️</button>
              </div>
            </div>
          </div>
        ))}
        {blogs.length === 0 && <div className="text-center py-16 text-white/30"><p className="text-4xl mb-3">📝</p><p>No blog posts yet</p></div>}
      </div>
    </div>
  );
};

// ─── PORTFOLIO EDITOR TAB ───────────────────────────
const PortfolioTab = ({ projects, onRefresh }) => {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', category: 'graphic-design', image_url: '', description: '', external_link: '' });

  const uniqueCategories = Array.from(new Set(projects.map(p => p.category))).filter(Boolean);
  const baseCategories = [
    { id: 'graphic-design', label: 'Graphic Design' },
    { id: 'digital-marketing', label: 'Digital Marketing' },
    { id: 'ui-ux', label: 'UI/UX' },
    { id: 'business', label: 'Business' }
  ];
  const categories = [
    ...baseCategories,
    ...uniqueCategories.filter(cat => !baseCategories.some(bc => bc.id === cat)).map(cat => ({
      id: cat,
      label: cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    }))
  ];

  const startNew = () => { setForm({ title: '', category: 'graphic-design', image_url: '', description: '', external_link: '' }); setEditing('new'); };
  const startEdit = (p) => { setForm({ title: p.title, category: p.category, image_url: p.image_url, description: p.description, external_link: p.external_link }); setEditing(p.id); };

  const handleSave = async () => {
    if (!form.title.trim()) return alert('Title is required');
    await portfolioStore.save({ ...form, id: editing === 'new' ? undefined : editing });
    setEditing(null);
    onRefresh();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus proyek ini?')) {
      await portfolioStore.delete(id);
      onRefresh();
    }
  };

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{editing === 'new' ? '✨ New Project' : '✏️ Edit Project'}</h2>
          <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl bg-white/[0.06] text-white/60 hover:bg-white/[0.1] transition-all text-sm">← Back</button>
        </div>
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Project Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50" /></div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Category</label>
              <div className="flex gap-2">
                <select value={categories.some(c => c.id === form.category) ? form.category : 'custom'} onChange={(e) => setForm({ ...form, category: e.target.value === 'custom' ? '' : e.target.value })} className="flex-1 px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50">
                  {categories.map(c => <option key={c.id} value={c.id} className="bg-[#0a0a1a]">{c.label}</option>)}
                  <option value="custom" className="bg-[#0a0a1a]">+ Enter Custom Category...</option>
                </select>
                {(!categories.some(c => c.id === form.category) || form.category === '') && (
                  <input 
                    placeholder="Enter slug (e.g. streetwear)..." 
                    value={form.category} 
                    onChange={(e) => setForm({ ...form, category: e.target.value.toLowerCase().replace(/\s+/g, '-') })} 
                    className="flex-1 px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50"
                  />
                )}
              </div>
            </div>
          </div>
          <div><label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Image URL</label><input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50" placeholder="/images/project-x.png or https://..." />{form.image_url && <img src={form.image_url} alt="preview" className="mt-3 h-32 object-cover rounded-xl border border-white/[0.06]" />}</div>
          <div><label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">External Link (Optional)</label><input value={form.external_link} onChange={(e) => setForm({ ...form, external_link: e.target.value })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50" placeholder="https://..." /></div>
          <div><label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 resize-none" /></div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold hover:from-violet-500 hover:to-cyan-500 transition-all shadow-lg shadow-violet-500/25">💾 Save Project</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">🎨 Portfolio Projects</h2>
        <button onClick={startNew} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold hover:from-violet-500 hover:to-cyan-500 transition-all text-sm">+ New Project</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(p => (
          <div key={p.id} className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] overflow-hidden hover:border-white/[0.12] transition-all group">
            <div className="h-40 relative">
              <img src={p.image_url || 'https://via.placeholder.com/400x200?text=No+Image'} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all" />
              <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] text-white uppercase tracking-wider border border-white/10">{p.category.replace('-', ' ')}</div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold truncate mb-1">{p.title}</h3>
              <p className="text-xs text-white/40 line-clamp-2 mb-4">{p.description}</p>
              <div className="flex gap-2">
                <button onClick={() => startEdit(p)} className="flex-1 py-2 rounded-xl bg-white/[0.06] text-white/60 hover:bg-violet-500/20 hover:text-violet-400 transition-all text-xs">✏️ Edit</button>
                <button onClick={() => handleDelete(p.id)} className="flex-1 py-2 rounded-xl bg-white/[0.06] text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-all text-xs">🗑️ Delete</button>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && <div className="text-center py-16 text-white/30"><p className="text-4xl mb-3">🎨</p><p>No projects yet</p></div>}
      </div>
    </div>
  );
};

// ─── MESSAGES TAB ───────────────────────────────────
const MessagesTab = ({ messages, onRefresh }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Delete message?')) {
      await messageStore.delete(id);
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">📨 Contact Messages</h2>
      </div>
      <div className="space-y-3">
        {messages.map(m => (
          <div key={m.id} className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-5 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-white font-medium">{m.subject || 'No Subject'}</h3>
                <p className="text-xs text-white/40">From: {m.name} ({m.email}) • {new Date(m.created_at).toLocaleString()}</p>
              </div>
              <button onClick={() => handleDelete(m.id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all text-xs">Delete</button>
            </div>
            <div className="p-3 mt-3 bg-black/20 rounded-xl border border-white/5 text-sm text-white/70 whitespace-pre-wrap">{m.message}</div>
          </div>
        ))}
        {messages.length === 0 && <div className="text-center py-16 text-white/30"><p className="text-4xl mb-3">📭</p><p>No messages yet</p></div>}
      </div>
    </div>
  );
};

// ─── CV EDITOR TAB ──────────────────────────────────
const CvTab = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loadCv = async () => {
      const data = await cvStore.get();
      setContent(data || '');
      setLoading(false);
    };
    loadCv();
  }, []);

  const handleSave = async () => {
    await cvStore.save(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = async () => {
    if (window.confirm('Reset CV ke default?')) {
      const def = await cvStore.loadDefault();
      setContent(def);
      await cvStore.save(def);
    }
  };

  if (loading) return <div className="text-white/40 text-center py-16">Loading CV from database...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">📄 CV Editor</h2>
        <div className="flex gap-2">
          <button onClick={handleReset} className="px-4 py-2 rounded-xl bg-white/[0.06] text-white/60 hover:bg-amber-500/20 hover:text-amber-400 transition-all text-sm">🔄 Reset</button>
          <button onClick={handleSave} className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all shadow-lg ${saved ? 'bg-emerald-600 text-white' : 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-violet-500/25'}`}>{saved ? '✅ Saved to DB!' : '💾 Save CV'}</button>
        </div>
      </div>
      <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-1">
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-[calc(100vh-240px)] min-h-[500px] px-6 py-5 bg-transparent text-white/90 focus:outline-none resize-none font-mono text-sm leading-relaxed" placeholder="Markdown CV..." />
      </div>
      <p className="text-xs text-white/30 text-center">Data tersimpan di MySQL database — sync dengan /admin</p>
    </div>
  );
};

// ─── ABOUT ME EDITOR TAB ────────────────────────────
const AboutTab = () => {
  const [form, setForm] = useState({
    name: '',
    title: '',
    bio: '',
    skills: [],
    social: {},
    experience: [],
    education: [],
    details: {},
    portfolio_links: [],
    achievements: [],
    section_order: [],
    custom_skills: [],
    contact_menu_target: 'section'
  });
  const [activeSubTab, setActiveSubTab] = useState('general');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // New item inputs
  const [skillInput, setSkillInput] = useState('');
  const [newExp, setNewExp] = useState({ role: '', company: '', period: '', detailsText: '' });
  
  const [newEdu, setNewEdu] = useState({ degree: '', major: '', period: '', school: '' });

  const [newAchievement, setNewAchievement] = useState('');
  const [newLink, setNewLink] = useState({ label: '', url: '' });

  // Custom skills builder
  const [newCatName, setNewCatName] = useState('');
  const [newBadge, setNewBadge] = useState({ name: '', text: '', bg: '#7c3aed', logo: '' });
  const [selectedCatIdx, setSelectedCatIdx] = useState(null);

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await aboutStore.get();
      setForm({
        name: data.name || '',
        title: data.title || '',
        bio: data.bio || '',
        skills: data.skills || [],
        social: data.social || {},
        experience: data.experience || [],
        education: data.education || [],
        details: data.details || {},
        portfolio_links: data.portfolio_links || [],
        achievements: data.achievements || [],
        section_order: data.section_order || ['profile', 'experience', 'skills', 'education', 'portfolio', 'details', 'achievements'],
        custom_skills: data.custom_skills || [],
        contact_menu_target: data.contact_menu_target || 'section'
      });
      setLoading(false);
    };
    load();
  }, []);

  const handleSave = async () => {
    await aboutStore.save(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addSkill = () => {
    if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      setForm({ ...form, skills: [...form.skills, skillInput.trim()] });
      setSkillInput('');
    }
  };

  // Experiences handlers
  const handleAddExp = () => {
    if (!newExp.role || !newExp.company) return alert('Role & Company are required');
    const details = newExp.detailsText.split('\n').map(d => d.trim()).filter(Boolean);
    const item = { role: newExp.role, company: newExp.company, period: newExp.period, details };
    setForm({ ...form, experience: [...form.experience, item] });
    setNewExp({ role: '', company: '', period: '', detailsText: '' });
  };

  const handleDeleteExp = (idx) => {
    setForm({ ...form, experience: form.experience.filter((_, i) => i !== idx) });
  };

  const moveExp = (idx, dir) => {
    const newList = [...form.experience];
    const target = idx + dir;
    if (target < 0 || target >= newList.length) return;
    const temp = newList[idx];
    newList[idx] = newList[target];
    newList[target] = temp;
    setForm({ ...form, experience: newList });
  };

  // Education handlers
  const handleAddEdu = () => {
    if (!newEdu.degree || !newEdu.school) return alert('Degree & School are required');
    setForm({ ...form, education: [...form.education, { ...newEdu }] });
    setNewEdu({ degree: '', major: '', period: '', school: '' });
  };

  const handleDeleteEdu = (idx) => {
    setForm({ ...form, education: form.education.filter((_, i) => i !== idx) });
  };

  const moveEdu = (idx, dir) => {
    const newList = [...form.education];
    const target = idx + dir;
    if (target < 0 || target >= newList.length) return;
    const temp = newList[idx];
    newList[idx] = newList[target];
    newList[target] = temp;
    setForm({ ...form, education: newList });
  };

  // Custom Skills Categories & Badges handlers
  const handleAddCat = () => {
    if (!newCatName.trim()) return;
    setForm({ ...form, custom_skills: [...form.custom_skills, { category: newCatName.trim(), items: [] }] });
    setNewCatName('');
  };

  const handleDeleteCat = (catIdx) => {
    setForm({ ...form, custom_skills: form.custom_skills.filter((_, i) => i !== catIdx) });
    if (selectedCatIdx === catIdx) setSelectedCatIdx(null);
  };

  const handleAddBadge = () => {
    if (selectedCatIdx === null) return alert('Pilih Kategori terlebih dahulu');
    if (!newBadge.name.trim() || !newBadge.text.trim()) return alert('Badge Name & Text/Initials are required');
    const updated = [...form.custom_skills];
    updated[selectedCatIdx].items.push({ ...newBadge });
    setForm({ ...form, custom_skills: updated });
    setNewBadge({ name: '', text: '', bg: '#7c3aed', logo: '' });
  };

  const handleDeleteBadge = (catIdx, badgeIdx) => {
    const updated = [...form.custom_skills];
    updated[catIdx].items = updated[catIdx].items.filter((_, i) => i !== badgeIdx);
    setForm({ ...form, custom_skills: updated });
  };

  // Portfolio Links handlers
  const handleAddLink = () => {
    if (!newLink.label || !newLink.url) return alert('Label & URL are required');
    setForm({ ...form, portfolio_links: [...form.portfolio_links, { ...newLink }] });
    setNewLink({ label: '', url: '' });
  };

  const handleDeleteLink = (idx) => {
    setForm({ ...form, portfolio_links: form.portfolio_links.filter((_, i) => i !== idx) });
  };

  // Achievements handlers
  const handleAddAch = () => {
    if (!newAchievement.trim()) return;
    setForm({ ...form, achievements: [...form.achievements, newAchievement.trim()] });
    setNewAchievement('');
  };

  const handleDeleteAch = (idx) => {
    setForm({ ...form, achievements: form.achievements.filter((_, i) => i !== idx) });
  };

  // Drag and drop section reorder handlers
  const handleDragStart = (idx) => {
    setDraggedIndex(idx);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (idx) => {
    if (draggedIndex === null) return;
    const newList = [...form.section_order];
    const draggedItem = newList[draggedIndex];
    newList.splice(draggedIndex, 1);
    newList.splice(idx, 0, draggedItem);
    setForm({ ...form, section_order: newList });
    setDraggedIndex(null);
  };

  const moveSection = (idx, dir) => {
    const newList = [...form.section_order];
    const target = idx + dir;
    if (target < 0 || target >= newList.length) return;
    const temp = newList[idx];
    newList[idx] = newList[target];
    newList[target] = temp;
    setForm({ ...form, section_order: newList });
  };

  if (loading) return <div className="text-white/40 text-center py-16">Loading about data...</div>;

  const subTabs = [
    { id: 'general', label: 'General / Bio', icon: '👤' },
    { id: 'reorder', label: 'Layout Reorder', icon: '↕️' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills Badges', icon: '🎨' },
    { id: 'links', label: 'Portfolio Links', icon: '🔗' },
    { id: 'details', label: 'Personal Details', icon: '📝' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">👤 About Me & CV Layout Editor</h2>
          <p className="text-xs text-white/40">Customize order, text, logos, badges, and behavior of /about page</p>
        </div>
        <button onClick={handleSave} className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shrink-0 ${saved ? 'bg-emerald-600 text-white' : 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-violet-500/25'}`}>
          {saved ? '✅ Saved successfully!' : '💾 Save Changes'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sub tabs navigation */}
        <div className="w-full lg:w-60 shrink-0 flex flex-wrap lg:flex-col gap-1 bg-white/[0.02] border border-white/[0.04] p-2 rounded-2xl">
          {subTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex-1 lg:flex-initial flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${activeSubTab === tab.id ? 'bg-white/5 text-white border border-white/10' : 'text-white/40 hover:text-white/70 hover:bg-white/[0.02]'}`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Sub tab content pane */}
        <div className="flex-1 bg-white/[0.02] border border-white/[0.04] p-6 rounded-3xl space-y-6">
          
          {/* GENERAL & BIO */}
          {activeSubTab === 'general' && (
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-white">General Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Full Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Title</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Bio Paragraph</label>
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={5} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all resize-none leading-relaxed" />
              </div>

              <div className="border-t border-white/5 pt-5">
                <label className="block text-sm font-semibold text-white mb-2">Navbar Contact Link Redirection</label>
                <p className="text-xs text-white/40 mb-3">Tentukan kemana tombol "Contact" di menu utama akan diarahkan</p>
                <select 
                  value={form.contact_menu_target} 
                  onChange={(e) => setForm({ ...form, contact_menu_target: e.target.value })} 
                  className="w-full md:w-80 px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all"
                >
                  <option value="section" className="bg-[#0a0a1a]">Section di Bawah Halaman Utama (/#contact)</option>
                  <option value="page" className="bg-[#0a0a1a]">Halaman Terpisah (/contact)</option>
                </select>
              </div>

              <div className="border-t border-white/5 pt-5">
                <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Interests & Hobbies <span className="text-white/20">(Pilihan emoji ditambahkan otomatis)</span></label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {form.skills.map((interest) => (
                    <span key={interest} className="px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 text-sm flex items-center gap-2 border border-violet-500/20">
                      {interest}
                      <button onClick={() => setForm({ ...form, skills: form.skills.filter(s => s !== interest) })} className="text-violet-300 hover:text-red-400 transition-colors">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    value={skillInput} 
                    onChange={(e) => setSkillInput(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())} 
                    className="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all text-sm" 
                    placeholder="Contoh: Gaming, Traveling, Film Making..." 
                  />
                  <button onClick={addSkill} className="px-4 py-2.5 rounded-xl bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 transition-all text-sm font-semibold">+ Add</button>
                </div>
              </div>
            </div>
          )}

          {/* LAYOUT REORDER */}
          {activeSubTab === 'reorder' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Drag & Drop Section Layout</h3>
              <p className="text-xs text-white/40">Tarik dan susun urutan section halaman `/about` di bawah ini, atau gunakan tombol panah</p>
              
              <div className="space-y-2">
                {form.section_order.map((section, idx) => {
                  const sectionLabels = {
                    profile: '👤 Profile & Bio',
                    experience: '💼 Work Experience',
                    skills: '🎨 Skills & Tools Badges',
                    education: '🎓 Education History',
                    portfolio: '🔗 Portfolio Social Anchors',
                    details: '📝 Personal Contact Details',
                    achievements: '🏆 Trophy Achievements'
                  };
                  return (
                    <div
                      key={section}
                      draggable
                      onDragStart={() => handleDragStart(idx)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(idx)}
                      className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-violet-500/40 hover:bg-white/[0.04] transition-all cursor-move group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-white/30 group-hover:text-white/60 transition-colors">⠿</span>
                        <span className="text-sm font-medium text-white">{sectionLabels[section] || section}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => moveSection(idx, -1)} disabled={idx === 0} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 disabled:opacity-20">▲</button>
                        <button onClick={() => moveSection(idx, 1)} disabled={idx === form.section_order.length - 1} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 disabled:opacity-20">▼</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* EXPERIENCE */}
          {activeSubTab === 'experience' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Work Experience Manager</h3>
              
              <div className="space-y-3">
                {form.experience.map((exp, idx) => (
                  <div key={idx} className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-start justify-between gap-4">
                    <div className="space-y-1 bg-transparent">
                      <h4 className="font-bold text-white">{exp.role}</h4>
                      <p className="text-xs text-white/60">{exp.company} • {exp.period}</p>
                      <ul className="text-xs text-white/40 pl-4 list-disc mt-2">
                        {exp.details.map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-1 shrink-0 bg-transparent">
                      <button onClick={() => handleDeleteExp(idx)} className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 text-xs">🗑️</button>
                      <button onClick={() => moveExp(idx, -1)} disabled={idx === 0} className="p-1 bg-white/5 text-white/40 disabled:opacity-20 text-xs rounded">▲</button>
                      <button onClick={() => moveExp(idx, 1)} disabled={idx === form.experience.length - 1} className="p-1 bg-white/5 text-white/40 disabled:opacity-20 text-xs rounded">▼</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.06] space-y-4">
                <h4 className="text-sm font-semibold text-white">➕ Add Experience</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Job Role / Title..." value={newExp.role} onChange={(e) => setNewExp({ ...newExp, role: e.target.value })} className="px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white" />
                  <input placeholder="Company / Organization..." value={newExp.company} onChange={(e) => setNewExp({ ...newExp, company: e.target.value })} className="px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white" />
                </div>
                <input placeholder="Period (e.g. 2021 - Present or June 2025)..." value={newExp.period} onChange={(e) => setNewExp({ ...newExp, period: e.target.value })} className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white" />
                <textarea rows={3} placeholder="Job description / details (Satu poin per baris)..." value={newExp.detailsText} onChange={(e) => setNewExp({ ...newExp, detailsText: e.target.value })} className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white resize-none" />
                <button onClick={handleAddExp} className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-500 font-semibold text-xs">+ Add Experience</button>
              </div>
            </div>
          )}

          {/* EDUCATION */}
          {activeSubTab === 'education' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Education History Manager</h3>
              
              <div className="space-y-3">
                {form.education.map((edu, idx) => (
                  <div key={idx} className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-white">{edu.degree}</h4>
                      <p className="text-xs text-white/60">{edu.school} • {edu.period}</p>
                      {edu.major && <p className="text-xs text-white/40 mt-1">Major: {edu.major}</p>}
                    </div>
                    <div className="flex flex-col gap-1 shrink-0 bg-transparent">
                      <button onClick={() => handleDeleteEdu(idx)} className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 text-xs">🗑️</button>
                      <button onClick={() => moveEdu(idx, -1)} disabled={idx === 0} className="p-1 bg-white/5 text-white/40 disabled:opacity-20 text-xs rounded">▲</button>
                      <button onClick={() => moveEdu(idx, 1)} disabled={idx === form.education.length - 1} className="p-1 bg-white/5 text-white/40 disabled:opacity-20 text-xs rounded">▼</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.06] space-y-4">
                <h4 className="text-sm font-semibold text-white">➕ Add Education Entry</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Degree (e.g. Bachelor Degree)..." value={newEdu.degree} onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })} className="px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white" />
                  <input placeholder="School / University..." value={newEdu.school} onChange={(e) => setNewEdu({ ...newEdu, school: e.target.value })} className="px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Major / Specialization..." value={newEdu.major} onChange={(e) => setNewEdu({ ...newEdu, major: e.target.value })} className="px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white" />
                  <input placeholder="Period (e.g. 2019 - 2024)..." value={newEdu.period} onChange={(e) => setNewEdu({ ...newEdu, period: e.target.value })} className="px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white" />
                </div>
                <button onClick={handleAddEdu} className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-500 font-semibold text-xs">+ Add Education</button>
              </div>
            </div>
          )}

          {/* SKILLS BADGES */}
          {activeSubTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Skills Categories & Badges</h3>
              </div>

              {/* Add category form */}
              <div className="flex gap-2">
                <input placeholder="Kategori baru (contoh: Design Tools)..." value={newCatName} onChange={(e) => setNewCatName(e.target.value)} className="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white" />
                <button onClick={handleAddCat} className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold">+ Tambah Kategori</button>
              </div>

              <div className="space-y-4 mt-4">
                {form.custom_skills.map((cat, catIdx) => (
                  <div key={catIdx} className="p-4 bg-white/[0.01] border border-white/[0.06] rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-violet-400">{cat.category}</span>
                      <div className="flex gap-2 bg-transparent">
                        <button onClick={() => setSelectedCatIdx(catIdx)} className={`px-3 py-1 rounded-lg text-xs font-bold ${selectedCatIdx === catIdx ? 'bg-violet-600 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}>
                          {selectedCatIdx === catIdx ? '✓ Selected' : '⚙️ Add badges here'}
                        </button>
                        <button onClick={() => handleDeleteCat(catIdx)} className="p-1 bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs rounded-lg">🗑️ Delete Cat</button>
                      </div>
                    </div>

                    {/* Badge container */}
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((badge, bIdx) => (
                        <span key={bIdx} style={{ backgroundColor: badge.bg }} className="px-3 py-1.5 rounded-lg text-xs text-white font-bold flex items-center gap-2 shadow shadow-black/25">
                          {badge.logo && <span className="inline-block">{badge.logo}</span>}
                          <span>{badge.text}</span>
                          <span className="text-white/40 text-[10px]">({badge.name})</span>
                          <button onClick={() => handleDeleteBadge(catIdx, bIdx)} className="text-white/40 hover:text-white transition-colors ml-1 font-bold">×</button>
                        </span>
                      ))}
                      {cat.items.length === 0 && <p className="text-xs text-white/20 italic">Belum ada badge di kategori ini</p>}
                    </div>
                  </div>
                ))}
              </div>

              {selectedCatIdx !== null && (
                <div className="bg-white/[0.02] p-5 rounded-2xl border border-violet-500/20 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h4 className="text-sm font-semibold text-white">✨ Add Badge to: <span className="text-violet-400">{form.custom_skills[selectedCatIdx]?.category}</span></h4>
                    <button onClick={() => setSelectedCatIdx(null)} className="text-xs text-white/40 hover:text-white">Close</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-1">Full Name (Tooltip)</label>
                      <input placeholder="Photoshop, Illustrator, Facebook..." value={newBadge.name} onChange={(e) => setNewBadge({ ...newBadge, name: e.target.value })} className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1">Badge Text / Initials</label>
                      <input placeholder="Ai, Ps, fb, ig, dll..." value={newBadge.text} onChange={(e) => setNewBadge({ ...newBadge, text: e.target.value })} className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-1">Background Color</label>
                      <div className="flex gap-2 items-center">
                        <input type="color" value={newBadge.bg} onChange={(e) => setNewBadge({ ...newBadge, bg: e.target.value })} className="w-10 h-10 rounded border-0 bg-transparent cursor-pointer" />
                        <input value={newBadge.bg} onChange={(e) => setNewBadge({ ...newBadge, bg: e.target.value })} className="flex-1 px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-white font-mono" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1">Logo or Emoji (Optional)</label>
                      <input placeholder="Contoh: 🎨 atau https://..." value={newBadge.logo} onChange={(e) => setNewBadge({ ...newBadge, logo: e.target.value })} className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-white" />
                    </div>
                  </div>

                  <button onClick={handleAddBadge} className="w-full py-2 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl text-xs">+ Add Badge</button>
                </div>
              )}
            </div>
          )}

          {/* PORTFOLIO LINKS */}
          {activeSubTab === 'links' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Portfolio Social Anchors</h3>
              
              <div className="space-y-2">
                {form.portfolio_links.map((link, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                    <div>
                      <span className="text-sm font-bold text-white">{link.label}</span>
                      <span className="text-xs text-white/40 ml-3">{link.url}</span>
                    </div>
                    <button onClick={() => handleDeleteLink(idx)} className="p-1 bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs rounded-lg">🗑️</button>
                  </div>
                ))}
              </div>

              <div className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.06] space-y-4">
                <h4 className="text-sm font-semibold text-white">➕ Add Link</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Label (LinkedIn, Instagram, dll)..." value={newLink.label} onChange={(e) => setNewLink({ ...newLink, label: e.target.value })} className="px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white" />
                  <input placeholder="URL (https://...)..." value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} className="px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white" />
                </div>
                <button onClick={handleAddLink} className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-500 font-semibold text-xs">+ Add Link</button>
              </div>
            </div>
          )}

          {/* PERSONAL DETAILS */}
          {activeSubTab === 'details' && (
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-white">Personal Contact Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Age</label>
                  <input value={form.details?.age || ''} onChange={(e) => setForm({ ...form, details: { ...form.details, age: e.target.value } })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Website</label>
                  <input value={form.details?.website || ''} onChange={(e) => setForm({ ...form, details: { ...form.details, website: e.target.value } })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Primary Email (me@domain.id)</label>
                  <input value={form.details?.email1 || ''} onChange={(e) => setForm({ ...form, details: { ...form.details, email1: e.target.value } })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Secondary Email (gmail)</label>
                  <input value={form.details?.email2 || ''} onChange={(e) => setForm({ ...form, details: { ...form.details, email2: e.target.value } })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Phone / WhatsApp</label>
                  <input value={form.details?.phone || ''} onChange={(e) => setForm({ ...form, details: { ...form.details, phone: e.target.value } })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Location / Country</label>
                  <input value={form.details?.location || ''} onChange={(e) => setForm({ ...form, details: { ...form.details, location: e.target.value } })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all" />
                </div>
              </div>
            </div>
          )}

          {/* ACHIEVEMENTS */}
          {activeSubTab === 'achievements' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Achievements & Awards</h3>
              
              <div className="space-y-2">
                {form.achievements.map((ach, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                    <span className="text-sm text-white/80 flex items-center gap-2">🏆 {ach}</span>
                    <button onClick={() => handleDeleteAch(idx)} className="p-1 bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs rounded-lg">🗑️</button>
                  </div>
                ))}
              </div>

              <div className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.06] space-y-4">
                <h4 className="text-sm font-semibold text-white">➕ Add Achievement</h4>
                <div className="flex gap-2">
                  <input placeholder="Contoh: Grew Instagram followers from 500 to 8,000..." value={newAchievement} onChange={(e) => setNewAchievement(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAch())} className="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white" />
                  <button onClick={handleAddAch} className="px-4 py-2.5 bg-violet-600 text-white rounded-xl text-xs font-semibold">+ Add</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// ─── TRAFFIC TAB ────────────────────────────────────
const TrafficTab = ({ stats }) => {
  const maxDaily = Math.max(...stats.dailyViews.map(d => d.views), 1);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">📈 Traffic Analytics</h2>
        <button onClick={async () => { if (window.confirm('Clear all traffic?')) { await trafficStore.clear(); window.location.reload(); } }} className="px-4 py-2 rounded-xl bg-white/[0.06] text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-all text-sm">🗑️ Clear</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{ label: 'Today', value: stats.todayViews, color: 'text-cyan-400' }, { label: 'This Week', value: stats.weekViews, color: 'text-violet-400' }, { label: 'This Month', value: stats.monthViews, color: 'text-amber-400' }, { label: 'All Time', value: stats.totalViews, color: 'text-emerald-400' }].map((s, i) => (
          <div key={i} className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-5 text-center"><p className={`text-3xl font-bold ${s.color}`}>{s.value}</p><p className="text-sm text-white/40 mt-1">{s.label}</p></div>
        ))}
      </div>
      <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">📊 Daily Views (Last 30 Days)</h3>
        {stats.dailyViews.length > 0 ? (
          <div className="flex items-end gap-1 h-40 overflow-x-auto pb-2">
            {stats.dailyViews.map((day, i) => (
              <div key={i} className="flex flex-col items-center min-w-[24px] group relative">
                <div className="w-5 bg-gradient-to-t from-violet-600 to-cyan-500 rounded-t-md transition-all hover:from-violet-500 hover:to-cyan-400 cursor-pointer" style={{ height: `${(day.views / maxDaily) * 120}px`, minHeight: '4px' }} />
                <span className="text-[9px] text-white/30 mt-1 rotate-[-45deg] origin-top-left whitespace-nowrap">{day.date.slice(5)}</span>
                <div className="absolute bottom-full mb-2 px-2 py-1 bg-white/10 backdrop-blur-md rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">{day.date}: {day.views} views</div>
              </div>
            ))}
          </div>
        ) : <p className="text-white/30 text-sm text-center py-8">Traffic dari website utama akan terekam di sini secara otomatis</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">🔝 Top Pages</h3>
          {stats.pageViews.slice(0, 10).map((pv, i) => (
            <div key={i} className="flex items-center gap-3 mb-2"><span className="text-xs text-white/30 w-5 text-right">{i + 1}.</span><div className="flex-1 min-w-0"><div className="flex items-center justify-between mb-1"><span className="text-sm text-white/70 truncate">{pv.page}</span><span className="text-sm text-white font-medium ml-2">{pv.views}</span></div><div className="h-1 bg-white/[0.04] rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full" style={{ width: `${(pv.views / (stats.pageViews[0]?.views || 1)) * 100}%` }} /></div></div></div>
          ))}
          {stats.pageViews.length === 0 && <p className="text-white/30 text-sm">No data yet</p>}
        </div>
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">🌐 Traffic Sources</h3>
          {stats.referrers.slice(0, 10).map((ref, i) => (
            <div key={i} className="flex items-center gap-3 mb-2"><span className="text-xs text-white/30 w-5 text-right">{i + 1}.</span><div className="flex-1 min-w-0"><div className="flex items-center justify-between mb-1"><span className="text-sm text-white/70 truncate">{ref.source}</span><span className="text-sm text-white font-medium ml-2">{ref.views}</span></div><div className="h-1 bg-white/[0.04] rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: `${(ref.views / (stats.referrers[0]?.views || 1)) * 100}%` }} /></div></div></div>
          ))}
          {stats.referrers.length === 0 && <p className="text-white/30 text-sm">No data yet</p>}
        </div>
      </div>
      <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">📱 Device Breakdown</h3>
        <div className="grid grid-cols-3 gap-4">
          {[{ label: 'Desktop', value: stats.devices.desktop, icon: '🖥️', color: 'from-violet-500 to-purple-500' }, { label: 'Mobile', value: stats.devices.mobile, icon: '📱', color: 'from-cyan-500 to-blue-500' }, { label: 'Tablet', value: stats.devices.tablet, icon: '📟', color: 'from-amber-500 to-orange-500' }].map((d, i) => {
            const total = stats.devices.desktop + stats.devices.mobile + stats.devices.tablet || 1;
            const pct = Math.round((d.value / total) * 100);
            return (<div key={i} className="text-center"><p className="text-3xl mb-2">{d.icon}</p><p className="text-2xl font-bold text-white">{pct}%</p><p className="text-sm text-white/40">{d.label}</p><p className="text-xs text-white/20">{d.value} visits</p><div className="mt-2 h-1.5 bg-white/[0.04] rounded-full overflow-hidden"><div className={`h-full bg-gradient-to-r ${d.color} rounded-full`} style={{ width: `${pct}%` }} /></div></div>);
          })}
        </div>
      </div>
    </div>
  );
};

// ─── MAIN ADMIN PANEL ───────────────────────────────
const AdminPanel = () => {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({ totalViews: 0, todayViews: 0, weekViews: 0, monthViews: 0, pageViews: [], dailyViews: [], referrers: [], devices: { desktop: 0, mobile: 0, tablet: 0 }, recentVisits: [] });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check auth on mount
  useEffect(() => {
    const check = async () => {
      const isAuth = await adminAuth.isAuthenticated();
      setAuthed(isAuth);
      setChecking(false);
    };
    check();
  }, []);

  const refreshData = useCallback(async () => {
    const [blogsData, statsData, projectsData, messagesData] = await Promise.all([
      blogStore.getAll(),
      trafficStore.getStats(),
      portfolioStore.getAll(),
      messageStore.getList()
    ]);
    setBlogs(blogsData);
    setStats(statsData);
    setProjects(projectsData);
    setMessages(messagesData);
  }, []);

  useEffect(() => {
    if (authed) {
      Promise.resolve().then(() => refreshData());
    }
  }, [authed, refreshData]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-violet-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const session = adminAuth.getSession();

  return (
    <>
      <head><meta name="robots" content="noindex, nofollow" /><title>🔒 Admin Panel</title></head>
      <div className="min-h-screen bg-[#0a0a1a] text-white flex">
        {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0d0d20] border-r border-white/[0.06] flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-lg font-bold shadow-lg shadow-violet-500/20">A</div><div><p className="text-sm font-semibold text-white">Aufa Admin</p><p className="text-xs text-white/30">Portfolio CMS</p></div></div>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (<button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === item.id ? 'bg-gradient-to-r from-violet-600/20 to-cyan-600/20 text-white border border-violet-500/20' : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'}`}><span className="text-lg">{item.icon}</span>{item.label}</button>))}
          </nav>
          <div className="p-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-3 mb-3 px-2"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold">A</div><div className="flex-1 min-w-0"><p className="text-xs text-white/60 truncate">{session?.email}</p><p className="text-[10px] text-white/20">MySQL Synced</p></div></div>
            <button onClick={async () => { await adminAuth.logout(); setAuthed(false); }} className="w-full px-4 py-2.5 rounded-xl bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition-all text-center">🚪 Logout</button>
          </div>
        </aside>
        <main className="flex-1 min-w-0 h-screen overflow-y-auto">
          <header className="sticky top-0 z-30 bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] transition-all"><svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
              <div><h1 className="text-lg font-bold text-white">{navItems.find(n => n.id === activeTab)?.icon} {navItems.find(n => n.id === activeTab)?.label}</h1><p className="text-xs text-white/30">Data synced with MySQL • {new Date().toLocaleString('id-ID')}</p></div>
            </div>
            <a href="/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl bg-white/[0.04] text-white/50 hover:bg-white/[0.08] hover:text-white transition-all text-sm">🌐 View Site</a>
          </header>
          <div className="p-6 max-w-6xl mx-auto pb-24">
            {activeTab === 'dashboard' && <DashboardTab blogs={blogs} stats={stats} messages={messages} />}
            {activeTab === 'blogs' && <BlogsTab blogs={blogs} onRefresh={refreshData} />}
            {activeTab === 'portfolio' && <PortfolioTab projects={projects} onRefresh={refreshData} />}
            {activeTab === 'cv' && <CvTab />}
            {activeTab === 'about' && <AboutTab />}
            {activeTab === 'messages' && <MessagesTab messages={messages} onRefresh={refreshData} />}
            {activeTab === 'traffic' && <TrafficTab stats={stats} />}
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminPanel;
