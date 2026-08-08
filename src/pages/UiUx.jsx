import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioStore } from '../utils/adminStore';

const UiUx = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    useEffect(() => {
        const load = async () => {
            const data = await portfolioStore.getByCategory('ui-ux');
            setProjects(data || []);
            setLoading(false);
        };
        load();
    }, []);

    const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
    const currentProjects = projects.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <section className="pt-24 pb-12 min-h-screen bg-dark-bg text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        UI/UX <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Design</span>
                    </h1>
                    <p className="text-xl text-dark-muted max-w-2xl mx-auto">
                        Crafting intuitive, accessible, and high-performing digital experiences.
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
                                    className="group relative h-96 bg-dark-card rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/50 transition-all block"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent z-10"></div>
                                    {item.image_url ? (
                                        <img 
                                            src={item.image_url} 
                                            alt={item.title} 
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a2e]">
                                            <div className="w-48 h-32 bg-white/5 rounded-t-xl border border-white/10 shadow-2xl relative translate-y-8 group-hover:translate-y-4 transition-transform duration-500 flex items-center justify-center p-4">
                                                <span className="text-xs text-white/30 text-center font-mono">App Interface<br/>Mockup</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                                        <div className="w-10 h-10 bg-cyan-500/20 backdrop-blur-md rounded-xl mb-4 flex items-center justify-center text-cyan-400 text-lg group-hover:scale-110 transition-transform">
                                            💻
                                        </div>
                                        <h3 className="text-white font-bold text-xl mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
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

export default UiUx;
