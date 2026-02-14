import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/projects';
import { useCountUp } from '../hooks/useCountUp';
import MnemoIllustration from './svg/MnemoIllustration';
import GeneticAlgoIllustration from './svg/GeneticAlgoIllustration';
import Ext2Illustration from './svg/Ext2Illustration';

const CountUpMetric = ({ value, suffix = '', label }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <span className="font-heading text-3xl md:text-4xl font-bold text-espresso">
        {count.toLocaleString()}{suffix}
      </span>
      <p className="font-mono text-xs text-clay mt-1">{label}</p>
    </div>
  );
};

const ProjectLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 font-mono text-sm text-warm-dark underline-grow hover:text-sage transition-colors group"
  >
    {children}
    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
      →
    </span>
  </a>
);

const MnemoSection = ({ project }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="bg-sage-mist/40 py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs text-clay mb-4">{project.period}</p>
            <h3 className="font-heading text-4xl md:text-5xl font-bold text-espresso mb-2">
              {project.title}
            </h3>
            <p className="font-serif italic text-warm-dark mb-6">{project.subtitle}</p>
            <p className="font-serif text-warm-dark leading-relaxed mb-8">
              {project.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {project.metrics.map((m) => (
                <CountUpMetric
                  key={m.label}
                  value={m.value}
                  suffix={m.suffix}
                  label={m.label}
                />
              ))}
            </div>

            <p className="font-mono text-sm text-clay mb-6">
              {project.tech.join(' · ')}
            </p>

            <ProjectLink href={project.github}>View on GitHub</ProjectLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <MnemoIllustration className="w-full max-w-md" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const GeneticAlgoSection = ({ project }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-warm-linen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center order-2 lg:order-1"
          >
            <GeneticAlgoIllustration className="w-full max-w-md" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <p className="font-mono text-xs text-clay mb-4">{project.period}</p>
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-espresso mb-2">
              {project.title}
            </h3>
            <p className="font-serif italic text-warm-dark mb-6">{project.subtitle}</p>
            <p className="font-serif text-warm-dark leading-relaxed mb-8">
              {project.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {project.metrics.map((m) => (
                <CountUpMetric
                  key={m.label}
                  value={m.value}
                  suffix={m.suffix}
                  label={m.label}
                />
              ))}
            </div>

            <p className="font-mono text-sm text-clay mb-6">
              {project.tech.join(' · ')}
            </p>

            <ProjectLink href={project.github}>View on GitHub</ProjectLink>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Ext2Section = ({ project }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-warm-linen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs text-clay mb-4">{project.period}</p>
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-espresso mb-2">
              {project.title}
            </h3>
            <p className="font-serif italic text-warm-dark mb-6">{project.subtitle}</p>
            <p className="font-serif text-warm-dark leading-relaxed mb-8">
              {project.description}
            </p>

            {project.commands && (
              <div className="bg-espresso rounded-lg p-4 mb-8 font-mono text-sm">
                {project.commands.map((cmd, i) => (
                  <motion.p
                    key={cmd}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                    className="text-sage-mist"
                  >
                    <span className="text-sage">$</span> ./{cmd}
                  </motion.p>
                ))}
              </div>
            )}

            <div className="flex gap-6 mb-8">
              {project.metrics.map((m) => (
                <CountUpMetric
                  key={m.label}
                  value={m.value}
                  suffix={m.suffix}
                  label={m.label}
                />
              ))}
            </div>

            <p className="font-mono text-sm text-clay mb-6">
              {project.tech.join(' · ')}
            </p>

            <ProjectLink href={project.github}>View on GitHub</ProjectLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <Ext2Illustration className="w-full max-w-md" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const sectionComponents = [MnemoSection, GeneticAlgoSection, Ext2Section];

  return (
    <section id="projects">
      <div ref={ref} className="py-12 px-4 sm:px-6 lg:px-8 bg-sage-mist/40">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label"
          >
            Projects
          </motion.p>
        </div>
      </div>
      {projects.map((project, i) => {
        const Section = sectionComponents[i];
        return Section ? <Section key={project.id} project={project} /> : null;
      })}
    </section>
  );
};

export default Projects;
