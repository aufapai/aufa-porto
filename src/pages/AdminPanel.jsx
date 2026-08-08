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

  const categories = [
    { id: 'graphic-design', label: 'Graphic Design' },
    { id: 'digital-marketing', label: 'Digital Marketing' },
    { id: 'ui-ux', label: 'UI/UX' },
    { id: 'business', label: 'Business' }
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
            <div><label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Category</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50">{categories.map(c => <option key={c.id} value={c.id} className="bg-[#0a0a1a]">{c.label}</option>)}</select></div>
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
  const [form, setForm] = useState({ name: '', title: '', bio: '', skills: [], social: {} });
  const [saved, setSaved] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await aboutStore.get();
      setForm(data);
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

  if (loading) return <div className="text-white/40 text-center py-16">Loading about data...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">👤 About Me Editor</h2>
        <button onClick={handleSave} className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all shadow-lg ${saved ? 'bg-emerald-600 text-white' : 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-violet-500/25'}`}>{saved ? '✅ Saved to DB!' : '💾 Save About'}</button>
      </div>
      <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div><label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Full Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all" /></div>
          <div><label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Title</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all" /></div>
        </div>
        <div><label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Bio</label><textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={4} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all resize-none" /></div>
        <div>
          <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Skills & Interests <span className="text-white/30 lowercase">(Untuk form About / Let's work together)</span></label>
          <div className="flex flex-wrap gap-2 mb-3">{form.skills.map((skill) => (<span key={skill} className="px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 text-sm flex items-center gap-2 border border-violet-500/20">{skill}<button onClick={() => setForm({ ...form, skills: form.skills.filter(s => s !== skill) })} className="text-violet-300 hover:text-red-400 transition-colors">×</button></span>))}</div>
          <div className="flex gap-2"><input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())} className="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all text-sm" placeholder="Add a skill or interest..." /><button onClick={addSkill} className="px-4 py-2.5 rounded-xl bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 transition-all text-sm">+ Add</button></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div><label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Instagram</label><input value={form.social?.instagram || ''} onChange={(e) => setForm({ ...form, social: { ...form.social, instagram: e.target.value } })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all" /></div>
          <div><label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Email</label><input value={form.social?.email || ''} onChange={(e) => setForm({ ...form, social: { ...form.social, email: e.target.value } })} className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-violet-500/50 transition-all" /></div>
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
