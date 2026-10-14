import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Experience.css';

const experiences = [
  {
    title: "IT Analyst",
    company: "Tata Consultancy Services (TCS)",
    location: "India",
    period: "09/2026 - 09/2026",
    description: [
      "Joined as an IT Analyst; resigned due to an unforeseen family emergency"
    ],
    technologies: ["Java", "Spring Boot", "REST APIs"]
  },
  {
    title: "Senior Software Developer (Full Stack)",
    company: "Saksoft Limited",
    client: "DMart eCommerce (Avenue Supermarts)",
    location: "Remote",
    period: "09/2025 - 04/2026",
    description: [
      "Delivered end-to-end eCommerce features for the Digital API team using Node.js, Express.js, Spring Boot, and React.js",
      "Led development of the USPA refund and return automation system, integrating 3 commerce platforms (Shopify, Omuni, Marmeto) with Node.js and Spring Boot services and React.js dashboards",
      "Automated refund payouts via Razorpay payment gateway integration and secured REST APIs with JWT authentication and cryptographic hashing"
    ],
    technologies: ["Node.js", "Express.js", "Java", "Spring Boot", "React.js", "REST APIs", "Microservices", "Shopify", "Omuni", "Marmeto", "Razorpay", "JWT"]
  },
  {
    title: "Full Stack Developer",
    company: "Toolbox OS",
    location: "Remote",
    period: "04/2023 - 08/2025",
    description: [
      "Engineered a real-time cryptocurrency trading platform with Java Spring Boot and Node.js backend services integrated with TradingView via secure webhooks, improving decision-making accuracy by 40% and cutting system latency by 30%",
      "Designed real-time React.js components visualizing 5 position types (buy, sell, short, long, neutral) via Spring Boot REST APIs, increasing trading efficiency by 35% and execution precision in volatile markets",
      "Architected a high-volume, real-time TradingView data pipeline, boosting throughput and processing speed by 50%"
    ],
    technologies: ["Java", "Spring Boot", "Node.js", "Express.js", "React.js", "REST APIs", "TradingView", "Webhooks", "Real-Time Processing"]
  },
  {
    title: "Project Engineer (Java Full Stack)",
    company: "Wipro Limited",
    location: "Remote",
    period: "03/2021 - 03/2023",
    description: [
      "Developed Java Spring Boot RESTful APIs and microservices with Node.js, Express.js, and React.js front ends for client applications, enabling reliable data exchange",
      "Secured 3 core backend modules (transactions, authentication, authorization) with JWT/OAuth2 in Spring Boot and built corresponding React.js UI flows"
    ],
    technologies: ["Java", "Spring Boot", "Microservices", "Node.js", "Express.js", "React.js", "REST APIs", "JWT", "OAuth2"]
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