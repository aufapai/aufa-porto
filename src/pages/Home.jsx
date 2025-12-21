import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';

const Home = () => {
    return (
        <main className="bg-dark-bg min-h-screen">
            <Hero />
            <About />
            <Projects />
            <Contact />
        </main>
    );
};

export default Home;
