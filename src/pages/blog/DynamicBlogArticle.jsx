import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogStore } from '../../utils/adminStore';

/**
 * Simple markdown-like renderer for blog content
 */
const renderContent = (text) => {
  if (!text) return null;
  
  const lines = text.split('\n');
  const elements = [];
  let listBuffer = [];
  let key = 0;

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1 mb-6 text-dark-muted">
          {listBuffer.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
      listBuffer = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) { flushList(); return; }
    if (trimmed.startsWith('## ')) { flushList(); elements.push(<h2 key={key++} className="text-2xl font-bold text-white mt-10 mb-4">{trimmed.slice(3)}</h2>); return; }
    if (trimmed.startsWith('### ')) { flushList(); elements.push(<h3 key={key++} className="text-xl font-semibold text-secondary-400 mt-8 mb-3">{trimmed.slice(4)}</h3>); return; }
    if (trimmed.startsWith('**') && trimmed.endsWith('**')) { flushList(); elements.push(<p key={key++} className="text-white font-semibold mb-2">{trimmed.slice(2, -2)}</p>); return; }
    if (trimmed.startsWith('- ')) { listBuffer.push(trimmed.slice(2)); return; }

    flushList();
    const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
    elements.push(
      <p key={key++} className="text-dark-muted mb-4 leading-relaxed">
        {parts.map((part, i) => part.startsWith('**') && part.endsWith('**') 
          ? <strong key={i} className="text-white">{part.slice(2, -2)}</strong> 
          : part
        )}
      </p>
    );
  });

  flushList();
  return elements;
};

const DynamicBlogArticle = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from PHP API → MySQL database
    const loadPost = async () => {
      try {
        const post = await blogStore.getBySlug(slug);
        setBlog(post);
      } catch (err) {
        console.warn('Failed to load post:', err);
      }
      setLoading(false);
    };
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="pt-24 pb-12 min-h-screen bg-dark-bg text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <p className="text-6xl mb-4">📄</p>
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-dark-muted mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog" className="px-6 py-3 bg-primary-500 rounded-xl text-white font-medium hover:bg-primary-600 transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const coverImg = blog.coverImage || blog.cover_image || '';
  const readTime = blog.readTime || blog.read_time || '5 min read';
  const dateStr = blog.date || blog.created_at?.split(' ')[0] || '';

  return (
    <article className="pt-24 pb-12 min-h-screen bg-dark-bg text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            {blog.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center space-x-4 text-dark-muted text-sm">
            <span>{(() => { try { return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); } catch { return dateStr; } })()}</span>
            <span>•</span>
            <span>{readTime}</span>
            <span>•</span>
            <span>by {blog.author}</span>
          </div>
        </header>

        {coverImg && (
          <div className="aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-2xl shadow-primary-500/10">
            <img src={coverImg} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none">
          {blog.excerpt && (
            <p className="lead text-xl text-dark-muted mb-8 italic border-l-4 border-primary-500/30 pl-4">
              {blog.excerpt}
            </p>
          )}
          {renderContent(blog.content)}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <Link to="/blog" className="inline-block px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-all border border-white/10">
            ← Back to all posts
          </Link>
        </div>
      </div>
    </article>
  );
};

export default DynamicBlogArticle;
