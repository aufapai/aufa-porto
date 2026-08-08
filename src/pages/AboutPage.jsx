import React, { useState, useEffect } from 'react';
import { cvStore } from '../utils/adminStore';

const FALLBACK_DATA = {
    bio: "My name is Aufa Rafii' Hadibrata, a self-taught business growth consultant and digital marketing strategist with 4+ years of experience creating modern, clean, and minimal brands that make a lasting impression.",
    interests: ["Gaming", "Film Making", "Traveling"],
    experience: [
        { role: "Digital Strategist", company: "PT Bayarkilat Apps Indonesia", period: "2025", details: ["Developed performance-driven digital marketing campaigns.", "Built content strategy for multi-channel presence.", "Achieved 10% more conversion with Organic Social Media."] },
        { role: "Business Development Manager", company: "Loekis.in", period: "2021 - now", details: ["Developed business systems and growth strategies.", "Conducted market research and trend analysis.", "Initiated B2B discussions and partner negotiations."] },
        { role: "Graphic Designer", company: "Freelance", period: "2018 - now", details: ["Designed visual identities and brand logos.", "Created custom merchandise designs.", "Managed end-to-end design process."] },
        { role: "Business Owner", company: "Zero Cost Shop (Tokopedia)", period: "2016 - 2025", details: ["Oversaw online store operations on Tokopedia.", "Developed promotional strategies and campaigns.", "Analyzed store performance using analytics tools."] }
    ],
    skills: [
        { category: "Design Tools", items: ["Ai", "Ps", "Id", "Xd", "Cn"] },
        { category: "Editing Tools", items: ["Ae", "Pr", "DaVinci Resolve"] },
        { category: "Marketing", items: ["fb", "ig", "G", "TP"] },
        { category: "Languages", items: ["ID", "GB"] }
    ],
    education: [
        { degree: "Bachelor Degree", major: "Business & Entrepreneurship", period: "2019 - 2024", school: "IPB University, Bogor" },
        { degree: "Vocational High School", major: "Multimedia / Business", period: "2014 - 2017", school: "SMK, Bogor" }
    ],
    portfolioLinks: [
        { label: "LinkedIn", url: "https://www.linkedin.com/in/aufa-hadibrata/" },
        { label: "Instagram", url: "https://www.instagram.com/aufapai/" },
        { label: "Tokopedia", url: "https://www.tokopedia.com/zerocostshop" }
    ],
    details: {
        age: "25 years",
        website: "aufarafii.id",
        email1: "me@aufarafii.id",
        email2: "aufatea1@gmail.com",
        phone: "+6287770050793",
        location: "Indonesia"
    },
    achievements: [
        "Grew Instagram followers from 500 to 8,000 in <1 year",
        "Best Student Nominee in IPB Entrepreneurship 2018",
        "Successful Tokopedia store owner since 2016"
    ]
};

const getInterestEmoji = (interest) => {
    const i = interest.toLowerCase();
    if (i.includes('game') || i.includes('gaming')) return '🎮';
    if (i.includes('film') || i.includes('movie')) return '🎬';
    if (i.includes('travel') || i.includes('vacation')) return '✈️';
    if (i.includes('design')) return '🎨';
    if (i.includes('music')) return '🎵';
    if (i.includes('read') || i.includes('book')) return '📚';
    return '✨';
};

const getBadgeStyle = (item) => {
    const name = item.toLowerCase();
    if (name === 'ai') return { bg: 'bg-[#FF9A00]', text: 'Ai' };
    if (name === 'ps') return { bg: 'bg-[#31A8FF]', text: 'Ps' };
    if (name === 'id') return { bg: 'bg-[#FF3366]', text: 'Id' };
    if (name === 'xd') return { bg: 'bg-[#FF61F6]', text: 'Xd' };
    if (name === 'cn') return { bg: 'bg-[#00D4AA]', text: 'Cn' };
    if (name === 'ae') return { bg: 'bg-[#9999FF]', text: 'Ae' };
    if (name === 'pr') return { bg: 'bg-[#9999FF]', text: 'Pr' };
    if (name === 'fb') return { bg: 'bg-[#1877F2]', text: 'fb' };
    if (name === 'ig') return { bg: 'bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737]', text: 'ig' };
    if (name === 'g') return { bg: 'bg-[#4285F4]', text: 'G' };
    if (name === 'tp') return { bg: 'bg-[#5CBA47]', text: 'TP' };
    if (name.includes('id') || name.includes('indonesia')) return { bg: 'bg-white/10 text-2xl', text: '🇮🇩' };
    if (name.includes('gb') || name.includes('english') || name.includes('uk') || name.includes('us')) return { bg: 'bg-white/10 text-2xl', text: '🇬🇧' };
    return null;
};

// Search keywords case-insensitively
const findSection = (sections, keywords) => {
    const keys = Object.keys(sections);
    const matchedKey = keys.find(k => 
        keywords.some(kw => k.toLowerCase().includes(kw))
    );
    return matchedKey ? sections[matchedKey] : null;
};

const AboutPage = () => {
    const [cvData, setCvData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCv = async () => {
            try {
                const markdown = await cvStore.get();
                if (markdown) {
                    // Parse markdown sections
                    const lines = markdown.split('\n');
                    const sections = {};
                    let currentSection = '';
                    let sectionContent = [];

                    lines.forEach((line) => {
                        const trimmed = line.trim();
                        if (trimmed.startsWith('## ') || (trimmed.startsWith('# ') && !trimmed.includes('CV Personal'))) {
                            if (currentSection) {
                                sections[currentSection] = sectionContent;
                            }
                            currentSection = trimmed.replace(/^#+\s+/, '').trim();
                            sectionContent = [];
                        } else {
                            sectionContent.push(line);
                        }
                    });
                    if (currentSection) {
                        sections[currentSection] = sectionContent;
                    }

                    // Extract data from matched sections
                    // 1. Profil
                    const bioLines = findSection(sections, ['profil', 'about', 'summary', 'me']);
                    let bio = FALLBACK_DATA.bio;
                    let interests = FALLBACK_DATA.interests;
                    if (bioLines) {
                        let text = '';
                        bioLines.forEach(l => {
                            const trimmed = l.trim();
                            if (trimmed.toLowerCase().includes('interest') || trimmed.toLowerCase().includes('hobi')) {
                                const parts = trimmed.split(/interests?:|hobi:/i);
                                if (parts[1]) {
                                    interests = parts[1].replace(/\*\*/g, '').split(',').map(i => i.trim()).filter(Boolean);
                                }
                            } else if (trimmed && !trimmed.startsWith('---')) {
                                text += (text ? '\n' : '') + trimmed.replace(/\*\*/g, '');
                            }
                        });
                        if (text) bio = text;
                    }

                    // 2. Experience
                    const expLines = findSection(sections, ['experience', 'pengalaman', 'kerja']);
                    let experience = FALLBACK_DATA.experience;
                    if (expLines) {
                        const items = [];
                        let currentItem = null;
                        expLines.forEach(l => {
                            const trimmed = l.trim();
                            if (trimmed.startsWith('### ')) {
                                if (currentItem) items.push(currentItem);
                                currentItem = { role: trimmed.replace(/^###+\s+/, '').trim(), company: '', period: '', details: [] };
                            } else if (currentItem && trimmed.startsWith('**')) {
                                const parts = trimmed.split('|');
                                currentItem.company = parts[0].replace(/\*\*/g, '').trim();
                                if (parts[1]) {
                                    currentItem.period = parts[1].replace(/\*/g, '').trim();
                                }
                            } else if (currentItem && (trimmed.startsWith('- ') || trimmed.startsWith('* '))) {
                                currentItem.details.push(trimmed.replace(/^[-*]\s+/, '').replace(/\*\*/g, '').trim());
                            }
                        });
                        if (currentItem) items.push(currentItem);
                        if (items.length > 0) experience = items;
                    }

                    // 3. Skills
                    const skillLines = findSection(sections, ['skill', 'keahlian', 'tool', 'kemampuan']);
                    let skills = FALLBACK_DATA.skills;
                    if (skillLines) {
                        const categories = [];
                        skillLines.forEach(l => {
                            const trimmed = l.trim();
                            if (trimmed.startsWith('|') && !trimmed.toLowerCase().includes('category') && !trimmed.includes('---')) {
                                const cols = trimmed.split('|').map(c => c.trim()).filter(Boolean);
                                if (cols.length >= 2) {
                                    const category = cols[0].replace(/\*\*/g, '').trim();
                                    const items = cols[1].split(',').map(s => s.trim()).filter(Boolean);
                                    categories.push({ category, items });
                                }
                            } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                                const parts = trimmed.replace(/^[-*]\s+/, '').split(':');
                                if (parts.length >= 2) {
                                    const category = parts[0].replace(/\*\*/g, '').trim();
                                    const items = parts[1].split(',').map(s => s.trim()).filter(Boolean);
                                    categories.push({ category, items });
                                }
                            }
                        });
                        if (categories.length > 0) skills = categories;
                    }

                    // 4. Education
                    const eduLines = findSection(sections, ['education', 'pendidikan', 'sekolah']);
                    let education = FALLBACK_DATA.education;
                    if (eduLines) {
                        const items = [];
                        let currentItem = null;
                        eduLines.forEach(l => {
                            const trimmed = l.trim();
                            if (trimmed.startsWith('### ')) {
                                if (currentItem) items.push(currentItem);
                                currentItem = { degree: trimmed.replace(/^###+\s+/, '').trim(), major: '', period: '', school: '' };
                            } else if (currentItem && trimmed.startsWith('**')) {
                                const parts = trimmed.split('|');
                                currentItem.major = parts[0].replace(/\*\*/g, '').trim();
                                if (parts[1]) {
                                    currentItem.period = parts[1].replace(/\*/g, '').trim();
                                }
                            } else if (currentItem && trimmed && !trimmed.startsWith('---')) {
                                currentItem.school = trimmed.replace(/\*\*/g, '').trim();
                            }
                        });
                        if (currentItem) items.push(currentItem);
                        if (items.length > 0) education = items;
                    }

                    // 5. Details
                    const detailLines = findSection(sections, ['detail', 'contact', 'kontak', 'info']);
                    let details = FALLBACK_DATA.details;
                    let portfolioLinks = FALLBACK_DATA.portfolioLinks;
                    if (detailLines) {
                        const parsedDetails = {};
                        const parsedLinks = [];
                        detailLines.forEach(l => {
                            const trimmed = l.trim();
                            if (trimmed.startsWith('|') && !trimmed.toLowerCase().includes('field') && !trimmed.includes('---')) {
                                const cols = trimmed.split('|').map(c => c.trim()).filter(Boolean);
                                if (cols.length >= 2) {
                                    const field = cols[0].replace(/\*\*/g, '').trim().toLowerCase();
                                    const value = cols[1].trim();
                                    parsedDetails[field] = value;
                                }
                            } else if (trimmed.startsWith('- [') || trimmed.startsWith('* [') || trimmed.startsWith('[')) {
                                const match = trimmed.match(/\[([^\]]+)\]\(([^)]+)\)/);
                                if (match) {
                                    parsedLinks.push({ label: match[1], url: match[2] });
                                }
                            } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                                const clean = trimmed.replace(/^[-*]\s+/, '');
                                const parts = clean.split(':');
                                if (parts.length >= 2) {
                                    const field = parts[0].replace(/\*\*/g, '').trim().toLowerCase();
                                    const value = parts.slice(1).join(':').trim();
                                    parsedDetails[field] = value;
                                }
                            }
                        });
                        // Map contact details with fallbacks
                        details = {
                            age: parsedDetails.age || parsedDetails.umur || FALLBACK_DATA.details.age,
                            website: parsedDetails.website || parsedDetails.situs || FALLBACK_DATA.details.website,
                            email1: parsedDetails['email 1'] || parsedDetails['email1'] || parsedDetails.email || FALLBACK_DATA.details.email1,
                            email2: parsedDetails['email 2'] || parsedDetails['email2'] || parsedDetails.email2 || FALLBACK_DATA.details.email2,
                            phone: parsedDetails.phone || parsedDetails.telepon || parsedDetails.wa || parsedDetails.whatsapp || FALLBACK_DATA.details.phone,
                            location: parsedDetails.location || parsedDetails.lokasi || parsedDetails.alamat || FALLBACK_DATA.details.location
                        };
                        if (parsedLinks.length > 0) portfolioLinks = parsedLinks;
                    }

                    // 6. Achievements
                    const achLines = findSection(sections, ['achievement', 'prestasi', 'penghargaan']);
                    let achievements = FALLBACK_DATA.achievements;
                    if (achLines) {
                        const items = [];
                        achLines.forEach(l => {
                            const trimmed = l.trim();
                            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                                let text = trimmed.replace(/^[-*]\s+/, '').trim();
                                if (text.startsWith('🏆')) {
                                    text = text.slice(2).trim();
                                }
                                items.push(text);
                            }
                        });
                        if (items.length > 0) achievements = items;
                    }

                    setCvData({
                        bio,
                        interests,
                        experience,
                        skills,
                        education,
                        details,
                        portfolioLinks,
                        achievements
                    });
                } else {
                    setCvData(FALLBACK_DATA);
                }
            } catch (err) {
                console.error("Error loading CV data:", err);
                setCvData(FALLBACK_DATA);
            }
            setLoading(false);
        };
        fetchCv();
    }, []);

    const data = cvData || FALLBACK_DATA;

    return (
        <section className="pt-24 pb-12 min-h-screen bg-dark-bg text-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header - Profile & Bio */}
                <header className="flex flex-col md:flex-row gap-8 items-start mb-12">
                    <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-white/10 flex-shrink-0 bg-gradient-to-br from-amber-200 to-amber-100 group">
                        <img src="/images/about-portrait.png" alt="Aufa Rafii Hadibrata" className="w-full h-full object-cover" />
                        {/* Easter Egg Heart - Hidden until hover */}
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
                    <div className="flex-1">
                        <p className="text-lg md:text-xl text-white/80 italic leading-relaxed mb-6 whitespace-pre-wrap">
                            {data.bio}
                        </p>
                        {/* Interests */}
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-sm font-bold text-white/60 bg-dark-card px-4 py-2 rounded-xl">Interests</span>
                            {data.interests.map((interest, i) => (
                                <span key={i} className="flex items-center gap-2 bg-dark-card px-4 py-2 rounded-xl text-sm text-white/80">
                                    <span>{getInterestEmoji(interest)}</span> {interest}
                                </span>
                            ))}
                        </div>
                    </div>
                </header>

                {/* Experience Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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

                {/* Skills Section - Compact Icons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {data.skills.map((skillCat, idx) => (
                        <div key={idx} className="bg-dark-card rounded-2xl p-4 border border-white/5 flex items-center gap-4">
                            <span className="text-sm font-bold text-white/60 whitespace-nowrap min-w-[90px]">{skillCat.category}</span>
                            <div className="flex flex-wrap gap-2">
                                {skillCat.items.map((item, iIdx) => {
                                    const style = getBadgeStyle(item);
                                    if (style) {
                                        return (
                                            <span 
                                                key={iIdx} 
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md ${style.bg}`}
                                                title={item}
                                            >
                                                {style.text}
                                            </span>
                                        );
                                    }
                                    return (
                                        <span 
                                            key={iIdx} 
                                            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white text-xs font-semibold"
                                        >
                                            {item}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Education Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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

                {/* Portfolio Links */}
                <div className="bg-dark-card rounded-2xl p-4 border border-white/5 mb-8">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-bold text-white/60 px-2">Portfolio</span>
                        {data.portfolioLinks.map((link, idx) => {
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

                {/* Personal Details */}
                <div className="bg-dark-card rounded-2xl p-4 border border-white/5">
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

                {/* Achievements */}
                {data.achievements && data.achievements.length > 0 && (
                    <div className="mt-8 bg-dark-card rounded-2xl p-6 border border-yellow-500/20">
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
                )}
            </div>
        </section>
    );
};

export default AboutPage;
