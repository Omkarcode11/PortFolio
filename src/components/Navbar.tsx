import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '../hooks/useTheme';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

interface NavLink {
  name: string;
  path: string;
  section?: string; // For scroll-based highlighting
}

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const navRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to navbar background opacity
  const navbarBgOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 0.95]);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detect active section based on scroll position
      if (router.pathname === '/') {
        const sections = ['hero', 'projects', 'thinking', 'tech', 'impact', 'writing'];
        const scrollPosition = window.scrollY + 150;
        
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i]);
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [router.pathname]);

  useEffect(() => {
    setIsOpen(false);
    setActiveSection('');
  }, [router.pathname]);

  const navLinks: NavLink[] = [
    { name: 'Home', path: '/', section: 'hero' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Articles', path: '/articles' },
  ];

  const handleResumeDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Google Drive direct download link
    const resumeUrl = 'https://drive.google.com/uc?export=download&id=1XZDKxASreLIoy2nrLmduwrhmB4pxDLdy';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Omkar_Sonawane_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!mounted) return null;

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl bg-[var(--nav-blur)]/95 border-b border-[var(--border-color)]/50'
          : 'backdrop-blur-md bg-[var(--nav-blur)]/80 border-b border-transparent'
      }`}
      style={{
        boxShadow: scrolled 
          ? '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)' 
          : 'none',
      }}
    >
      <div className="container flex items-center justify-between h-[var(--nav-height)] px-6 lg:px-8 max-w-[1400px] mx-auto">
        {/* Logo - Engineering Brand */}
        <Link
          href="/"
          className="relative z-[1001] group"
          aria-label="Home"
        >
          <div className="flex items-center gap-2.5">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span className="text-2xl font-black tracking-tight text-[var(--text-primary)] font-heading">
                Omkar's Portfolio
              </span>
              <motion.span
                className="absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </motion.div>
            {/* System Status Indicator */}
            <motion.div
              className="relative w-2 h-2 rounded-full bg-brand-blue"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span className="absolute inset-0 rounded-full bg-brand-blue/40 animate-ping" />
            </motion.div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = router.pathname === link.path || 
              (router.pathname === '/' && link.section && activeSection === link.section);
            
            return (
              <Link
                key={link.path}
                href={link.path}
                className="relative group"
              >
                <motion.div
                  className={`relative px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-300 ${
                    isActive
                      ? 'text-brand-blue'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                  whileHover={{ y: -1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <span className="relative z-10">{link.name}</span>
                  
                  {/* Active Indicator - Load Balancer Style */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded-lg bg-brand-blue/10 border border-brand-blue/20"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover Background */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-[var(--bg-secondary)] opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.2 }}
                  />
                  
                  {/* Request Flow Underline Animation */}
                  {!isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet"
                      initial={{ width: 0, x: '0%' }}
                      whileHover={{ width: '100%', x: '0%' }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
          
          {/* Divider */}
          <div className="w-px h-6 bg-[var(--border-color)] mx-3" />
          
          {/* CTA Button - Download Resume */}
          <a
            href="https://drive.google.com/uc?export=download&id=1XZDKxASreLIoy2nrLmduwrhmB4pxDLdy"
            onClick={handleResumeDownload}
            className="relative group"
            download="Omkar_Sonawane_Resume.pdf"
          >
            <motion.div
              className="relative px-4 py-2.5 text-sm font-semibold text-brand-blue rounded-lg border border-brand-blue/30 bg-brand-blue/10 hover:bg-brand-blue/20 hover:border-brand-blue/50 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Resume</span>
            </motion.div>
          </a>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="ml-2 w-9 h-9 rounded-lg border border-[var(--border-color)] flex items-center justify-center text-base cursor-pointer transition-all duration-300 hover:border-brand-blue/50 hover:bg-brand-blue/5 text-[var(--text-primary)]"
            aria-label="Toggle Dark Mode"
            whileHover={{ scale: 1.05, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              key={theme}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </motion.span>
          </motion.button>
        </div>

        {/* Mobile/Tablet Toggle */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Mobile CTA */}
          <a
            href="https://drive.google.com/uc?export=download&id=1XZDKxASreLIoy2nrLmduwrhmB4pxDLdy"
            onClick={handleResumeDownload}
            className="px-3 py-1.5 text-xs font-semibold text-brand-blue rounded-lg border border-brand-blue/30 bg-brand-blue/5"
            download="Omkar_Sonawane_Resume.pdf"
          >
            Resume
          </a>
          
          <button
            className="relative z-[1001] p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-primary)]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            <motion.div
              className="flex flex-col gap-1.5 w-5"
              animate={isOpen ? 'open' : 'closed'}
            >
              <motion.span
                className="h-0.5 w-full bg-current rounded-full"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="h-0.5 w-full bg-current rounded-full"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="h-0.5 w-full bg-current rounded-full"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 },
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Progress Bar - Page Traversal Indicator (like request latency) */}
      {scrolled && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet origin-left"
          style={{
            scaleX: scrollYProgress,
          }}
        />
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[998] lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="lg:hidden fixed top-[72px] left-0 right-0 z-[999] bg-[var(--bg-card)]/95 backdrop-blur-xl border-b border-[var(--border-color)] shadow-2xl"
            >
              <div className="flex flex-col p-4 gap-1 max-h-[calc(100vh-72px)] overflow-y-auto">
                {navLinks.map((link, index) => {
                  const isActive = router.pathname === link.path;
                  
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`relative flex items-center justify-between font-semibold text-base py-3.5 px-4 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'text-brand-blue bg-brand-blue/10 border border-brand-blue/20'
                            : 'text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] active:scale-[0.98]'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {isActive && (
                            <motion.div
                              layoutId="mobileActiveIndicator"
                              className="w-1.5 h-1.5 rounded-full bg-brand-blue"
                              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                          )}
                          <span>{link.name}</span>
                        </span>
                        {isActive && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile Resume CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                  className="pt-2 mt-2 border-t border-[var(--border-color)]"
                >
                  <a
                    href="https://drive.google.com/uc?export=download&id=1XZDKxASreLIoy2nrLmduwrhmB4pxDLdy"
                    onClick={(e) => {
                      handleResumeDownload(e);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-brand-blue/10 border border-brand-blue/30 text-brand-blue font-semibold text-base transition-all duration-300 hover:bg-brand-blue/20 active:scale-[0.98]"
                    download="Omkar_Sonawane_Resume.pdf"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                  </a>
                </motion.div>

                {/* Theme Toggle - Mobile */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.05, duration: 0.3 }}
                  onClick={() => {
                    toggleTheme();
                  }}
                  className="flex items-center justify-center gap-3 py-3.5 px-4 mt-2 rounded-xl border border-[var(--border-color)] font-semibold text-base transition-all duration-300 hover:bg-[var(--bg-secondary)] hover:border-brand-blue/50 active:scale-[0.98] text-[var(--text-primary)]"
                >
                  <span className="text-xl">{theme === 'light' ? '🌙' : '☀️'}</span>
                  <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
