import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Experience.css';

const experiences = [
  {
    title: "Senior Software Developer",
    company: "Solveda Software India Pvt Ltd",
    location: "Remote",
    period: "09/2025 - Present",
    description: [
      "Architected and deployed USPA refund automation system integrating Shopify, Omuni, and Marmeto with 100% automated payment processing via Razorpay",
      "Implemented enterprise-grade security layer using JWT authentication, crypto hashing, and secure token decoding for multi-platform API integrations",
      "Designed microservices architecture handling 10,000+ daily transactions with zero downtime during peak loads",
      "Built fault-tolerant webhook systems ensuring 99.9% reliability for real-time order processing and refund automation"
    ],
    technologies: ["Java", "Spring Boot", "Node.js", "Shopify API", "Razorpay", "JWT", "Microservices"]
  },
  {
    title: "Full Stack Developer",
    company: "Toolbox OS",
    location: "Remote",
    period: "04/2023 - 08/2025",
    description: [
      "Engineered real-time cryptocurrency trading algorithm with TradingView webhook integration, improving decision accuracy by 40% and reducing latency by 30%",
      "Optimized trading logic for multi-position strategies (long/short/neutral), increasing overall efficiency by 35%",
      "Built high-throughput backend using Java Spring Boot and Node.js Express handling 50,000+ webhook calls/day with 50% faster data processing",
      "Developed fault-tolerant system architecture with automatic failover and circuit breaker patterns for 24/7 trading operations"
    ],
    technologies: ["Java", "Spring Boot", "Node.js", "Express.js", "TradingView API", "WebSocket", "Redis"]
  },
  {
    title: "Project Engineer",
    company: "Wipro Limited",
    location: "Remote",
    period: "03/2021 - 03/2023",
    description: [
      "Designed and deployed RESTful APIs and microservices using Java Spring Boot and Node.js, serving 100,000+ daily requests",
      "Implemented secure authentication and authorization using JWT/OAuth2, reducing security vulnerabilities by 80%",
      "Collaborated with React.js teams to optimize API integration, improving frontend response times by 45%",
      "Led Agile sprints and conducted code reviews, maintaining 95% test coverage and reducing bug leakage by 60%"
    ],
    technologies: ["Java", "Spring Boot", "Node.js", "Express.js", "React.js", "JWT", "OAuth2", "Microservices"]
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