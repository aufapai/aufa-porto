import React from 'react';

const AboutPage = () => {
    return (
        <section className="pt-24 pb-12 min-h-screen bg-dark-bg text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="text-center mb-16">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary-500/20">
                        <img src="/images/about-portrait.png" alt="Aufa Rafii Hadibrata" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-4xl font-display font-bold mb-4">
                        Aufa Rafii' <span className="text-primary-500">Hadibrata</span>
                    </h1>
                    <p className="text-xl text-dark-muted max-w-2xl mx-auto">
                        Business Growth Consultant | Digital Marketing Strategist
                    </p>
                </header>

                {/* Skills & Expertise */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                        <span className="mr-3 text-primary-500">🛠️</span> Skills & Expertise
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-dark-card p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-bold text-primary-400 mb-4 border-b border-white/10 pb-2">Graphic Design & Branding</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex justify-between"><span className="text-white">Logo design & brand identity</span> <span className="text-blue-400 font-medium">Expert</span></li>
                                <li className="flex justify-between"><span className="text-white">Social media content creation</span> <span className="text-primary-400 font-medium">Advanced</span></li>
                                <li className="flex justify-between"><span className="text-white">Adobe Photoshop</span> <span className="text-primary-400 font-medium">Advanced</span></li>
                                <li className="flex justify-between"><span className="text-white">Adobe Illustrator</span> <span className="text-primary-400 font-medium">Advanced</span></li>
                                <li className="flex justify-between"><span className="text-white">Canva</span> <span className="text-blue-400 font-medium">Expert</span></li>
                            </ul>
                        </div>

                        <div className="bg-dark-card p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-bold text-primary-400 mb-4 border-b border-white/10 pb-2">Business & Strategy</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex justify-between"><span className="text-white">Market research</span> <span className="text-primary-400 font-medium">Advanced</span></li>
                                <li className="flex justify-between"><span className="text-white">Brand strategy</span> <span className="text-primary-400 font-medium">Advanced</span></li>
                                <li className="flex justify-between"><span className="text-white">Pitching & presentations</span> <span className="text-primary-400 font-medium">Advanced</span></li>
                                <li className="flex justify-between"><span className="text-white">Data-driven growth</span> <span className="text-cyan-400 font-medium">Intermediate</span></li>
                            </ul>
                        </div>

                        <div className="bg-dark-card p-6 rounded-xl border border-white/5">
                            <h3 className="text-lg font-bold text-primary-400 mb-4 border-b border-white/10 pb-2">Digital Marketing</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex justify-between"><span className="text-white">SEO strategies</span> <span className="text-cyan-400 font-medium">Intermediate</span></li>
                                <li className="flex justify-between"><span className="text-white">Meta Business Suite</span> <span className="text-primary-400 font-medium">Advanced</span></li>
                                <li className="flex justify-between"><span className="text-white">Content management</span> <span className="text-primary-400 font-medium">Advanced</span></li>
                                <li className="flex justify-between"><span className="text-white">E-commerce optimization</span> <span className="text-primary-400 font-medium">Advanced</span></li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-dark-card p-6 rounded-xl border border-white/5">
                                <h3 className="text-lg font-bold text-primary-400 mb-4 border-b border-white/10 pb-2">Languages</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex justify-between"><span className="text-white">Indonesian</span> <span className="text-blue-400 font-medium">Native</span></li>
                                    <li className="flex justify-between"><span className="text-white">English</span> <span className="text-cyan-400 font-medium">Intermediate</span></li>
                                </ul>
                            </div>
                            <div className="bg-dark-card p-6 rounded-xl border border-white/5">
                                <h3 className="text-lg font-bold text-yellow-400 mb-4 border-b border-white/10 pb-2">Achievements</h3>
                                <ul className="space-y-3 text-sm text-white/80">
                                    <li>🏆 Grew Instagram followers from 500 to 8,000 in &lt;1 year</li>
                                    <li>🏆 Best Student Nominee in IPB Entrepreneurship 2018</li>
                                    <li>🏆 Successful Tokopedia store owner since 2016</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Experience */}
                <div className="space-y-12">
                    <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Professional Experience</h2>

                    {/* PT Bayarkilat */}
                    <div className="relative pl-8 border-l-2 border-primary-500/30">
                        <div className="absolute -left-2.5 top-0 w-5 h-5 bg-primary-500 rounded-full border-4 border-dark-bg"></div>
                        <div className="mb-2">
                            <h3 className="text-2xl font-bold text-white">Digital Strategist</h3>
                            <h4 className="text-lg text-primary-400">PT Bayarkilat Apps Indonesia</h4>
                            <span className="text-sm text-dark-muted block mt-1">June 2025 - December 2025 (7 months) | Kota Bogor, Jawa Barat</span>
                        </div>
                        <ul className="list-disc list-outside ml-4 space-y-2 text-dark-muted mt-4">
                            <li>Developed and implemented performance-driven digital marketing campaigns across Meta Ads and Google Ads.</li>
                            <li>Built a cohesive content strategy for multi-channel presence (Instagram, Tiktok, Blog, WhatsApp Broadcast), improving brand awareness and organic engagement.</li>
                            <li>Conducted market and competitor analysis to fine-tune product positioning and user targeting.</li>
                            <li>Collaborated with cross-functional teams (design, tech, CS) to optimize user journey from ad to onboarding.</li>
                            <li>Introduced data dashboards and simple funnel tracking to monitor and improve campaign effectiveness.</li>
                            <li>Initiated user education content to reduce bounce rates and increase app conversion. 1 content for YouTube reached 1% conversion.</li>
                            <li>Achieved 10% more conversion sales with Organic Social Media in 2 months.</li>
                        </ul>
                    </div>

                    {/* Loekis.in */}
                    <div className="relative pl-8 border-l-2 border-secondary-500/30">
                        <div className="absolute -left-2.5 top-0 w-5 h-5 bg-secondary-500 rounded-full border-4 border-dark-bg"></div>
                        <div className="mb-2">
                            <h3 className="text-2xl font-bold text-white">Manajer Pengembangan Bisnis</h3>
                            <h4 className="text-lg text-secondary-400">Loekis.in</h4>
                            <span className="text-sm text-dark-muted block mt-1">June 2021 - Present (4 years 7 months) | Bogor, West Java</span>
                        </div>
                        <ul className="list-disc list-outside ml-4 space-y-2 text-dark-muted mt-4">
                            <li>Developed business systems and growth strategies to support brand expansion.</li>
                            <li>Conducted market research and trend analysis to design targeted marketing strategies.</li>
                            <li>Initiated B2B discussions and negotiated with partners, vendors, and collaborators to drive business opportunities.</li>
                            <li>Created detailed customer segmentation and proposed frameworks for new product launches.</li>
                            <li>Designed and implemented operational SOPs to improve internal efficiency and workflow.</li>
                            <li>Collaborated with content, design, and production teams to align business goals with marketing execution.</li>
                        </ul>
                    </div>

                    {/* Freelance */}
                    <div className="relative pl-8 border-l-2 border-white/20">
                        <div className="absolute -left-2.5 top-0 w-5 h-5 bg-white/50 rounded-full border-4 border-dark-bg"></div>
                        <div className="mb-2">
                            <h3 className="text-2xl font-bold text-white">Graphic Designer</h3>
                            <h4 className="text-lg text-white/80">Freelance</h4>
                            <span className="text-sm text-dark-muted block mt-1">January 2018 - Present (8 years) | Bogor, West Java</span>
                        </div>
                        <ul className="list-disc list-outside ml-4 space-y-2 text-dark-muted mt-4">
                            <li>Designed visual identities and brand logos tailored to client needs across diverse industries.</li>
                            <li>Created custom merchandise designs, including apparel, stickers, packaging, and promotional items.</li>
                            <li>Collaborated with clients to develop consistent visual branding and enhance brand recognition.</li>
                            <li>Delivered production-ready assets with attention to print specifications and scalability.</li>
                            <li>Managed end-to-end design process, from concept development to final execution.</li>
                        </ul>
                    </div>

                    {/* Zero Cost Shop */}
                    <div className="relative pl-8 border-l-2 border-purple-500/30">
                        <div className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-500 rounded-full border-4 border-dark-bg"></div>
                        <div className="mb-2">
                            <h3 className="text-2xl font-bold text-white">Business Owner</h3>
                            <h4 className="text-lg text-purple-400">Zero Cost Shop</h4>
                            <span className="text-sm text-dark-muted block mt-1">October 2016 - June 2025 (8 years 9 months) | Kota Bogor, Jawa Barat</span>
                        </div>
                        <ul className="list-disc list-outside ml-4 space-y-2 text-dark-muted mt-4">
                            <li>Oversaw day-to-day operations of an online store on Tokopedia, including product listings, pricing, and descriptions.</li>
                            <li>Developed promotional strategies and discount campaigns to increase sales and product visibility.</li>
                            <li>Handled inventory management, shipping logistics, and customer service.</li>
                            <li>Analyzed store performance using Tokopedia's analytics tools and optimized product keywords for search ranking.</li>
                            <li>Designed promotional materials including thumbnails, banners, and campaign visuals.</li>
                        </ul>
                    </div>

                    {/* Kampus Merdeka */}
                    <div className="relative pl-8 border-l-2 border-red-500/30">
                        <div className="absolute -left-2.5 top-0 w-5 h-5 bg-red-500 rounded-full border-4 border-dark-bg"></div>
                        <div className="mb-2">
                            <h3 className="text-2xl font-bold text-white">Liaison Officer - Pertukaran Mahasiswa Merdeka 2</h3>
                            <h4 className="text-lg text-red-400">Kampus Merdeka</h4>
                            <span className="text-sm text-dark-muted block mt-1">August 2022 - December 2022 (5 months) | Bogor, West Java</span>
                        </div>
                        <ul className="list-disc list-outside ml-4 space-y-2 text-dark-muted mt-4">
                            <li>Assisted inbound exchange students from various regions across Indonesia during academic and cultural immersion.</li>
                            <li>Coordinated academic schedules, student logistics, and communication with lecturers and university staff.</li>
                            <li>Acted as a bridge between students and university stakeholders to ensure smooth execution of activities.</li>
                            <li>Supported cultural exchange initiatives, including batik workshops and local heritage exploration.</li>
                            <li>Compiled periodic reports and provided feedback for program improvement.</li>
                            <li><a href="https://www.instagram.com/abhinayabhimantara/" className="text-primary-400 hover:underline">Documentation</a></li>
                        </ul>
                    </div>

                    {/* Puffin Store */}
                    <div className="relative pl-8 border-l-2 border-orange-500/30">
                        <div className="absolute -left-2.5 top-0 w-5 h-5 bg-orange-500 rounded-full border-4 border-dark-bg"></div>
                        <div className="mb-2">
                            <h3 className="text-2xl font-bold text-white">Content Manager</h3>
                            <h4 className="text-lg text-orange-400">Puffin Store ID</h4>
                            <span className="text-sm text-dark-muted block mt-1">June 2018 - March 2020 (1 year 10 months) | Bogor, West Java</span>
                        </div>
                        <ul className="list-disc list-outside ml-4 space-y-2 text-dark-muted mt-4">
                            <li>Managed content distribution to online channels and social media platforms.</li>
                            <li>Used content management systems to analyze user engagement and website traffic metrics.</li>
                            <li>Edited and sourced images and videos using Adobe Premiere and Adobe Photoshop.</li>
                            <li>Conceptualized, planned and executed original designs for Social Media.</li>
                            <li><a href="https://www.instagram.com/puffinstore.id/" className="text-primary-400 hover:underline">See my work</a></li>
                        </ul>
                    </div>

                    {/* HepiPop & Multigrafika */}
                    <div className="relative pl-8 border-l-2 border-white/10">
                        <div className="absolute -left-2.5 top-0 w-5 h-5 bg-white/30 rounded-full border-4 border-dark-bg"></div>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-white">Staff Intern</h3>
                                <h4 className="text-white/80">HepiPop</h4>
                                <span className="text-sm text-dark-muted">March 2018 - July 2018 (5 months)</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Packaging Intern</h3>
                                <h4 className="text-white/80">CV. Multigrafika</h4>
                                <span className="text-sm text-dark-muted block mb-2">August 2016 - October 2016 (3 months)</span>
                                <ul className="list-disc list-outside ml-4 space-y-1 text-dark-muted text-sm">
                                    <li>Minimized waste and reduced volume of packaging materials used.</li>
                                    <li>Inspected incoming and outgoing shipments to verify accuracy.</li>
                                    <li>Completed daily orders with expert picking and packing of shipments.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Education */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Education</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-dark-card p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/10 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-primary-600/20"></div>
                            <h3 className="text-2xl font-bold text-white mb-2">Bachelor Degree</h3>
                            <h4 className="text-xl text-primary-400 mb-4">IPB University</h4>
                            <p className="text-dark-muted mb-4">Bogor, West Java, Indonesia</p>
                            <ul className="text-sm text-dark-muted space-y-2">
                                <li>• Focus on Business & Entrepreneurship</li>
                                <li>• Best Student Nominee in Entrepreneurship 2018</li>
                                <li>• Active in Student Exchange Programs (Kampus Merdeka)</li>
                            </ul>
                        </div>

                        <div className="bg-dark-card p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-600/10 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-secondary-600/20"></div>
                            <h3 className="text-2xl font-bold text-white mb-2">Vocational High School</h3>
                            <h4 className="text-xl text-secondary-400 mb-4">SMK (Multimedia / Business)</h4>
                            <p className="text-dark-muted mb-4">Bogor, West Java, Indonesia</p>
                            <ul className="text-sm text-dark-muted space-y-2">
                                <li>• Specialized in Digital Arts & Design</li>
                                <li>• Foundation in Programming & Web Development</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPage;
