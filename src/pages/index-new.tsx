import SEO from "../components/SEO";
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
import { getProjects } from "../lib/api";
import { GetStaticProps } from "next";
import { generatePersonSchema, generateFAQSchema, generateSoftwareApplicationSchema } from "../lib/seo";

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
        title="Omkar Sonawane | AI & Full-Stack Developer"
        description="AI and full-stack developer specializing in AI applications, Shopify solutions, Node.js backend systems and business automation."
        keywords={[
          "AI developer",
          "Shopify developer",
          "Node.js developer",
          "full-stack developer",
          "business automation",
        ]}
        schema={[
          generatePersonSchema(),
          generateFAQSchema([
            {
              question: "What technologies do you specialize in?",
              answer: "I specialize in AI applications, LLM APIs, Shopify Theme Extensions, Node.js, TypeScript, PostgreSQL, and business automation pipelines."
            },
            {
              question: "What types of client projects do you accept?",
              answer: "I work with startups and businesses to build AI tools, custom Shopify functionality, backend systems, and workflow automation."
            }
          ]),
          ...(projects.slice(0, 3).map(project => 
            generateSoftwareApplicationSchema({
              title: project.title,
              description: project.description,
              github: project.github,
              link: project.link,
              tags: project.tags,
              image: project.image,
              slug: project.slug
            })
          ))
        ]}
      />

      <Hero />
      <WhatIBuild />
      <FeaturedWork projects={projects} />
      <HowICanHelp />
      <ShopifyAndExperience />
      <CaseStudies />
      <WhyWorkWithMe />
      <HowIWork />
      <TechnologySection />
      <AboutClientSection />
      <ContactSection />
      <MobileStickyCTA />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getProjects();

  return {
    props: {
      projects: projects || [],
    },
    revalidate: 60,
  };
};
