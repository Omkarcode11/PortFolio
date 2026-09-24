import Head from "next/head";
import SEO from "../components/SEO";
import Link from "next/link";
import { GetStaticProps } from "next";
import { getProjects } from "../lib/api";
import {
  generatePersonSchema,
  generateProfessionalServiceSchema,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
} from "../lib/seo";
import Hero from "../components/sections/Hero";
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

export default function Home({ projects = [] }: HomeProps) {
  return (
    <>
      <SEO
        title="Omkar Sonawane | Freelance Software Engineer & Full-Stack AI, React, Shopify Developer"
        description="Hire Omkar Sonawane — Freelance Software Engineer & Full-Stack Developer specializing in React, Next.js, Shopify, Node.js backend systems, AI applications, and workflow automation."
        keywords={[
          "freelance software engineer",
          "freelance sde",
          "software freelancer",
          "react freelancer",
          "react developer freelance",
          "shopify freelancer",
          "shopify developer freelance",
          "freelance shopify developer",
          "freelance full-stack developer",
          "full stack freelancer",
          "freelance node.js developer",
          "backend freelancer",
          "freelance ai developer",
          "hire freelance software engineer",
          "hire react developer",
          "hire shopify developer",
          "business automation freelancer",
          "custom web application development",
          "api integration freelancer",
        ]}
        schema={[
          generatePersonSchema(),
          generateProfessionalServiceSchema(),
          generateFAQSchema([
            {
              question: "Can I hire you as a freelance software engineer (SDE)?",
              answer:
                "Yes. I work with startups, businesses, and agency partners as a freelance software engineer and full-stack developer on both fixed-price projects and monthly retainers.",
            },
            {
              question: "Do you provide freelance React and Next.js development?",
              answer:
                "Yes. I specialize in building modern, high-performance web applications using React 19, Next.js, TypeScript, and TailwindCSS with sub-second page load times and mobile-first responsiveness.",
            },
            {
              question: "Are you available for freelance Shopify development?",
              answer:
                "Yes. I have production experience building custom Shopify Theme App Extensions, Liquid storefront sections, sub-second performance optimization (<1s load times), and webhook integrations.",
            },
            {
              question: "What backend and automation services do you offer as a software freelancer?",
              answer:
                "I build resilient Node.js and Express REST/WebSocket APIs, implement Redis caching for 60% latency reductions, and architect automated business workflows with Puppeteer, BullMQ, and WhatsApp APIs that save up to 85% of manual operational hours.",
            },
            {
              question: "What is your typical project timeline and process?",
              answer:
                "I partner directly with founders through a 4-step process: Understand scope, Plan architecture, Build with bi-weekly demo updates, and Launch with complete documentation and 100% production code ownership.",
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
      <Hero />

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
