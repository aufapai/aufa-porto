import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-dark-bg relative overflow-hidden">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary-500/10 rounded-full mix-blend-screen filter blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Let's Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Together</span>
                    </h2>
                    <p className="text-dark-muted text-lg">
                        Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and ideas.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-dark-card p-8 rounded-2xl border border-white/5">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-dark-muted mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-dark-muted mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-dark-muted mb-2">Message</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold py-4 rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all transform hover:-translate-y-1"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">Contact Details</h3>
                            <p className="text-dark-muted mb-2">Bogor, West Java, Indonesia</p>
                            <a href="mailto:aufatea1@gmail.com" className="text-primary-400 font-medium hover:text-primary-300 transition-colors">aufatea1@gmail.com</a>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">Connect</h3>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="https://www.linkedin.com/in/aufahadibrata"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-lg bg-dark-card border border-white/10 text-dark-muted hover:text-white hover:border-primary-500 hover:bg-primary-500/10 transition-all"
                                >
                                    LinkedIn
                                </a>
                                <a
                                    href="https://aufatea.my.id/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-lg bg-dark-card border border-white/10 text-dark-muted hover:text-white hover:border-primary-500 hover:bg-primary-500/10 transition-all"
                                >
                                    Blog
                                </a>
                                <a
                                    href="https://linktr.ee/aufarh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-lg bg-dark-card border border-white/10 text-dark-muted hover:text-white hover:border-primary-500 hover:bg-primary-500/10 transition-all"
                                >
                                    Linktree
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
