"use client";

import Link from "next/link";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-(--bg-secondary)/70 border-t border-(--border-color) py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-brand-cyan via-brand-blue to-brand-violet flex items-center justify-center text-white font-extrabold text-sm">
                OS
              </div>
              <h3 className="text-xl font-extrabold text-(--text-primary) tracking-tight">
                Omkar Sonawane
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-brand-blue">
              AI &amp; Full-Stack Developer
            </p>
            <p className="text-sm text-(--text-secondary) max-w-md leading-relaxed">
              Building AI-powered applications, Shopify solutions and business automation. Helping startups and businesses turn manual workflows into reliable, scalable software.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/Omkarcode11"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-(--bg-card) border border-(--border-color) text-(--text-secondary) hover:text-brand-blue hover:border-brand-blue/40 transition-colors"
                aria-label="GitHub Profile"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/omkardev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-(--bg-card) border border-(--border-color) text-(--text-secondary) hover:text-[#0077b5] hover:border-[#0077b5]/40 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:omkarsonawaneomkar2@gmail.com"
                className="p-2.5 rounded-full bg-(--bg-card) border border-(--border-color) text-(--text-secondary) hover:text-brand-blue hover:border-brand-blue/40 transition-colors"
                aria-label="Email Omkar"
              >
                <MailIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-(--text-tertiary) mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/#services"
                  className="text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                >
                  What I Build
                </Link>
              </li>
              <li>
                <Link
                  href="/#work"
                  className="text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                >
                  Featured Work
                </Link>
              </li>
              <li>
                <Link
                  href="/#experience"
                  className="text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                >
                  Shopify &amp; Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/#case-studies"
                  className="text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                >
                  All Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                >
                  About &amp; Journey
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Action */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-(--text-tertiary) mb-4">
              Let's Build
            </h4>
            <p className="text-xs text-(--text-secondary) leading-relaxed mb-4">
              Have an idea, manual process, or Shopify store needing optimization?
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue text-white text-xs font-bold shadow-sm hover:bg-brand-blue/90 transition-all"
            >
              <span>Start a Project</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-(--border-color) flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-(--text-tertiary)">
          <p>© {currentYear} Omkar Sonawane. All rights reserved.</p>
          <p>Full-Stack Development • AI Integrations • Shopify • Automation</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
