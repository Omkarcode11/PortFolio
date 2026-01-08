'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />, href: 'https://github.com/Omkarcode11', label: 'GitHub' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com/in/omkardev', label: 'LinkedIn' },
    { icon: <FaEnvelope />, href: 'mailto:omkarsonawaneomkar2@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] relative z-10 mt-20">
      <div className="container py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block group">
              <span className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] group-hover:text-primary-500 transition-colors">
               Omkar's Portfolio<span className="text-primary-500">.</span>
              </span>
            </Link>
            <p className="text-sm md:text-base text-[var(--text-secondary)] mt-4 max-w-xs leading-relaxed">
              Crafting exceptional digital experiences with modern technologies and innovative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-left">
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Projects', path: '/projects' },
                { name: 'Articles', path: '/articles' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-sm md:text-base text-[var(--text-secondary)] hover:text-primary-500 transition-colors inline-block hover:translate-x-1 duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="text-center lg:text-left">
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
              Let's Connect
            </h3>
            <div className="flex items-center justify-center lg:justify-start gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 rounded-xl border-2 border-[var(--border-color)] flex items-center justify-center text-xl text-[var(--text-secondary)] transition-all duration-300 hover:border-primary-500 hover:text-primary-500 hover:-translate-y-1 hover:shadow-lg"
                  aria-label={link.label}
                  style={{ boxShadow: 'var(--shadow-sm)' }}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </span>
                </a>
              ))}
            </div>
            <p className="text-sm text-[var(--text-secondary)] mt-6">
              <a 
                href="mailto:omkarsonawaneomkar2@gmail.com" 
                className="hover:text-primary-500 transition-colors font-medium"
              >
                omkarsonawaneomkar2@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-color)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-sm text-[var(--text-secondary)]">
              © {currentYear} <span className="font-semibold text-[var(--text-primary)]">Omkar Sonawane</span>. All rights reserved.
            </p>
            <p className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
              Built with 
              <span className="text-red-500 animate-pulse">❤️</span>
              and 
              <span className="font-semibold text-primary-500">Next.js</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
