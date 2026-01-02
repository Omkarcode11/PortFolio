import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getProjects, getSortedArticles } from '../lib/api';
import { FaReact, FaNodeJs, FaDocker, FaAws } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiMongodb, SiPostgresql } from 'react-icons/si';
import { GetStaticProps } from 'next';

interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
}

interface HomeProps {
  projects: Project[];
  articles: Article[];
}

const techStack = [
  { name: 'React', icon: <FaReact /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'Docker', icon: <FaDocker /> },
  { name: 'AWS', icon: <FaAws /> },
];

export default function Home({ projects = [], articles = [] }: HomeProps) {
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!projects.length && !articles.length) {
    return (
      <div className="container section text-center min-h-[80vh] flex items-center justify-center">
        <div>
          <h2 className="text-2xl font-bold">Loading your awesome content...</h2>
          <p className="text-[var(--text-secondary)] mt-4">
            Please make sure your database is connected and seeded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Portfolio | Developer & Designer</title>
        <meta
          name="description"
          content="Portfolio of a creative developer building premium web experiences."
        />
      </Head>

      {/* Hero Section */}
      <section className="hero-container min-h-[95vh] flex flex-col justify-center relative overflow-hidden py-8 px-4 md:px-[5%]">
        <div className="flex flex-col items-center justify-center text-center relative z-10 max-w-[1100px] mx-auto w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="w-full flex flex-col items-center"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-5 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full mb-8 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-primary-500 font-semibold text-sm tracking-wide">
                AVAILABLE FOR NEW OPPORTUNITIES
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight max-w-4xl"
            >
              Building{' '}
              <span className="text-gradient">Next-Gen</span>{' '}
              Solutions with{' '}
              <span className="bg-gradient-to-r from-secondary-500 to-purple-500 bg-clip-text text-transparent">
                Precision
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="max-w-2xl text-lg md:text-xl mb-10 text-[var(--text-secondary)] leading-relaxed"
            >
              Full-stack engineer specializing in high-performance architectures.
              Transforming complex challenges into elegant, scalable solutions that
              drive business growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="hero-actions flex gap-4 flex-wrap justify-center"
            >
              <Link
                href="/projects"
                className="btn px-8 py-4 text-lg bg-gradient-to-r from-primary-500 to-secondary-500 shadow-lg shadow-primary-500/30"
              >
                View My Work
              </Link>
              <Link
                href="/about"
                className="btn btn-outline px-8 py-4 text-lg"
              >
                About Me
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex gap-12 mt-16 flex-wrap justify-center opacity-70"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500">2+</div>
                <div className="text-sm text-[var(--text-secondary)]">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500">15+</div>
                <div className="text-sm text-[var(--text-secondary)]">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500">100%</div>
                <div className="text-sm text-[var(--text-secondary)]">Client Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container section">
        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
          <h2 className="text-3xl font-bold">Featured Work</h2>
          <Link
            href="/projects"
            className="text-primary-500 font-semibold text-sm hover:underline"
          >
            ALL PROJECTS →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
            <motion.div
              key={project.slug}
              whileHover={{ y: -8 }}
              className="card p-0 overflow-hidden"
            >
              <div className="aspect-video bg-[var(--bg-tertiary)] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container section">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Core Technologies</h2>
          <p className="text-[var(--text-secondary)] mt-2">
            My weapon of choice for building modern web applications.
          </p>
        </div>
        <div className="tech-grid">
          {techStack.map((tech, idx) => (
            <motion.div
              key={tech.name}
              className="tech-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <span className="tech-icon">{tech.icon}</span>
              <span className="tech-name">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="container section">
        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
          <h2 className="text-3xl font-bold">Latest Writing</h2>
          <Link
            href="/articles"
            className="text-primary-500 font-semibold text-sm hover:underline"
          >
            READ BLOG →
          </Link>
        </div>
        <div className="grid gap-6">
          {articles.slice(0, 3).map((article) => (
            <Link
              href={`/articles/${article.slug}`}
              key={article.slug}
              className="card flex flex-col gap-2 hover:border-primary-500"
            >
              <div className="flex justify-between items-start flex-wrap gap-2">
                <h3 className="text-xl font-bold">{article.title}</h3>
                <span className="text-sm text-primary-500 font-semibold whitespace-nowrap">
                  {article.date}
                </span>
              </div>
              <p className="text-[var(--text-secondary)]">{article.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const projects = await getProjects();
  const articles = await getSortedArticles();
  return {
    props: {
      projects,
      articles,
    },
    revalidate: 60,
  };
};
