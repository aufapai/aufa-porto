import React from 'react';

const projects = [
    {
        title: 'E-Commerce Dashboard',
        description: 'A comprehensive analytics dashboard for online retailers, featuring real-time data visualization and inventory management.',
        tags: ['React', 'Tailwind', 'Recharts', 'Node.js'],
        link: '#'
    },
    {
        title: 'Travel Companion App',
        description: 'Mobile-first web application for travelers to plan trips, book accommodations, and discover local gems.',
        tags: ['Next.js', 'Framer Motion', 'API Integration'],
        link: '#'
    },
    {
        title: 'Finance Portfolio Tracker',
        description: 'Secure platform for tracking investment portfolios with live market updates and detailed performance reports.',
        tags: ['TypeScript', 'Vue', 'Supabase'],
        link: '#'
    }
];

const Projects = () => {
    return (
        <section id="work" className="py-24 bg-dark-bg relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Featured <span className="text-primary-500">Work</span>
                    </h2>
                    <p className="text-dark-muted max-w-2xl mx-auto text-lg">
                        A selection of projects that showcase my technical depth and creative approach to problem-solving.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="group relative bg-dark-card rounded-2xl p-6 border border-white/5 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-500/10"
                        >
                            <div className="h-48 mb-6 bg-gradient-to-br from-dark-bg to-dark-elem rounded-xl overflow-hidden relative">
                                {/* Placeholder for project image */}
                                <div className="absolute inset-0 flex items-center justify-center text-dark-muted font-display text-2xl font-bold opacity-30 group-hover:scale-110 transition-transform duration-500">
                                    {project.title[0]}
                                </div>
                                <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 transition-colors duration-300" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-dark-muted mb-6 line-clamp-3">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 text-xs font-medium text-primary-300 bg-primary-500/10 rounded-full border border-primary-500/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <a href={project.link} className="inline-flex items-center text-white font-medium hover:text-primary-400 transition-colors">
                                View Project
                                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
