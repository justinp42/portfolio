import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';


/* ===================================================================
   CONSTANTS
   =================================================================== */

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

const headshotDots = [];
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    headshotDots.push({ cx: col * 50 + 25, cy: row * 50 + 25 });
  }
}

const TECH_TAGS = [
  { label: 'React', layer: 'front', x: 8, y: 12, delay: 0, period: 3.2 },
  { label: 'TypeScript', layer: 'mid', x: 15, y: 28, delay: 0.1, period: 3.8 },
  { label: 'Next.js', layer: 'front', x: 5, y: 45, delay: 0.2, period: 3.5 },
  { label: 'Python', layer: 'back', x: 25, y: 18, delay: 0.3, period: 4.0 },
  { label: 'AI/ML', layer: 'mid', x: 35, y: 8, delay: 0.4, period: 3.6 },
  { label: 'PostgreSQL', layer: 'back', x: 42, y: 30, delay: 0.5, period: 4.2 },
  { label: 'C', layer: 'front', x: 20, y: 55, delay: 0.6, period: 3.3 },
  { label: 'RAG', layer: 'mid', x: 48, y: 15, delay: 0.7, period: 3.9 },
  { label: 'Supabase', layer: 'back', x: 30, y: 42, delay: 0.8, period: 4.1 },
  { label: 'Linux', layer: 'mid', x: 12, y: 65, delay: 0.9, period: 3.4 },
];

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

/* Particle colors */
const PARTICLE_COLORS = ['#A8BBA4', '#6B7F68', '#E8DFD4'];

/* Aurora mesh blob configs */
const AURORA_BLOBS = [
  { x: 0.2, y: 0.3, size: 500, color: [168, 187, 164], speed: 0.0003, orbitRx: 80, orbitRy: 50 },
  { x: 0.7, y: 0.2, size: 450, color: [232, 223, 212], speed: 0.00025, orbitRx: 60, orbitRy: 70 },
  { x: 0.5, y: 0.7, size: 550, color: [232, 240, 230], speed: 0.00035, orbitRx: 70, orbitRy: 40 },
  { x: 0.3, y: 0.6, size: 400, color: [168, 187, 164], speed: 0.0002, orbitRx: 90, orbitRy: 60 },
];


/* ===================================================================
   SPRING PARALLAX HOOK
   =================================================================== */

const useSpringParallax = (mouse) => {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  rawX.set(mouse.x);
  rawY.set(mouse.y);

  const springX = useSpring(rawX, { stiffness: 150, damping: 25 });
  const springY = useSpring(rawY, { stiffness: 150, damping: 25 });

  const makeLayer = (multiplier) => ({
    x: useTransform(springX, (v) => v * multiplier),
    y: useTransform(springY, (v) => v * multiplier),
  });

  return {
    back: makeLayer(5),
    mid: makeLayer(15),
    front: makeLayer(30),
    headshot: makeLayer(8),
    headshotFrame: makeLayer(10),
    headshotAuraOuter: makeLayer(5),
    headshotAuraInner: makeLayer(4),
    headshotDots: makeLayer(3),
    headshotBadge: makeLayer(-6),
    mesh: makeLayer(2),
  };
};


/* ===================================================================
   useParticleCanvas HOOK — canvas animation logic
   =================================================================== */

const useParticleCanvas = (canvasRef, mouseRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let auroraPhase = 0;
    let scrollY = 0;
    let fadeInProgress = 0;

    const PARTICLE_COUNT = 70;
    const MAX_CONNECTIONS = 6;
    const CONNECTION_DIST = 180;
    const ATTRACT_OUTER = 400;
    const ATTRACT_INNER = 200;
    const REPULSE_DIST = 150;
    const LIFECYCLE_INTERVAL = 4500;

    const handleScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const createParticle = (fromCenter) => {
      const cx = fromCenter ? width / 2 : Math.random() * width;
      const cy = fromCenter ? height / 2 : Math.random() * height;
      return {
        x: cx + (Math.random() - 0.5) * (fromCenter ? 50 : 0),
        y: cy + (Math.random() - 0.5) * (fromCenter ? 50 : 0),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: 2.5 + Math.random() * 2.5,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        opacity: fromCenter ? 0 : 0.4 + Math.random() * 0.3,
        targetOpacity: 0.4 + Math.random() * 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.01,
        fadingOut: false,
        fadingIn: fromCenter,
      };
    };

    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle(true));
      }
    };

    /* Particle lifecycle: every ~4.5s, one particle fades out and a new one fades in */
    let lifecycleTimer = 0;

    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    };

    const drawAuroraBlobs = (time) => {
      const auroraOpacity = Math.min(fadeInProgress / 120, 1);
      if (auroraOpacity <= 0) return;

      for (const blob of AURORA_BLOBS) {
        const bx = blob.x * width + Math.sin(time * blob.speed) * blob.orbitRx;
        const by = blob.y * height + Math.cos(time * blob.speed * 1.3) * blob.orbitRy;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, blob.size);
        const [r, g, b] = blob.color;
        grad.addColorStop(0, `rgba(${r},${g},${b},${0.06 * auroraOpacity})`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${0.03 * auroraOpacity})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const animate = (time) => {
      if (!time) time = 0;
      ctx.clearRect(0, 0, width, height);
      fadeInProgress++;

      /* Scroll dispersal */
      const scrollFactor = scrollY > 100 ? Math.min((scrollY - 100) / 300, 1) : 0;

      /* Aurora mesh blobs (drawn BEFORE particles) */
      drawAuroraBlobs(time);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      /* Update & draw particles */
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        /* Fade in/out lifecycle */
        if (p.fadingIn) {
          p.opacity += 0.005;
          if (p.opacity >= p.targetOpacity) {
            p.opacity = p.targetOpacity;
            p.fadingIn = false;
          }
        }
        if (p.fadingOut) {
          p.opacity -= 0.005;
          if (p.opacity <= 0) {
            particles[i] = createParticle(false);
            particles[i].fadingIn = true;
            particles[i].opacity = 0;
            continue;
          }
        }

        /* Mouse interaction */
        if (mx > 0 && my > 0) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPULSE_DIST && dist > 0) {
            const force = (REPULSE_DIST - dist) / REPULSE_DIST * 0.5;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          } else if (dist > ATTRACT_INNER && dist < ATTRACT_OUTER) {
            const force = (1 - (dist - ATTRACT_INNER) / (ATTRACT_OUTER - ATTRACT_INNER)) * 0.02;
            p.vx -= (dx / dist) * force;
            p.vy -= (dy / dist) * force;
          }
        }

        /* Scroll dispersal acceleration */
        if (scrollFactor > 0) {
          p.vy += scrollFactor * 0.1;
          p.opacity = Math.max(0, p.targetOpacity * (1 - scrollFactor * 0.8));
        }

        /* Update position */
        p.x += p.vx;
        p.y += p.vy;

        /* Damping */
        p.vx *= 0.995;
        p.vy *= 0.995;

        /* Edge bouncing */
        if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx) * 0.5; }
        if (p.x > width) { p.x = width; p.vx = -Math.abs(p.vx) * 0.5; }
        if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy) * 0.5; }
        if (p.y > height) { p.y = height; p.vy = -Math.abs(p.vy) * 0.5; }

        /* Pulse */
        p.pulsePhase += p.pulseSpeed;
        const pulse = 0.85 + Math.sin(p.pulsePhase) * 0.15;
        const finalOpacity = p.opacity * pulse;

        /* Draw particle with radial gradient */
        const [r, g, b] = hexToRgb(p.color);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        grad.addColorStop(0, `rgba(${r},${g},${b},${finalOpacity})`);
        grad.addColorStop(0.6, `rgba(${r},${g},${b},${finalOpacity * 0.4})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      /* Connection lines */
      for (let i = 0; i < particles.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < particles.length; j++) {
          if (connections >= MAX_CONNECTIONS) break;
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const lineOpacity = (1 - dist / CONNECTION_DIST) * 0.35 * Math.min(particles[i].opacity, particles[j].opacity) / 0.6;
            ctx.strokeStyle = `rgba(168,187,164,${lineOpacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            connections++;
          }
        }
      }

      /* Lifecycle timer */
      lifecycleTimer++;
      if (lifecycleTimer > LIFECYCLE_INTERVAL / 16) {
        lifecycleTimer = 0;
        const aliveParticles = particles.filter(p => !p.fadingOut);
        if (aliveParticles.length > 0) {
          const target = aliveParticles[Math.floor(Math.random() * aliveParticles.length)];
          target.fadingOut = true;
        }
      }

      animId = requestAnimationFrame(animate);
    };

    init();
    animId = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [canvasRef, mouseRef]);
};


/* ===================================================================
   PARTICLE CANVAS COMPONENT
   =================================================================== */

const ParticleCanvas = React.memo(({ mouseRef }) => {
  const canvasRef = useRef(null);
  useParticleCanvas(canvasRef, mouseRef);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 hidden md:block"
      style={{ pointerEvents: 'none' }}
    />
  );
});

ParticleCanvas.displayName = 'ParticleCanvas';


/* ===================================================================
   CHARACTER SCRAMBLE — glitch text reveal for name
   =================================================================== */

const CharacterScramble = ({ text, className = '', startDelay = 1200 }) => {
  const [chars, setChars] = useState(() =>
    text.split('').map((ch) => ({
      target: ch,
      current: ch === ' ' ? ' ' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
      settled: ch === ' ',
      isMono: ch !== ' ',
    }))
  );

  useEffect(() => {
    const staggerMs = 50;
    const scrambleDuration = 400;
    const intervalMs = 40;

    const timers = [];

    text.split('').forEach((ch, i) => {
      if (ch === ' ') return;

      /* Start scrambling after stagger delay */
      const scrambleStart = startDelay + i * staggerMs;
      const settleTime = scrambleStart + scrambleDuration;

      /* Scramble interval */
      const startTimer = setTimeout(() => {
        const interval = setInterval(() => {
          setChars((prev) => {
            const next = [...prev];
            if (!next[i].settled) {
              next[i] = {
                ...next[i],
                current: SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
              };
            }
            return next;
          });
        }, intervalMs);
        timers.push(interval);

        /* Settle timer */
        const settleTimer = setTimeout(() => {
          clearInterval(interval);
          setChars((prev) => {
            const next = [...prev];
            next[i] = { ...next[i], current: ch, settled: true, isMono: false };
            return next;
          });
        }, scrambleDuration);
        timers.push(settleTimer);
      }, scrambleStart);
      timers.push(startTimer);
    });

    return () => {
      timers.forEach((t) => {
        clearTimeout(t);
        clearInterval(t);
      });
    };
  }, [text, startDelay]);

  return (
    <span className={className}>
      {chars.map((ch, i) => (
        <span
          key={i}
          className={ch.isMono ? 'font-mono' : 'font-heading'}
          style={{
            display: 'inline-block',
            minWidth: ch.target === ' ' ? '0.3em' : undefined,
            transition: 'font-family 0.05s',
          }}
        >
          {ch.current}
        </span>
      ))}
    </span>
  );
};


/* ===================================================================
   CURSOR SPOTLIGHT — soft glow follows mouse
   =================================================================== */

const CursorSpotlight = ({ mouse }) => {
  const spotX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const spotY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });

  useEffect(() => {
    spotX.set(mouse.rawX);
    spotY.set(mouse.rawY);
  }, [mouse.rawX, mouse.rawY, spotX, spotY]);

  return (
    <motion.div
      className="absolute z-[2] pointer-events-none hidden md:block"
      style={{
        x: spotX,
        y: spotY,
        width: 350,
        height: 350,
        marginLeft: -175,
        marginTop: -175,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,187,164,0.07) 0%, transparent 70%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    />
  );
};


/* ===================================================================
   FLOATING TECH TAGS — glass pills scattered in hero
   =================================================================== */

const FloatingTechTags = ({ layers, mouse }) => (
  <div className="absolute inset-0 z-[3] pointer-events-none hidden md:block" aria-hidden="true">
    {TECH_TAGS.map((tag, i) => {
      const layerStyle =
        tag.layer === 'back'
          ? { x: layers.back.x, y: layers.back.y, opacity: 0.45 }
          : tag.layer === 'mid'
          ? { x: layers.mid.x, y: layers.mid.y, opacity: 0.6 }
          : { x: layers.front.x, y: layers.front.y, opacity: 0.75 };

      const fontSize = tag.layer === 'front' ? 'text-sm' : 'text-xs';

      return (
        <motion.div
          key={tag.label}
          className={`absolute backdrop-blur-sm bg-sage-mist/20 border border-sage/40 rounded-full px-3 py-1 font-mono font-medium ${fontSize} text-espresso/70`}
          style={{
            left: `${tag.x}%`,
            top: `${tag.y}%`,
            ...layerStyle,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: layerStyle.opacity,
            scale: 1,
            y: [0, -8, 0],
          }}
          transition={{
            opacity: { duration: 0.4, delay: 2.3 + tag.delay * 0.15 },
            scale: { duration: 0.5, delay: 2.3 + tag.delay * 0.15, ease: [0.34, 1.56, 0.64, 1] },
            y: { duration: tag.period, repeat: Infinity, ease: 'easeInOut', delay: 2.5 + tag.delay },
          }}
          whileHover={{ opacity: 0.5, scale: 1.03 }}
        >
          {tag.label}
        </motion.div>
      );
    })}
  </div>
);


/* ===================================================================
   SHIMMER LINE — accent line with sweep highlight
   =================================================================== */

const ShimmerLine = () => (
  <div className="relative overflow-hidden" style={{ width: '40%' }}>
    <motion.div
      className="h-px bg-sage origin-left"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.6, delay: 1.4, ease: [0.215, 0.61, 0.355, 1] }}
    />
    <motion.div
      className="absolute inset-0 h-px"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(168,187,164,0.6) 50%, transparent 100%)',
      }}
      initial={{ x: '-100%' }}
      animate={{ x: '400%' }}
      transition={{ duration: 0.8, delay: 1.8, ease: 'easeInOut' }}
    />
  </div>
);


/* ===================================================================
   HEADSHOT MONUMENT — 7-layer cinematic headshot with magnetic tilt
   =================================================================== */

const HeadshotMonument = ({ layers, mouse }) => {
  const monumentRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, active: false });

  useEffect(() => {
    if (!monumentRef.current) return;
    const rect = monumentRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = mouse.rawX - cx;
    const dy = mouse.rawY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 300 && dist > 0) {
      const factor = (300 - dist) / 300;
      const ry = (dx / 300) * 3 * factor;
      const rx = -(dy / 300) * 3 * factor;
      setTilt({ rx, ry, active: true });
    } else {
      setTilt({ rx: 0, ry: 0, active: false });
    }
  }, [mouse.rawX, mouse.rawY]);

  const tiltSpringRx = useSpring(useMotionValue(0), { stiffness: 200, damping: 30 });
  const tiltSpringRy = useSpring(useMotionValue(0), { stiffness: 200, damping: 30 });

  useEffect(() => {
    tiltSpringRx.set(tilt.rx);
    tiltSpringRy.set(tilt.ry);
  }, [tilt.rx, tilt.ry, tiltSpringRx, tiltSpringRy]);

  /* Inverse tilt for badges (counter-rotate slightly) */
  const badgeTiltRx = useTransform(tiltSpringRx, v => -v * 0.3);
  const badgeTiltRy = useTransform(tiltSpringRy, v => -v * 0.3);

  return (
    <div
      ref={monumentRef}
      className="hidden md:block absolute right-8 lg:right-20 xl:right-32 top-1/2 -translate-y-1/2 z-[4]"
    >
      <motion.div
        className="relative w-[340px] lg:w-[400px] xl:w-[440px] h-[480px] lg:h-[560px] xl:h-[620px]"
        style={{
          perspective: 800,
          rotateX: tiltSpringRx,
          rotateY: tiltSpringRy,
        }}
      >
        {/* z-0: Dot grid */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 425 425"
          fill="none"
          style={{ x: layers.headshotDots.x, y: layers.headshotDots.y }}
        >
          {headshotDots.map((dot, i) => (
            <motion.circle
              key={`hdot-${i}`}
              cx={dot.cx}
              cy={dot.cy}
              r="1.5"
              fill="#E8F0E6"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.15, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.1 + i * 0.01,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            />
          ))}
        </motion.svg>

        {/* z-1: Outer aura */}
        <motion.div
          className="absolute rounded-3xl"
          style={{
            inset: -60,
            background: 'radial-gradient(ellipse at center, #E8F0E6 0%, transparent 70%)',
            x: layers.headshotAuraOuter.x,
            y: layers.headshotAuraOuter.y,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            delay: 0.3,
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* z-2: Inner aura (straw tones, offset up) */}
        <motion.div
          className="absolute rounded-3xl"
          style={{
            inset: -30,
            top: -60,
            background: 'radial-gradient(ellipse at center top, #E8DFD4 0%, transparent 65%)',
            x: layers.headshotAuraInner.x,
            y: layers.headshotAuraInner.y,
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: [0.1, 0.22, 0.1],
            scale: [0.97, 1.03, 0.97],
          }}
          transition={{
            delay: 3.3,
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* z-3: Geometric frame (SVG rect, pathLength draw) */}
        <motion.div
          className="absolute"
          style={{
            inset: -8,
            x: layers.headshotFrame.x,
            y: layers.headshotFrame.y,
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 496 736" fill="none" preserveAspectRatio="none">
            <motion.rect
              x="1"
              y="1"
              width="494"
              height="734"
              rx="24"
              stroke="#6B7F68"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{
                pathLength: { duration: 1.2, delay: 0.6, ease: [0.215, 0.61, 0.355, 1] },
                opacity: { duration: 0.3, delay: 0.6 },
              }}
            />
          </svg>
          {/* Corner L-brackets */}
          {[
            { top: -4, left: -4, rotate: 0 },
            { top: -4, right: -4, rotate: 90 },
            { bottom: -4, right: -4, rotate: 180 },
            { bottom: -4, left: -4, rotate: 270 },
          ].map((pos, i) => (
            <motion.div
              key={`bracket-${i}`}
              className="absolute"
              style={{
                ...pos,
                width: 16,
                height: 16,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 1.0 + i * 0.06,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: `rotate(${pos.rotate}deg)` }}>
                <path d="M0 12 L0 0 L12 0" stroke="#6B7F68" strokeWidth="1.5" fill="none" />
              </svg>
            </motion.div>
          ))}
          {/* Breathing border */}
          <motion.div
            className="absolute inset-0 rounded-3xl border border-sage-dark/20"
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          />
        </motion.div>

        {/* z-4: Main container (clipPath reveal) */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-cream overflow-hidden flex items-center justify-center"
          style={{
            x: layers.headshot.x,
            y: layers.headshot.y,
          }}
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{
            duration: 0.9,
            delay: 0.6,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
          <motion.span
            className="font-heading text-[72px] font-bold select-none"
            style={{ color: '#E8DFD4', opacity: 0.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            JP
          </motion.span>
        </motion.div>

        {/* z-5: Grain overlay */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: GRAIN_SVG }}
        />

        {/* z-6: Status badges with inverse tilt */}
        <motion.div
          className="absolute -top-2 -right-6 bg-sage-mist/80 backdrop-blur-sm rounded-full px-4 py-1.5 font-mono text-xs text-sage-dark"
          style={{
            x: layers.headshotBadge.x,
            y: layers.headshotBadge.y,
            rotateX: badgeTiltRx,
            rotateY: badgeTiltRy,
          }}
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 2.0,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          CS &amp; Engineering
        </motion.div>
        <motion.div
          className="absolute -bottom-2 -left-4 bg-straw/80 backdrop-blur-sm rounded-full px-4 py-1.5 font-mono text-xs text-warm-dark"
          style={{
            x: layers.headshotBadge.x,
            y: layers.headshotBadge.y,
            rotateX: badgeTiltRx,
            rotateY: badgeTiltRy,
          }}
          initial={{ opacity: 0, scale: 0.5, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 2.0,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          Louisville, KY
        </motion.div>
      </motion.div>
    </div>
  );
};


/* ===================================================================
   HERO — main orchestrator
   =================================================================== */

const Hero = () => {
  const containerRef = useRef(null);
  const mouse = useMousePosition(containerRef);
  const layers = useSpringParallax(mouse);
  const mouseRef = useRef({ x: 0, y: 0 });

  /* Keep mouseRef in sync with raw mouse coords for canvas loop */
  useEffect(() => {
    mouseRef.current = { x: mouse.rawX, y: mouse.rawY };
  }, [mouse.rawX, mouse.rawY]);

  const links = [
    { label: 'GitHub', href: 'https://github.com/justinp42' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/justinpham5/' },
    { label: 'Email', href: 'mailto:jhpham05@gmail.com' },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="h-screen bg-warm-linen relative overflow-hidden"
    >
      {/* z-0: Canvas particle constellation */}
      <ParticleCanvas mouseRef={mouseRef} />

      {/* z-1: Grain overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: GRAIN_SVG }}
      />

      {/* z-2: Cursor spotlight */}
      <CursorSpotlight mouse={mouse} />

      {/* z-3: Floating tech tags */}
      <FloatingTechTags layers={layers} mouse={mouse} />

      {/* z-4: Headshot monument */}
      <HeadshotMonument layers={layers} mouse={mouse} />

      {/* z-5: Text content — bottom area */}
      <div className="min-h-screen flex items-end pb-32 relative z-[5]">
        <div className="container-custom w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            {/* Name with character scramble */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-espresso leading-[0.9] mb-4">
              <CharacterScramble
                text="Justin Pham"
                className="font-heading"
                startDelay={1200}
              />
            </h1>

            {/* Shimmer accent line */}
            <div className="mb-6">
              <ShimmerLine />
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="font-serif italic text-xl md:text-2xl text-warm-dark mb-10 max-w-xl"
            >
              Building tools that think, parse, and scale.
            </motion.p>

            {/* Currently building */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.0 }}
              className="font-mono text-sm text-clay mb-8"
            >
              currently building <span className="text-sage">Mnemo</span>
              <span className="cursor-blink ml-0.5">|</span>
            </motion.p>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.5 }}
              className="flex items-center gap-2 font-mono text-sm"
            >
              {links.map((link, i) => (
                <React.Fragment key={link.label}>
                  {i > 0 && <span className="text-straw mx-1">/</span>}
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="text-warm-dark underline-grow transition-all hover:text-sage hover:bg-sage-mist/30 rounded-sm px-1"
                  >
                    {link.label}
                  </a>
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* z-6: Scroll indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-[6]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 3.0 }}
      >
        <span className="font-mono text-xs text-clay tracking-widest">scroll</span>
        <motion.svg
          width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-clay"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>

      {/* z-6: Wave separator */}
      <div className="absolute bottom-0 left-0 w-full leading-[0] z-[6]">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-20 lg:h-24 block"
          fill="#FFF9F2"
        >
          <path d="M0,30 C240,55 480,10 720,35 C960,60 1200,15 1440,30 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
