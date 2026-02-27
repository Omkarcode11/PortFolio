import Head from "next/head";
import Link from "next/link";
import { getProjects } from "../lib/api";
import { GetStaticProps } from "next";
import SEO from "../components/SEO";

interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  github: string;
  link: string;
  tags: string[];
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <>
      <SEO
        title="Projects | Backend Developer Portfolio | Node.js & System Design"
        description="Explore production-grade backend projects: scalable APIs, distributed systems, and high-performance architectures built with Node.js, TypeScript, MongoDB, and AWS. Real-world solutions with measurable impact."
        keywords={[
          "Backend Projects",
          "Node.js Projects",
          "System Design Projects",
          "Full Stack Portfolio",
          "Backend Developer Projects",
          "Distributed Systems Projects",
        ]}
        url="/projects"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px] -z-10" />

        <div className="container relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span className="text-brand-blue font-semibold text-sm tracking-wide uppercase">
                Portfolio
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight">
              Selected{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan via-brand-blue to-brand-violet">
                Works
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
              A collection of digital products exploring the boundaries of
              design and engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container section -mt-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <article className="cursor-pointer flex flex-col h-full">
                {/* Image Container */}
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6 bg-(--bg-secondary) shadow-sm group-hover:shadow-2xl group-hover:shadow-brand-blue/10 transition-all duration-500">
                  <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse -z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Aurora Overlay */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] flex items-center justify-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-full bg-white text-slate-900 hover:scale-110 transition-transform duration-200 shadow-lg"
                      title="View Code"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fa-brands fa-github text-xl"></i>
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-full bg-brand-blue text-white hover:scale-110 transition-transform duration-200 shadow-lg shadow-brand-blue/30"
                      title="View Live Site"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fa-solid fa-arrow-up-right-from-square text-xl"></i>
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold px-2.5 py-1 rounded-md text-(--text-secondary) bg-(--bg-secondary) border border-transparent group-hover:border-brand-blue/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-(--text-primary) group-hover:text-brand-blue transition-colors duration-300">
                    {project.title}
                  </h2>
                  <p className="text-(--text-secondary) line-clamp-2 leading-relaxed text-base">
                    {project.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-6">🚀</div>
            <h3 className="text-2xl font-bold mb-2">No projects yet</h3>
            <p className="text-(--text-secondary)">
              Check back soon for exciting new projects!
            </p>
          </div>
        )}
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
