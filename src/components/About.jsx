import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { skills } from '../data/experience';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="section-padding bg-soft-white">
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
              About Me
            </h2>
            <div className="w-24 h-1 bg-sage mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Bio Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                I'm a Computer Science & Engineering student at the University of Louisville,
                pursuing my B.S. with an expected graduation in May 2027. As a Trustees' Scholar
                with a 3.5 GPA, I'm passionate about algorithms, systems programming, and
                building practical tools that solve real-world problems.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                My coursework spans Software Engineering, Operating Systems, Artificial Intelligence,
                and Embedded Systems. I enjoy tackling complex problems—whether it's implementing
                genetic algorithms for optimization or building low-level file system analysis tools.
                Outside of academics, I'm actively involved in the Vietnamese Student Association.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-sage/10 text-sage px-4 py-2 rounded-full text-sm font-medium"
                >
                  Algorithms & AI
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-sage/10 text-sage px-4 py-2 rounded-full text-sm font-medium"
                >
                  Systems Programming
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-sage/10 text-sage px-4 py-2 rounded-full text-sm font-medium"
                >
                  Software Engineering
                </motion.div>
              </div>
            </motion.div>

            {/* Skills Section */}
            <motion.div variants={itemVariants} className="space-y-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Technical Skills</h3>
              
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={skillVariants}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className="text-sage font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-gradient-to-r from-sage to-sage/80 h-2 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Skills Grid */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {[
                  'Python', 'C', 'C++', 'Java',
                  'JavaScript', 'HTML/CSS', 'SQL', 'Assembly',
                  'Git', 'Linux', 'Firebase', 'pandas',
                  'NumPy', 'Matplotlib'
                ].map((tech, index) => (
                  <motion.div
                    key={tech}
                    variants={skillVariants}
                    whileHover={{ scale: 1.05, backgroundColor: '#A8BBA4' }}
                    className="bg-warm-cream/50 text-gray-700 px-4 py-3 rounded-lg text-center font-medium transition-all duration-300 hover:text-white"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Fun Facts */}
          <motion.div
            variants={itemVariants}
            className="mt-16 bg-warm-cream/30 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Highlights
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-sage mb-2">3.5</div>
                <div className="text-gray-600">GPA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sage mb-2">2</div>
                <div className="text-gray-600">Research Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sage mb-2">🏆</div>
                <div className="text-gray-600">Trustees' Scholar</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
