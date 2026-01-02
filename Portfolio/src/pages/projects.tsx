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
      </Head>
      <section className="container section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Selected Work</h1>
            <p className="max-w-xl mx-auto text-[var(--text-secondary)]">
              A collection of projects exploring modern web technologies and
              user-centric design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-0 overflow-hidden group"
              >
                <div className="aspect-video bg-[var(--bg-tertiary)] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold">{project.title}</h2>
                    <div className="flex gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-500 hover:underline"
                      >
                        Code
                      </a>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-500 hover:underline"
                      >
                        Live
                      </a>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 border border-[var(--border-color)] rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
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
