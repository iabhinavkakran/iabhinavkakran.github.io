import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaReact, FaNodeJs, FaPython, FaJava, FaHtml5, 
  FaCss3Alt, FaJs, FaGitAlt, FaDocker, FaAws 
} from 'react-icons/fa';
import { 
  SiTypescript, SiMongodb, SiPostgresql, SiRedux,
  SiTailwindcss, SiNextdotjs, SiExpress, SiFirebase
} from 'react-icons/si';
import '../styles/TechnicalExpertise.css';

const technologies = [
  { name: 'React', icon: FaReact, category: 'Frontend' },
  { name: 'Next.js', icon: SiNextdotjs, category: 'Frontend' },
  { name: 'TypeScript', icon: SiTypescript, category: 'Languages' },
  { name: 'JavaScript', icon: FaJs, category: 'Languages' },
  { name: 'Redux', icon: SiRedux, category: 'Frontend' },
  { name: 'Node.js', icon: FaNodeJs, category: 'Backend' },
  { name: 'Express', icon: SiExpress, category: 'Backend' },
  { name: 'Python', icon: FaPython, category: 'Languages' },
  { name: 'Java', icon: FaJava, category: 'Languages' },
  { name: 'HTML5', icon: FaHtml5, category: 'Frontend' },
  { name: 'CSS3', icon: FaCss3Alt, category: 'Frontend' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'Frontend' },
  { name: 'MongoDB', icon: SiMongodb, category: 'Backend' },
  { name: 'PostgreSQL', icon: SiPostgresql, category: 'Backend' },
  { name: 'Git', icon: FaGitAlt, category: 'Tools' },
  { name: 'Docker', icon: FaDocker, category: 'Tools' },
  { name: 'AWS', icon: FaAws, category: 'Cloud' },
  { name: 'Firebase', icon: SiFirebase, category: 'Cloud' },
];

const TechnicalExpertise = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="technical-expertise">
      <div className="container">
        <h2 className="section-title">Technical Expertise</h2>
        
        <motion.div 
          ref={ref}
          className="skills-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="skill-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <tech.icon className="skill-icon" />
              <h3>{tech.name}</h3>
              <span className="skill-category">{tech.category}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalExpertise; 