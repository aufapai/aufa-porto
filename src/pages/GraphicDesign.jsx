import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioStore } from '../utils/adminStore';

const GraphicDesign = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    useEffect(() => {
        const load = async () => {
            const data = await portfolioStore.getByCategory('graphic-design');
            setProjects(data || []);
            setLoading(false);
        };
        load();
    }, []);

    const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
    const currentProjects = projects.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <section className="pt-24 pb-12 min-h-screen bg-dark-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Graphic <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Design</span>
                    </h1>
                    <p className="text-dark-muted text-lg max-w-2xl mx-auto">
                        Visual storytelling through brand identity, merchandise, and digital content.
                    </p>
                </header>

                {loading ? (
                    <div className="text-center py-20 text-white/40">Loading projects...</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentProjects.map((item) => (
                                <Link 
                                    key={item.id} 
                                    to={`/portfolio/${item.id}`}
                                    className="group relative h-96 bg-dark-card rounded-2xl overflow-hidden border border-white/5 hover:border-pink-500/50 transition-all block"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent z-10"></div>
                                    <img 
                                        src={item.image_url || `https://via.placeholder.com/600x800?text=${encodeURIComponent(item.title)}`} 
                                        alt={item.title} 
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                                        <div className="w-10 h-10 bg-pink-500/20 backdrop-blur-md rounded-xl mb-4 flex items-center justify-center text-pink-400 text-lg group-hover:scale-110 transition-transform">
                                            🎨
                                        </div>
                                        <h3 className="text-white font-bold text-xl mb-2 group-hover:text-pink-400 transition-colors">{item.title}</h3>
                                        <p className="text-sm text-gray-300 line-clamp-3">{item.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {projects.length === 0 && (
                            <div className="text-center py-20 bg-dark-card rounded-2xl border border-white/5 border-dashed text-white/40">
                                Belum ada proyek di kategori ini.
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-12 gap-4">
                                <button 
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-6 py-2 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30"
                                >
                                    Previous
                                </button>
                                <span className="text-white/60 text-sm">Page {page} of {totalPages}</span>
                                <button 
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-6 py-2 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default GraphicDesign;
