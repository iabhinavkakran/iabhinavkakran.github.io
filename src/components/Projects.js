import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaArrowUp, FaUsers, FaRocket, FaClock, FaChartLine, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import '../styles/Projects.css';

const projects = [
  {
    title: "USPA Refund Automation System",
    type: "Production System",
    description: "Enterprise-grade refund automation system processing 10,000+ daily transactions across multiple e-commerce platforms with zero-downtime architecture.",
    githubLink: "https://github.com/iabhinavkakran",
    liveLink: null,
    role: "Lead Developer",
    technologies: ["Java", "Spring Boot", "Shopify API", "Razorpay", "Microservices", "JWT", "Redis", "Docker"],
    impact: {
      metrics: [
        { value: "100%", label: "Automated Processing", icon: FaRocket, trend: "success" },
        { value: "99.9%", label: "System Uptime", icon: FaChartLine, trend: "success" },
        { value: "10K+", label: "Daily Transactions", icon: FaUsers, trend: "growing" }
      ],
      problem: "Manual refund processing causing delays and errors across multiple e-commerce platforms"
    },
    highlights: [
      {
        title: "Multi-Platform Integration",
        description: "Seamlessly integrated with Shopify, Omuni, and Marmeto Code APIs, handling complex webhook flows and maintaining data consistency across platforms.",
        technical: "Implemented idempotency keys and distributed transaction patterns"
      },
      {
        title: "Automated Payment Processing",
        description: "Built intelligent refund engine with Razorpay integration that automatically processes payments on successful returns/cancellations.",
        technical: "Circuit breaker pattern for API failures, retry mechanisms with exponential backoff"
      },
      {
        title: "Security Architecture",
        description: "Implemented multi-layer security with JWT authentication, crypto hashing, and secure token decoding for API protection.",
        technical: "AES-256 encryption, token rotation, rate limiting, and request signing"
      },
      {
        title: "Microservices Design",
        description: "Architected fault-tolerant microservices handling order processing, payment integration, and notification services independently.",
        technical: "Event-driven architecture with message queues, service discovery, and load balancing"
      }
    ]
  },
  {
    title: "Real-Time Crypto Trading Algorithm",
    type: "Trading System",
    description: "High-performance algorithmic trading system connected to TradingView, executing real-time cryptocurrency trades with 30% reduced latency.",
    githubLink: "https://github.com/iabhinavkakran",
    liveLink: null,
    role: "Full Stack Developer",
    technologies: ["Java", "Spring Boot", "Node.js", "Express.js", "TradingView API", "WebSocket", "Redis", "PostgreSQL"],
    impact: {
      metrics: [
        { value: "+40%", label: "Decision Accuracy", icon: FaArrowUp, trend: "success" },
        { value: "-30%", label: "Latency Reduction", icon: FaClock, trend: "success" },
        { value: "50K+", label: "Webhooks/Day", icon: FaRocket, trend: "growing" }
      ],
      problem: "Manual trading decisions causing missed opportunities and delayed executions in volatile crypto markets"
    },
    highlights: [
      {
        title: "Real-Time Data Processing",
        description: "Built high-throughput backend processing 50,000+ TradingView webhook calls per day with sub-100ms latency.",
        technical: "Redis caching layer, connection pooling, async processing with Node.js event loop"
      },
      {
        title: "Strategic Decision Engine",
        description: "Developed sophisticated algorithm for multi-position strategies (long/short/neutral) with dynamic risk management.",
        technical: "Implemented decision trees, momentum indicators, and risk-reward calculation algorithms"
      },
      {
        title: "Webhook Integration",
        description: "Secure TradingView webhook integration with request validation, signature verification, and automatic failover.",
        technical: "HMAC signature verification, duplicate request detection, distributed locks for order execution"
      },
      {
        title: "24/7 Reliability",
        description: "Fault-tolerant architecture with automatic failover, health monitoring, and instant alerts for system issues.",
        technical: "Kubernetes deployment, health checks, Prometheus monitoring, PagerDuty integration"
      }
    ]
  },
  {
    title: "STG Learning Platform",
    type: "SaaS Platform",
    description: "Full-featured MERN stack learning platform enabling coaches to create and deliver courses with integrated CMS, real-time chat, and automated email campaigns.",
    githubLink: "https://github.com/iabhinavkakran",
    liveLink: "https://app.shortenthegap.com/login",
    role: "Full Stack Developer",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase", "WebSocket", "Redux", "JWT"],
    impact: {
      metrics: [
        { value: "500+", label: "Active Users", icon: FaUsers, trend: "growing" },
        { value: "95%", label: "Completion Rate", icon: FaChartLine, trend: "success" },
        { value: "50+", label: "Published Courses", icon: FaRocket, trend: "growing" }
      ],
      problem: "Coaches lacking integrated platform for course delivery, student management, and engagement tracking"
    },
    highlights: [
      {
        title: "Custom CMS",
        description: "Built comprehensive content management system for course creation, video uploads, and student enrollment with role-based access control.",
        technical: "AWS S3 for media storage, CloudFront CDN, progressive video streaming"
      },
      {
        title: "Real-Time Communication",
        description: "Implemented Firebase-powered real-time chat with typing indicators, read receipts, and message history.",
        technical: "WebSocket connections, offline message queuing, optimistic UI updates"
      },
      {
        title: "Email Automation",
        description: "Developed drip campaign system with Node.js for scheduled, targeted email delivery based on student progress and milestones.",
        technical: "Node-cron for scheduling, SendGrid API integration, template engine with Handlebars"
      },
      {
        title: "Performance Optimization",
        description: "Optimized React application with code splitting, lazy loading, and memoization achieving 90+ Lighthouse score.",
        technical: "React.lazy, useMemo/useCallback hooks, virtual scrolling for large lists"
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