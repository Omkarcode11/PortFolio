'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />, href: 'https://github.com/omkarsonawane2004', label: 'GitHub' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com/in/omkar-sonawane', label: 'LinkedIn' },
    { icon: <FaEnvelope />, href: 'mailto:omkarsonawane232@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] relative z-10">
      <div className="container py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <Link href="/" className="text-xl font-bold text-[var(--text-primary)]">
              Portfolio<span className="text-primary-500">.</span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              © {currentYear} Omkar Sonawane. Built with ❤️
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center text-lg text-[var(--text-secondary)] transition-all duration-200 hover:border-primary-500 hover:text-primary-500 hover:-translate-y-0.5"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
