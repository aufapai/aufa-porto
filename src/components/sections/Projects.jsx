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
            link: "/business",
            image: "/images/project-business.jpg"
        },
        {
            title: "Puffin Store ID Visuals",
            category: "Graphic Design",
            description: "High-engagement social media campaigns and visual identity.",
            tags: ["Graphic Design", "Social Media"],
            link: "/graphic-design",
            image: "/images/project-design.jpg"
        },
        {
            title: "Streetwear Collection",
            category: "Fashion",
            description: "Urban aesthetic clothing line designs and mockups, Best Seller collection.",
            tags: ["Streetwear", "Fashion Design"],
            link: "/streetwear",
            image: "/images/project-streetwear.jpg"
        },
        {
            title: "UI/UX & Enterprise System",
            category: "Product Design",
            description: "Optimization of Enterprise Management Systems and User Interface Design.",
            tags: ["UI/UX", "System Optimization"],
            link: "#", // Placeholder as no dedicated page exists yet, or could link to Graphic Design
            image: "/images/project-uiux.jpg"
        }
    ];

    return (
        <section id="projects" className="py-24 bg-dark-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Works</span>
                    </h2>
                    <p className="text-dark-muted text-lg max-w-2xl mx-auto">
                        A glimpse into my portfolio across business development, graphic design, and fashion.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProjects.map((project, idx) => (
                        <Link to={project.link} key={idx} className="block group h-full">
                            <div className="bg-dark-card rounded-2xl overflow-hidden border border-white/5 hover:border-primary-500/50 transition-all hover:-translate-y-2 h-full flex flex-col">
                                <div className="h-48 relative overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent opacity-60"></div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-primary-400 bg-primary-500/10 px-2 py-1 rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{project.title}</h3>
                                    <p className="text-dark-muted text-sm mb-4 flex-1">{project.description}</p>
                                    <div className="mt-auto flex items-center text-white text-sm font-medium group-hover:text-primary-400 transition-colors">
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
