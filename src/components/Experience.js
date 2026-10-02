import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Experience.css';

const experiences = [
  {
    title: "Senior Software Developer (Full Stack)",
    company: "Saksoft Limited",
    client: "DMart eCommerce (Avenue Supermarts)",
    location: "Remote",
    period: "09/2025 - 04/2026",
    description: [
      "Developed scalable Node.js and Express.js RESTful APIs and backend services for the Digital API team",
      "Led development of the USPA refund and return automation system, integrating 3 commerce platforms (Shopify, Omuni, Marmeto) with Node.js services and React.js dashboards",
      "Integrated Razorpay payment gateway for automated refund processing, securing transactions with JWT authentication and cryptographic hashing"
    ],
    technologies: ["Node.js", "Express.js", "React.js", "REST APIs", "Shopify", "Omuni", "Marmeto", "Razorpay", "JWT"]
  },
  {
    title: "Full Stack Developer",
    company: "Toolbox OS",
    location: "Remote",
    period: "04/2023 - 08/2025",
    description: [
      "Engineered a real-time cryptocurrency trading algorithm integrated with TradingView via secure webhooks, improving decision-making accuracy by 40% and cutting system latency by 30%",
      "Optimized trading logic across 5 position types (buy, sell, short, long, neutral), increasing trading efficiency by 35% and execution precision in volatile markets",
      "Architected an Express.js (Node.js) and Java Spring Boot backend for high-volume, real-time TradingView data, boosting throughput and processing speed by 50%",
      "Designed a React.js trading dashboard that visualizes live trading positions in real time"
    ],
    technologies: ["Node.js", "Express.js", "React.js", "Java", "Spring Boot", "TradingView", "Webhooks", "Real-Time Processing"]
  },
  {
    title: "Project Engineer",
    company: "Wipro Limited",
    location: "Remote",
    period: "03/2021 - 03/2023",
    description: [
      "Built scalable RESTful APIs and microservices with Node.js, Express.js, and Java Spring Boot, enabling reliable data exchange across backend services",
      "Secured 3 core modules (transactions, authentication, authorization) with JWT/OAuth2 for React.js clients"
    ],
    technologies: ["Node.js", "Express.js", "Java", "Spring Boot", "Microservices", "REST APIs", "JWT", "OAuth2"]
  }
];

const ExperienceCard = memo(({ experience, index, inView }) => (
  <motion.div
    className="experience-card"
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
  >
    <div className="card-header">
      <motion.div 
        className="title-container"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3, delay: index * 0.2 + 0.2 }}
      >
        <h3>{experience.title}</h3>
        <h4>{experience.company}</h4>
        {experience.client && (
          <span className="client-info">Client: {experience.client}</span>
        )}
      </motion.div>
      <motion.div 
        className="meta-info"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: index * 0.2 + 0.3 }}
      >
        <span><FaCalendar className="icon" /> {experience.period}</span>
        <span><FaMapMarkerAlt className="icon" /> {experience.location}</span>
      </motion.div>
    </div>

    <motion.ul 
      className="responsibility-list"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3, delay: index * 0.2 + 0.4 }}
    >
      {experience.description.map((item, i) => (
        <motion.li 
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.3, delay: index * 0.2 + 0.5 + (i * 0.1) }}
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>

    {experience.technologies && (
      <motion.div 
        className="experience-tech"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: index * 0.2 + 0.6 }}
      >
        {experience.technologies.map((tech, i) => (
          <span key={i} className="tech-tag">{tech}</span>
        ))}
      </motion.div>
    )}
  </motion.div>
));

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="experience">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Experience
      </motion.h2>

      <div className="timeline-container">
        <div className="timeline-line" />
        <div ref={ref} className="experience-cards">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              experience={exp}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Experience); 