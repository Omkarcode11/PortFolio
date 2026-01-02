import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '../hooks/useTheme';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  name: string;
  path: string;
}

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  const navLinks: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Articles', path: '/articles' },
  ];

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] backdrop-blur-2xl transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--nav-blur)] border-b border-[var(--border-color)]'
          : theme === 'dark'
          ? 'bg-dark-900/70 border-b border-primary-500/10'
          : 'bg-white/70 border-b border-primary-500/10'
      }`}
      style={{
        boxShadow: scrolled ? 'var(--shadow-lg)' : 'none',
      }}
    >
      <div className="container flex items-center justify-between h-[var(--nav-height)] px-6 lg:px-8 max-w-[1400px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter z-[1001] text-[var(--text-primary)] hover:text-primary-500 transition-colors group font-heading"
        >
          <span className="relative">
            Portfolio
            <span className="text-primary-500">.</span>
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-primary-500"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`relative px-4 py-2 text-sm lg:text-base font-semibold rounded-lg transition-all duration-300 ${
                router.pathname === link.path
                  ? 'text-primary-500 bg-primary-500/10'
                  : 'text-[var(--text-secondary)] hover:text-primary-500 hover:bg-[var(--bg-secondary)]'
              }`}
            >
              {link.name}
              {router.pathname === link.path && (
                <motion.span
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 w-11 h-11 rounded-xl border-2 border-[var(--border-color)] flex items-center justify-center text-xl cursor-pointer transition-all duration-300 hover:border-primary-500 hover:bg-primary-500/10 hover:scale-105 text-[var(--text-primary)]"
            aria-label="Toggle Dark Mode"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <motion.span
              key={theme}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </motion.span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl z-[1001] p-2.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-primary)]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? '✕' : '☰'}
          </motion.span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden fixed top-[72px] left-0 right-0 z-[999] bg-[var(--bg-card)] border-t border-[var(--border-color)] overflow-hidden backdrop-blur-2xl"
            style={{ boxShadow: 'var(--shadow-xl)' }}
          >
            <div className="flex flex-col p-6 gap-2 max-h-[calc(100vh-72px)] overflow-y-auto">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between font-bold text-lg py-4 px-5 rounded-xl transition-all duration-300 ${
                      router.pathname === link.path
                        ? 'text-primary-500 bg-primary-500/15 shadow-md'
                        : 'text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] active:scale-95'
                    }`}
                  >
                    <span>{link.name}</span>
                    {router.pathname === link.path && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* Theme Toggle - Mobile */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                onClick={() => {
                  toggleTheme();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-3 py-4 px-5 mt-3 rounded-xl border-2 border-[var(--border-color)] font-bold text-base transition-all duration-300 hover:bg-[var(--bg-tertiary)] hover:border-primary-500 active:scale-95 text-[var(--text-primary)]"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <span className="text-2xl">{theme === 'light' ? '🌙' : '☀️'}</span>
                <span>{theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
