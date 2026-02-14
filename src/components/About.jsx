import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillGroups } from '../data/experience';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const directions = ['left', 'right', 'left', 'right', 'left'];
  const getSlideVariant = (dir) => ({
    hidden: { opacity: 0, x: dir === 'left' ? -30 : 30 },
    visible: { opacity: 1, x: 0 },
  });

  return (
    <section id="about" className="section-padding bg-cream">
      <div className="container-custom">
        <div ref={ref} className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label"
          >
            About
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 mb-20">
            {/* Bio */}
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-lg text-warm-dark leading-relaxed"
              >
                I'm a Computer Science & Engineering student at the University of Louisville,
                drawn to the places where systems meet intelligence — building things that
                are both technically rigorous and genuinely useful. Whether it's a multi-model
                AI orchestrator or a binary disk parser, I care about the craft of making
                software that works well under real conditions.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="font-serif text-lg text-warm-dark leading-relaxed"
              >
                My work spans the full stack — from low-level C and systems programming to
                modern web applications with React and Next.js, to AI integration with
                multiple LLM providers and RAG pipelines. I build solo projects end-to-end
                because I like understanding every layer.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-serif text-lg text-warm-dark leading-relaxed"
              >
                Outside of code, I'm active in the Vietnamese Student Association and enjoy
                exploring the intersection of technology and community. I'm bilingual in
                English and Vietnamese, and I believe the best engineers are also good
                communicators.
              </motion.p>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="lg:sticky lg:top-32 h-fit space-y-6"
            >
              <div className="border border-straw rounded-xl p-5 bg-cream">
                <p className="font-mono text-xs uppercase tracking-widest text-clay mb-3">Education</p>
                <p className="font-heading text-espresso font-semibold">University of Louisville</p>
                <p className="font-serif text-warm-dark text-sm mt-1">
                  B.S. Computer Science & Engineering
                </p>
                <p className="font-mono text-xs text-clay mt-2">Expected May 2027</p>
              </div>
              <div className="border border-straw rounded-xl p-5 bg-cream">
                <p className="font-mono text-xs uppercase tracking-widest text-clay mb-3">Quick facts</p>
                <div className="space-y-2 font-serif text-sm text-warm-dark">
                  <p>Trustees' Scholar</p>
                  <p>3.5 GPA</p>
                  <p>Bilingual — Vietnamese</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Skills */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="section-label"
            >
              Toolkit
            </motion.p>
            <div className="space-y-5">
              {skillGroups.map((group, i) => (
                <motion.div
                  key={group.domain}
                  variants={getSlideVariant(directions[i])}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                >
                  <span className="font-mono text-sm text-clay w-16 shrink-0">
                    {group.domain}
                  </span>
                  <span className="font-mono text-warm-dark text-sm">
                    {group.skills.join(' · ')}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
