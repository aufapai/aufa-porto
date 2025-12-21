import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'About', href: '#about' },
        { name: 'Work', href: '#work' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-bg/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-display font-bold text-white tracking-widest">
                        PORTFOLIO<span className="text-primary-500">.</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/" className="text-sm font-medium text-dark-muted hover:text-white transition-colors relative group">
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full" />
                        </Link>

                        {/* Dropdown */}
                        <div className="relative group">
                            <button className="text-sm font-medium text-dark-muted hover:text-white transition-colors flex items-center">
                                Portfolio
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            <div className="absolute top-full left-0 mt-2 w-48 bg-dark-card border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                                <Link to="/business" className="block px-4 py-3 text-sm text-dark-muted hover:text-white hover:bg-white/5 first:rounded-t-xl">Business</Link>
                                <Link to="/graphic-design" className="block px-4 py-3 text-sm text-dark-muted hover:text-white hover:bg-white/5">Graphic Design</Link>
                                <Link to="/streetwear" className="block px-4 py-3 text-sm text-dark-muted hover:text-white hover:bg-white/5 last:rounded-b-xl">Streetwear</Link>
                            </div>
                        </div>

                        <Link to="/blog" className="text-sm font-medium text-dark-muted hover:text-white transition-colors relative group">
                            Blog
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full" />
                        </Link>

                        <a href="#contact" className="text-sm font-medium text-dark-muted hover:text-white transition-colors relative group">
                            Contact
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white hover:text-primary-500 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-dark-bg/95 backdrop-blur-xl border-b border-white/10 p-4">
                    <div className="flex flex-col space-y-4">
                        <Link to="/" className="text-base font-medium text-dark-muted hover:text-white transition-colors block" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>

                        <div className="border-l-2 border-white/10 pl-4 space-y-2">
                            <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Portfolio</span>
                            <Link to="/business" className="text-base font-medium text-white block" onClick={() => setIsMobileMenuOpen(false)}>Business</Link>
                            <Link to="/graphic-design" className="text-base font-medium text-white block" onClick={() => setIsMobileMenuOpen(false)}>Graphic Design</Link>
                            <Link to="/streetwear" className="text-base font-medium text-white block" onClick={() => setIsMobileMenuOpen(false)}>Streetwear</Link>
                        </div>

                        <Link to="/blog" className="text-base font-medium text-dark-muted hover:text-white transition-colors block" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                        <a href="#contact" className="text-base font-medium text-dark-muted hover:text-white transition-colors block" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
