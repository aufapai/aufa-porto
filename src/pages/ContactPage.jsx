import React from 'react';

const ContactPage = () => {
    return (
        <section className="pt-24 pb-12 min-h-screen bg-dark-bg text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-16">
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">Get in Touch</span>
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Let's <span className="text-primary-500">Connect</span>
                    </h1>
                    <p className="text-xl text-dark-muted max-w-2xl mx-auto">
                        Ready to scale your business or need a creative partner? I'm just a message away.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* WhatsApp - Primary Action */}
                    <a
                        href="https://wa.me/6281234567890" // Replace with actual number if provided, otherwise placeholder
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600/10 border border-green-500/30 p-8 rounded-2xl hover:bg-green-600/20 transition-all group flex flex-col items-center text-center cursor-pointer"
                    >
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">WhatsApp</h3>
                        <p className="text-green-400 font-medium mb-2">+62 812-3456-7890</p>
                        <p className="text-dark-muted text-sm">Fastest response. Available Mon-Fri, 9am - 10pm.</p>
                        <span className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full font-bold text-sm">Chat Now</span>
                    </a>

                    {/* Email */}
                    <a
                        href="mailto:aufatea1@gmail.com"
                        className="bg-dark-card border border-white/5 p-8 rounded-2xl hover:border-primary-500/30 transition-all group flex flex-col items-center text-center"
                    >
                        <div className="w-16 h-16 bg-primary-900/30 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-500/20 transition-colors">
                            <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Email</h3>
                        <p className="text-primary-400 font-medium mb-2">aufatea1@gmail.com</p>
                        <p className="text-dark-muted text-sm">For formal inquiries, detailed briefs, and documents.</p>
                        <span className="mt-6 px-6 py-2 border border-white/10 text-white rounded-full font-bold text-sm group-hover:bg-white/5">Send Email</span>
                    </a>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left bg-dark-card rounded-3xl p-8 border border-white/5">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Location</h3>
                        <p className="text-dark-muted">Bogor, West Java, Indonesia</p>
                        <p className="text-dark-muted text-sm mt-2">Open to remote work worldwide.</p>
                    </div>
                    <div className="flex flex-col md:items-end justify-center">
                        <h3 className="text-xl font-bold text-white mb-4">Socials</h3>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all text-dark-muted"><span className="sr-only">LinkedIn</span>in</a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all text-dark-muted"><span className="sr-only">Instagram</span>ig</a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-black hover:text-white transition-all text-dark-muted"><span className="sr-only">TikTok</span>tk</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
