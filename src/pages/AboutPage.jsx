import React from 'react';

const AboutPage = () => {
    return (
        <section className="pt-24 pb-12 min-h-screen bg-dark-bg text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-16">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary-500/20">
                        <img src="/images/about-portrait.png" alt="Aufa Rafii Hadibrata" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-4xl font-display font-bold mb-4">
                        Aufa Rafii' <span className="text-primary-500">Hadibrata</span>
                    </h1>
                    <p className="text-xl text-dark-muted max-w-2xl mx-auto">
                        Business Growth Consultant | Digital Marketing Strategist
                    </p>
                </header>

                <div className="space-y-12">
                    <div className="bg-dark-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">Professional Summary</h2>
                        <p className="text-dark-muted leading-relaxed">
                            Praktisi pengembangan bisnis dengan fokus pada sistem, produk, dan pemasaran digital. Memiliki pengalaman membangun brand dari nol, menyusun SOP operasional, menganalisis pasar, serta mengoptimalkan saluran distribusi dan engagement digital. Berorientasi pada pertumbuhan yang berkelanjutan dan keputusan berbasis data.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-dark-card p-8 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">Education</h2>
                            <ul className="space-y-6">
                                <li>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-white">Bachelor of Business</h3>
                                        <span className="text-primary-500 text-sm">2018 - 2024</span>
                                    </div>
                                    <p className="text-white/80">IPB University</p>
                                    <p className="text-sm text-dark-muted mt-1">Focus on Business Administration & Commerce.</p>
                                </li>
                                <li>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-white">Vocational School</h3>
                                        <span className="text-primary-500 text-sm">2016 - 2018</span>
                                    </div>
                                    <p className="text-white/80">SMKS Taruna Terpadu 1 Boash</p>
                                    <p className="text-sm text-dark-muted mt-1">Graduated in Multimedia.</p>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-dark-card p-8 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">Personal Skills</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold text-white mb-1">Strategi</h3>
                                    <p className="text-sm text-dark-muted">Business Analysis, Brand Positioning, Market Research</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white mb-1">Design Thinking</h3>
                                    <p className="text-sm text-dark-muted">Customer Persona, Funnel Mapping, Product-Market Fit</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white mb-1">Komunikasi</h3>
                                    <p className="text-sm text-dark-muted">Copywriting, Negotiation, Team Coordination</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-dark-card p-8 rounded-2xl border border-white/5">
                        <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">Tools & Proficiency</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            {['Adobe Photoshop', 'Google Analytics', 'Notion', 'Meta Ads', 'Figma', 'Excel/Sheets', 'Canva', 'Trello'].map((tool) => (
                                <div key={tool} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                                    <span className="text-white font-medium">{tool}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPage;
