import React, { useState } from 'react';
import { messageStore } from '../../utils/adminStore';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.message) {
            setStatus('error');
            setErrorMsg('Harap isi semua kolom');
            return;
        }

        setStatus('submitting');
        
        try {
            const res = await messageStore.send(formData);
            if (res.success || res.status === 'success') {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setErrorMsg(res.error || 'Gagal mengirim pesan. Coba lagi nanti.');
            }
        } catch {
            setStatus('error');
            setErrorMsg('Terjadi kesalahan koneksi.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

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
                    <div className="bg-dark-card p-8 rounded-2xl border border-white/5 relative">
                        {status === 'success' && (
                            <div className="absolute inset-0 z-20 bg-dark-card/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center text-center p-6 border border-green-500/30">
                                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-3xl mb-4">
                                    ✓
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Pesan Terkirim!</h3>
                                <p className="text-dark-muted">Terima kasih telah menghubungi saya. Saya akan segera membalas email Anda.</p>
                                <button onClick={() => setStatus('idle')} className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">Kirim Pesan Lain</button>
                            </div>
                        )}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {status === 'error' && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                    {errorMsg}
                                </div>
                            )}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-dark-muted mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                                    placeholder="Your Name"
                                    disabled={status === 'submitting'}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-dark-muted mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                                    placeholder="your@email.com"
                                    disabled={status === 'submitting'}
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-dark-muted mb-2">Message</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                                    placeholder="Tell me about your project..."
                                    disabled={status === 'submitting'}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold py-4 rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {status === 'submitting' ? 'Sending...' : 'Send Message'}
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
