import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { experience } from '../data/experience';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const rightItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="experience" className="section-padding bg-soft-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Work Experience
            </h2>
            <div className="w-24 h-1 bg-sage mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              My professional journey in software engineering, from internships to senior roles.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-sage/30 rounded-full hidden md:block"></div>

            {/* Experience Items */}
            <div className="space-y-12">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={index % 2 === 0 ? itemVariants : rightItemVariants}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-sage rounded-full border-4 border-soft-white shadow-lg z-10 hidden md:block"></div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="card p-6 relative"
                    >
                      {/* Company & Duration */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-sage/10 rounded-lg">
                          <FaBriefcase className="text-sage" size={20} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {exp.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-sage">
                            <FaCalendarAlt size={14} />
                            <span className="text-sm font-medium">{exp.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Company Name */}
                      <h4 className="text-lg font-medium text-sage mb-3">
                        {exp.company}
                      </h4>

                      {/* Description */}
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            whileHover={{ scale: 1.05 }}
                            className="bg-warm-cream/50 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Decorative Element */}
                      <div className="absolute top-4 right-4 w-8 h-8 bg-sage/10 rounded-full"></div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <motion.div
            variants={itemVariants}
            className="mt-20 bg-warm-cream/30 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Education
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-sage">BS</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Computer Science
                </h4>
                <p className="text-sage font-medium mb-1">University of Technology</p>
                <p className="text-gray-600 text-sm">2014 - 2018</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-sage">MS</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Software Engineering
                </h4>
                <p className="text-sage font-medium mb-1">Tech Institute</p>
                <p className="text-gray-600 text-sm">2018 - 2020</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
