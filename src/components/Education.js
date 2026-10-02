import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Education.css';

const education = [
  {
    degree: "Bachelor of Technology (B.Tech) in Computer Science",
    institution: "Meerut Institute of Engineering and Technology",
    location: "Meerut, India",
    period: "2016 - 2020"
  }
];

const softSkills = [
  "Technical Leadership",
  "Problem Solving",
  "Cross-functional Collaboration",
  "Communication"
];

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="education" className="education">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        Education
      </motion.h2>

      <div ref={ref} className="education-content">
        {education.map((item, index) => (
          <motion.div
            key={item.degree}
            className="education-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -6 }}
          >
            <div className="education-icon">
              <FaGraduationCap />
            </div>
            <div className="education-details">
              <h3>{item.degree}</h3>
              <h4>{item.institution}</h4>
              <div className="education-meta">
                <span><FaCalendar className="icon" /> {item.period}</span>
                <span><FaMapMarkerAlt className="icon" /> {item.location}</span>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div
          className="soft-skills"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="soft-skills-title">Soft Skills</h3>
          <div className="soft-skills-tags">
            {softSkills.map((skill, i) => (
              <motion.span
                key={skill}
                className="soft-skill-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Education);