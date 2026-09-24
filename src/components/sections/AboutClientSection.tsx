import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../icons";

export default function AboutClientSection() {
  return (
    <section id="about" className="section bg-(--bg-primary) relative overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto p-8 sm:p-12 lg:p-16 rounded-3xl bg-(--bg-card) border border-(--border-color) shadow-xl shadow-slate-900/5">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-14 items-center">
            {/* Profile Avatar / Photo */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-(--bg-secondary) shadow-2xl mb-6">
                <Image
                  src="/695d03a731783_download.jpg"
                  alt="Omkar Sonawane - AI & Full-Stack Developer"
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-xl font-extrabold text-(--text-primary)">
                Omkar Sonawane
              </h3>
              <p className="text-sm font-semibold text-brand-blue mt-1">
                AI &amp; Full-Stack Developer
              </p>
              <p className="text-xs text-(--text-tertiary) mt-0.5">
                Bengaluru, Karnataka, India
              </p>

              {/* Social Channels */}
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="https://github.com/Omkarcode11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-(--bg-secondary) text-(--text-secondary) hover:text-brand-blue hover:bg-brand-blue/10 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GitHubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/omkardev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-(--bg-secondary) text-(--text-secondary) hover:text-[#0077b5] hover:bg-blue-500/10 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
                <a
                  href="mailto:omkarsonawaneomkar2@gmail.com"
                  className="p-2.5 rounded-full bg-(--bg-secondary) text-(--text-secondary) hover:text-brand-blue hover:bg-brand-blue/10 transition-colors"
                  aria-label="Send Email"
                >
                  <MailIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Concise Bio Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-wider">
                <span>About Me</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-(--text-primary) tracking-tight">
                Turning Complex Workflows Into Production-Ready Software
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-(--text-secondary) leading-relaxed">
                <p>
                  I'm a full-stack software engineer focused on AI integrations, Shopify development, backend systems and business automation.
                </p>
                <p>
                  I've worked on production applications involving APIs, databases, dashboards, Shopify functionality, automation and performance optimization.
                </p>
                <p>
                  I enjoy taking complex business requirements and turning them into reliable, maintainable software.
                </p>
              </div>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-(--border-color)">
                <div className="p-3.5 rounded-2xl bg-(--bg-secondary)/70 text-center">
                  <div className="text-xl sm:text-2xl font-black text-brand-blue">
                    2+ Years
                  </div>
                  <div className="text-xs text-(--text-secondary) mt-0.5">
                    Production Systems
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-(--bg-secondary)/70 text-center">
                  <div className="text-xl sm:text-2xl font-black text-brand-cyan">
                    750+
                  </div>
                  <div className="text-xs text-(--text-secondary) mt-0.5">
                    LeetCode Solved
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-(--bg-secondary)/70 text-center col-span-2 sm:col-span-1">
                  <div className="text-xl sm:text-2xl font-black text-brand-violet">
                    100%
                  </div>
                  <div className="text-xs text-(--text-secondary) mt-0.5">
                    Direct Ownership
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-violet transition-colors group"
                >
                  <span>Read full technical background &amp; engineering journey</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
