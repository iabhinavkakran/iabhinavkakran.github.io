import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-title"
        >
          Hi, I'm Abhinav Chaudhary
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-subtitle"
        >
          Senior Full Stack Developer
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-description"
        >
          Building scalable systems that solve real problems. Specialized in microservices architecture, 
          real-time trading systems, and secure payment integrations. 5+ years turning complex requirements 
          into production-ready solutions with Java, Node.js, and React.
        </motion.p>

        <motion.div
          className="hero-links"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a 
            href="https://github.com/iabhinavkakran" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub Profile"
          >
            <FaGithub /> GitHub
          </a>
          <a 
            href="https://linkedin.com/in/iabhinavkakran" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a 
            href="mailto:iabhinavkakran@gmail.com"
            className="social-link"
            aria-label="Email"
          >
            <FaEnvelope /> Email
          </a>
        </motion.div>
        
        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="#projects" className="cta-button primary">See My Work</a>
          <a href="#contact" className="cta-button secondary">Get in Touch</a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 