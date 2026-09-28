import React, { useState, useEffect } from 'react';
import { aboutStore, LINKEDIN_ABOUT_DATA } from '../utils/adminStore';

const FALLBACK_DATA = LINKEDIN_ABOUT_DATA;

const getInterestEmoji = (interest) => {
    const i = interest.toLowerCase();
    if (i.includes('game') || i.includes('gaming')) return '🎮';
    if (i.includes('film') || i.includes('movie') || i.includes('making')) return '🎬';
    if (i.includes('travel') || i.includes('vacation') || i.includes('trip')) return '✈️';
    if (i.includes('design') || i.includes('art') || i.includes('graphic')) return '🎨';
    if (i.includes('music')) return '🎵';
    if (i.includes('read') || i.includes('book')) return '📚';
    if (i.includes('sales') || i.includes('crm') || i.includes('growth')) return '📈';
    if (i.includes('business') || i.includes('development')) return '💼';
    if (i.includes('digital') || i.includes('marketing')) return '🚀';
    if (i.includes('workflow') || i.includes('optimization') || i.includes('system')) return '⚡';
    if (i.includes('ui') || i.includes('ux')) return '🖥️';
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
                        <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white/10 flex-shrink-0 bg-gradient-to-br from-amber-200 to-amber-100 group shadow-2xl">
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
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-1">{data.name}</h1>
                                    <p className="text-primary-400 text-sm md:text-base font-semibold leading-relaxed">{data.title}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a 
                                        href="https://www.linkedin.com/in/aufa-hadibrata/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-semibold shadow-md transition-all"
                                    >
                                        <span className="font-bold">in</span> LinkedIn Profile
                                    </a>
                                    <a 
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 transition-all"
                                    >
                                        <span>✉️</span> Get in Touch
                                    </a>
                                </div>
                            </div>
                            
                            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-6 whitespace-pre-wrap">
                                {data.bio}
                            </p>

                            {/* Interests / Core Skills */}
                            {data.skills && data.skills.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-white/50 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">Interests & Expertise</span>
                                    {data.skills.map((interest, i) => (
                                        <span key={i} className="flex items-center gap-1.5 bg-dark-card border border-white/5 px-3 py-1.5 rounded-lg text-xs text-white/80 hover:border-white/20 transition-all">
                                            <span>{getInterestEmoji(interest)}</span> {interest}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </header>
                );

            case 'experience':
                if (!data.experience || data.experience.length === 0) return null;
                return (
                    <div key="experience" className="mb-12">
                        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span>💼</span> Work Experience
                            </h2>
                            <span className="text-xs text-white/40">{data.experience.length} Posisi</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.experience.map((item, idx) => (
                                <div key={idx} className="bg-dark-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all">
                                    <div>
                                        <div className="flex justify-between items-start gap-2 mb-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-white leading-snug">{item.role}</h3>
                                                <p className="text-primary-400 font-medium text-sm mt-0.5">{item.company}</p>
                                                {item.location && (
                                                    <p className="text-dark-muted text-xs flex items-center gap-1 mt-0.5">
                                                        <span>📍</span> {item.location}
                                                    </p>
                                                )}
                                            </div>
                                            <span className="bg-dark-bg px-3 py-1 rounded-lg text-xs text-white/60 border border-white/10 whitespace-nowrap shrink-0">{item.period}</span>
                                        </div>
                                        {item.details && item.details.length > 0 && (
                                            <ul className="text-xs md:text-sm text-white/70 mt-4 space-y-1.5">
                                                {item.details.map((detail, dIdx) => (
                                                    <li key={dIdx} className="flex items-start gap-2">
                                                        <span className="text-primary-400 mt-1">•</span>
                                                        <span>{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'education':
                if (!data.education || data.education.length === 0) return null;
                return (
                    <div key="education" className="mb-12">
                        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span>🎓</span> Education History
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.education.map((item, idx) => (
                                <div key={idx} className="bg-dark-card rounded-2xl p-6 border border-white/5 hover:border-white/15 transition-all">
                                    <div className="flex justify-between items-start gap-2">
                                        <div>
                                            <h3 className="text-lg font-bold text-white leading-snug">{item.degree}</h3>
                                            {item.major && <p className="text-primary-400 font-medium text-sm mt-0.5">{item.major}</p>}
                                            <p className="text-dark-muted text-xs mt-1">{item.school}</p>
                                        </div>
                                        <span className="bg-dark-bg px-3 py-1 rounded-lg text-xs text-white/60 border border-white/10 whitespace-nowrap shrink-0">{item.period}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'skills':
                if (!data.custom_skills || data.custom_skills.length === 0) return null;
                return (
                    <div key="skills" className="mb-12">
                        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span>🎨</span> Skills, Tools & Languages
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.custom_skills.map((skillCat, idx) => (
                                <div key={idx} className="bg-dark-card rounded-2xl p-5 border border-white/5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-white/15 transition-all">
                                    <span className="text-xs font-bold uppercase tracking-wider text-white/60 whitespace-nowrap min-w-[110px]">{skillCat.category}</span>
                                    <div className="flex flex-wrap gap-2">
                                        {skillCat.items.map((item, iIdx) => {
                                            const bgCol = item.bg || '#31A8FF';
                                            return (
                                                <span 
                                                    key={iIdx} 
                                                    style={{ backgroundColor: bgCol }}
                                                    className="px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-white font-bold text-xs shadow-md"
                                                    title={item.name}
                                                >
                                                    {item.logo ? (
                                                        item.logo.length <= 4 ? (
                                                            <span>{item.logo}</span>
                                                        ) : (
                                                            <img src={item.logo} className="w-4 h-4 object-contain" alt="" />
                                                        )
                                                    ) : null}
                                                    <span>{item.text || item.name}</span>
                                                    {item.name && item.text && item.name !== item.text && (
                                                        <span className="text-[10px] text-white/70 font-normal">({item.name})</span>
                                                    )}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'portfolio':
                if (!data.portfolio_links || data.portfolio_links.length === 0) return null;
                return (
                    <div key="portfolio" className="mb-12">
                        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span>🔗</span> Online Presence & Social Links
                            </h2>
                        </div>
                        <div className="bg-dark-card rounded-2xl p-6 border border-white/5">
                            <div className="flex flex-wrap items-center gap-3">
                                {data.portfolio_links.map((link, idx) => {
                                    const name = (link.label || '').toLowerCase();
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
                                    } else if (name.includes('linktree')) {
                                        bg = 'bg-[#43E660] text-black hover:opacity-90';
                                        emoji = '🌲';
                                    } else if (name.includes('blog')) {
                                        bg = 'bg-cyan-600 hover:opacity-90';
                                        emoji = '✍️';
                                    }
                                    
                                    return (
                                        <a 
                                            key={idx} 
                                            href={link.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${bg}`}
                                        >
                                            <span>{emoji}</span> {link.label}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );

            case 'details':
                const hasDetails = data.details && Object.keys(data.details).some(k => data.details[k]);
                if (!hasDetails) return null;
                return (
                    <div key="details" className="mb-12">
                        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span>📝</span> Contact & Personal Details
                            </h2>
                        </div>
                        <div className="bg-dark-card rounded-2xl p-6 border border-white/5">
                            <div className="flex flex-wrap items-center gap-3">
                                {data.details.age && (
                                    <span className="flex items-center gap-2 bg-dark-bg px-4 py-2.5 rounded-xl text-xs md:text-sm text-white/80 border border-white/10">
                                        <span>📅</span> Age: {data.details.age}
                                    </span>
                                )}
                                {data.details.website && (
                                    <a 
                                        href={data.details.website.startsWith('http') ? data.details.website : `https://${data.details.website}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="flex items-center gap-2 bg-dark-bg px-4 py-2.5 rounded-xl text-xs md:text-sm text-white/80 border border-white/10 hover:border-primary-400 transition-colors"
                                    >
                                        <span>🌐</span> {data.details.website}
                                    </a>
                                )}
                                {data.details.email1 && (
                                    <a 
                                        href={`mailto:${data.details.email1}`} 
                                        className="flex items-center gap-2 bg-dark-bg px-4 py-2.5 rounded-xl text-xs md:text-sm text-white/80 border border-white/10 hover:border-primary-400 transition-colors"
                                    >
                                        <span>✉️</span> {data.details.email1}
                                    </a>
                                )}
                                {data.details.email2 && (
                                    <a 
                                        href={`mailto:${data.details.email2}`} 
                                        className="flex items-center gap-2 bg-dark-bg px-4 py-2.5 rounded-xl text-xs md:text-sm text-white/80 border border-white/10 hover:border-primary-400 transition-colors"
                                    >
                                        <span>📧</span> {data.details.email2}
                                    </a>
                                )}
                                {data.details.phone && (
                                    <a 
                                        href={`https://wa.me/${data.details.phone.replace(/[^0-9]/g, '')}?text=Halo%20Aufa,%20salam%20kenal!`} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold text-white transition-colors"
                                    >
                                        <span>📱</span> WhatsApp ({data.details.phone})
                                    </a>
                                )}
                                {data.details.location && (
                                    <span className="flex items-center gap-2 bg-dark-bg px-4 py-2.5 rounded-xl text-xs md:text-sm text-white/80 border border-white/10">
                                        <span>📍</span> {data.details.location}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 'achievements':
                if (!data.achievements || data.achievements.length === 0) return null;
                return (
                    <div key="achievements" className="mb-12">
                        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                            <h2 className="text-xl font-bold text-yellow-400 flex items-center gap-2">
                                <span>🏆</span> Highlights & Achievements
                            </h2>
                        </div>
                        <div className="bg-dark-card rounded-2xl p-6 border border-yellow-500/20">
                            <ul className="space-y-3 text-xs md:text-sm text-white/85">
                                {data.achievements.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="text-yellow-400 text-base">🏆</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="pt-24 pb-12 min-h-screen bg-dark-bg text-white flex items-center justify-center">
                <div className="text-white/40 text-center py-16 flex items-center gap-3">
                    <span className="animate-spin w-5 h-5 border-2 border-primary-400 border-t-transparent rounded-full" />
                    <span>Loading profile...</span>
                </div>
            </div>
        );
    }

    return (
        <section className="pt-24 pb-16 min-h-screen bg-dark-bg text-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {order.map(sectionId => renderSection(sectionId))}
            </div>
        </section>
    );
};

export default AboutPage;
