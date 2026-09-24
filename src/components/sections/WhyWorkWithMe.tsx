import React from "react";

const valueProps = [
  {
    title: "Production Experience",
    description:
      "Experience building and maintaining real-world software rather than only tutorial projects.",
    icon: "🏭",
  },
  {
    title: "Full-Stack Execution",
    description:
      "Frontend, backend, databases, APIs, integrations and deployment.",
    icon: "🏗️",
  },
  {
    title: "AI + Automation",
    description:
      "Ability to integrate modern AI capabilities into practical business workflows.",
    icon: "🧠",
  },
  {
    title: "Business-Focused Development",
    description:
      "Focus on solving the underlying business problem, not simply delivering code.",
    icon: "🎯",
  },
];

export default function WhyWorkWithMe() {
  return (
    <section className="section bg-(--bg-secondary)/30 border-y border-(--border-color) relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-4">
            <span>Partnership Value</span>
          </div>
          <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Why Work With Me
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
            I partner with founders, businesses, and engineering leaders to deliver reliable, maintainable software that drives commercial outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {valueProps.map((prop, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-(--bg-card) border border-(--border-color) hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-(--bg-secondary) border border-(--border-color) flex items-center justify-center text-2xl mb-6 shadow-xs">
                  <span>{prop.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-(--text-primary) mb-3">
                  {prop.title}
                </h3>
                <p className="text-sm text-(--text-secondary) leading-relaxed">
                  {prop.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-(--border-color)/50">
                <span className="text-xs font-semibold text-brand-blue">
                  Verified Engineering Practice
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
