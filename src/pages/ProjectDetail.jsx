import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { portfolioStore } from '../utils/adminStore';

/**
 * Simple parser to render project description with basic formatting (paragraphs and bold text)
 */
const renderDescription = (text) => {
  if (!text) return null;
  
  const lines = text.split('\n');
  const elements = [];
  let listBuffer = [];
  let key = 0;

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-2 mb-6 text-gray-300">
          {listBuffer.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
      listBuffer = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) { flushList(); return; }
    if (trimmed.startsWith('## ')) { flushList(); elements.push(<h2 key={key++} className="text-2xl font-bold text-white mt-10 mb-4">{trimmed.slice(3)}</h2>); return; }
    if (trimmed.startsWith('### ')) { flushList(); elements.push(<h3 key={key++} className="text-xl font-semibold text-primary-400 mt-8 mb-3">{trimmed.slice(4)}</h3>); return; }
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) { listBuffer.push(trimmed.slice(2)); return; }

    flushList();
    const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
    elements.push(
      <p key={key++} className="text-gray-300 mb-5 leading-relaxed">
        {parts.map((part, i) => part.startsWith('**') && part.endsWith('**') 
          ? <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong> 
          : part
        )}
      </p>
    );
  });

  flushList();
  return elements;
};

const getCategoryDetails = (cat) => {
  const c = (cat || '').toLowerCase();
  switch (c) {
    case 'graphic-design':
      return { label: 'Graphic Design', gradient: 'from-pink-500 to-purple-500', text: 'text-pink-400', bg: 'bg-pink-500/20' };
    case 'digital-marketing':
      return { label: 'Digital Marketing', gradient: 'from-blue-500 to-indigo-500', text: 'text-blue-400', bg: 'bg-blue-500/20' };
    case 'ui-ux':
      return { label: 'UI/UX Design', gradient: 'from-cyan-500 to-teal-500', text: 'text-cyan-400', bg: 'bg-cyan-500/20' };
    case 'business':
      return { label: 'Business & Strategy', gradient: 'from-amber-500 to-orange-500', text: 'text-amber-400', bg: 'bg-amber-500/20' };
    case 'streetwear':
      return { label: 'Streetwear Design', gradient: 'from-violet-500 to-fuchsia-500', text: 'text-violet-400', bg: 'bg-violet-500/20' };
    default:
      return { label: cat || 'Project', gradient: 'from-primary-500 to-secondary-500', text: 'text-primary-400', bg: 'bg-primary-500/20' };
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await portfolioStore.getById(id);
        setProject(data);
      } catch (err) {
        console.warn('Failed to load project details:', err);
      }
      setLoading(false);
    };
    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-24 pb-12 min-h-screen bg-dark-bg text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <p className="text-6xl mb-4">🎨</p>
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-dark-muted mb-8">The portfolio project you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="px-6 py-3 bg-primary-500 rounded-xl text-white font-medium hover:bg-primary-600 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const catDetails = getCategoryDetails(project.category);
  const backLink = `/${project.category}`;

  return (
    <article className="pt-28 pb-20 min-h-screen bg-dark-bg text-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-gradient-to-br ${catDetails.gradient} rounded-full mix-blend-screen filter blur-[120px] opacity-10`} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-violet-600/10 rounded-full mix-blend-screen filter blur-[120px] opacity-10" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8">
          <Link 
            to={backLink} 
            className="inline-flex items-center text-sm text-dark-muted hover:text-white transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-xl"
          >
            ← Back to {catDetails.label}
          </Link>
        </div>

        <header className="mb-10 text-center md:text-left">
          <span className={`px-4 py-1.5 ${catDetails.bg} ${catDetails.text} rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block border border-white/5`}>
            {catDetails.label}
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
            {project.title}
          </h1>
        </header>

        {project.image_url && (
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-12 shadow-2xl border border-white/5 bg-dark-card">
            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="bg-dark-card/50 backdrop-blur-md rounded-3xl border border-white/5 p-6 md:p-10 shadow-xl mb-10">
          <div className="prose prose-invert prose-lg max-w-none">
            {renderDescription(project.description)}
          </div>

          {project.external_link && (
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Interested in this project?</h3>
                <p className="text-dark-muted text-sm">Explore the live project website or external resources.</p>
              </div>
              <a 
                href={project.external_link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`px-6 py-3 bg-gradient-to-r ${catDetails.gradient} text-white font-bold rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-0.5 whitespace-nowrap`}
              >
                Visit Project Website ↗
              </a>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-12">
          <Link to="/" className="text-sm text-dark-muted hover:text-white transition-colors flex items-center gap-2">
            🏡 Back to Home
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProjectDetail;
