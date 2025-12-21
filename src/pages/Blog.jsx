import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
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
                    {/* Article 1 */}
                    <Link to="/blog/transformasi-bisnis" className="block">
                        <article className="bg-dark-card rounded-2xl overflow-hidden border border-white/5 hover:border-primary-500/30 transition-all group">
                            <div className="aspect-video w-full overflow-hidden relative">
                                <img
                                    src="https://images.pexels.com/photos/7289746/pexels-photo-7289746.jpeg?cs=srgb&dl=pexels-kampus-7289746.jpg&fm=jpg"
                                    alt="Transformasi Bisnis"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent opacity-80"></div>
                                <div className="absolute bottom-0 left-0 p-8">
                                    <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">Business</span>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                                        Transformasi Bisnis Digital: Kisah Sukses Aufa Rafii Hadibrata
                                    </h2>
                                    <p className="text-white/80 line-clamp-2">
                                        Membangun fondasi kuat di dunia pemasaran dan kewirausahaan, mulai dari Zero Cost Shop hingga manajemen strategi digital.
                                    </p>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="prose prose-invert max-w-none text-dark-muted">
                                    <p>
                                        Halo, saya Aufa Rafii Hadibrata, seorang lulusan bisnis dari IPB University. Perjalanan saya dimulai dari rasa ingin tahu yang besar terhadap desain dan branding...
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-sm text-dark-muted">Dec 21, 2025 • 5 min read</span>
                                    <span className="text-primary-400 font-medium hover:text-primary-300 transition-colors">Read Full Story →</span>
                                </div>
                            </div>
                        </article>
                    </Link>

                    {/* Article 2 */}
                    <Link to="/blog/cari-duit" className="block">
                        <article className="bg-dark-card rounded-2xl overflow-hidden border border-white/5 hover:border-primary-500/30 transition-all group">
                            <div className="p-8">
                                <span className="px-3 py-1 bg-secondary-500/20 text-secondary-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">Personal Journey</span>
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    "Bagaimana Cara Cari Duit di Internet": A 2010 Story
                                </h2>
                                <p className="text-dark-muted mb-6">
                                    Hal yang pertama kali gw cari di internet adalah "Bagaimana Cara Cari Duit di Internet". Di era 2010 warnet Peanut.net, speed 1mbps, dan awal mula mengenal dunia digital.
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-white/10 overflow-hidden">
                                        <img src="/images/profile-about.png" alt="Aufa" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-medium">Aufa Rafii</p>
                                        <p className="text-dark-muted text-xs">Dec 20, 2025</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Blog;
