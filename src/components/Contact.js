import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMapPin, FiMail, FiPhone, FiLinkedin, FiGithub } from 'react-icons/fi';
import '../styles/Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="contact" className="contact">
      <motion.div
        ref={ref}
        className="contact-content"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Get in Touch</h2>
        
        <div className="contact-info">
          <motion.div 
            className="contact-item"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FiMapPin className="contact-icon" />
            <h3>Location</h3>
            <p>Muzaffarnagar, UP</p>
          </motion.div>
          
          <motion.div 
            className="contact-item"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FiMail className="contact-icon" />
            <h3>Email</h3>
            <a href="mailto:iabhinavkakran@gmail.com">iabhinavkakran@gmail.com</a>
          </motion.div>
          
          <motion.div 
            className="contact-item"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FiPhone className="contact-icon" />
            <h3>Phone</h3>
            <a href="tel:+917669910064">+91 7669910064</a>
          </motion.div>
        </div>

        <div className="social-links">
          <motion.a
            href="https://www.linkedin.com/in/iabhinavkakran"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <FiLinkedin className="social-icon" />
            <span>LinkedIn</span>
          </motion.a>
          
          <motion.a
            href="https://github.com/iabhinavkakran"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <FiGithub className="social-icon" />
            <span>GitHub</span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact; 