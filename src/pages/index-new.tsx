import SEO from "../components/SEO";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import { getProjects } from "../lib/api";
import { GetStaticProps } from "next";
import { generatePersonSchema, generateFAQSchema, generateSoftwareApplicationSchema } from "../lib/seo";

interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  link?: string;
}

interface HomeProps {
  projects: Project[];
}

export default function Home({ projects = [] }: HomeProps) {
  return (
    <>
      <SEO
        title="Omkar Sonawane - Backend Engineer | Full Stack Developer"
        description="Full-stack engineer specializing in high-performance backend architectures, distributed systems, and production-grade APIs. Expert in Node.js, TypeScript, and system design."
        url="https://yourportfolio.com"
        schema={[
          generatePersonSchema(),
          generateFAQSchema([
            {
              question: "What technologies do you specialize in?",
              answer: "I specialize in Node.js, TypeScript, MongoDB, PostgreSQL, Redis, Docker, AWS, and system design. I focus on building scalable backend systems."
            },
            {
              question: "Are you open to new opportunities?",
              answer: "Yes, I'm open to backend engineering roles. I have experience building scalable systems, optimizing performance, and shipping production-ready code."
            },
            {
              question: "What is your experience with system design?",
              answer: "I design scalable architectures from first principles, considering load, failure modes, and operational requirements. I have experience with distributed systems, caching strategies, and horizontal scaling."
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

      {/* Hero Section */}
      <Hero />

      {/* Featured Projects Section */}
      <Projects projects={projects} />

      {/* Skills Section */}
      <Skills />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getProjects();

  return {
    props: {
      projects: projects || [],
    },
    revalidate: 3600,
  };
};
