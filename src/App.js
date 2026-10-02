import React from 'react';
import './styles/App.css';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import TechnicalShowcase from './components/TechnicalShowcase';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <TechnicalShowcase />
        <Contact />
      </main>
    </div>
  );
}

export default App; 