import React from 'react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-secondary-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
                    {/* Left Content: Text */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                            <span className="text-primary-400 font-medium tracking-wide text-sm uppercase">Available for Hire</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Aufa Rafii'</span> <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-purple-400">Hadibrata</span>
                        </h1>

                        <h2 className="text-xl md:text-2xl text-white/80 font-medium mb-6">
                            Business Growth Consultant | Digital Marketing Strategist
                        </h2>

                        <p className="text-lg text-dark-muted max-w-lg mx-auto md:mx-0 mb-10 leading-relaxed">
                            Helping SMEs boost revenue through smart marketing & system optimization.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                            <a
                                href="#projects"
                                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-bold hover:shadow-lg hover:shadow-primary-600/25 transition-all transform hover:-translate-y-1"
                            >
                                View My Work
                            </a>
                            <a
                                href="#contact"
                                className="px-8 py-4 bg-transparent border border-white/10 text-white rounded-full font-bold hover:bg-white/5 transition-all"
                            >
                                Contact Me
                            </a>
                        </div>
                    </div>

                    {/* Right Content: Image */}
                    <div className="flex-1 flex justify-center md:justify-end relative">
                        <div className="relative w-72 h-72 md:w-[450px] md:h-[450px]">
                            {/* Decorative Elements behind image */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-secondary-600 rounded-full opacity-20 blur-3xl transform rotate-6"></div>

                            {/* Main Image Container */}
                            <div className="relative w-full h-full z-10 flex items-end justify-center">
                                <img
                                    src="/images/hero-profile.png"
                                    alt="Aufa Rafii Hadibrata"
                                    className="max-h-full max-w-full object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
