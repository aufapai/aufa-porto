import React from 'react';

const UiUx = () => {
    return (
        <section className="pt-24 pb-12 min-h-screen bg-dark-bg text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-16">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">Product Design</span>
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
                        UI/UX & Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Systems</span>
                    </h1>
                    <p className="text-xl text-dark-muted max-w-3xl mx-auto">
                        Optimizing complex business workflows through intuitive design and data-driven dashboards.
                    </p>
                </header>

                <div className="space-y-24">
                    {/* Project 1: Bayarkilat Hub */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20 border border-white/10 group">
                            <img
                                src="/images/project-bayarkilat.png"
                                alt="Bayarkilat Hub Dashboard"
                                className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">BayarKilat Hub: Integrated Performance Report</h2>
                            <p className="text-dark-muted mb-6 leading-relaxed">
                                A comprehensive dashboard designed for Digital Strategists to monitor merchant sales snapshots and social media performance in real-time.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                                    <div className="ml-4">
                                        <h4 className="font-bold text-white">Merchant Sales Snapshot</h4>
                                        <p className="text-sm text-dark-muted">Visualizing top-performing merchants (Onlyfans, ChatGPT, Suno AI) with clear bar charts for quick comparison.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">✓</div>
                                    <div className="ml-4">
                                        <h4 className="font-bold text-white">Multi-Channel Analytics</h4>
                                        <p className="text-sm text-dark-muted">Consolidated metrics for YouTube, Meta (IG/FB), and TikTok, tracking reach, views, and growth percentages.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">✓</div>
                                    <div className="ml-4">
                                        <h4 className="font-bold text-white">AI Analysis Integration</h4>
                                        <p className="text-sm text-dark-muted">One-click "Buat Analisis AI" feature to generate strategic insights based on the visual data.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project 2: Tautly / Content Strategy */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
                        <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-white/10 group">
                            <img
                                src="/images/project-tautly.png"
                                alt="Content Strategy Dashboard"
                                className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="order-2 lg:order-1">
                            <h2 className="text-3xl font-bold text-white mb-4">Content Strategy Automation Dashboard</h2>
                            <p className="text-dark-muted mb-6 leading-relaxed">
                                An operational tool for content managers to plan, generate, and sync social media content seamlessly across platforms.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">✓</div>
                                    <div className="ml-4">
                                        <h4 className="font-bold text-white">Daily Task Focus</h4>
                                        <p className="text-sm text-dark-muted">High-contrast "Hari Ini" cards highlighting immediate content tasks like "4 Produk Digital yang Laris".</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400">✓</div>
                                    <div className="ml-4">
                                        <h4 className="font-bold text-white">AI Content Generator</h4>
                                        <p className="text-sm text-dark-muted">Built-in tools to generate detailed plans with Captions, Visual Briefs, and CTAs automatically.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">✓</div>
                                    <div className="ml-4">
                                        <h4 className="font-bold text-white">Workflow Efficiency</h4>
                                        <p className="text-sm text-dark-muted">Quick actions to Sync, Export, or View Calendar, streamlining the content production lifecycle.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UiUx;
