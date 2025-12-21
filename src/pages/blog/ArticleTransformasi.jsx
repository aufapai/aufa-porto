import React from 'react';

const ArticleTransformasi = () => {
    return (
        <article className="pt-24 pb-12 min-h-screen bg-dark-bg text-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-12 text-center">
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">Business Transformation</span>
                    <h1 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
                        Transformasi Bisnis Digital: Kisah Sukses Aufa Rafii Hadibrata
                    </h1>
                    <div className="flex items-center justify-center space-x-4 text-dark-muted text-sm">
                        <span>Dec 21, 2025</span>
                        <span>•</span>
                        <span>5 min read</span>
                    </div>
                </header>

                <div className="aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-2xl shadow-primary-500/10">
                    <img src="https://images.pexels.com/photos/7289746/pexels-photo-7289746.jpeg?cs=srgb&dl=pexels-kampus-7289746.jpg&fm=jpg" alt="Cover" className="w-full h-full object-cover" />
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="lead text-xl text-dark-muted mb-8">
                        Membangun fondasi kuat di dunia pemasaran dan kewirausahaan memerlukan lebih dari sekadar ide—ia membutuhkan eksekusi yang presisi dan adaptasi terhadap lanskap digital yang terus berubah.
                    </p>

                    <h3>Ringkasan Perjalanan Bisnis</h3>
                    <p>
                        Halo, saya Aufa Rafii Hadibrata, seorang lulusan bisnis dari IPB University dengan minat mendalam pada desain grafis, pengembangan merek, dan pemasaran digital. Perjalanan saya dimulai dari rasa ingin tahu yang besar terhadap desain dan branding, yang kemudian membawa saya menjelajahi dunia streetwear, strategi konten, dan pengembangan bisnis secara menyeluruh.
                    </p>

                    <h3 className="text-secondary-400 mt-12">Pengalaman Kunci</h3>

                    <div className="bg-dark-card p-6 rounded-xl border-l-4 border-red-500 my-8">
                        <h4 className="text-white mt-0">Zero Cost Shop (2016-Now)</h4>
                        <p className="text-sm opacity-80">Pemilik Bisnis | Bogor</p>
                        <ul>
                            <li>Mengelola operasional harian toko online di Tokopedia Marketplace.</li>
                            <li>Mengembangkan strategi promosi dan kampanye diskon.</li>
                            <li>Analisis kinerja toko menggunakan alat analitik Tokopedia.</li>
                        </ul>
                    </div>

                    <div className="bg-dark-card p-6 rounded-xl border-l-4 border-purple-500 my-8">
                        <h4 className="text-white mt-0">Loekis.in (2021-Now)</h4>
                        <p className="text-sm opacity-80">Manajer Pengembangan Bisnis</p>
                        <ul>
                            <li>Mengembangkan sistem bisnis dan strategi pertumbuhan.</li>
                            <li>Melakukan riset pasar dan analisis tren.</li>
                            <li>Memulai diskusi B2B dan bernegosiasi dengan mitra.</li>
                        </ul>
                    </div>

                    <div className="bg-dark-card p-6 rounded-xl border-l-4 border-orange-500 my-8">
                        <h4 className="text-white mt-0">Puffin Store ID (2018-2020)</h4>
                        <p className="text-sm opacity-80">Manajer Konten</p>
                        <ul>
                            <li>Mengelola distribusi konten ke berbagai saluran online.</li>
                            <li>Memanfaatkan sistem manajemen konten untuk menganalisis engagement.</li>
                            <li>Editing visual menggunakan Adobe Premiere dan Photoshop.</li>
                        </ul>
                    </div>

                    <h3>Kesimpulan</h3>
                    <p>
                        Setiap merek memiliki cerita, dan tugas saya adalah membantu menceritakan kisah tersebut dengan cara yang paling efektif di ranah digital. Dari manajemen inventaris hingga strategi konten kreatif, integritas antara operasional dan pemasaran adalah kunci pertumbuhan.
                    </p>
                </div>
            </div>
        </article>
    );
};

export default ArticleTransformasi;
