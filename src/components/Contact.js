import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiPhone, FiLinkedin, FiGithub } from 'react-icons/fi';
import '../styles/Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactMethods = [
    {
      icon: FiMail,
      title: 'Email',
      value: 'iabhinavkakran@gmail.com',
      href: 'mailto:iabhinavkakran@gmail.com',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: FiPhone,
      title: 'Phone',
      value: '+91 7669910064',
      href: 'tel:+917669910064',
      gradient: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)'
    },
    {
      icon: FiLinkedin,
      title: 'LinkedIn',
      value: '/in/iabhinavkakran',
      href: 'https://www.linkedin.com/in/iabhinavkakran',
      gradient: 'linear-gradient(135deg, #0077b5 0%, #00a0dc 100%)'
    },
    {
      icon: FiGithub,
      title: 'GitHub',
      value: '@iabhinavkakran',
      href: 'https://github.com/iabhinavkakran',
      gradient: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)'
    }
  ];

  return (
    <section id="contact" className="contact">
      <div ref={ref} className="contact-container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get in Touch</h2>
          <p className="contact-subtitle">
            Let's connect and build something amazing together
          </p>
        </motion.div>

        <div className="contact-grid">
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="contact-card glass-card"
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -15 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <div className="card-gradient" style={{ background: method.gradient }} />
              <method.icon className="contact-icon" />
              <h3>{method.title}</h3>
              <p>{method.value}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="contact-cta"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p>Open to opportunities and collaborations</p>
          <motion.a
            href="mailto:iabhinavkakran@gmail.com"
            className="cta-button primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send me a message
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 