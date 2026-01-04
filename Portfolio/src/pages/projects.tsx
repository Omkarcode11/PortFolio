import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getProjects } from '../lib/api';
import { GetStaticProps } from 'next';

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
      <Head>
        <title>Projects | Portfolio</title>
        <meta
          name="description"
          content="Explore my portfolio of innovative projects built with modern web technologies."
        />
      </Head>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px] -z-10" />

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 rounded-full mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span className="text-brand-blue font-semibold text-sm tracking-wide uppercase">
                Portfolio
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet">Works</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              A collection of digital products exploring the boundaries of design and engineering.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container section -mt-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="cursor-pointer flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6 bg-[var(--bg-secondary)] shadow-sm group-hover:shadow-2xl group-hover:shadow-brand-blue/10 transition-all duration-500">
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
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                     </a>
                     <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-full bg-brand-blue text-white hover:scale-110 transition-transform duration-200 shadow-lg shadow-brand-blue/30"
                        title="View Live Site"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                     </a>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold px-2.5 py-1 rounded-md text-[var(--text-secondary)] bg-[var(--bg-secondary)] border border-transparent group-hover:border-brand-blue/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-[var(--text-primary)] group-hover:text-brand-blue transition-colors duration-300">
                    {project.title}
                  </h2>
                  <p className="text-[var(--text-secondary)] line-clamp-2 leading-relaxed text-base">
                    {project.description}
                  </p>
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="text-6xl mb-6">🚀</div>
            <h3 className="text-2xl font-bold mb-2">No projects yet</h3>
            <p className="text-[var(--text-secondary)]">
              Check back soon for exciting new projects!
            </p>
          </motion.div>
        )}
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  const projects = await getProjects();
  return {
    props: { projects },
    revalidate: 60,
  };
};
