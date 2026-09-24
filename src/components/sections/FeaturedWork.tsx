import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GitHubIcon, ExternalLinkIcon } from "../icons";

export interface Project {
  slug: string;
  title: string;
  tagline?: string;
  problem?: string;
  solution?: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  link?: string;
  badge?: string;
  category?: string;
  isComingSoon?: boolean;
}

interface FeaturedWorkProps {
  projects: Project[];
}

export default function FeaturedWork({ projects }: FeaturedWorkProps) {
  return (
    <section id="work" className="section bg-(--bg-primary) relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-wider mb-4">
              <span>Production Solutions</span>
            </div>
            <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Featured Work
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-(--text-secondary) leading-relaxed">
              Selected engineering projects demonstrating product development, backend architecture, AI and automation.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-violet transition-colors group shrink-0"
          >
            <span>View All Projects</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => {
            const isComingSoon = project.isComingSoon || project.slug === "ai-commerce-agent";

            return (
              <article
                key={project.slug}
                className="group flex flex-col rounded-3xl bg-(--bg-card) border border-(--border-color) hover:border-brand-blue/40 shadow-sm hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-300 overflow-hidden"
              >
                {/* Visual Preview */}
                <div className="relative aspect-[16/10] overflow-hidden bg-(--bg-secondary) border-b border-(--border-color)">
                  <Image
                    src={project.image || "/projects/ai-commerce-agent.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index < 2}
                    unoptimized={project.image?.endsWith(".svg") || project.image?.includes("placehold.co")}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10 pointer-events-none">
                    {project.badge && (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide backdrop-blur-md shadow-sm border ${
                          isComingSoon
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                            : project.badge.includes("Professional")
                            ? "bg-brand-blue/20 text-blue-200 border-brand-blue/40"
                            : "bg-emerald-500/20 text-emerald-200 border-emerald-500/30"
                        }`}
                      >
                        {project.badge}
                      </span>
                    )}
                    {project.category && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/70 text-slate-300 border border-slate-700/60 backdrop-blur-md">
                        {project.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    {/* Title & Tagline */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-2xl font-bold text-(--text-primary) group-hover:text-brand-blue transition-colors">
                          <Link href={`/projects/${project.slug}`}>
                            {project.title}
                          </Link>
                        </h3>
                        {isComingSoon && (
                          <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      {project.tagline && (
                        <p className="text-sm font-semibold text-brand-blue mt-1">
                          {project.tagline}
                        </p>
                      )}
                    </div>

                    {/* Problem & Solution Structure */}
                    <div className="space-y-3 mb-6 text-sm leading-relaxed">
                      {project.problem ? (
                        <div className="p-3.5 rounded-xl bg-(--bg-secondary)/60 border border-(--border-color)/60">
                          <p className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
                            Problem
                          </p>
                          <p className="text-(--text-secondary)">{project.problem}</p>
                        </div>
                      ) : null}

                      {project.solution ? (
                        <div className="p-3.5 rounded-xl bg-(--bg-secondary)/60 border border-(--border-color)/60">
                          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                            Solution
                          </p>
                          <p className="text-(--text-secondary)">{project.solution}</p>
                        </div>
                      ) : (
                        <p className="text-(--text-secondary)">
                          {project.description}
                        </p>
                      )}
                    </div>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-(--bg-secondary) text-(--text-secondary) border border-(--border-color) hover:border-brand-blue/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions / Links */}
                  <div className="pt-4 border-t border-(--border-color)/60 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-(--bg-secondary) text-(--text-primary) hover:bg-brand-blue/10 hover:text-brand-blue border border-(--border-color) transition-all"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <GitHubIcon className="w-4 h-4" />
                          <span>GitHub</span>
                        </a>
                      )}

                      {project.link && project.link !== project.github && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-blue text-white hover:bg-brand-blue/90 transition-all shadow-sm"
                          aria-label={`View Live Demo of ${project.title}`}
                        >
                          <ExternalLinkIcon className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-bold text-brand-blue hover:text-brand-violet transition-colors flex items-center gap-1.5 ml-auto"
                    >
                      <span>Project Details</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
