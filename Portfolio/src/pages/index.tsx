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

      <section ref={targetRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Aurora Effect */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-cyan/20 rounded-full blur-[100px] animate-aurora mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-violet/20 rounded-full blur-[100px] animate-aurora animation-delay-2000 mix-blend-screen" />
        
        <motion.div style={{ opacity, scale, y } as any} className="container grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Text Content */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="badge mb-8 backdrop-blur-sm bg-white/5 border-white/10 dark:bg-slate-900/50 dark:border-slate-800"
            >
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              <span className="font-semibold tracking-wide">Available for New Opportunities</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-8"
            >
              Building <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet animate-gradient-x">
                Digital Experiences
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mb-10 leading-relaxed font-normal"
            >
              I engineer high-performance SaaS interfaces that merge technical precision with aesthetic excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex gap-4"
            >
              <Link href="/projects" className="btn bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] border-none">
                <span>View Projects</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/about" className="btn bg-white dark:bg-slate-800 text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-secondary)]">
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
              <a href="#" className="hover:text-brand-blue transition-colors hover:scale-110 transform duration-200"><FaGithub size={24} /></a>
              <a href="#" className="hover:text-brand-blue transition-colors hover:scale-110 transform duration-200"><FaLinkedin size={24} /></a>
              <a href="#" className="hover:text-brand-blue transition-colors hover:scale-110 transform duration-200"><FaTwitter size={24} /></a>
            </motion.div>
          </div>

          {/* Visual Element (SaaS Dashboard Abstract) */}
          <div className="relative hidden lg:block h-[600px] w-full perspective-1000">
             <motion.div
              initial={{ opacity: 0, rotateY: 15, x: 50 }}
              animate={{ opacity: 1, rotateY: -5, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Main Glass Panel */}
              <div className="relative w-[500px] h-[350px] bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700 shadow-2xl z-20 overflow-hidden transform transition-transform hover:scale-[1.02] duration-500">
                 {/* Fake UI Header */}
                 <div className="h-12 border-b border-[var(--border-color)] flex items-center px-6 gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-400 opacity-50" />
                   <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-50" />
                   <div className="w-3 h-3 rounded-full bg-green-400 opacity-50" />
                 </div>
                 {/* Fake UI Body */}
                 <div className="p-8 space-y-4">
                   <div className="flex gap-4">
                      <div className="w-1/3 h-24 rounded-xl bg-gradient-to-br from-brand-cyan/10 to-brand-blue/10 animate-pulse" />
                      <div className="w-1/3 h-24 rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-violet/10 animate-pulse delay-100" />
                      <div className="w-1/3 h-24 rounded-xl bg-gradient-to-br from-brand-violet/10 to-brand-cyan/10 animate-pulse delay-200" />
                   </div>
                   <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
                   <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
                   <div className="h-32 w-full bg-slate-100 dark:bg-slate-800 rounded-xl mt-4 border border-slate-200 dark:border-slate-700" />
                 </div>
              </div>

              {/* Floating Elements */}
              <motion.div 
                className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-brand-cyan to-brand-blue rounded-2xl opacity-20 blur-2xl z-10"
                animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-5 -left-10 w-40 h-40 bg-gradient-to-br from-brand-violet to-brand-cyan rounded-full opacity-20 blur-2xl z-10"
                animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 7, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section - Aurora Style */}
      <section className="section bg-[var(--bg-secondary)]/30 border-y border-[var(--border-color)]">
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
                Premium solutions built for scale and performance.
              </p>
            </div>
            <Link href="/projects" className="hidden md:flex items-center gap-2 group text-[var(--text-secondary)] hover:text-brand-blue transition-colors font-medium">
              <span>View Archives</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
            {projects.slice(0, 4).map((project, index) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative cursor-pointer"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Aurora Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                     <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors">
                        View Case Study <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-brand-blue/10 text-brand-blue text-xs font-semibold tracking-wide border border-brand-blue/20">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-brand-blue transition-colors duration-300">{project.title}</h3>
                  <p className="text-[var(--text-secondary)] line-clamp-2 text-base">{project.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Arsenal - Modern Grid */}
      <section className="section bg-[var(--bg-primary)]">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="section-heading">Tech Stack</h2>
            <p className="section-subheading">
              The modern tools I use to build production-grade applications.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {techStack.map((tech, idx) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/5 transition-all duration-300 group cursor-default"
              >
                <span className="text-[var(--text-tertiary)] group-hover:text-brand-blue transition-colors text-xl">{tech.icon}</span>
                <span className="font-semibold text-sm text-[var(--text-primary)]">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights - Minimal List */}
      <section className="section bg-[var(--bg-secondary)] border-t border-[var(--border-color)] relative">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
             <h2 className="section-heading">Writing</h2>
             <Link href="/articles" className="text-sm font-bold text-brand-blue hover:text-brand-violet transition-colors">Read All Articles &rarr;</Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/articles/${article.slug}`} className="group block h-full p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300 flex flex-col">
                  <div className="text-xs font-bold text-brand-violet mb-3 uppercase tracking-wider">{article.date}</div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-brand-blue transition-colors">{article.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-4 flex-grow">{article.description}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mt-auto group-hover:text-brand-blue transition-colors">
                    Read Article <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
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

