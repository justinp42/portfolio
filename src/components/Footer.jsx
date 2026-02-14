import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'GitHub', href: 'https://github.com/justinp42' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/justinpham5/' },
    { label: 'Email', href: 'mailto:jhpham05@gmail.com' },
  ];

  return (
    <>
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-sage text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:opacity-80 transition-opacity"
            aria-label="Back to top"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 12V4M4 7l4-4 4 4" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="bg-sage-mist py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-heading text-xl font-semibold text-espresso mb-4">
            Justin Pham
          </p>
          <div className="flex justify-center items-center gap-2 mb-6 font-mono text-sm">
            {links.map((link, i) => (
              <React.Fragment key={link.label}>
                {i > 0 && <span className="text-clay">·</span>}
                <a
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="text-warm-dark underline-grow hover:text-sage transition-colors"
                >
                  {link.label}
                </a>
              </React.Fragment>
            ))}
          </div>
          <p className="font-mono text-xs text-clay">
            © {currentYear} Justin Pham
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
