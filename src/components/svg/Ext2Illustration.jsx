import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Ext2Illustration = ({ className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const treeNodes = [
    { x: 200, y: 30, label: '/', type: 'dir' },
    { x: 100, y: 100, label: 'home', type: 'dir' },
    { x: 200, y: 100, label: 'etc', type: 'dir' },
    { x: 300, y: 100, label: 'var', type: 'dir' },
    { x: 60, y: 170, label: 'user', type: 'dir' },
    { x: 140, y: 170, label: '.bashrc', type: 'file' },
    { x: 200, y: 170, label: 'passwd', type: 'file' },
    { x: 260, y: 170, label: 'log', type: 'dir' },
    { x: 340, y: 170, label: 'tmp', type: 'dir' },
    { x: 40, y: 240, label: 'docs', type: 'dir' },
    { x: 100, y: 240, label: 'main.c', type: 'file' },
    { x: 240, y: 240, label: 'sys.log', type: 'file' },
    { x: 320, y: 240, label: 'cache', type: 'dir' },
  ];

  const branches = [
    [0, 1], [0, 2], [0, 3],
    [1, 4], [1, 5],
    [2, 6],
    [3, 7], [3, 8],
    [4, 9], [4, 10],
    [7, 11],
    [8, 12],
  ];

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 280"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {branches.map(([a, b], i) => (
        <motion.line
          key={`branch-${i}`}
          x1={treeNodes[a].x}
          y1={treeNodes[a].y + 12}
          x2={treeNodes[b].x}
          y2={treeNodes[b].y - 12}
          stroke="#A8BBA4"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
          transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
        />
      ))}
      {treeNodes.map((node, i) => (
        <motion.g
          key={`node-${i}`}
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.6 + i * 0.06 }}
        >
          <rect
            x={node.x - (node.type === 'dir' ? 28 : 24)}
            y={node.y - 10}
            width={node.type === 'dir' ? 56 : 48}
            height={20}
            rx={3}
            fill={node.type === 'dir' ? '#E8F0E6' : '#FFF9F2'}
            stroke={node.type === 'dir' ? '#A8BBA4' : '#E8DFD4'}
            strokeWidth="1"
          />
          <text
            x={node.x}
            y={node.y + 4}
            textAnchor="middle"
            fill={node.type === 'dir' ? '#6B7F68' : '#8C7E72'}
            fontSize="9"
            fontFamily="'JetBrains Mono', monospace"
          >
            {node.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
};

export default Ext2Illustration;
