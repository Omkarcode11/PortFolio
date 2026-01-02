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
      className={`fixed top-0 left-0 right-0 z-[1000] backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--nav-blur)] border-b border-[var(--border-color)] shadow-lg'
          : theme === 'dark'
          ? 'bg-dark-900/80 border-b border-primary-500/10'
          : 'bg-white/80 border-b border-primary-500/10'
      }`}
    >
      <div className="container flex items-center justify-between h-16 px-6 max-w-[1400px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg md:text-xl font-extrabold tracking-tight z-[1001] text-[var(--text-primary)]"
        >
          Portfolio<span className="text-primary-500">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm font-medium transition-colors duration-200 ${
                router.pathname === link.path
                  ? 'text-primary-500 font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-primary-500'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center text-lg cursor-pointer transition-all duration-200 hover:border-primary-500 text-[var(--text-primary)]"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl z-[1001] p-2 text-[var(--text-primary)]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? '✕' : '☰'}
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
            className="md:hidden fixed top-16 left-0 right-0 z-[999] bg-[var(--bg-secondary)] border-t border-[var(--border-color)] overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-semibold text-lg py-3 px-4 rounded-lg transition-all duration-200 ${
                    router.pathname === link.path
                      ? 'text-primary-500 bg-primary-500/10'
                      : 'text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Theme Toggle - Mobile */}
              <button
                onClick={() => {
                  toggleTheme();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-3 py-3 px-4 mt-2 rounded-lg border border-[var(--border-color)] font-semibold transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:border-primary-500 text-[var(--text-primary)]"
              >
                <span className="text-xl">{theme === 'light' ? '🌙' : '☀️'}</span>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
