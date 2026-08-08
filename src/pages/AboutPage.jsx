import React, { useState, useEffect } from 'react';
import { aboutStore } from '../utils/adminStore';

const FALLBACK_DATA = {
    name: 'Aufa Rafii Hadibrata',
    title: 'Creative Entrepreneur & Digital Strategist',
    bio: "My name is Aufa Rafii' Hadibrata, a self-taught business growth consultant and digital marketing strategist with 4+ years of experience creating modern, clean, and minimal brands that make a lasting impression.",
    skills: ["Gaming", "Film Making", "Traveling"],
    experience: [
        { role: "Digital Strategist", company: "PT Bayarkilat Apps Indonesia", period: "June 2025 - Present", details: ["Developed performance-driven digital marketing campaigns.", "Built content strategy for multi-channel presence.", "Achieved 10% more conversion with Organic Social Media."] },
        { role: "Business Development Manager", company: "Loekis.in", period: "June 2021 - Present", details: ["Developed business systems and growth strategies.", "Conducted market research and trend analysis.", "Initiated B2B discussions and partner negotiations."] },
        { role: "Business Owner", company: "Zero Cost Shop", period: "Oct 2016 - June 2025", details: ["Oversaw online store operations on Tokopedia.", "Developed promotional strategies and campaigns.", "Analyzed store performance using analytics tools."] }
    ],
    education: [
        { degree: "Institut Pertanian Bogor (IPB)", major: "Bachelor of Business Administration (2018 - 2025)", period: "2019 - 2024", school: "IPB University, Bogor" },
        { degree: "SMK TARUNA TERPADU 1", major: "Multimedia (2016 - 2018)", period: "2014 - 2017", school: "SMK, Bogor" }
    ],
    details: {
        age: "25 years",
        website: "aufarafii.id",
        email1: "me@aufarafii.id",
        email2: "aufatea1@gmail.com",
        phone: "+6287770050793",
        location: "Indonesia"
    },
    portfolio_links: [
        { label: "LinkedIn", url: "https://www.linkedin.com/in/aufa-hadibrata/" },
        { label: "Instagram", url: "https://www.instagram.com/aufapai/" },
        { label: "Tokopedia", url: "https://www.tokopedia.com/zerocostshop" }
    ],
    achievements: [
        "Grew Instagram followers from 500 to 8,000 in <1 year",
        "Best Student Nominee in IPB Entrepreneurship 2018",
        "Successful Tokopedia store owner since 2016"
    ],
    section_order: ['profile', 'experience', 'skills', 'education', 'portfolio', 'details', 'achievements'],
    custom_skills: [
        { category: "Design Tools", items: [{ name: "Adobe Illustrator", text: "Ai", bg: "#FF9A00" }, { name: "Adobe Photoshop", text: "Ps", bg: "#31A8FF" }, { name: "Adobe InDesign", text: "Id", bg: "#FF3366" }, { name: "Adobe XD", text: "Xd", bg: "#FF61F6" }, { name: "Canva", text: "Cn", bg: "#00D4AA" }] },
        { category: "Editing Tools", items: [{ name: "Adobe After Effects", text: "Ae", bg: "#9999FF" }, { name: "Adobe Premiere", text: "Pr", bg: "#9999FF" }, { name: "DaVinci", text: "🎨", bg: "#303030", logo: "🎨" }] },
        { category: "Marketing", items: [{ name: "Facebook", text: "fb", bg: "#1877F2" }, { name: "Instagram", text: "ig", bg: "#E1306C" }, { name: "Google Ads", text: "G", bg: "#4285F4" }, { name: "Tokopedia", text: "TP", bg: "#5CBA47" }] },
        { category: "Languages", items: [{ name: "Indonesian", text: "ID", bg: "#222" }, { name: "English", text: "GB", bg: "#222" }] }
    ]
};

const getInterestEmoji = (interest) => {
    const i = interest.toLowerCase();
    if (i.includes('game') || i.includes('gaming')) return '🎮';
    if (i.includes('film') || i.includes('movie') || i.includes('making')) return '🎬';
    if (i.includes('travel') || i.includes('vacation') || i.includes('trip')) return '✈️';
    if (i.includes('design') || i.includes('art')) return '🎨';
    if (i.includes('music')) return '🎵';
    if (i.includes('read') || i.includes('book')) return '📚';
    return '✨';
};

const AboutPage = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const data = await aboutStore.get();
                if (data && data.name) {
                    setAboutData(data);
                } else {
                    setAboutData(FALLBACK_DATA);
                }
            } catch (err) {
                console.error("Error loading About data:", err);
                setAboutData(FALLBACK_DATA);
            }
            setLoading(false);
        };
        fetchAbout();
    }, []);

    const data = aboutData || FALLBACK_DATA;
    const order = data.section_order && data.section_order.length > 0 
        ? data.section_order 
        : FALLBACK_DATA.section_order;

    const renderSection = (sectionId) => {
        switch (sectionId) {
            case 'profile':
                return (
                    <header key="profile" className="flex flex-col md:flex-row gap-8 items-start mb-12">
                        <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-white/10 flex-shrink-0 bg-gradient-to-br from-amber-200 to-amber-100 group">
                            <img src="/images/about-portrait.png" alt={data.name} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    onClick={() => {
                                        const password = prompt("🎉 Selamat! Kamu menemukan Easter Egg!\n\nBerarti kamu orang yang spesial 💕\n\nMasukkan password untuk melanjutkan:");
                                        if (password === "ilypai") {
                                            window.location.href = "/x9k2m7p4q1s8";
                                        } else if (password !== null) {
                                            alert("Password salah! Coba hubungi yang punya website 😊");
                                        }
                                    }}
                                    className="bg-pink-500/80 hover:bg-pink-600 backdrop-blur-sm rounded-full p-2 transform hover:scale-110 transition-all duration-200 shadow-lg"
                                    aria-label="Easter egg"
                                >
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 bg-transparent">
                            <h1 className="text-3xl font-display font-bold text-white mb-1">{data.name}</h1>
                            <p className="text-primary-400 text-sm mb-4 font-semibold">{data.title}</p>
                            <p className="text-lg md:text-xl text-white/80 italic leading-relaxed mb-6 whitespace-pre-wrap">
                                {data.bio}
                            </p>
                            {/* Interests */}
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-sm font-bold text-white/60 bg-dark-card px-4 py-2 rounded-xl">Interests</span>
                                {data.skills.map((interest, i) => (
                                    <span key={i} className="flex items-center gap-2 bg-dark-card px-4 py-2 rounded-xl text-sm text-white/80">
                                        <span>{getInterestEmoji(interest)}</span> {interest}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </header>
                );
            case 'experience':
                return (
                    <div key="experience" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {data.experience.map((item, idx) => (
                            <div key={idx} className="bg-dark-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{item.role}</h3>
                                            <p className="text-dark-muted text-sm">{item.company}</p>
                                        </div>
                                        <span className="bg-dark-bg px-3 py-1 rounded-lg text-xs text-white/60 border border-white/10 whitespace-nowrap">{item.period}</span>
                                    </div>
                                    <ul className="text-sm text-white/70 mt-4 space-y-2">
                                        {item.details.map((detail, dIdx) => (
                                            <li key={dIdx}>• {detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'skills':
                return (
                    <div key="skills" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {data.custom_skills.map((skillCat, idx) => (
                            <div key={idx} className="bg-dark-card rounded-2xl p-4 border border-white/5 flex items-center gap-4">
                                <span className="text-sm font-bold text-white/60 whitespace-nowrap min-w-[90px]">{skillCat.category}</span>
                                <div className="flex flex-wrap gap-2">
                                    {skillCat.items.map((item, iIdx) => {
                                        const bgCol = item.bg || '#31A8FF';
                                        return (
                                            <span 
                                                key={iIdx} 
                                                style={{ backgroundColor: bgCol }}
                                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md"
                                                title={item.name}
                                            >
                                                {item.logo ? (
                                                    item.logo.length <= 4 ? (
                                                        <span className="text-lg">{item.logo}</span>
                                                    ) : (
                                                        <img src={item.logo} className="w-5 h-5 object-contain" alt="" />
                                                    )
                                                ) : (
                                                    item.text
                                                )}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'education':
                return (
                    <div key="education" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {data.education.map((item, idx) => (
                            <div key={idx} className="bg-dark-card rounded-2xl p-6 border border-white/5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{item.degree}</h3>
                                        {item.major && <p className="text-dark-muted text-sm">{item.major}</p>}
                                        <p className="text-dark-muted text-sm">{item.school}</p>
                                    </div>
                                    <span className="bg-dark-bg px-3 py-1 rounded-lg text-xs text-white/60 border border-white/10 whitespace-nowrap">{item.period}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'portfolio':
                return (
                    <div key="portfolio" className="bg-dark-card rounded-2xl p-4 border border-white/5 mb-8">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-sm font-bold text-white/60 px-2">Portfolio</span>
                            {data.portfolio_links.map((link, idx) => {
                                const name = link.label.toLowerCase();
                                let bg = 'bg-white/5 hover:bg-white/10 border border-white/10';
                                let emoji = '🔗';
                                
                                if (name.includes('linkedin')) {
                                    bg = 'bg-[#0A66C2] hover:opacity-90';
                                    emoji = 'in';
                                } else if (name.includes('instagram')) {
                                    bg = 'bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] hover:opacity-90';
                                    emoji = '📷';
                                } else if (name.includes('tokopedia')) {
                                    bg = 'bg-[#5CBA47] hover:opacity-90';
                                    emoji = '🛒';
                                }
                                
                                return (
                                    <a 
                                        key={idx}
                                        href={link.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white transition-opacity ${bg}`}
                                    >
                                        <span>{emoji}</span> {link.label}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                );
            case 'details':
                return (
                    <div key="details" className="bg-dark-card rounded-2xl p-4 border border-white/5 mb-8">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-sm font-bold text-white/60 px-2">Details</span>
                            {data.details.age && (
                                <span className="flex items-center gap-2 bg-dark-bg px-4 py-2 rounded-xl text-sm text-white/80 border border-white/10">
                                    <span>📅</span> {data.details.age}
                                </span>
                            )}
                            {data.details.website && (
                                <a 
                                    href={data.details.website.startsWith('http') ? data.details.website : `https://${data.details.website}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center gap-2 bg-dark-bg px-4 py-2 rounded-xl text-sm text-white/80 border border-white/10 hover:border-primary-400 transition-colors"
                                >
                                    <span>🌐</span> {data.details.website}
                                </a>
                            )}
                            {data.details.email1 && (
                                <a 
                                    href={`mailto:${data.details.email1}`} 
                                    className="flex items-center gap-2 bg-dark-bg px-4 py-2 rounded-xl text-sm text-white/80 border border-white/10 hover:border-primary-400 transition-colors"
                                >
                                    <span>✉️</span> {data.details.email1}
                                </a>
                            )}
                            {data.details.email2 && (
                                <a 
                                    href={`mailto:${data.details.email2}`} 
                                    className="flex items-center gap-2 bg-dark-bg px-4 py-2 rounded-xl text-sm text-white/80 border border-white/10 hover:border-primary-400 transition-colors"
                                >
                                    <span>📧</span> {data.details.email2}
                                </a>
                            )}
                            {data.details.phone && (
                                <a 
                                    href={`https://wa.me/${data.details.phone.replace(/[^0-9]/g, '')}?text=Hallo%20kak%20Aufa%20salam%20kenal`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-xl text-sm text-white hover:bg-green-700 transition-colors"
                                >
                                    <span>📱</span> {data.details.phone}
                                </a>
                            )}
                            {data.details.location && (
                                <span className="flex items-center gap-2 bg-dark-bg px-4 py-2 rounded-xl text-sm text-white/80 border border-white/10">
                                    <span>🇮🇩</span> {data.details.location}
                                </span>
                            )}
                        </div>
                    </div>
                );
            case 'achievements':
                return (
                    data.achievements && data.achievements.length > 0 && (
                        <div key="achievements" className="bg-dark-card rounded-2xl p-6 border border-yellow-500/20 mb-8">
                            <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center gap-2">
                                <span>🏆</span> Achievements
                            </h3>
                            <ul className="space-y-2 text-sm text-white/80">
                                {data.achievements.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <span>🏆</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                );
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="pt-24 pb-12 min-h-screen bg-dark-bg text-white flex items-center justify-center">
                <div className="text-white/40 text-center py-16">Loading profile...</div>
            </div>
        );
    }

    return (
        <section className="pt-24 pb-12 min-h-screen bg-dark-bg text-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {order.map(sectionId => renderSection(sectionId))}
            </div>
        </section>
    );
};

export default AboutPage;
