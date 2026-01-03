import React from 'react';

const AboutPage = () => {
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
                                    if (password === "ily") {
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
                        <p className="text-lg md:text-xl text-white/80 italic leading-relaxed mb-6">
                            My name is <span className="text-primary-400 font-semibold">Aufa Rafii' Hadibrata</span>, a self-taught business growth consultant and digital marketing strategist with 4+ years of experience creating modern, clean, and minimal brands that make a lasting impression.
                        </p>
                        {/* Interests */}
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-sm font-bold text-white/60 bg-dark-card px-4 py-2 rounded-xl">Interests</span>
                            <span className="flex items-center gap-2 bg-dark-card px-4 py-2 rounded-xl text-sm text-white/80">
                                <span>🎮</span> Gaming
                            </span>
                            <span className="flex items-center gap-2 bg-dark-card px-4 py-2 rounded-xl text-sm text-white/80">
                                <span>🎬</span> Film Making
                            </span>
                            <span className="flex items-center gap-2 bg-dark-card px-4 py-2 rounded-xl text-sm text-white/80">
                                <span>✈️</span> Traveling
                            </span>
                        </div>
                    </div>
                </header>

                {/* Experience Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {/* PT Bayarkilat */}
                    <div className="bg-dark-card rounded-2xl p-6 border border-white/5">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-xl font-bold text-white">Digital Strategist</h3>
                                <p className="text-dark-muted text-sm">PT Bayarkilat Apps Indonesia</p>
                            </div>
                            <span className="bg-dark-bg px-3 py-1 rounded-lg text-xs text-white/60 border border-white/10">2025</span>
                        </div>
                        <ul className="text-sm text-white/70 mt-4 space-y-1">
                            <li>• Developed performance-driven digital marketing campaigns.</li>
                            <li>• Built content strategy for multi-channel presence.</li>
                            <li>• Achieved 10% more conversion with Organic Social Media.</li>
                        </ul>
                    </div>

                    {/* Loekis.in */}
                    <div className="bg-dark-card rounded-2xl p-6 border border-white/5">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-xl font-bold text-white">Business Development Manager</h3>
                                <p className="text-dark-muted text-sm">Loekis.in</p>
                            </div>
                            <span className="bg-dark-bg px-3 py-1 rounded-lg text-xs text-white/60 border border-white/10">2021 - now</span>
                        </div>
                        <ul className="text-sm text-white/70 mt-4 space-y-1">
                            <li>• Developed business systems and growth strategies.</li>
                            <li>• Conducted market research and trend analysis.</li>
                            <li>• Initiated B2B discussions and partner negotiations.</li>
                        </ul>
                    </div>

                    {/* Freelance */}
                    <div className="bg-dark-card rounded-2xl p-6 border border-white/5">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-xl font-bold text-white">Graphic Designer</h3>
                                <p className="text-dark-muted text-sm">Freelance</p>
                            </div>
                            <span className="bg-dark-bg px-3 py-1 rounded-lg text-xs text-white/60 border border-white/10">2018 - now</span>
                        </div>
                        <ul className="text-sm text-white/70 mt-4 space-y-1">
                            <li>• Designed visual identities and brand logos.</li>
                            <li>• Created custom merchandise designs.</li>
                            <li>• Managed end-to-end design process.</li>
                        </ul>
                    </div>

                    {/* Zero Cost Shop */}
                    <div className="bg-dark-card rounded-2xl p-6 border border-white/5">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-xl font-bold text-white">Business Owner</h3>
                                <p className="text-dark-muted text-sm">Zero Cost Shop (Tokopedia)</p>
                            </div>
                            <span className="bg-dark-bg px-3 py-1 rounded-lg text-xs text-white/60 border border-white/10">2016 - 2025</span>
                        </div>
                        <ul className="text-sm text-white/70 mt-4 space-y-1">
                            <li>• Oversaw online store operations on Tokopedia.</li>
                            <li>• Developed promotional strategies and campaigns.</li>
                            <li>• Analyzed store performance using analytics tools.</li>
                        </ul>
                    </div>
                </div>

                {/* Skills Section - Compact Icons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {/* Design Tools */}
                    <div className="bg-dark-card rounded-2xl p-4 border border-white/5 flex items-center gap-4">
                        <span className="text-sm font-bold text-white/60 whitespace-nowrap">Design Tools</span>
                        <div className="flex gap-2">
                            <span className="w-10 h-10 rounded-lg bg-[#FF9A00] flex items-center justify-center text-white font-bold text-sm">Ai</span>
                            <span className="w-10 h-10 rounded-lg bg-[#31A8FF] flex items-center justify-center text-white font-bold text-sm">Ps</span>
                            <span className="w-10 h-10 rounded-lg bg-[#FF3366] flex items-center justify-center text-white font-bold text-sm">Id</span>
                            <span className="w-10 h-10 rounded-lg bg-[#FF61F6] flex items-center justify-center text-white font-bold text-sm">Xd</span>
                            <span className="w-10 h-10 rounded-lg bg-[#00D4AA] flex items-center justify-center text-white font-bold text-sm">Cn</span>
                        </div>
                    </div>

                    {/* Editing Tools */}
                    <div className="bg-dark-card rounded-2xl p-4 border border-white/5 flex items-center gap-4">
                        <span className="text-sm font-bold text-white/60 whitespace-nowrap">Editing Tools</span>
                        <div className="flex gap-2">
                            <span className="w-10 h-10 rounded-lg bg-[#9999FF] flex items-center justify-center text-white font-bold text-sm">Ae</span>
                            <span className="w-10 h-10 rounded-lg bg-[#9999FF] flex items-center justify-center text-white font-bold text-sm">Pr</span>
                            <span className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xl">🎨</span>
                        </div>
                    </div>

                    {/* Marketing Tools */}
                    <div className="bg-dark-card rounded-2xl p-4 border border-white/5 flex items-center gap-4">
                        <span className="text-sm font-bold text-white/60 whitespace-nowrap">Marketing</span>
                        <div className="flex gap-2">
                            <span className="w-10 h-10 rounded-lg bg-[#1877F2] flex items-center justify-center text-white font-bold text-sm">fb</span>
                            <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] flex items-center justify-center text-white font-bold text-sm">ig</span>
                            <span className="w-10 h-10 rounded-lg bg-[#4285F4] flex items-center justify-center text-white font-bold text-sm">G</span>
                            <span className="w-10 h-10 rounded-lg bg-[#5CBA47] flex items-center justify-center text-white font-bold text-sm">TP</span>
                        </div>
                    </div>

                    {/* Languages */}
                    <div className="bg-dark-card rounded-2xl p-4 border border-white/5 flex items-center gap-4">
                        <span className="text-sm font-bold text-white/60 whitespace-nowrap">Languages</span>
                        <div className="flex gap-2">
                            <span className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-2xl">🇮🇩</span>
                            <span className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-2xl">🇬🇧</span>
                        </div>
                    </div>
                </div>

                {/* Education Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-dark-card rounded-2xl p-6 border border-white/5">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-white">Bachelor Degree</h3>
                                <p className="text-dark-muted text-sm">Business & Entrepreneurship</p>
                                <p className="text-dark-muted text-sm">IPB University, Bogor</p>
                            </div>
                            <span className="bg-dark-bg px-3 py-1 rounded-lg text-xs text-white/60 border border-white/10">2019 - 2024</span>
                        </div>
                    </div>

                    <div className="bg-dark-card rounded-2xl p-6 border border-white/5">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-white">Vocational High School</h3>
                                <p className="text-dark-muted text-sm">Multimedia / Business</p>
                                <p className="text-dark-muted text-sm">SMK, Bogor</p>
                            </div>
                            <span className="bg-dark-bg px-3 py-1 rounded-lg text-xs text-white/60 border border-white/10">2014 - 2017</span>
                        </div>
                    </div>
                </div>

                {/* Portfolio Links */}
                <div className="bg-dark-card rounded-2xl p-4 border border-white/5 mb-8">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-bold text-white/60 px-2">Portfolio</span>
                        <a href="https://www.linkedin.com/in/aufa-hadibrata/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0A66C2] px-4 py-2 rounded-xl text-sm text-white hover:opacity-80 transition-opacity">
                            <span>in</span> LinkedIn
                        </a>
                        <a href="https://www.instagram.com/aufapai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] px-4 py-2 rounded-xl text-sm text-white hover:opacity-80 transition-opacity">
                            <span>📷</span> Instagram
                        </a>
                        <a href="https://www.tokopedia.com/zerocostshop" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#5CBA47] px-4 py-2 rounded-xl text-sm text-white hover:opacity-80 transition-opacity">
                            <span>🛒</span> Tokopedia
                        </a>
                    </div>
                </div>

                {/* Personal Details */}
                <div className="bg-dark-card rounded-2xl p-4 border border-white/5">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-bold text-white/60 px-2">Details</span>
                        <span className="flex items-center gap-2 bg-dark-bg px-4 py-2 rounded-xl text-sm text-white/80 border border-white/10">
                            <span>📅</span> 25 years
                        </span>
                        <a href="https://aufarafii.id" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-dark-bg px-4 py-2 rounded-xl text-sm text-white/80 border border-white/10 hover:border-primary-400 transition-colors">
                            <span>🌐</span> aufarafii.id
                        </a>
                        <a href="mailto:me@aufarafii.id" className="flex items-center gap-2 bg-dark-bg px-4 py-2 rounded-xl text-sm text-white/80 border border-white/10 hover:border-primary-400 transition-colors">
                            <span>✉️</span> me@aufarafii.id
                        </a>
                        <a href="mailto:aufatea1@gmail.com" className="flex items-center gap-2 bg-dark-bg px-4 py-2 rounded-xl text-sm text-white/80 border border-white/10 hover:border-primary-400 transition-colors">
                            <span>📧</span> aufatea1@gmail.com
                        </a>
                        <a href="https://wa.me/6287770050793?text=Hallo%20kak%20Aufa%20salam%20kenal%20aku%20dari%20" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-xl text-sm text-white hover:bg-green-700 transition-colors">
                            <span>📱</span> +6287770050793
                        </a>
                        <span className="flex items-center gap-2 bg-dark-bg px-4 py-2 rounded-xl text-sm text-white/80 border border-white/10">
                            <span>🇮🇩</span> Indonesia
                        </span>
                    </div>
                </div>

                {/* Achievements */}
                <div className="mt-8 bg-dark-card rounded-2xl p-6 border border-yellow-500/20">
                    <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center gap-2">
                        <span>🏆</span> Achievements
                    </h3>
                    <ul className="space-y-2 text-sm text-white/80">
                        <li className="flex items-center gap-2">
                            <span>🏆</span> Grew Instagram followers from 500 to 8,000 in &lt;1 year
                        </li>
                        <li className="flex items-center gap-2">
                            <span>🏆</span> Best Student Nominee in IPB Entrepreneurship 2018
                        </li>
                        <li className="flex items-center gap-2">
                            <span>🏆</span> Successful Tokopedia store owner since 2016
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default AboutPage;
