import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogStore } from '../utils/adminStore';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch published posts from PHP API → MySQL database
        const loadPosts = async () => {
            try {
                const data = await blogStore.getPublished();
                setPosts(data);
            } catch (err) {
                console.warn('Failed to load posts:', err);
            }
            setLoading(false);
        };
        loadPosts();
    }, []);

    if (loading) {
        return (
            <section className="pt-24 pb-12 min-h-screen bg-dark-bg flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full" />
            </section>
        );
    }

    return (
        <section className="pt-24 pb-12 min-h-screen bg-dark-bg">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Thoughts & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Stories</span>
                    </h1>
                    <p className="text-dark-muted text-lg">
                        Insights on business transformation, digital marketing, and the journey of entrepreneurship.
                    </p>
                </header>

                <div className="space-y-12">
                    {posts.map((post, index) => (
                        <Link
                            key={post.id}
                            to={`/blog/${post.slug || post.id}`}
                            className="block"
                        >
                            <article className="bg-dark-card rounded-2xl overflow-hidden border border-white/5 hover:border-primary-500/30 transition-all group">
                                {index === 0 && (post.coverImage || post.cover_image) ? (
                                    <>
                                        <div className="aspect-video w-full overflow-hidden relative">
                                            <img
                                                src={post.coverImage || post.cover_image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent opacity-80"></div>
                                            <div className="absolute bottom-0 left-0 p-8">
                                                <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                                                    {post.category}
                                                </span>
                                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                                                    {post.title}
                                                </h2>
                                                <p className="text-white/80 line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-8">
                                            <div className="prose prose-invert max-w-none text-dark-muted">
                                                <p>{post.excerpt}</p>
                                            </div>
                                            <div className="mt-6 flex items-center justify-between">
                                                <span className="text-sm text-dark-muted">
                                                    {formatDate(post)} • {post.readTime || post.read_time}
                                                </span>
                                                <span className="text-primary-400 font-medium hover:text-primary-300 transition-colors">
                                                    Read Full Story →
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-8">
                                        <span className="px-3 py-1 bg-secondary-500/20 text-secondary-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                                            {post.category}
                                        </span>
                                        <h2 className="text-2xl font-bold text-white mb-4">
                                            {post.title}
                                        </h2>
                                        <p className="text-dark-muted mb-6">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-white/10 overflow-hidden">
                                                <img src="/images/profile-about.png" alt={post.author} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-white text-sm font-medium">{post.author}</p>
                                                <p className="text-dark-muted text-xs">{formatDate(post)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </article>
                        </Link>
                    ))}

                    {posts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-4xl mb-4">📝</p>
                            <p className="text-dark-muted text-lg">No blog posts yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

function formatDate(post) {
    const dateStr = post.date || post.created_at?.split(' ')[0] || post.created_at?.split('T')[0] || '';
    try {
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
        return dateStr;
    }
}

export default Blog;
