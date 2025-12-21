import React from 'react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-bg text-dark-text">
            {/* Background Gradient Orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
            <div className="absolute -bottom-32 left-20 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6 animate-fade-in text-white">
                    Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Aufa Rafii' Hadibrata</span>
                </h1>
                <h2 className="text-xl md:text-3xl text-dark-muted font-medium mb-6 animate-fade-in animation-delay-200">
                    Business Growth Consultant | Digital Marketing Strategist
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-dark-muted animate-fade-in animation-delay-500">
                    Helping SMEs boost revenue through smart marketing & system optimization.
                </p>

                <div className="mt-10 flex gap-4 justify-center animate-fade-in animation-delay-1000">
                    <button className="px-8 py-3 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25">
                        View Projects
                    </button>
                    <button className="px-8 py-3 rounded-full bg-dark-card border border-dark-muted/20 hover:border-primary-500/50 text-white font-medium transition-all hover:bg-dark-elem/50">
                        Contact Me
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
