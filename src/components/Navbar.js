import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaDownload } from 'react-icons/fa';
import '../styles/Navbar.css';

const sections = ['about', 'experience', 'projects', 'education', 'contact'];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const goTo = (sectionId) => {
    setMenuOpen(false);
    scrollToSection(sectionId);
  };

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-content">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          AC
        </motion.div>
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <button
              className={activeSection === 'about' ? 'active' : ''}
              onClick={() => goTo('about')}
            >
              About
            </button>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <button
              className={activeSection === 'experience' ? 'active' : ''}
              onClick={() => goTo('experience')}
            >
              Experience
            </button>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <button
              className={activeSection === 'projects' ? 'active' : ''}
              onClick={() => goTo('projects')}
            >
              Projects
            </button>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <button
              className={activeSection === 'education' ? 'active' : ''}
              onClick={() => goTo('education')}
            >
              Education
            </button>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <button
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={() => goTo('contact')}
            >
              Contact
            </button>
          </motion.li>
          <motion.li>
            <a
              href={`${process.env.PUBLIC_URL}/Abhinav_Chaudhary_Resume.pdf`}
              className="resume-btn"
              download
            >
              <FaDownload /> Resume
            </a>
          </motion.li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar; 