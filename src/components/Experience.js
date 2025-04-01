import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Experience.css';

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Toolbox OS",
    location: "Remote",
    period: "04/2023 - Present",
    description: [
      "As a Full Stack Developer at Toolbox OS, I am engaged in executing diverse web development projects, leveraging the (Node.Js, React.Js, and Java) stack to create tailored solutions for our clients.",
      "Engineered an advanced trading algorithm connected to TradingView via a custom webhook, enabling real-time cryptocurrency trading and improving decision-making accuracy by 40%.",
      "Enhanced algorithm's strategic decision-making capabilities for buying, selling, shorting, longing, and staying neutral at optimal times, resulting in a 35% increase in trading efficiency.",
      "Implemented a robust backend infrastructure using Express.Js & Java to manage incoming data from TradingView, improving data processing speed by 50%.",
      "Ensured real-time trading capabilities through secure and reliable webhook integration with TradingView, reducing latency by 30%."
    ]
  },
  {
    title: "Project Engineer",
    company: "Wipro Limited",
    location: "Remote",
    period: "03/2021 - 03/2023",
    description: [
      "Designed and developed scalable RESTful APIs and microservices for seamless data exchange and system integration using Node.js, Express.js, Java, and Spring Boot.",
      "Engineered core backend functionalities such as transaction processing, user authentication, and authorization using JWT/OAuth2, ensuring secure and high-performance operations.",
      "Collaborated with front-end teams to integrate APIs and microservices, enhancing UI responsiveness and delivering a consistent user experience across platforms.",
      "Contributed to Agile/Scrum ceremonies, including sprint planning, daily stand-ups, and retrospectives, while ensuring timely delivery of features and improvements.",
      "Worked closely with QA engineers to execute test plans, identify root causes of defects, and implement fixes, maintaining application stability and meeting quality assurance benchmarks."
    ]
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