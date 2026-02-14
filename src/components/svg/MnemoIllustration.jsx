import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* Head silhouette path — clean side profile facing left */
const headPath = `
  M142,300
  C142,282 138,268 140,255
  C142,242 148,232 146,222
  C144,212 140,204 142,196
  C144,188 148,178 150,170
  C152,160 148,148 145,140
  C142,132 146,120 152,108
  C158,96 168,84 182,74
  C196,64 215,56 238,56
  C260,56 278,68 288,86
  C298,104 302,130 300,158
  C298,186 290,212 280,235
  C270,258 264,278 262,300
`;

/* Neural curves inside the head */
const brainWaves = [
  'M185,95 Q205,112 195,135',
  'M205,82 Q220,105 215,128',
  'M228,78 Q238,100 230,122',
  'M200,108 Q218,118 235,108',
];

/* Flowing connection curves from head to creative elements */
const flowPaths = [
  'M275,72 Q312,48 335,48',
  'M290,90 Q328,88 348,105',
  'M300,130 Q340,145 358,168',
  'M296,170 Q328,200 325,222',
  'M282,210 Q316,240 340,255',
];

/* Creative elements: lightbulb, text lines, diamond, swatches, bars */
/* Lightbulb at top — represents ideas */
const lightbulbParts = [
  { type: 'path', d: 'M335,55 C327,48 327,36 335,30 C343,36 343,48 335,55 Z' },
  { type: 'rect', x: 331, y: 55, w: 8, h: 6, rx: 1 },
  { type: 'line', x1: 335, y1: 22, x2: 335, y2: 16 },
  { type: 'line', x1: 322, y1: 30, x2: 317, y2: 26 },
  { type: 'line', x1: 348, y1: 30, x2: 353, y2: 26 },
];

/* Text lines — represents content generation */
const textLines = [
  { x: 338, y: 100, w: 40, h: 4 },
  { x: 338, y: 110, w: 30, h: 4 },
  { x: 338, y: 120, w: 36, h: 4 },
];

/* Diamond — represents AI processing/routing */
const diamondPath = 'M358,168 L370,180 L358,192 L346,180 Z';

/* Color swatches — represents creative output for agencies */
const swatches = [
  { x: 312, y: 218, w: 12, h: 12, fill: '#A8BBA4' },
  { x: 328, y: 218, w: 12, h: 12, fill: '#E8DFD4' },
  { x: 344, y: 218, w: 12, h: 12, fill: '#E8F0E6' },
];

/* Bar chart — represents ad scoring / analytics */
const bars = [
  { x: 332, y: 262, w: 7, h: 18 },
  { x: 343, y: 254, w: 7, h: 26 },
  { x: 354, y: 258, w: 7, h: 22 },
];

/* Sparkles scattered around creative elements */
const sparkles = [
  { cx: 315, cy: 42 },
  { cx: 370, cy: 72 },
  { cx: 385, cy: 148 },
  { cx: 375, cy: 240 },
];

const SparkShape = ({ cx, cy, size = 6 }) => (
  <path d={`
    M${cx},${cy - size} L${cx + size * 0.35},${cy - size * 0.35}
    L${cx + size},${cy} L${cx + size * 0.35},${cy + size * 0.35}
    L${cx},${cy + size} L${cx - size * 0.35},${cy + size * 0.35}
    L${cx - size},${cy} L${cx - size * 0.35},${cy - size * 0.35} Z
  `} />
);

const MnemoIllustration = ({ className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 320"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Head silhouette — draws itself */}
      <motion.path
        d={headPath}
        stroke="#A8BBA4"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
      />

      {/* Subtle head fill — appears after outline draws */}
      <motion.path
        d={headPath + ' Z'}
        fill="#E8F0E6"
        stroke="none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.15 } : {}}
        transition={{ duration: 0.6, delay: 1.0 }}
      />

      {/* Brain wave curves inside head */}
      {brainWaves.map((d, i) => (
        <motion.path
          key={`brain-${i}`}
          d={d}
          stroke="#A8BBA4"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
          transition={{ duration: 0.5, delay: 1.2 + i * 0.1, ease: 'easeInOut' }}
        />
      ))}

      {/* Flow connections from head to creative elements */}
      {flowPaths.map((d, i) => (
        <motion.path
          key={`flow-${i}`}
          d={d}
          stroke="#A8BBA4"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeDasharray="3 3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.45 } : {}}
          transition={{ duration: 0.6, delay: 1.5 + i * 0.12, ease: 'easeOut' }}
        />
      ))}

      {/* ── Creative elements ── */}

      {/* Lightbulb */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <path d={lightbulbParts[0].d} fill="#E8F0E6" stroke="#A8BBA4" strokeWidth="1.2" />
        <rect
          x={lightbulbParts[1].x} y={lightbulbParts[1].y}
          width={lightbulbParts[1].w} height={lightbulbParts[1].h}
          rx={lightbulbParts[1].rx}
          fill="#A8BBA4" opacity="0.6"
        />
        {lightbulbParts.slice(2).map((l, i) => (
          <line key={`ray-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="#A8BBA4" strokeWidth="1" strokeLinecap="round" />
        ))}
      </motion.g>

      {/* Text lines */}
      {textLines.map((t, i) => (
        <motion.rect
          key={`text-${i}`}
          x={t.x} y={t.y} width={t.w} height={t.h}
          rx="2"
          fill="#A8BBA4"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 0.5 } : {}}
          style={{ originX: 0 }}
          transition={{ duration: 0.35, delay: 1.95 + i * 0.08 }}
        />
      ))}

      {/* Diamond (AI routing) */}
      <motion.path
        d={diamondPath}
        fill="#E8F0E6"
        stroke="#A8BBA4"
        strokeWidth="1.2"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 2.2, ease: [0.34, 1.56, 0.64, 1] }}
      />

      {/* Color swatches */}
      {swatches.map((s, i) => (
        <motion.rect
          key={`swatch-${i}`}
          x={s.x} y={s.y} width={s.w} height={s.h}
          rx="2"
          fill={s.fill}
          stroke="#A8BBA4"
          strokeWidth="0.8"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.8 } : {}}
          transition={{ duration: 0.3, delay: 2.35 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
        />
      ))}

      {/* Bar chart */}
      {bars.map((b, i) => (
        <motion.rect
          key={`bar-${i}`}
          x={b.x} y={b.y} width={b.w} height={b.h}
          rx="1"
          fill="#A8BBA4"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isInView ? { scaleY: 1, opacity: 0.55 } : {}}
          style={{ originY: 1 }}
          transition={{ duration: 0.35, delay: 2.6 + i * 0.08 }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map((s, i) => (
        <motion.g key={`spark-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? {
            scale: [0, 1.2, 0.9, 1.1],
            opacity: [0, 0.7, 0.4, 0.7],
          } : {}}
          transition={{
            delay: 2.8 + i * 0.15,
            duration: 2.8,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        >
          <SparkShape cx={s.cx} cy={s.cy} size={5} />
          <circle cx={s.cx} cy={s.cy} r="1.5" fill="#6B7F68" />
        </motion.g>
      ))}

      {/* Pulsing "mind" dot at center of head */}
      <motion.circle
        cx="225" cy="115" r="6"
        fill="#6B7F68"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? {
          scale: [0, 1, 1.4, 1],
          opacity: [0, 0.8, 0.4, 0.8],
        } : {}}
        transition={{
          delay: 1.6,
          duration: 2.5,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      />
    </svg>
  );
};

export default MnemoIllustration;
