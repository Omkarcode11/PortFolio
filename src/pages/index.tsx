import Head from "next/head";
import SEO from "../components/SEO";
import Link from "next/link";
import dynamic from "next/dynamic";
import { GetStaticProps } from "next";
import { getProjects } from "../lib/api";
import {
  generatePersonSchema,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
} from "../lib/seo";
import WhatIBuild from "../components/sections/WhatIBuild";
import HowICanHelp from "../components/sections/HowICanHelp";
import FeaturedWork from "../components/sections/FeaturedWork";
import ShopifyAndExperience from "../components/sections/ShopifyAndExperience";
import CaseStudies from "../components/sections/CaseStudies";
import WhyWorkWithMe from "../components/sections/WhyWorkWithMe";
import HowIWork from "../components/sections/HowIWork";
import TechnologySection from "../components/sections/TechnologySection";
import AboutClientSection from "../components/sections/AboutClientSection";
import ContactSection from "../components/sections/ContactSection";
import MobileStickyCTA from "../components/MobileStickyCTA";

interface Project {
  slug: string;
  title: string;
  tagline?: string;
  problem?: string;
  solution?: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  link?: string;
  badge?: string;
  category?: string;
  isComingSoon?: boolean;
}

interface HomeProps {
  projects: Project[];
}

// Lazy load architecture diagram
const ArchitectureVisualization = dynamic(
  () => import("../components/ArchitectureVisualization"),
  {
    ssr: false,
    loading: () => <div className="relative hidden lg:block h-[580px] w-full" />,
  }
);

export default function Home({ projects = [] }: HomeProps) {
  return (
    <>
      <SEO
        title="Omkar Sonawane | AI & Full-Stack Developer"
        description="AI and full-stack developer specializing in AI applications, Shopify solutions, Node.js backend systems and business automation. I help startups and businesses turn ideas into production-ready software."
        keywords={[
          "AI developer",
          "AI application development",
          "Shopify developer",
          "Shopify app development",
          "Node.js developer",
          "full-stack developer",
          "business automation",
          "AI automation",
          "custom web application development",
          "API integration",
          "Shopify integration",
        ]}
        schema={[
          generatePersonSchema(),
          generateFAQSchema([
            {
              question: "What services do you offer?",
              answer:
                "I specialize in building AI applications, Shopify solutions, high-performance Node.js backend systems, real-time dashboards, and custom business automation workflows.",
            },
            {
              question: "How do you work with clients?",
              answer:
                "I partner directly with founders and teams through a structured 4-step process: Understand requirements, Plan architecture & scope, Build & test with bi-weekly updates, and Launch with full documentation and monitoring.",
            },
            {
              question: "What is your experience with Shopify?",
              answer:
                "I have professional production experience building Shopify Theme App Extensions, custom storefront features, sub-second performance optimization (<1s load times), and backend webhook integrations.",
            },
            {
              question: "Can you help automate manual business processes?",
              answer:
                "Yes. I design fault-tolerant automation pipelines using APIs, Puppeteer, webhooks, Redis queues, and WhatsApp integrations that reduce manual effort by up to 85%.",
            },
          ]),
          ...projects.slice(0, 4).map((project) =>
            generateSoftwareApplicationSchema({
              title: project.title,
              description: project.description,
              github: project.github,
              link: project.link,
              tags: project.tags,
              image: project.image,
              slug: project.slug,
            })
          ),
        ]}
      />

      {/* 1. HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-(--bg-primary)"
      >
        {/* Ambient Aurora Effect */}
        <div className="absolute top-[-15%] right-[-10%] w-[350px] md:w-[650px] h-[350px] md:h-[650px] bg-brand-cyan/15 rounded-full blur-[90px] md:blur-[130px] -z-10 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-brand-violet/15 rounded-full blur-[90px] md:blur-[130px] -z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-15 -z-10" />

        <div className="container relative z-10 px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            {/* Hero Copy */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-brand-blue tracking-wide">
                  AI • Shopify • Node.js • Business Automation
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.15] md:leading-[1.1] tracking-tight">
                  <span className="text-(--text-primary)">I Build </span>
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan via-brand-blue to-brand-violet">
                    AI-Powered Applications
                  </span>
                  <br />
                  <span className="text-(--text-primary)">&amp; Business Automation</span>
                </h1>

                {/* Supporting Text */}
                <p className="text-base sm:text-lg md:text-xl text-(--text-secondary) font-normal max-w-2xl leading-relaxed">
                  I help startups and businesses build AI applications, Shopify solutions, scalable backend systems, dashboards and custom automation using modern web technologies.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
                <Link
                  href="#contact"
                  className="px-8 py-4 rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-base shadow-lg shadow-brand-blue/30 hover:shadow-brand-blue/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  aria-label="Start a project with Omkar"
                >
                  <span>Start a Project</span>
                  <span>→</span>
                </Link>

                <Link
                  href="#work"
                  className="px-8 py-4 rounded-full bg-(--bg-card) text-(--text-primary) border border-(--border-color) hover:border-brand-blue/40 hover:bg-(--bg-secondary) font-bold text-base flex items-center justify-center transition-all active:scale-[0.98]"
                  aria-label="View featured client work and projects"
                >
                  View My Work
                </Link>
              </div>

              {/* Credibility Line */}
              <div className="pt-2 text-xs sm:text-sm font-semibold text-(--text-tertiary) flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1">
                <span>Full-Stack Development</span>
                <span>•</span>
                <span>AI Integrations</span>
                <span>•</span>
                <span>Shopify</span>
                <span>•</span>
                <span>APIs</span>
                <span>•</span>
                <span>Automation</span>
              </div>

              {/* Quick Pillars Grid */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl">
                <div className="p-3 rounded-2xl bg-(--bg-secondary)/60 border border-(--border-color) text-center">
                  <div className="text-lg font-black text-brand-cyan">AI &amp; LLMs</div>
                  <div className="text-[11px] text-(--text-secondary) mt-0.5">RAG &amp; Agents</div>
                </div>
                <div className="p-3 rounded-2xl bg-(--bg-secondary)/60 border border-(--border-color) text-center">
                  <div className="text-lg font-black text-emerald-400">Shopify</div>
                  <div className="text-[11px] text-(--text-secondary) mt-0.5">&lt;1s Storefronts</div>
                </div>
                <div className="p-3 rounded-2xl bg-(--bg-secondary)/60 border border-(--border-color) text-center">
                  <div className="text-lg font-black text-brand-blue">Node.js</div>
                  <div className="text-[11px] text-(--text-secondary) mt-0.5">High Throughput</div>
                </div>
                <div className="p-3 rounded-2xl bg-(--bg-secondary)/60 border border-(--border-color) text-center">
                  <div className="text-lg font-black text-brand-violet">Automation</div>
                  <div className="text-[11px] text-(--text-secondary) mt-0.5">85% Time Saved</div>
                </div>
              </div>
            </div>

            {/* Architecture / Product Visual */}
            <div className="relative">
              <ArchitectureVisualization />
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT I BUILD */}
      <WhatIBuild />

      {/* 3. FEATURED WORK */}
      <FeaturedWork projects={projects} />

      {/* 4. WHAT CAN I HELP YOU BUILD? */}
      <HowICanHelp />

      {/* 5. SHOPIFY & PROFESSIONAL EXPERIENCE */}
      <ShopifyAndExperience />

      {/* 6. CASE STUDIES */}
      <CaseStudies />

      {/* 7. WHY WORK WITH ME */}
      <WhyWorkWithMe />

      {/* 8. HOW I WORK (PROCESS) */}
      <HowIWork />

      {/* 9. TECHNOLOGY SECTION */}
      <TechnologySection />

      {/* 10. ABOUT ME (CLIENT-FOCUSED) */}
      <AboutClientSection />

      {/* 11. PROJECT INQUIRY & CONTACT */}
      <ContactSection />

      {/* 12. MOBILE STICKY CTA */}
      <MobileStickyCTA />
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const projects = await getProjects();
    return {
      props: {
        projects: projects || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        projects: [],
      },
      revalidate: 60,
    };
  }
};
