import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getProjects } from "../lib/api";
import { GetStaticProps } from "next";
import SEO from "../components/SEO";
import { GitHubIcon, ExternalLinkIcon } from "../components/icons";

interface Project {
  slug: string;
  title: string;
  tagline?: string;
  problem?: string;
  solution?: string;
  description: string;
  image: string;
  github?: string;
  link?: string;
  tags: string[];
  badge?: string;
  category?: string;
  isComingSoon?: boolean;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <>
      <SEO
        title="Projects & Case Studies | Omkar Sonawane - Freelance Software Engineer"
        description="Explore production engineering projects by freelance software engineer Omkar Sonawane — including React applications, custom Shopify extensions, scalable Node.js backends, and AI automation."
        keywords={[
          "Freelance Software Engineer Projects",
          "React Freelancer Portfolio",
          "Shopify Freelancer Work",
          "Software Freelancer Case Studies",
          "Node.js Backend Projects",
          "Full Stack Freelancer",
          "AI Application Development",
        ]}
        url="/projects"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[130px] -z-10 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[130px] -z-10 pointer-events-none" />

        <div className="container relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-blue/10 rounded-full mb-8 border border-brand-blue/20">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
              <span className="text-brand-blue font-bold text-xs tracking-wider uppercase">
                Production Engineering
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
              Selected{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan via-brand-blue to-brand-violet">
                Work
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
              Real-world engineering projects demonstrating AI integrations, Shopify development, scalable backend architecture, and business automation.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container section -mt-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
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

                  {/* Badges */}
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
                    <div className="mb-4">
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="text-2xl font-bold text-(--text-primary) group-hover:text-brand-blue transition-colors">
                          <Link href={`/projects/${project.slug}`}>
                            {project.title}
                          </Link>
                        </h2>
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

                    {/* Problem & Solution */}
                    <div className="space-y-3 mb-6 text-sm leading-relaxed">
                      {project.problem && (
                        <div className="p-3.5 rounded-xl bg-(--bg-secondary)/60 border border-(--border-color)/60">
                          <p className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
                            Problem
                          </p>
                          <p className="text-(--text-secondary)">{project.problem}</p>
                        </div>
                      )}
                      {project.solution && (
                        <div className="p-3.5 rounded-xl bg-(--bg-secondary)/60 border border-(--border-color)/60">
                          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                            Solution
                          </p>
                          <p className="text-(--text-secondary)">{project.solution}</p>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-(--bg-secondary) text-(--text-secondary) border border-(--border-color)"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-(--border-color)/60 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-(--bg-secondary) text-(--text-primary) hover:bg-brand-blue/10 hover:text-brand-blue border border-(--border-color) transition-all"
                        >
                          <GitHubIcon className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.link && project.link !== project.github && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-blue text-white hover:bg-brand-blue/90 transition-all shadow-sm"
                        >
                          <ExternalLinkIcon className="w-4 h-4" />
                          <span>Live Site</span>
                        </a>
                      )}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-bold text-brand-blue hover:text-brand-violet transition-colors flex items-center gap-1.5 ml-auto"
                    >
                      <span>Deep Dive</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  try {
    const projects = await getProjects();
    return {
      props: { projects: projects || [] },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: { projects: [] },
      revalidate: 60,
    };
  }
};
