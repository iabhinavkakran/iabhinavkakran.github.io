import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaReact, FaNodeJs, FaJava, FaGitAlt, FaDocker, FaAws, FaVuejs
} from 'react-icons/fa';
import { 
  SiJavascript, SiSpringboot, SiExpress, SiMongodb, 
  SiMysql, SiRedis, SiFirebase, SiPostman, SiRedux,
  SiKubernetes, SiC
} from 'react-icons/si';
import '../styles/About.css';

const techCategories = [
  {
    title: "Languages",
    items: [
      { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
      { name: 'Java', icon: FaJava, color: '#007396' },
      { name: 'C', icon: SiC, color: '#A8B9CC' }
    ]
  },
  {
    title: "Frameworks",
    items: [
      { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
      { name: 'React.js', icon: FaReact, color: '#61dafb' },
      { name: 'Express.js', icon: SiExpress, color: '#000000' },
      { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
      { name: 'Vue.js', icon: FaVuejs, color: '#4FC08D' }
    ]
  },
  {
    title: "Cloud & DevOps",
    items: [
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      { name: 'Docker', icon: FaDocker, color: '#2496ED' },
      { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' }
    ]
  },
  {
    title: "Databases",
    items: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'Redis', icon: SiRedis, color: '#DC382D' }
    ]
  },
  {
    title: "Tools & Others",
    items: [
      { name: 'Git', icon: FaGitAlt, color: '#F05032' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      { name: 'Redux', icon: SiRedux, color: '#764ABC' }
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
          <p className="about-description">
            I'm a passionate Full Stack Developer with expertise in building modern web applications.
            With a strong foundation in both frontend and backend technologies, I create seamless,
            user-centric solutions that drive business growth.
          </p>
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