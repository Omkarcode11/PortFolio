import React from "react";
import Link from "next/link";

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string;
  badge: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
}

const professionalExperiences: ExperienceItem[] = [
  {
    role: "Software Engineer",
    company: "Ripples",
    duration: "Dec 2024 – Present",
    badge: "Professional Experience",
    description:
      "Built and scaled high-performance reward and loyalty backend services using Node.js and Redis. Engineered an asynchronous instant reward pipeline, secure UGC ingestion with Meta APIs, and optimized Shopify theme app performance.",
    highlights: [
      "Re-architected Shopify theme app, reducing merchant storefront load time from 3.2s to <1s.",
      "Developed asynchronous instant reward pipeline reducing latency by 60%.",
      "Improved analytics reporting query performance by 40% using Redis caching and aggregation indexing.",
      "Implemented secure UGC ingestion microservice with Meta APIs and webhook verification.",
    ],
    metrics: [
      { value: "<1s", label: "Storefront Load Time (from 3.2s)" },
      { value: "60%", label: "Reward Latency Reduction" },
      { value: "40%", label: "Reporting Speedup" },
    ],
  },
  {
    role: "Project Engineer",
    company: "Crio.do",
    duration: "Jul 2023 – Nov 2024",
    badge: "Professional Experience",
    description:
      "Designed and optimized backend data pipelines, automated web workflows, and built administrative consoles. Implemented fault-tolerant scraping systems capable of processing 20,000+ listings with retry policies.",
    highlights: [
      "Designed and optimized backend data pipelines, reducing processing time by 85% (from 60m to 9m).",
      "Built fault-tolerant automation system using Puppeteer to scrape and validate 20,000+ job listings.",
      "Developed full-stack job lifecycle platform and role-based administrative consoles.",
      "Engineered automatic CAPTCHA handling, rotating request proxies, and failure recovery queues.",
    ],
    metrics: [
      { value: "85%", label: "Pipeline Time Saved (60m → 9m)" },
      { value: "20K+", label: "Automated Records Handled" },
      { value: "99.9%", label: "Ingestion Reliability" },
    ],
  },
];

export default function ShopifyAndExperience() {
  return (
    <section id="experience" className="section bg-(--bg-secondary)/30 border-y border-(--border-color) relative overflow-hidden">
      <div className="container relative z-10">
        {/* Shopify Development Feature Banner */}
        <div className="mb-20 p-8 sm:p-10 lg:p-12 rounded-3xl bg-linear-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/30 backdrop-blur-md relative overflow-hidden">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-4">
              <span>Dedicated Expertise</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-(--text-primary) tracking-tight mb-4">
              Shopify Development
            </h2>
            <p className="text-base sm:text-lg text-(--text-secondary) leading-relaxed mb-8">
              Professional experience building Shopify-based functionality, custom extensions and integrations as part of production software development.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-emerald-500/20">
              <div className="p-4 rounded-2xl bg-(--bg-card)/70 border border-(--border-color)">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mb-1">
                  &lt;1s
                </div>
                <div className="text-xs sm:text-sm font-semibold text-(--text-primary)">
                  Sub-Second Storefront
                </div>
                <p className="text-xs text-(--text-secondary) mt-1">
                  Reduced theme app load time from 3.2s
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-(--bg-card)/70 border border-(--border-color)">
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 mb-1">
                  Theme Extensions
                </div>
                <div className="text-xs sm:text-sm font-semibold text-(--text-primary)">
                  App Blocks &amp; Embeds
                </div>
                <p className="text-xs text-(--text-secondary) mt-1">
                  Zero layout shift, modern Shopify 2.0
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-(--bg-card)/70 border border-(--border-color)">
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-blue mb-1">
                  Custom APIs
                </div>
                <div className="text-xs sm:text-sm font-semibold text-(--text-primary)">
                  Integrations &amp; Webhooks
                </div>
                <p className="text-xs text-(--text-secondary) mt-1">
                  Idempotent webhook pipelines
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Experience Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-wider mb-4">
              <span>Track Record</span>
            </div>
            <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Professional Experience
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-(--text-secondary) leading-relaxed">
              Production engineering involving Node.js, React, TypeScript, Shopify, APIs, Redis, databases, dashboards, and automated performance optimization.
            </p>
          </div>

          <div className="space-y-12">
            {professionalExperiences.map((exp, index) => (
              <div
                key={index}
                className="p-8 sm:p-10 rounded-3xl bg-(--bg-card) border border-(--border-color) hover:border-brand-blue/40 shadow-sm hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-2xl font-bold text-(--text-primary)">
                        {exp.role}
                      </h3>
                      <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
                        {exp.badge}
                      </span>
                    </div>
                    <p className="text-base font-semibold text-brand-blue mt-1">
                      {exp.company}
                    </p>
                  </div>
                  <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-(--bg-secondary) text-(--text-secondary) border border-(--border-color) self-start sm:self-auto">
                    {exp.duration}
                  </span>
                </div>

                <p className="text-(--text-secondary) leading-relaxed mb-6 text-base">
                  {exp.description}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-2.5 mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-(--text-tertiary) mb-2">
                    Key Achievements
                  </h4>
                  {exp.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-3 text-sm text-(--text-secondary)">
                      <span className="text-brand-blue font-bold mt-0.5">✓</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Verified Metric Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-(--border-color)">
                  {exp.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-4 rounded-2xl bg-(--bg-secondary)/50 border border-(--border-color)/80 text-center"
                    >
                      <div className="text-2xl font-extrabold text-brand-blue mb-1">
                        {m.value}
                      </div>
                      <div className="text-xs text-(--text-secondary) font-medium">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
