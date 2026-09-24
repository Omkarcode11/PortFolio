import React, { useState } from "react";
import Link from "next/link";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  challenge: string;
  solution: string;
  architecture: string[];
  implementation: string[];
  result: string;
  technologies: string[];
  metric: { value: string; label: string };
}

const caseStudiesData: CaseStudy[] = [
  {
    id: "shopify-perf",
    title: "Shopify Storefront Performance Overhaul",
    category: "Shopify & Performance Engineering",
    tagline: "Slashing merchant storefront load times by 70% to boost mobile conversions.",
    problem:
      "A merchant's customer-facing loyalty and rewards widget was suffering from a 3.2-second load delay, leading to checkout bounces and negative store reviews.",
    challenge:
      "Third-party apps often block the critical rendering path by injecting heavy monolithic scripts and un-cached assets, degrading Core Web Vitals across diverse client devices.",
    solution:
      "Re-architected the solution as a modern Shopify Theme App Extension with asynchronous asset loading, edge caching, and lightweight vanilla DOM manipulation.",
    architecture: [
      "Client Browser",
      "CDN Edge Cache",
      "Shopify Theme App Extension",
      "Lightweight Node.js Ingestion API",
    ],
    implementation: [
      "Removed bloated third-party client bundles in favor of lightweight vanilla JavaScript (<20KB).",
      "Configured CDN edge-caching headers and deferred script execution until after primary content render.",
      "Implemented Redis-backed server caching to serve personalized merchant configuration in under 15ms.",
    ],
    result:
      "Reduced merchant storefront load time from 3.2 seconds to under 1 second (<1s, 70% speedup) with zero cumulative layout shift (CLS).",
    technologies: ["Shopify", "Theme App Extensions", "JavaScript", "Redis", "Node.js", "CDN"],
    metric: { value: "3.2s → <1s", label: "70% Faster Page Render" },
  },
  {
    id: "data-pipeline",
    title: "High-Volume Data Scraping & Workflow Automation",
    category: "Business Automation & Data Engineering",
    tagline: "Automating 20,000+ data records with 85% processing time reduction.",
    problem:
      "Operations teams were spending hours manually pulling and validating scattered web listings, leading to human error, outdated catalogs, and operational bottlenecks.",
    challenge:
      "Target web sources dynamically altered DOM structures, enforced strict IP rate limits, and periodically presented CAPTCHA hurdles that crashed naive scrapers.",
    solution:
      "Engineered an automated data extraction pipeline using headless Puppeteer workers, Redis-backed job queues, automated proxy rotation, and retry policies.",
    architecture: [
      "Cron / Webhook Trigger",
      "Redis Bull Task Queue",
      "Puppeteer Headless Worker Pool",
      "Data Normalization & PostgreSQL",
    ],
    implementation: [
      "Built a fault-tolerant worker pool with exponential backoff and automatic session renewal.",
      "Structured an automated JSON validation layer to sanitize extracted records before database insertion.",
      "Decoupled scraping from database ingestion via distributed Redis queuing to handle burst loads safely.",
    ],
    result:
      "Reduced end-to-end processing time by 85% (from 60 minutes down to 9 minutes) while autonomously processing 20,000+ records with zero data corruption.",
    technologies: ["Node.js", "Puppeteer", "Redis", "PostgreSQL", "Automation", "Docker"],
    metric: { value: "85% Saved", label: "Processing Time (60m → 9m)" },
  },
  {
    id: "instant-reward",
    title: "Instant Reward Pipeline & Analytics Engine",
    category: "Backend Systems & Real-Time APIs",
    tagline: "Asynchronous loyalty processing reducing transaction latency by 60%.",
    problem:
      "Synchronous reward calculations and third-party webhook verification were choking database connection pools during peak user activity, triggering timeout errors.",
    challenge:
      "Financial and loyalty credit transactions cannot afford duplicate fulfillment or silent drops, requiring strict idempotency even under network instability.",
    solution:
      "Designed an asynchronous event-driven reward queue with idempotent transaction keys and Redis caching, coupled with an optimized reporting interface.",
    architecture: [
      "Meta / Partner Webhook",
      "Signature Verification Gateway",
      "Redis Event Queue",
      "Worker Engine & Transaction Ledger",
    ],
    implementation: [
      "Decoupled external API validation from user-facing responses using Redis queues.",
      "Implemented distributed locking to ensure idempotent execution and prevent double-crediting.",
      "Optimized database indices and aggregation queries to accelerate operational analytics reporting by 40%.",
    ],
    result:
      "Reduced reward processing latency by 60% and boosted analytics reporting speed by 40% under sustained peak traffic.",
    technologies: ["Node.js", "Redis", "PostgreSQL", "Meta APIs", "Webhooks", "System Design"],
    metric: { value: "60% Drop", label: "Reward Transaction Latency" },
  },
];

export default function CaseStudies() {
  const [activeTab, setActiveTab] = useState<string>(caseStudiesData[0].id);

  const selectedStudy = caseStudiesData.find((cs) => cs.id === activeTab) || caseStudiesData[0];

  return (
    <section id="case-studies" className="section bg-(--bg-primary) relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-4">
            <span>Engineering Deep Dives</span>
          </div>
          <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Case Studies
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
            Deep dives into business challenges, engineering solutions, and verified measurable business impact.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 max-w-4xl mx-auto">
          {caseStudiesData.map((study) => (
            <button
              key={study.id}
              onClick={() => setActiveTab(study.id)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer text-left ${
                activeTab === study.id
                  ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20 scale-[1.02]"
                  : "bg-(--bg-secondary) text-(--text-secondary) hover:text-(--text-primary) border border-(--border-color)"
              }`}
            >
              <span>{study.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Case Study Detail Card */}
        <div className="max-w-5xl mx-auto p-8 sm:p-12 rounded-3xl bg-(--bg-card) border border-(--border-color) shadow-xl shadow-slate-900/5 relative">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-(--border-color)">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan mb-2 block">
                {selectedStudy.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-(--text-primary)">
                {selectedStudy.title}
              </h3>
              <p className="text-sm sm:text-base text-brand-blue font-semibold mt-1">
                {selectedStudy.tagline}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-(--bg-secondary) border border-(--border-color) text-center shrink-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-cyan">
                {selectedStudy.metric.value}
              </div>
              <div className="text-xs font-semibold text-(--text-secondary) mt-0.5">
                {selectedStudy.metric.label}
              </div>
            </div>
          </div>

          {/* Grid of Problem, Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-(--border-color)">
            <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block mb-2">
                Problem
              </span>
              <p className="text-sm text-(--text-secondary) leading-relaxed">
                {selectedStudy.problem}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
                Challenge
              </span>
              <p className="text-sm text-(--text-secondary) leading-relaxed">
                {selectedStudy.challenge}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
                Solution
              </span>
              <p className="text-sm text-(--text-secondary) leading-relaxed">
                {selectedStudy.solution}
              </p>
            </div>
          </div>

          {/* Architecture & Implementation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 border-b border-(--border-color)">
            {/* Architecture Flow */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-(--text-primary) mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-cyan" />
                <span>Architecture Flow</span>
              </h4>
              <div className="space-y-2">
                {selectedStudy.architecture.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-(--bg-secondary)/80 border border-(--border-color) text-xs sm:text-sm font-medium text-(--text-primary)"
                  >
                    <span className="w-5 h-5 rounded-full bg-brand-blue/20 text-brand-blue font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Implementation Details */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-(--text-primary) mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-violet" />
                <span>Key Engineering Decisions</span>
              </h4>
              <ul className="space-y-3">
                {selectedStudy.implementation.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-(--text-secondary)">
                    <span className="text-brand-violet font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Result & Tech Pills */}
          <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-(--text-tertiary) block mb-2">
                Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedStudy.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-md text-xs font-medium bg-(--bg-secondary) text-(--text-secondary) border border-(--border-color)"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-brand-blue text-white hover:bg-brand-blue/90 shadow-md shadow-brand-blue/20 transition-all shrink-0"
            >
              <span>Build Something Similar</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
