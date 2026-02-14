import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const GeneticAlgoIllustration = ({ className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const nodes = [
    { cx: 80, cy: 60, covered: true },
    { cx: 200, cy: 40, covered: false },
    { cx: 320, cy: 60, covered: true },
    { cx: 50, cy: 170, covered: false },
    { cx: 160, cy: 160, covered: true },
    { cx: 280, cy: 180, covered: false },
    { cx: 350, cy: 160, covered: true },
    { cx: 120, cy: 280, covered: true },
    { cx: 240, cy: 270, covered: false },
    { cx: 340, cy: 280, covered: true },
  ];

  const edges = [
    [0, 1], [0, 3], [0, 4],
    [1, 2], [1, 4], [1, 5],
    [2, 5], [2, 6],
    [3, 4], [3, 7],
    [4, 7], [4, 8],
    [5, 6], [5, 8], [5, 9],
    [6, 9],
    [7, 8],
    [8, 9],
  ];

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 340"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => (
        <motion.line
          key={`edge-${i}`}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="#E8DFD4"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }}
        />
      ))}
      {nodes.map((node, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={node.cx}
          cy={node.cy}
          r={node.covered ? 14 : 10}
          fill={node.covered ? '#A8BBA4' : '#FFF9F2'}
          stroke={node.covered ? '#6B7F68' : '#E8DFD4'}
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.9 + i * 0.06, type: 'spring' }}
        />
      ))}
    </svg>
  );
};

export default GeneticAlgoIllustration;
