import Head from 'next/head';
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
      <section className="container section min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="section-heading mb-6">
                My <span className="text-gradient">Work</span>
              </h1>
              <p className="section-subheading">
                A curated collection of projects showcasing innovation, design excellence,
                <br className="hidden sm:block" />
                and cutting-edge web technologies
              </p>
            </motion.div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="card p-0 overflow-hidden group cursor-pointer"
              >
                {/* Image Container */}
                <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-secondary-500/20 overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-lg bg-white/90 text-black font-semibold text-sm hover:bg-white transition-all hover:scale-105 flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        Code
                      </a>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-lg bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-all hover:scale-105 flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live
                      </a>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-7">
                  <h2 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-primary-500 transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-sm lg:text-base text-[var(--text-secondary)] mb-5 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="badge text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Empty State */}
          {projects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-2">No projects yet</h3>
              <p className="text-[var(--text-secondary)]">
                Check back soon for exciting new projects!
              </p>
            </motion.div>
          )}
        </motion.div>
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
