import Head from "next/head";
import SEO from "../components/SEO";
import Link from "next/link";
import Image from "next/image";
import { getProjects, getSortedArticles } from "../lib/api";
import {
  generatePersonSchema,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
} from "../lib/seo";
import { GetStaticProps } from "next";
import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  link?: string;
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

export const techStack = [
  // 🌐 Frontend (Secondary)
  { name: "HTML5", icon: "devicon-html5-plain coloured" },
  { name: "CSS3", icon: "devicon-css3-plain coloured" },
  { name: "JavaScript", icon: "devicon-javascript-plain coloured" },
  { name: "TypeScript", icon: "devicon-typescript-plain coloured" },
  { name: "React.js", icon: "devicon-react-original coloured" },
  { name: "Next.js", icon: "devicon-nextjs-plain" },
  { name: "Redux", icon: "devicon-redux-original coloured" },
  { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain coloured" },
  { name: "Vite", icon: "devicon-vitejs-plain coloured" },
  { name: "Webpack", icon: "devicon-webpack-plain coloured" },

  // ⚙️ Backend (Primary Strength)
  { name: "Node.js", icon: "devicon-nodejs-plain coloured" },
  { name: "Express.js", icon: "devicon-express-original" },
  { name: "REST APIs", icon: "fa-solid fa-cloud" },
  { name: "WebSockets", icon: "fa-solid fa-plug" },
  { name: "JWT Authentication", icon: "fa-solid fa-key" },

  // 🗄️ Databases & Caching
  { name: "MongoDB", icon: "devicon-mongodb-plain coloured" },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain coloured" },
  { name: "Redis", icon: "devicon-redis-plain coloured" },

  // ☁️ DevOps & Infra
  { name: "Docker", icon: "devicon-docker-plain coloured" },
  { name: "Kubernetes", icon: "devicon-kubernetes-plain coloured" },
  { name: "AWS", icon: "devicon-amazonwebservices-original coloured" },
  { name: "Nginx", icon: "devicon-nginx-original coloured" },
  { name: "Linux", icon: "devicon-linux-plain" },
  { name: "CI/CD Pipelines", icon: "fa-solid fa-infinity" },
  { name: "GitHub Actions", icon: "devicon-githubactions-plain coloured" },

  // 🤖 Automation
  { name: "Puppeteer", icon: "devicon-puppeteer-plain coloured" },

  // 🛠 Tools & Core CS
  { name: "Git", icon: "devicon-git-plain coloured" },
  { name: "GitHub", icon: "devicon-github-original" },
  { name: "System Design", icon: "fa-solid fa-sitemap" },
  { name: "Data Structures & Algorithms", icon: "fa-solid fa-code" },
];

// Lazy load heavy architecture visualization component
const ArchitectureVisualization = dynamic(
  () => import("../components/ArchitectureVisualization"),
  {
    ssr: false,
    loading: () => (
      <div className="relative hidden lg:block h-[600px] w-full" />
    ),
  },
);

export default function Home({ projects = [], articles = [] }: HomeProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!projects.length && !articles.length) {
    return (
      <div className="container section text-center min-h-[80vh] flex items-center justify-center">
        <div>
          <h2 className="text-2xl font-bold">Loading content...</h2>
          <p className="text-(--text-secondary) mt-4">
            Please make sure your database is connected and seeded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Backend Engineer | Node.js Developer Portfolio | System Design Expert"
        description="Backend-focused full-stack engineer building scalable distributed systems, high-performance APIs, and production-ready architectures. Expert in Node.js, TypeScript, MongoDB, PostgreSQL, AWS, and system design. Available for backend engineering roles in India."
        keywords={[
          "Backend Developer",
          "Node.js Developer",
          "Full Stack Developer India",
          "Backend Engineer",
          "System Design Engineer",
          "Distributed Systems",
          "MERN Stack Developer",
          "TypeScript Developer",
        ]}
        schema={[
          generatePersonSchema(),
          generateFAQSchema([
            {
              question: "What technologies do you specialize in?",
              answer:
                "I specialize in Node.js, TypeScript, MongoDB, PostgreSQL, Redis, AWS, Docker, Kubernetes, and system design. I build scalable backend architectures and high-performance APIs.",
            },
            {
              question: "What type of backend systems do you build?",
              answer:
                "I build distributed systems, high-throughput APIs (10K+ req/s), fault-tolerant architectures, database optimization solutions, and production-ready backend services.",
            },
            {
              question: "Are you available for backend engineering roles?",
              answer:
                "Yes, I'm open to backend engineering roles. I have experience building scalable systems, optimizing performance, and shipping production-ready code.",
            },
            {
              question: "What is your experience with system design?",
              answer:
                "I design scalable architectures from first principles, considering load, failure modes, and operational requirements. I have experience with distributed systems, caching strategies, and horizontal scaling.",
            },
          ]),
          ...projects.slice(0, 3).map((project) =>
            generateSoftwareApplicationSchema({
              title: project.title,
              description: project.description,
              github: project.github,
              link: project.link,
              tags: project.tags,
              image: project.image,
              slug: project.slug,
            }),
          ),
        ]}
      />

      <section
        ref={targetRef}
        className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-(--bg-primary)"
      >
        {/* Ambient Background - Aurora Effect */}
        <div className="absolute top-[-20%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-brand-cyan/20 rounded-full blur-[80px] md:blur-[120px] animate-aurora mix-blend-screen -z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-violet/20 rounded-full blur-[80px] md:blur-[120px] animate-aurora animation-delay-2000 mix-blend-screen -z-10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 -z-10" />

        <div className="container relative z-10 px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
            {/* Hero Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8">
              {/* Main Heading - Backend Focused */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.2] md:leading-[1.1] tracking-tight">
                  <span className="text-(--text-primary)">Building </span>
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan via-brand-blue to-brand-violet">
                    Distributed Systems
                  </span>
                  <br className="hidden md:block" />
                  <span className="text-(--text-primary)">
                    That Handle Scale
                  </span>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-(--text-secondary) font-medium max-w-2xl leading-relaxed">
                  Full Stack engineer designing distributed systems, optimizing
                  performance, and shipping production-ready code.
                </p>
              </div>

              {/* What I Build - System Design Focus - Hidden on mobile, shown below fold */}
              <div className="hidden md:block space-y-3 max-w-2xl">
                <p className="text-base md:text-lg text-(--text-primary) font-semibold">
                  What I Build
                </p>
                <ul className="space-y-2.5 text-sm md:text-base text-(--text-secondary) leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-blue mt-1.5 font-bold">→</span>
                    <span>
                      High-throughput APIs serving 10K+ req/s with consistent
                      sub-100ms latency
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-blue mt-1.5 font-bold">→</span>
                    <span>
                      Fault-tolerant distributed systems with horizontal scaling
                      and graceful degradation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-blue mt-1.5 font-bold">→</span>
                    <span>
                      Database architectures optimized for performance: caching
                      strategies, query optimization, connection pooling
                    </span>
                  </li>
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
                <Link
                  href="/projects"
                  className="btn bg-linear-to-r from-brand-cyan via-brand-blue to-brand-violet text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] border-none text-base px-8 py-4 w-full sm:w-auto min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 active:scale-[0.98] transition-transform"
                  aria-label="View my projects and portfolio work"
                >
                  View My Work
                </Link>
                <Link
                  href="/about"
                  className="btn bg-(--bg-primary) text-(--text-primary) border border-(--border-color) hover:bg-(--bg-secondary) text-base px-8 py-4 w-full sm:w-auto hover:border-brand-blue/30 min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 active:scale-[0.98] transition-transform"
                  aria-label="View my engineering experience and background"
                >
                  Engineering Experience
                </Link>
              </div>

              {/* Core Technical Stack - Backend Focused - Reduced on mobile */}
              <div className="pt-6 w-full max-w-sm lg:max-w-none mx-auto lg:mx-0 border-t border-(--border-color)">
                <p className="text-xs font-semibold uppercase tracking-widest text-(--text-tertiary)">
                  Core Stack
                </p>

                {/* Mobile: Simplified Tech Stack Visual */}
                <div className="grid grid-cols-3 lg:flex lg:flex-wrap gap-4 lg:gap-6 p-6 rounded-2xl">
                  <div
                    className="flex flex-col items-center gap-2"
                    aria-label="Node.js"
                  >
                    <i className="devicon-nodejs-plain coloured text-3xl"></i>
                    <span className="text-xs font-medium text-(--text-secondary)">
                      Node.js
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center gap-2"
                    aria-label="React.js"
                  >
                    <i className="devicon-react-original coloured text-3xl"></i>
                    <span className="text-xs font-medium text-(--text-secondary)">
                      React.js
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center gap-2"
                    aria-label="TypeScript"
                  >
                    <i className="devicon-typescript-plain coloured text-3xl"></i>
                    <span className="text-xs font-medium text-(--text-secondary)">
                      TypeScript
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center gap-2"
                    aria-label="MongoDB"
                  >
                    <i className="devicon-mongodb-plain coloured text-3xl"></i>
                    <span className="text-xs font-medium text-(--text-secondary)">
                      MongoDB
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center gap-2"
                    aria-label="PostgreSQL"
                  >
                    <i className="devicon-postgresql-plain coloured text-3xl"></i>
                    <span className="text-xs font-medium text-(--text-secondary)">
                      PostgreSQL
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center gap-2"
                    aria-label="AWS"
                  >
                    <i className="devicon-amazonwebservices-original coloured text-3xl"></i>
                    <span className="text-xs font-medium text-(--text-secondary)">
                      AWS
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-center gap-2"
                    aria-label="Docker"
                  >
                    <i className="devicon-docker-plain coloured text-3xl"></i>
                    <span className="text-xs font-medium text-(--text-secondary)">
                      Docker
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Element - System Architecture Diagram (Desktop Only) - Lazy Loaded */}
            <ArchitectureVisualization prefersReducedMotion={false} />
          </div>
        </div>
      </section>

      {/* Projects Section - Aurora Style */}
      <section className="section bg-(--bg-secondary)/30 border-y border-(--border-color)">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="section-heading">Systems & Architecture</h2>
              <p className="section-subheading m-0">
                Production systems built for scale, performance, and
                reliability.
              </p>
            </div>
            <Link
              href="/projects"
              className="hidden md:flex items-center gap-2 group text-(--text-secondary) hover:text-brand-blue transition-colors font-medium"
            >
              <span>View Archives</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
            {projects.slice(0, 4).map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group relative block"
              >
                <article className="cursor-pointer">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-(--border-color) shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />
                    <Image
                      src={project.image || "/placeholder-project.png"}
                      alt={`${project.title} - ${project.description.substring(0, 80)}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 2}
                      loading={index < 2 ? "eager" : "lazy"}
                      unoptimized={project.image?.includes("placehold.co")}
                    />
                    {/* Desktop: Aurora Overlay on Hover */}
                    <div className="hidden lg:flex absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end p-8">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors">
                        View Project
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </div>
                    {/* Mobile: Always visible overlay indicator */}
                    <div className="lg:hidden absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent flex items-end p-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-white/20 text-slate-900 dark:text-white text-xs font-medium">
                        View Project
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-brand-blue/10 text-brand-blue text-xs font-semibold tracking-wide border border-brand-blue/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold group-hover:text-brand-blue transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-(--text-secondary) line-clamp-2 text-base">
                      {project.description}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Arsenal - Modern Grid */}
      <section className="section bg-(--bg-primary)">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="section-heading">Tech Stack</h2>
            <p className="section-subheading">
              The modern tools I use to build production-grade applications.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {techStack.map((tech, idx) => (
              <div
                key={tech.name}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-(--bg-secondary) border border-(--border-color) hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/5 transition-all duration-300 group cursor-default min-h-[44px] focus-within:ring-2 focus-within:ring-brand-blue focus-within:ring-offset-2"
                tabIndex={0}
                role="listitem"
                aria-label={tech.name}
              >
                <span
                  className="text-(--text-tertiary) group-hover:text-brand-blue transition-colors text-xl"
                  aria-hidden="true"
                >
                  <i className={tech.icon}></i>
                </span>
                <span className="font-semibold text-sm text-(--text-primary)">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Recruiters Should Care */}
      <section className="section bg-(--bg-primary) border-t border-(--border-color)">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-heading mb-4">Why This Matters</h2>
              <p className="section-subheading max-w-2xl mx-auto">
                I build systems that solve real problems and deliver measurable
                impact.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              <div className="text-center p-6 rounded-2xl bg-(--bg-secondary)/50 border border-(--border-color)">
                <div className="text-4xl font-extrabold text-brand-blue mb-2">
                  10K+
                </div>
                <div className="text-sm text-(--text-secondary) font-medium">
                  Requests/Second
                </div>
                <p className="text-xs text-(--text-tertiary) mt-2">
                  APIs designed for high throughput
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-(--bg-secondary)/50 border border-(--border-color)">
                <div className="text-4xl font-extrabold text-brand-cyan mb-2">
                  &lt;100ms
                </div>
                <div className="text-sm text-(--text-secondary) font-medium">
                  P99 Latency
                </div>
                <p className="text-xs text-(--text-tertiary) mt-2">
                  Consistent performance under load
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-(--bg-secondary)/50 border border-(--border-color)">
                <div className="text-4xl font-extrabold text-brand-violet mb-2">
                  100%
                </div>
                <div className="text-sm text-(--text-secondary) font-medium">
                  Ownership
                </div>
                <p className="text-xs text-(--text-tertiary) mt-2">
                  Design to deployment to monitoring
                </p>
              </div>
            </div>

            <div className="mt-12 p-6 md:p-8 rounded-3xl bg-linear-to-r from-brand-blue/10 via-brand-cyan/10 to-brand-violet/10 border border-brand-blue/20">
              <h3 className="text-xl font-bold mb-4 text-(--text-primary)">
                What I Bring to Your Team
              </h3>
              <ul className="space-y-3 text-(--text-secondary)">
                <li className="flex items-start gap-3">
                  <span className="text-brand-blue mt-1">•</span>
                  <span>
                    <strong>System Design Expertise:</strong> Design scalable
                    architectures from first principles, considering load,
                    failure modes, and operational requirements
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-blue mt-1">•</span>
                  <span>
                    <strong>Production Experience:</strong> Built and maintained
                    systems handling real traffic, debugging issues, optimizing
                    performance, and iterating based on metrics
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-blue mt-1">•</span>
                  <span>
                    <strong>Strong Fundamentals:</strong> Deep understanding of
                    databases, APIs, caching, message queues, and distributed
                    systems concepts
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-blue mt-1">•</span>
                  <span>
                    <strong>Growth Mindset:</strong> Ready to take on SDE-2
                    responsibilities, lead technical decisions, and contribute
                    to team architecture discussions
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const projects = await getProjects();
    const articles = await getSortedArticles();
    return {
      props: {
        projects: projects || [],
        articles: articles || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        projects: [],
        articles: [],
      },
      revalidate: 60,
    };
  }
};
