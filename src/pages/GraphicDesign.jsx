import React from 'react';

const GraphicDesign = () => {
    const portfolioSections = [
        {
            title: "Product & Merchandise",
            description: "Focus on creating identifiable brand merchandise for Zero Cost Shop and Loekis.in. From concept to final production-ready designs.",
            items: [
                { id: 1, title: "Zero Cost Shop Merch", category: "Merchandise", color: "bg-yellow-500" },
                { id: 2, title: "Loekis.in Apparel", category: "Apparel", color: "bg-purple-500" },
                { id: 3, title: "Custom Stickers", category: "Print", color: "bg-green-500" }
            ]
        },
        {
            title: "Social Media Visuals",
            description: "Managed visual content for Puffin Store ID, increasing engagement by 50% through consistent branding and high-quality assets.",
            items: [
                { id: 4, title: "Instagram Grid Layout", category: "Social Media", color: "bg-orange-500" },
                { id: 5, title: "Story Campaigns", category: "Marketing", color: "bg-pink-500" },
                { id: 6, title: "Promotional Banners", category: "Ads", color: "bg-blue-500" }
            ]
        }
    ];

    const placeholders = [
        { title: "Pixel Art & Animation", description: "Exploring retro aesthetics and motion graphics." },
        { title: "Simple 3D Blender", description: "3D modeling and rendering experiments." }
    ];

    return (
        <section className="pt-24 pb-12 min-h-screen bg-dark-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Graphic <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Design</span>
                    </h1>
                    <p className="text-dark-muted text-lg max-w-2xl mx-auto">
                        Visual storytelling through brand identity, merchandise, and digital content.
                    </p>
                </header>

                {portfolioSections.map((section, idx) => (
                    <div key={idx} className="mb-20">
                        <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">{section.title}</h2>
                                <p className="text-dark-muted">{section.description}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {section.items.map((item) => (
                                <div key={item.id} className="group relative aspect-square bg-dark-card rounded-xl overflow-hidden border border-white/5 hover:border-primary-500/50 transition-all">
                                    <div className={`absolute inset-0 ${item.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                        <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mb-4 text-white font-bold opacity-80`}>
                                            {item.title[0]}
                                        </div>
                                        <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                                        <span className="text-xs text-dark-muted uppercase tracking-wider">{item.category}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    {placeholders.map((place, idx) => (
                        <div key={idx} className="bg-dark-card rounded-2xl p-8 border border-white/5 border-dashed flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 transition-opacity">
                            <h3 className="text-2xl font-bold text-white mb-2">{place.title}</h3>
                            <p className="text-dark-muted">{place.description}</p>
                            <span className="mt-4 px-3 py-1 bg-white/5 rounded-full text-xs text-white">Coming Soon</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GraphicDesign;
