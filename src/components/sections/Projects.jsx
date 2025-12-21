import React from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
    // Aggregated featured projects from Business, Graphic, and Streetwear
    const featuredProjects = [
        {
            title: "Zero Cost Shop",
            category: "Business",
            description: "Owner of independent online store with B2B success and 45+ Omzet.",
            tags: ["Business", "E-commerce"],
            link: "/business"
        },
        {
            title: "Puffin Store ID Visuals",
            category: "Graphic Design",
            description: "High-engagement social media campaigns and visual identity.",
            tags: ["Graphic Design", "Social Media"],
            link: "/graphic-design"
        },
        {
            title: "Streetwear Collection",
            category: "Fashion",
            description: "Urban aesthetic clothing line designs and mockups.",
            tags: ["Streetwear", "Fashion Design"],
            link: "/streetwear"
        }
    ];

    return (
        <section id="work" className="py-24 bg-dark-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Works</span>
                    </h2>
                    <p className="text-dark-muted text-lg max-w-2xl mx-auto">
                        A glimpse into my portfolio across business development, graphic design, and fashion.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredProjects.map((project, idx) => (
                        <Link to={project.link} key={idx} className="block group">
                            <div className="bg-dark-card rounded-2xl overflow-hidden border border-white/5 hover:border-primary-500/50 transition-all hover:-translate-y-2">
                                <div className="h-48 bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center p-6 relative overflow-hidden">
                                    <div className="absolute inset-0 opacity-20 bg-grid-white/10" />
                                    <h3 className="text-2xl font-bold text-white z-10">{project.title}</h3>
                                </div>
                                <div className="p-6">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs font-bold uppercase tracking-wider text-primary-400 bg-primary-500/10 px-2 py-1 rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-dark-muted">{project.description}</p>
                                    <div className="mt-4 flex items-center text-white text-sm font-medium group-hover:text-primary-400 transition-colors">
                                        View Details <span className="ml-2">→</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-dark-muted mb-4">Explore more in the full portfolio</p>
                    <div className="flex justify-center gap-4">
                        <Link to="/business" className="text-white hover:text-primary-400 underline">Business</Link>
                        <Link to="/graphic-design" className="text-white hover:text-primary-400 underline">Graphic</Link>
                        <Link to="/streetwear" className="text-white hover:text-primary-400 underline">Streetwear</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
