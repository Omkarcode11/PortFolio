import React from "react";
import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Understand",
    description: "Understand your business, users and technical requirements.",
    details: "Discovery call, deep dive into manual bottlenecks, defining measurable success criteria.",
  },
  {
    step: "02",
    title: "Plan",
    description: "Define the architecture, scope and implementation plan.",
    details: "Selecting appropriate frameworks, designing schemas, API contracts, and delivery milestones.",
  },
  {
    step: "03",
    title: "Build",
    description: "Develop, test and iterate on the product.",
    details: "Rapid production-ready coding, automated unit/integration tests, and bi-weekly check-ins.",
  },
  {
    step: "04",
    title: "Launch",
    description: "Deploy, monitor and hand over a production-ready solution.",
    details: "Production deployment, monitoring setup, comprehensive documentation, and seamless handover.",
  },
];

export default function HowIWork() {
  return (
    <section id="process" className="section bg-(--bg-primary) relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-violet/10 border border-brand-violet/20 text-brand-violet text-xs font-bold uppercase tracking-wider mb-4">
            <span>Engagement Process</span>
          </div>
          <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            How I Work
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
            A transparent, reliable 4-step engineering process designed to take your idea from concept to production software without surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-3xl bg-(--bg-card) border border-(--border-color) hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-blue font-heading">
                    {item.step}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-blue/30 group-hover:bg-brand-blue transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-(--text-primary) mb-3">
                  {item.title}
                </h3>

                <p className="text-sm font-medium text-(--text-primary) mb-3 leading-relaxed">
                  {item.description}
                </p>

                <p className="text-xs text-(--text-secondary) leading-relaxed">
                  {item.details}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-(--border-color)/50">
                <span className="text-xs font-semibold text-brand-blue">
                  Phase {item.step}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-blue text-white font-bold text-sm hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/25 transition-all"
          >
            <span>Start Step 01 — Schedule a Discussion</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
