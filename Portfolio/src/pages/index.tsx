import Head from 'next/head';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getProjects, getSortedArticles } from '../lib/api';
import { FaReact, FaNodeJs, FaDocker, FaAws, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiMongodb, SiPostgresql, SiTailwindcss, SiGraphql } from 'react-icons/si';
import { GetStaticProps } from 'next';
import { useRef } from 'react';

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
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Tailwind', icon: <SiTailwindcss /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'GraphQL', icon: <SiGraphql /> },
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'Docker', icon: <FaDocker /> },
  { name: 'AWS', icon: <FaAws /> },
];

export default function Home({ projects = [], articles = [] }: HomeProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  if (!projects.length && !articles.length) {
    return (
      <div className="container section text-center min-h-[80vh] flex items-center justify-center">
        <div>
          <h2 className="text-2xl font-bold">Loading content...</h2>
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
        <title>Portfolio | Creative Developer</title>
        <meta
          name="description"
          content="Portfolio of a creative developer building premium web experiences."
        />
      </Head>

      {/* Modern Split Hero Section */}
      <section ref={targetRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <motion.div style={{ opacity, scale, y }} className="container grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Text Content */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="badge mb-8 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span>Available for New Opportunities</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-8"
            >
              Building <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500">
                Digital Soul
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mb-10 leading-relaxed font-light"
            >
              I engineering high-performance digital experiences that merge technical precision with aesthetic excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex gap-4"
            >
              <Link href="/projects" className="btn group">
                <span>View Projects</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/about" className="btn btn-secondary text-[var(--text-primary)]">
                About Me
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-12 flex gap-6 text-[var(--text-tertiary)]"
            >
              <a href="#" className="hover:text-primary-500 transition-colors"><FaGithub size={24} /></a>
              <a href="#" className="hover:text-primary-500 transition-colors"><FaLinkedin size={24} /></a>
              <a href="#" className="hover:text-primary-500 transition-colors"><FaTwitter size={24} /></a>
            </motion.div>
          </div>

          {/* Visual Element (Code/Glass Stack) */}
          <div className="relative hidden lg:block h-[600px] w-full">
             <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {/* Abstract decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-primary-500/20 to-secondary-500/20 rounded-full blur-[100px]" />
              
              <motion.div 
                className="absolute top-20 right-10 glass-panel p-6 rounded-2xl w-80 rotate-6 z-20"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-3/4 bg-current opacity-10 rounded"></div>
                  <div className="h-2 w-1/2 bg-current opacity-10 rounded"></div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute top-40 right-40 glass-panel p-8 rounded-2xl w-72 -rotate-3 z-30 bg-white/80 dark:bg-black/80"
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-4 mb-2">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xs">AI</div>
                   <div>
                     <div className="h-2 w-20 bg-current opacity-20 rounded mb-1"></div>
                     <div className="h-2 w-12 bg-current opacity-10 rounded"></div>
                   </div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute bottom-40 right-20 glass-panel p-6 rounded-2xl w-64 rotate-12 z-10"
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                 <div className="grid grid-cols-2 gap-2">
                   <div className="h-20 bg-primary-500/10 rounded-lg"></div>
                   <div className="h-20 bg-secondary-500/10 rounded-lg"></div>
                 </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="section bg-[var(--bg-secondary)]/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <h2 className="section-heading">Selected Work</h2>
              <p className="section-subheading m-0">
                A showcase of technical complexity and design precision.
              </p>
            </div>
            <Link href="/projects" className="hidden md:flex items-center gap-2 group hover:text-primary-500 transition-colors">
              <span>View Archives</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
            {projects.slice(0, 4).map((project, index) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 card-shadow-hover">
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" /> {/* Placeholder */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <span className="btn btn-outline border-white text-white hover:bg-white hover:text-black">View Case Study</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex gap-2 mb-2">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs font-bold uppercase tracking-wider text-primary-500">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-bold group-hover:text-primary-500 transition-colors">{project.title}</h3>
                  <p className="text-[var(--text-secondary)] line-clamp-2">{project.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Arsenal */}
      <section className="section bg-[var(--bg-primary)]">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="section-heading">Tech Arsenal</h2>
            <p className="section-subheading">
              The modern tools and technologies I use to build scalable solutions.
            </p>
          </div>
          <div className="tech-grid">
            {techStack.map((tech, idx) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="tech-item group"
              >
                <span className="tech-icon text-[var(--text-tertiary)] group-hover:text-primary-500">{tech.icon}</span>
                <span className="tech-name">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="section bg-[var(--bg-secondary)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"></div>
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
             <h2 className="section-heading">Latest Insights</h2>
             <Link href="/articles" className="btn btn-secondary">Read All Articles</Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card group hover:border-primary-500/30"
              >
                <div className="text-sm text-primary-500 font-bold mb-3">{article.date}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary-500 transition-colors">{article.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-4">{article.description}</p>
                <Link href={`/articles/${article.slug}`} className="text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Article <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </motion.div>
            ))}
          </div>
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

