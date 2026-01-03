import React, { useState } from 'react';
import visiMisi from '../assets/personality/visi-misi.png';
import prinsipPola from '../assets/personality/prinsip-pola.png';
import profileIntro from '../assets/personality/profile-intro.png';
import lampiranTips from '../assets/personality/lampiran-tips.png';

const X9k2m7p4q1s8 = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "Red Flag & How to Handle 🚩",
            image: visiMisi,
            description: "Visi & Misi Hidup"
        },
        {
            title: "Prinsip Hidup & Pola 💭",
            image: prinsipPola,
            description: "Principles & Life Patterns"
        },
        {
            title: "Aufa Rafii H - INTP Kolébis Melankolis 🌟",
            image: profileIntro,
            description: "Profile Introduction"
        },
        {
            title: "Lampiran & Tips 💡",
            image: lampiranTips,
            description: "Practical Tips"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <>
            {/* Prevent Google Indexing */}
            <head>
                <meta name="robots" content="noindex, nofollow" />
                <title>🔒 Special Access</title>
            </head>

            <section className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 text-white py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8 pt-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                            💕 Welcome, Special Person 💕
                        </h1>
                        <p className="text-lg text-white/80 italic">
                            Kamu berhasil menemukan halaman rahasia ini. Berarti kamu orang yang istimewa ✨
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-2">
                            <span className="animate-pulse text-2xl">❤️</span>
                            <span className="text-sm text-white/60">Easter Egg Unlocked</span>
                            <span className="animate-pulse text-2xl">❤️</span>
                        </div>
                    </div>

                    {/* Carousel */}
                    <div className="relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
                        {/* Slide Counter */}
                        <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                            {currentSlide + 1} / {slides.length}
                        </div>

                        {/* Slide Title */}
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                            {slides[currentSlide].title}
                        </h2>

                        {/* Image */}
                        <div className="relative mb-6 rounded-2xl overflow-hidden bg-white/10 border border-white/20">
                            <img
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].description}
                                className="w-full h-auto object-contain"
                            />
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between gap-4">
                            <button
                                onClick={prevSlide}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-200 border border-white/20"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Previous
                            </button>

                            {/* Dot Indicators */}
                            <div className="flex gap-2">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide
                                                ? 'bg-pink-400 w-8'
                                                : 'bg-white/30 hover:bg-white/50'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={nextSlide}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-200 border border-white/20"
                            >
                                Next
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Footer Message */}
                    <div className="mt-8 text-center">
                        <div className="bg-pink-500/10 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6">
                            <p className="text-white/90 mb-2">
                                💝 Ini adalah bagian dari pendekatan kreatif yang dibuat khusus untuk orang spesial
                            </p>
                            <p className="text-sm text-white/60">
                                Halaman ini tidak akan terindex di Google - hanya untuk orang yang menemukan easter egg 🔐
                            </p>
                        </div>

                        <a
                            href="/about"
                            className="inline-block mt-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-200 border border-white/20"
                        >
                            ← Kembali ke About
                        </a>
                    </div>
                </div>

                {/* Animated Background Hearts */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${10 + Math.random() * 10}s`,
                                opacity: 0.1
                            }}
                        >
                            ❤️
                        </div>
                    ))}
                </div>

                <style>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-20px) rotate(180deg); }
                    }
                    .animate-float {
                        animation: float linear infinite;
                    }
                `}</style>
            </section>
        </>
    );
};

export default X9k2m7p4q1s8;
