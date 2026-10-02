import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaArrowUp, FaUsers, FaRocket, FaClock, FaChartLine, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import '../styles/Projects.css';

const projects = [
  {
    title: "USPA Refund Automation System",
    type: "Production System",
    description: "Refund and return automation system for DMart eCommerce, integrating 3 commerce platforms with Node.js services and React.js dashboards.",
    githubLink: "https://github.com/iabhinavkakran",
    liveLink: null,
    role: "Lead Developer",
    technologies: ["Node.js", "Express.js", "React.js", "REST APIs", "Shopify", "Omuni", "Marmeto", "Razorpay", "JWT"],
    impact: {
      metrics: [
        { value: "3", label: "Platforms Integrated", icon: FaRocket, trend: "success" },
        { value: "Auto", label: "Refund Processing", icon: FaChartLine, trend: "success" },
        { value: "3", label: "Commerce APIs", icon: FaUsers, trend: "growing" }
      ],
      problem: "Manual refund processing causing delays and errors across multiple e-commerce platforms"
    },
    highlights: [
      {
        title: "Multi-Platform Integration",
        description: "Integrated Shopify, Omuni, and Marmeto with Node.js backend services and React.js dashboards.",
        technical: "RESTful APIs with idempotent request handling and consistent data modelling"
      },
      {
        title: "Automated Payment Processing",
        description: "Integrated Razorpay for automated refund processing on successful returns and cancellations.",
        technical: "Payment gateway integration with retry handling for transient failures"
      },
      {
        title: "Security Architecture",
        description: "Secured transactions with JWT authentication and cryptographic hashing for API protection.",
        technical: "JWT issuance and verification, hashed credentials, secure token handling"
      },
      {
        title: "RESTful Service Design",
        description: "Built scalable Node.js and Express.js RESTful APIs and backend services for the Digital API team.",
        technical: "Layered Express routes, validation middleware, structured error handling"
      }
    ]
  },
  {
    title: "Real-Time Crypto Trading Algorithm",
    type: "Trading System",
    description: "Real-time cryptocurrency trading algorithm connected to TradingView via secure webhooks, cutting system latency by 30%.",
    githubLink: "https://github.com/iabhinavkakran",
    liveLink: null,
    role: "Full Stack Developer",
    technologies: ["Node.js", "Express.js", "React.js", "Java", "Spring Boot", "TradingView", "Webhooks"],
    impact: {
      metrics: [
        { value: "+40%", label: "Decision Accuracy", icon: FaArrowUp, trend: "success" },
        { value: "-30%", label: "Latency Reduction", icon: FaClock, trend: "success" },
        { value: "+50%", label: "Throughput", icon: FaRocket, trend: "growing" }
      ],
      problem: "Manual trading decisions causing missed opportunities and delayed executions in volatile crypto markets"
    },
    highlights: [
      {
        title: "Real-Time Data Processing",
        description: "Architected a high-volume Express.js and Java Spring Boot backend for real-time TradingView data, boosting throughput and processing speed by 50%.",
        technical: "Efficient request handling, connection reuse, and async processing with the Node.js event loop"
      },
      {
        title: "Strategic Decision Engine",
        description: "Built the trading algorithm with decision-making accuracy improved by 40%, and optimized logic across 5 position types (buy, sell, short, long, neutral) for 35% higher trading efficiency.",
        technical: "Rule-based signal evaluation across position types with risk-reward calculation"
      },
      {
        title: "Webhook Integration",
        description: "Integrated TradingView through secure webhooks with request validation and signature verification.",
        technical: "HMAC signature verification and duplicate request detection for order execution"
      },
      {
        title: "Live Trading Dashboard",
        description: "Designed a React.js dashboard that visualizes live trading positions in real time.",
        technical: "Component-based React UI with continuous updates from the backend"
      }
    ]
  },
  {
    title: "STG Learning Platform",
    type: "SaaS Platform",
    description: "Production MERN stack learning platform where coaches create, manage, and deliver courses and video content.",
    githubLink: "https://github.com/iabhinavkakran",
    liveLink: "https://app.shortenthegap.com/login",
    role: "Full Stack Developer",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Real-Time Chat", "CMS"],
    impact: {
      metrics: [
        { value: "MERN", label: "Full Stack", icon: FaUsers, trend: "growing" },
        { value: "Live", label: "Production Site", icon: FaChartLine, trend: "success" },
        { value: "Auto", label: "Email Campaigns", icon: FaRocket, trend: "growing" }
      ],
      problem: "Coaches lacking an integrated platform for course delivery, student management, and engagement tracking"
    },
    highlights: [
      {
        title: "Course Delivery Platform",
        description: "Launched the production learning platform where coaches create, manage, and deliver courses and video content.",
        technical: "MERN stack with MongoDB for content storage and Express.js RESTful APIs"
      },
      {
        title: "Custom CMS",
        description: "Implemented a content management system for course creation, video uploads, and student enrollment with role-based access control.",
        technical: "Role-based permissions with authenticated admin workflows"
      },
      {
        title: "Real-Time Chat",
        description: "Added real-time chat between coaches and students using Socket.IO-based WebSocket connections.",
        technical: "WebSocket connections for real-time messaging with message history"
      },
      {
        title: "Email Automation",
        description: "Automated drip campaigns with Node.js and MongoDB, boosting engagement and course completion.",
        technical: "Scheduled job processing with scheduled campaign triggers based on MongoDB records"
      }
    ]
  }
];

const MetricCard = ({ metric, index, inView }) => {
  return (
    <motion.div 
      className={`metric-card trend-${metric.trend}`}
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: -90 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <metric.icon className="metric-icon" />
      <div className="metric-value">{metric.value}</div>
      <div className="metric-label">{metric.label}</div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="project-card glass-card"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="project-content">
        <div className="project-header">
          <div className="header-content">
            <span className="project-type">{project.type}</span>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
          </div>
          <div className="project-links">
            {project.githubLink && (
              <motion.a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="icon-link"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub />
              </motion.a>
            )}
            {project.liveLink && (
              <motion.a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="icon-link live"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaExternalLinkAlt />
              </motion.a>
            )}
          </div>
        </div>

        <div className="impact-section">
          <h4 className="impact-title">Impact Metrics</h4>
          <div className="metrics-grid">
            {project.impact.metrics.map((metric, i) => (
              <MetricCard key={i} metric={metric} index={i} inView={inView} />
            ))}
          </div>
        </div>

        <div className="problem-section">
          <h4 className="problem-title">Challenge</h4>
          <p className="problem-text">{project.impact.problem}</p>
        </div>

        <div className="tech-stack">
          <h4 className="tech-title">Tech Stack</h4>
          <div className="tech-tags">
            {project.technologies.map((tech, i) => (
              <motion.span 
                key={i} 
                className="tech-tag"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: i * 0.05,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="project-highlights">
          <h4 className="highlights-title">Key Features</h4>
          <div className="highlights-list">
            {project.highlights.map((highlight, i) => (
              <motion.div 
                key={i} 
                className="highlight-item"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <div className="highlight-bullet"></div>
                <div>
                  <h5>{highlight.title}</h5>
                  <p>{highlight.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="projects" className="projects">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h2>
      <motion.div
        ref={ref}
        className="projects-grid"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </motion.div>
    </section>
  );
};

export default Projects; 