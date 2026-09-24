import React from "react";
import Link from "next/link";

interface BuildCard {
  title: string;
  description: string;
  technologies: string;
  icon: string;
  badge: string;
  color: string;
}

const buildCards: BuildCard[] = [
  {
    title: "AI Applications",
    description:
      "AI-powered products, AI agents, LLM integrations, RAG systems, intelligent search and workflow automation.",
    technologies: "LLMs • AI APIs • RAG • Agents",
    icon: "🤖",
    badge: "Intelligent Systems",
    color: "from-cyan-500/20 to-blue-500/10",
  },
  {
    title: "Shopify Solutions",
    description:
      "Custom Shopify functionality, extensions, integrations, merchant tools and automation.",
    technologies: "Shopify • APIs • Extensions • Node.js",
    icon: "🛍️",
    badge: "Commerce Engineering",
    color: "from-emerald-500/20 to-teal-500/10",
  },
  {
    title: "Backend Systems",
    description:
      "Production-ready APIs, dashboards, real-time systems, databases, background jobs and scalable backend services.",
    technologies: "Node.js • TypeScript • PostgreSQL • Redis",
    icon: "⚙️",
    badge: "High Performance",
    color: "from-blue-500/20 to-violet-500/10",
  },
  {
    title: "Business Automation",
    description:
      "Automate repetitive workflows using APIs, WhatsApp, webhooks, background jobs and intelligent systems.",
    technologies: "APIs • Webhooks • WhatsApp • Automation",
    icon: "⚡",
    badge: "Workflow Optimization",
    color: "from-violet-500/20 to-fuchsia-500/10",
  },
];

export default function WhatIBuild() {
  return (
    <section id="services" className="section bg-(--bg-primary) relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-4">
            <span>Capabilities &amp; Specialization</span>
          </div>
          <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            What I Build
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
            From AI-powered products to business automation, I build software around real business problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {buildCards.map((card, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-3xl bg-(--bg-secondary)/50 backdrop-blur-sm border border-(--border-color) hover:border-brand-blue/40 transition-all duration-300 hover:shadow-xl hover:shadow-brand-blue/5 flex flex-col justify-between"
            >
              {/* Subtle gradient hover highlight */}
              <div
                className={`absolute inset-0 rounded-3xl bg-linear-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-(--bg-primary) border border-(--border-color) flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <span>{card.icon}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-(--text-primary) mb-3 group-hover:text-brand-blue transition-colors duration-200">
                  {card.title}
                </h3>

                <p className="text-(--text-secondary) leading-relaxed text-sm sm:text-base mb-6">
                  {card.description}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-(--border-color)/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-(--text-tertiary)">
                    Technologies
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-brand-blue mt-1.5">
                  {card.technologies}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick CTA underneath */}
        <div className="text-center mt-12">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-violet transition-colors group"
          >
            <span>Have a specific project in mind? Let's discuss your requirements</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
