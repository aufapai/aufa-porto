import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <section id="about" className="py-24 bg-dark-bg relative overflow-hidden">
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary-500/10 rounded-full mix-blend-screen filter blur-[100px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-secondary-600 rounded-2xl transform rotate-3 opacity-20 blur-lg"></div>
                        <div className="relative bg-dark-card rounded-2xl p-2 border border-white/5 hover:border-primary-500/30 transition-colors overflow-hidden group">
                            <div className="aspect-[3/4] overflow-hidden rounded-xl">
                                <img
                                    src="/images/about-portrait.png"
                                    alt="Aufa Rafii Hadibrata"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Me</span>
                        </h2>
                        <p className="text-dark-muted text-lg mb-8">
                            Hi, I’m Aufa Rafii Hadibrata, a business graduate from IPB University with a strong interest in graphic design, brand development, and digital marketing. I started my journey in design and branding out of curiosity and passion, which eventually led me to explore streetwear, content strategy, and business development.
                        </p>

                        <div className="mb-8">
                            <Link to="/about" className="text-primary-400 font-bold hover:text-primary-300 transition-colors flex items-center">
                                Read Full Bio <span className="ml-2">→</span>
                            </Link>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-display font-bold text-white mb-4">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Strategic Planning', 'Content Management', 'Facebook for Business', 'Digital Marketing', 'Graphic Design', 'Brand Development', 'Performance Marketing'].map((skill) => (
                                        <span key={skill} className="px-3 py-1 bg-dark-bg border border-white/10 rounded-full text-sm text-primary-400">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-display font-bold text-white mb-4">Experience</h3>
                                <ul className="space-y-4">
                                    <li className="relative pl-6 border-l border-white/10">
                                        <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-primary-500 rounded-full"></div>
                                        <h4 className="text-white font-medium">Digital Strategist - PT Bayarkilat Apps Indonesia</h4>
                                        <span className="text-sm text-dark-muted">June 2025 - Present</span>
                                    </li>
                                    <li className="relative pl-6 border-l border-white/10">
                                        <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-secondary-500 rounded-full"></div>
                                        <h4 className="text-white font-medium">Business Development Manager - Loekis.in</h4>
                                        <span className="text-sm text-dark-muted">June 2021 - Present</span>
                                    </li>
                                    <li className="relative pl-6 border-l border-white/10">
                                        <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-primary-500 rounded-full"></div>
                                        <h4 className="text-white font-medium">Business Owner - Zero Cost Shop</h4>
                                        <span className="text-sm text-dark-muted">Oct 2016 - June 2025</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-display font-bold text-white mb-4">Education</h3>
                                <ul className="space-y-4">
                                    <li className="flex flex-col">
                                        <span className="text-white font-medium">Institut Pertanian Bogor (IPB)</span>
                                        <span className="text-sm text-dark-muted">Bachelor of Business Administration (2018 - 2025)</span>
                                    </li>
                                    <li className="flex flex-col">
                                        <span className="text-white font-medium">SMK TARUNA TERPADU 1</span>
                                        <span className="text-sm text-dark-muted">Multimedia (2016 - 2018)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
