import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Streetwear from './pages/Streetwear';
import Business from './pages/Business';
import GraphicDesign from './pages/GraphicDesign';

// Wrapper to allow Navbar to check location if needed
const AppContent = () => {
  return (
    <div className="bg-dark-bg min-h-screen text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/streetwear" element={<Streetwear />} />
        <Route path="/business" element={<Business />} />
        <Route path="/graphic-design" element={<GraphicDesign />} />
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
