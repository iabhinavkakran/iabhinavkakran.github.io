import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaReact, FaNodeJs, FaJava, FaGitAlt, FaDocker, FaAws,
  FaHtml5, FaCss3Alt, FaGithub, FaSitemap
} from 'react-icons/fa';
import {
  SiJavascript, SiTypescript, SiSqlalchemy, SiExpress,
  SiOpenapiinitiative, SiSocketdotio, SiMongodb, SiPostgresql, SiRedis,
  SiFirebase, SiPostman, SiRedux, SiKubernetes, SiC, SiJest, SiGithubactions,
  SiSpringboot, SiSpringsecurity, SiShieldsdotio, SiBlockchaindotcom, SiHibernate
} from 'react-icons/si';
import '../styles/About.css';

const techCategories = [
  {
    title: "Languages",
    items: [
      { name: 'JavaScript (ES6+)', icon: SiJavascript, color: '#f7df1e' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
      { name: 'Java', icon: FaJava, color: '#007396' },
      { name: 'SQL', icon: SiSqlalchemy, color: '#e38c00' },
      { name: 'C', icon: SiC, color: '#A8B9CC' }
    ]
  },
  {
    title: "Frontend",
    items: [
      { name: 'React.js', icon: FaReact, color: '#61dafb' },
      { name: 'Redux', icon: SiRedux, color: '#764ABC' },
      { name: 'HTML5', icon: FaHtml5, color: '#e34c26' },
      { name: 'CSS3', icon: FaCss3Alt, color: '#1572b6' }
    ]
  },
  {
    title: "Backend",
    items: [
      { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
      { name: 'Express.js', icon: SiExpress, color: '#000000' },
      { name: 'REST APIs', icon: SiOpenapiinitiative, color: '#6BA539' },
      { name: 'WebSockets', icon: SiSocketdotio, color: '#1f2d3d' }
    ]
  },
  {
    title: "Databases",
    items: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'Redis', icon: SiRedis, color: '#DC382D' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' }
    ]
  },
  {
    title: "Cloud & DevOps",
    items: [
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      { name: 'Docker', icon: FaDocker, color: '#2496ED' },
      { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
      { name: 'CI/CD', icon: SiGithubactions, color: '#2088ff' }
    ]
  },
  {
    title: "Security",
    items: [
      { name: 'JWT', icon: SiShieldsdotio, color: '#f97316' },
      { name: 'OAuth2', icon: SiSpringsecurity, color: '#6DB33F' },
      { name: 'Crypto Hashing', icon: SiBlockchaindotcom, color: '#10b981' }
    ]
  },
  {
    title: "Java Ecosystem",
    items: [
      { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
      { name: 'Spring Security', icon: SiSpringsecurity, color: '#db4437' },
      { name: 'Hibernate', icon: SiHibernate, color: '#59666c' }
    ]
  },
  {
    title: "Tools & Practices",
    items: [
      { name: 'Git', icon: FaGitAlt, color: '#F05032' },
      { name: 'GitHub', icon: FaGithub, color: '#181717' },
      { name: 'Jest', icon: SiJest, color: '#c21230' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      { name: 'Agile/Scrum', icon: FaSitemap, color: '#8bc34a' }
    ]
  }
];

const SkillCard = memo(({ tech, inView }) => (
  <motion.div
    key={tech.name}
    className="skill-card"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
    transition={{
      duration: 0.3,
      type: "spring",
      stiffness: 100
    }}
    whileHover={{
      scale: 1.05,
      transition: { duration: 0.2 }
    }}
    style={{
      '--tech-color': tech.color
    }}
  >
    <tech.icon className="skill-icon" />
    <span className="skill-name">{tech.name}</span>
  </motion.div>
));

const TechCategory = memo(({ category, categoryIndex, inView }) => (
  <motion.div 
    key={category.title}
    className="tech-category"
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
    transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
  >
    <h4 className="category-title">{category.title}</h4>
    <div className="skills-grid">
      {category.items.map((tech) => (
        <SkillCard key={tech.name} tech={tech} inView={inView} />
      ))}
    </div>
  </motion.div>
));

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="about">
      <div className="about-content">
        <motion.div 
          className="about-text"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="section-title">About Me</h2>
          <div className="about-description">
            <p>
              Full Stack Developer with 5+ years of experience building scalable web applications with 
              Node.js, Express.js, and React.js, supported by Java Spring Boot for backend services.
            </p>
            <p>
              I specialize in RESTful APIs, microservices, and real-time systems such as webhooks and 
              chat. My work spans e-commerce refund automation, real-time trading algorithms, and MERN 
              learning platforms. I'm passionate about clean code, system design, and shipping solutions 
              that solve real business problems.
            </p>
            <p>
              Most recently at Saksoft Limited, where I led Node.js and React.js development for DMart 
              eCommerce (Avenue Supermarts). Before that, I built real-time trading infrastructure at 
              Toolbox OS and enterprise backend services at Wipro Limited.
            </p>
          </div>
        </motion.div>

        <div className="skills-section">
          <motion.h3 
            className="skills-title"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            Technical Expertise
          </motion.h3>
          
          <div ref={ref} className="tech-categories">
            {techCategories.map((category, index) => (
              <TechCategory 
                key={category.title}
                category={category}
                categoryIndex={index}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About); 