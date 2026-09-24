import React, { useState } from "react";
import Link from "next/link";

interface ServiceItem {
  id: string;
  title: string;
  category: "AI & Agents" | "Shopify & Commerce" | "Automation & Systems" | "Dashboards & MVPs";
  description: string;
  highlight: string;
}

const serviceItems: ServiceItem[] = [
  {
    id: "ai-chatbot",
    title: "AI Chatbot for Your Business",
    category: "AI & Agents",
    description: "Custom conversational AI trained on your internal documentation and product catalog.",
    highlight: "Knowledge-grounded & RAG",
  },
  {
    id: "ai-support",
    title: "AI Customer Support System",
    category: "AI & Agents",
    description: "Automated ticket triage, smart reply drafting, and 24/7 intelligent tier-1 issue resolution.",
    highlight: "Resolves 60%+ common tickets",
  },
  {
    id: "ai-commerce",
    title: "AI Commerce Assistant",
    category: "AI & Agents",
    description: "Natural-language product search and recommendations that increase checkout conversion.",
    highlight: "Shopify Storefront integration",
  },
  {
    id: "shopify-custom",
    title: "Shopify Custom Functionality",
    category: "Shopify & Commerce",
    description: "Bespoke Theme App Extensions, checkout extensions, custom cart logic, and merchant features.",
    highlight: "Sub-second load times",
  },
  {
    id: "shopify-integrations",
    title: "Shopify Integrations & Webhooks",
    category: "Shopify & Commerce",
    description: "Bi-directional synchronization between Shopify, ERPs, CRM platforms, and payment providers.",
    highlight: "Idempotent event handling",
  },
  {
    id: "business-automation",
    title: "Business Workflow Automation",
    category: "Automation & Systems",
    description: "Eliminate repetitive manual data entry across disparate tools using robust API pipelines.",
    highlight: "80%+ time savings",
  },
  {
    id: "whatsapp-automation",
    title: "WhatsApp & Notification Automation",
    category: "Automation & Systems",
    description: "Automated alerts, transactional updates, customer notifications, and interactive flows.",
    highlight: "Meta Cloud API",
  },
  {
    id: "rest-apis",
    title: "Production REST & WebSocket APIs",
    category: "Automation & Systems",
    description: "Scalable backend architectures built with Node.js, Express, PostgreSQL, and Redis caching.",
    highlight: "High throughput & low latency",
  },
  {
    id: "api-integrations",
    title: "Third-Party API Integrations",
    category: "Automation & Systems",
    description: "Reliable integrations with Stripe, Meta, Twilio, Google, and enterprise third-party APIs.",
    highlight: "Fault-tolerant retries",
  },
  {
    id: "admin-dashboards",
    title: "Admin & Operations Dashboards",
    category: "Dashboards & MVPs",
    description: "High-performance operational portals to manage inventory, track users, and control workflows.",
    highlight: "Role-based access control",
  },
  {
    id: "data-dashboards",
    title: "Data & Analytics Dashboards",
    category: "Dashboards & MVPs",
    description: "Interactive visual dashboards processing 500K+ records with sub-second aggregated queries.",
    highlight: "Real-time metrics & charts",
  },
  {
    id: "saas-mvps",
    title: "SaaS MVPs & Full-Stack Products",
    category: "Dashboards & MVPs",
    description: "Turn your product idea from concept to a production-ready, launchable web application.",
    highlight: "Rapid, solid architecture",
  },
];

const categories = [
  "All",
  "AI & Agents",
  "Shopify & Commerce",
  "Automation & Systems",
  "Dashboards & MVPs",
] as const;

export default function HowICanHelp() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredItems =
    activeCategory === "All"
      ? serviceItems
      : serviceItems.filter((item) => item.category === activeCategory);

  return (
    <section className="section bg-(--bg-secondary)/30 border-y border-(--border-color) relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-violet/10 border border-brand-violet/20 text-brand-violet text-xs font-bold uppercase tracking-wider mb-4">
            <span>Project Scope &amp; Deliverables</span>
          </div>
          <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            What Can I Help You Build?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
            Tailored engineering solutions designed to solve real business bottlenecks and accelerate your product roadmap.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                  : "bg-(--bg-card) text-(--text-secondary) hover:text-(--text-primary) border border-(--border-color)"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-(--bg-card) border border-(--border-color) hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-(--bg-secondary) text-(--text-tertiary)">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-brand-cyan">
                    {item.highlight}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-(--text-primary) mb-2 group-hover:text-brand-blue transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-(--text-secondary) leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-(--border-color)/50 flex items-center justify-between">
                <Link
                  href="#contact"
                  className="text-xs font-semibold text-brand-blue hover:text-brand-violet transition-colors flex items-center gap-1.5"
                >
                  <span>Inquire about this</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
