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
import DigitalMarketing from './pages/DigitalMarketing';
import UiUx from './pages/UiUx';
import ContactPage from './pages/ContactPage';

// Wrapper to allow Navbar to check location if needed
const AppContent = () => {
  return (
    <div className="bg-dark-bg min-h-screen text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/transformasi-bisnis" element={<ArticleTransformasi />} />
        <Route path="/blog/cari-duit" element={<ArticleCariDuit />} />
        <Route path="/streetwear" element={<Streetwear />} />
        <Route path="/business" element={<Business />} />
        <Route path="/graphic-design" element={<GraphicDesign />} />
        <Route path="/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/ui-ux" element={<UiUx />} />
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
