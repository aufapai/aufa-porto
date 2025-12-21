import React from 'react';

const Business = () => {
    const experiences = [
        {
            company: "Zero Cost Shop",
            role: "Business Owner",
            period: "2018 - Now",
            color: "text-red-500",
            titleColor: "text-red-400",
            logo: "Z",
            bg: "bg-red-500/10",
            jobdesk: [
                "Mengelola toko online independen dengan pendekatan sosial, dari kurasi produk hingga kolaborasi tematik.",
                "Mengembangkan strategi promosi dan kampanye diskon untuk meningkatkan penjualan.",
                "Analisis kinerja toko menggunakan alat analitik marketplace."
            ],
            achievement: [
                "Sudah bekerjasama B2B dengan Berbagai Client",
                "Omzet 45+ 6 Bulan Terakhir",
                "Membangun basis pelanggan loyal melalui engagement media sosial."
            ]
        },
        {
            company: "Puffin Store ID",
            role: "Distro Streetwear Manager",
            period: "2018 - 2020",
            color: "text-yellow-500",
            titleColor: "text-yellow-400",
            logo: "P",
            bg: "bg-yellow-500/10",
            jobdesk: [
                "Merancang produk fashion dan konten sosial media yang meningkatkan engagement.",
                "Mengelola kampanye brand anak muda.",
                "Mengembangkan produk merchandise dan sistem operasional."
            ],
            achievement: [
                "Kampanye media Puffin Store Engagement naik 50% dalam 2 bulan",
                "Sudah Break Even Point",
                "Sold out Batch Pertama"
            ]
        },
        {
            company: "Loekis.in",
            role: "Business Development Manager",
            period: "2021 - Present",
            color: "text-purple-500",
            titleColor: "text-purple-400",
            logo: "L",
            bg: "bg-purple-500/10",
            jobdesk: [
                "Sudah bekerjasama dengan Pihak IPB, Incubaccel, Abest SB IPB, KKNT IPB.",
                "Mengembangkan sistem bisnis dan strategi pertumbuhan merek.",
                "Melakukan riset pasar dan analisis tren."
            ],
            achievement: [
                "Memproduksi Lebih dari 100+ Pcs dalam 3 Bulan",
                "Inisiasi diskusi B2B dan negosiasi dengan mitra.",
                "Implementasi SOP operasional efisien."
            ]
        }
    ];

    return (
        <section className="pt-24 pb-12 min-h-screen bg-dark-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Portfolio</span>
                    </h1>
                    <p className="text-dark-muted text-lg max-w-2xl mx-auto">
                        A track record of building brands, optimizing operations, and driving growth.
                    </p>
                </header>

                <div className="space-y-12">
                    {experiences.map((exp, idx) => (
                        <div key={idx} className="bg-dark-card rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all">
                            <div className="p-8 md:p-10">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-16 h-16 rounded-2xl ${exp.bg} flex items-center justify-center text-2xl font-bold ${exp.color}`}>
                                            {exp.logo}
                                        </div>
                                        <div>
                                            <h2 className={`text-2xl md:text-3xl font-bold ${exp.titleColor} mb-1`}>{exp.company}</h2>
                                            <p className="text-white text-lg">{exp.role}</p>
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 bg-white/5 rounded-full text-white/80 font-mono text-sm border border-white/10 self-start">
                                        {exp.period}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider border-b border-white/10 pb-2">JOBDESK</h3>
                                        <ul className="space-y-3">
                                            {exp.jobdesk.map((jd, i) => (
                                                <li key={i} className="flex items-start text-dark-muted">
                                                    <span className={`w-1.5 h-1.5 rounded-full ${exp.bg.replace('/10', '')} mt-2 mr-3 flex-shrink-0`}></span>
                                                    {jd}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider border-b border-white/10 pb-2">ACHIEVEMENT</h3>
                                        <ul className="space-y-3">
                                            {exp.achievement.map((ach, i) => (
                                                <li key={i} className="flex items-start text-white">
                                                    <span className="w-5 h-5 mr-3 text-yellow-500 flex-shrink-0">★</span>
                                                    {ach}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Business;
