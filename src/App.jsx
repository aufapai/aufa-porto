import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Streetwear from './pages/Streetwear';
import Business from './pages/Business';
import GraphicDesign from './pages/GraphicDesign';

import AboutPage from './pages/AboutPage';
import ArticleTransformasi from './pages/blog/ArticleTransformasi';
import ArticleCariDuit from './pages/blog/ArticleCariDuit';
import DynamicBlogArticle from './pages/blog/DynamicBlogArticle';
import DigitalMarketing from './pages/DigitalMarketing';
import UiUx from './pages/UiUx';
import ContactPage from './pages/ContactPage';
import X9k2m7p4q1s8 from './pages/x9k2m7p4q1s8';
import AdminPanel from './pages/AdminPanel';
import ProjectDetail from './pages/ProjectDetail';
import useTrafficTracker from './hooks/useTrafficTracker';

// Wrapper to allow Navbar to check location if needed
const AppContent = () => {
  const location = useLocation();
  
  // Track page views for analytics
  useTrafficTracker();
  
  // Hide navbar on admin panel
  const isAdminRoute = location.pathname.startsWith('/z8admin');

  return (
    <div className="bg-dark-bg min-h-screen text-white">
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<Blog />} />
        {/* Legacy static blog routes (kept for backward compatibility) */}
        <Route path="/blog/transformasi-bisnis" element={<ArticleTransformasi />} />
        <Route path="/blog/cari-duit" element={<ArticleCariDuit />} />
        {/* Dynamic blog route for new posts from admin */}
        <Route path="/blog/:slug" element={<DynamicBlogArticle />} />
        <Route path="/portfolio/:id" element={<ProjectDetail />} />
        <Route path="/streetwear" element={<Streetwear />} />
        <Route path="/business" element={<Business />} />
        <Route path="/graphic-design" element={<GraphicDesign />} />
        <Route path="/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/ui-ux" element={<UiUx />} />
        {/* Hidden Easter Egg Route - Not indexed by Google */}
        <Route path="/x9k2m7p4q1s8" element={<X9k2m7p4q1s8 />} />
        {/* Secret Admin Panel - Not indexed by Google */}
        <Route path="/z8admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
