import React from 'react';
import { Link } from 'react-router-dom';

const DigitalMarketing = () => {
    return (
        <section className="pt-24 pb-12 min-h-screen bg-dark-bg text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-16">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">Growth & Performance</span>
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
                        Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Marketing</span>
                    </h1>
                    <p className="text-xl text-dark-muted max-w-3xl mx-auto">
                        Data-driven campaigns and strategic content distribution that convert views into revenue.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Case Study 1 */}
                    <div className="bg-dark-card rounded-2xl p-8 border border-white/5 hover:border-green-500/30 transition-all group">
                        <div className="mb-6 h-64 bg-black/40 rounded-xl overflow-hidden relative">
                            {/* Placeholder for chart/graph visual */}
                            <div className="absolute inset-0 flex items-center justify-center text-dark-muted/50 font-display font-bold text-4xl">
                                +45% ROAS
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">Paid Ads Scaling</h3>
                        <p className="text-dark-muted mb-6">
                            Managed multi-channel ad spend for PT Bayarkilat, optimizing for CPA and increasing overall return on ad spend by 45% in Q4 using targeted lookalike audiences.
                        </p>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center text-sm text-dark-muted">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Meta Ads (FB/IG)
                            </li>
                            <li className="flex items-center text-sm text-dark-muted">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Google Search & Display
                            </li>
                        </ul>
                    </div>

                    {/* Case Study 2 */}
                    <div className="bg-dark-card rounded-2xl p-8 border border-white/5 hover:border-green-500/30 transition-all group">
                        <div className="mb-6 h-64 bg-black/40 rounded-xl overflow-hidden relative">
                            {/* Placeholder for content visual */}
                            <div className="absolute inset-0 flex items-center justify-center text-dark-muted/50 font-display font-bold text-4xl">
                                Viral Content
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">Organic Content Strategy</h3>
                        <p className="text-dark-muted mb-6">
                            Developed a "User Education" content pillar for Puffin Store ID that reduced support tickets by 30% and drove 8,000+ organic followers in under a year.
                        </p>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center text-sm text-dark-muted">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> TikTok & Reels Strategy
                            </li>
                            <li className="flex items-center text-sm text-dark-muted">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> SEO-Optimized Blog Writing
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-24 text-center bg-gradient-to-r from-dark-card to-white/5 rounded-3xl p-12 border border-white/10">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to scale your business?</h2>
                    <Link to="/#contact" className="inline-block px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold transition-all shadow-lg shadow-green-600/25">
                        Start a Strategy Session
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default DigitalMarketing;
