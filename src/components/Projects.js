import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/Projects.css';

const projects = [
  {
    title: "Learning Platform (STG)",
    description: "An innovative educational platform that revolutionizes online learning by providing a comprehensive solution for course creation, management, and student engagement. Built with modern technologies and best practices in web development.",
    technologies: ["React", "Node.js", "Express.js", "Firebase", "MongoDB", "WebSocket", "JWT", "Redux"],
    highlights: [
      {
        title: "Course Management System",
        description: "Developed an intuitive interface for coaches to create, manage, and share courses, daily journals, and video content, enhancing the learning experience."
      },
      {
        title: "Real-time Communication",
        description: "Integrated Firebase for seamless real-time chat functionality, enabling instant communication between students and coaches within the platform."
      },
      {
        title: "Smart Scheduling",
        description: "Implemented an interactive calendar system for tracking meetings, course schedules, and events, improving student engagement and time management."
      },
      {
        title: "Automated Email Campaigns",
        description: "Created a sophisticated drip campaign system for automated, targeted email communications to enhance student engagement and course completion rates."
      },
      {
        title: "User Management",
        description: "Designed a streamlined CMS for efficient student invitation, course assignment, and access management, simplifying administrative tasks."
      }
    ]
  }
];

const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="project-card"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index}
    >
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-highlights">
          {project.highlights.map((highlight, index) => (
            <motion.div 
              key={index} 
              className="highlight-item"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <h4>{highlight.title}</h4>
              <p>{highlight.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="project-tech">
          {project.technologies.map((tech, index) => (
            <motion.span 
              key={index} 
              className="tech-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
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