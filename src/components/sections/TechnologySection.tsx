import React from "react";

interface TechGroup {
  category: string;
  badge: string;
  color: string;
  items: string[];
}

const techGroups: TechGroup[] = [
  {
    category: "AI & Intelligent Systems",
    badge: "Specialization",
    color: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
    items: ["LLM APIs", "AI Agents", "RAG", "Vector Search", "AI Integrations"],
  },
  {
    category: "Shopify & Platforms",
    badge: "Specialization",
    color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    items: ["Shopify", "Theme App Extensions", "Storefront API", "Vercel", "AWS", "Docker", "Git"],
  },
  {
    category: "Backend & Systems",
    badge: "Core Architecture",
    color: "border-blue-500/30 text-blue-400 bg-blue-500/10",
    items: ["Node.js", "Express.js", "REST APIs", "WebSockets", "System Design", "Background Queues"],
  },
  {
    category: "Databases & Caching",
    badge: "Data Layer",
    color: "border-violet-500/30 text-violet-400 bg-violet-500/10",
    items: ["PostgreSQL", "MongoDB", "Redis", "MySQL"],
  },
  {
    category: "Frontend & Interfaces",
    badge: "UI Engineering",
    color: "border-fuchsia-500/30 text-fuchsia-400 bg-fuchsia-500/10",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5 / CSS3"],
  },
];

export default function TechnologySection() {
  return (
    <section id="technology" className="section bg-(--bg-secondary)/30 border-y border-(--border-color) relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-wider mb-4">
            <span>Modern Stack</span>
          </div>
          <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Technology
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
            Curated, production-tested tools and frameworks prioritized for performance, rapid iteration, and business reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {techGroups.map((group, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-(--bg-card) border border-(--border-color) hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <h3 className="text-xl font-bold text-(--text-primary)">
                    {group.category}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${group.color}`}>
                    {group.badge}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 rounded-xl bg-(--bg-secondary) text-xs sm:text-sm font-semibold text-(--text-primary) border border-(--border-color) hover:border-brand-blue/30 hover:text-brand-blue transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-(--border-color)/50">
                <span className="text-xs text-(--text-tertiary)">
                  Production deployment ready
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
