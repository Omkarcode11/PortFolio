import Head from "next/head";
import {
  GitHubIcon,
  ExternalLinkIcon,
  ArrowLeftIcon,
  CodeIcon,
  ServerIcon,
  CloudIcon,
  DatabaseIcon,
  ArrowRightIcon,
} from "../../components/icons";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { getProjects, getProjectBySlug } from "../../lib/api";
import SEO from "../../components/SEO";
import {
  generateSoftwareApplicationSchema,
  generateProjectSchema,
  generateBreadcrumbSchema,
} from "../../lib/seo";

interface ProjectDetail {
  slug: string;
  title: string;
  tagline?: string;
  problem?: string;
  solution?: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  badge?: string;
  category?: string;
  isComingSoon?: boolean;
}

interface ProjectDetailProps {
  project: ProjectDetail | null;
}

export default function ProjectDetailPage({ project }: ProjectDetailProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-brand-cyan/20 border-t-brand-cyan animate-spin mx-auto mb-4" />
          <p className="text-(--text-secondary)">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <>
        <Head>
          <title>Project Not Found | Omkar Sonawane</title>
        </Head>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-(--text-secondary) mb-8">
              The project you're looking for doesn't exist.
            </p>
            <Link href="/projects" className="btn">
              Back to Projects
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Categorize tags
  const frontendTags = project.tags.filter((tag) =>
    [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "HTML",
      "CSS",
      "JavaScript",
    ].some((tech) => tag.toLowerCase().includes(tech.toLowerCase()))
  );
  const backendTags = project.tags.filter((tag) =>
    [
      "Node.js",
      "Express",
      "REST API",
      "GraphQL",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Socket.IO",
      "WebSockets",
      "JWT",
    ].some((tech) => tag.toLowerCase().includes(tech.toLowerCase()))
  );
  const aiAndShopifyTags = project.tags.filter((tag) =>
    ["AI", "LLM", "Shopify", "Theme", "Puppeteer", "Automation"].some((tech) =>
      tag.toLowerCase().includes(tech.toLowerCase())
    )
  );
  const otherTags = project.tags.filter(
    (tag) =>
      !frontendTags.includes(tag) &&
      !backendTags.includes(tag) &&
      !aiAndShopifyTags.includes(tag)
  );

  const projectKeywords = [
    project.title,
    ...project.tags,
    "AI Project",
    "Shopify Project",
    "Full Stack Architecture",
    "Freelance Engineering",
  ];

  return (
    <>
      <SEO
        title={`${project.title} | Omkar Sonawane - AI & Full-Stack Developer`}
        description={`${project.description} Built with ${project.tags.slice(0, 3).join(", ")}. Explore the architecture, technical decisions, and business impact.`}
        keywords={projectKeywords}
        image={project.image}
        url={`/projects/${project.slug}`}
        schema={[
          generateSoftwareApplicationSchema({
            title: project.title,
            description: project.description,
            github: project.github,
            link: project.link,
            tags: project.tags,
            image: project.image,
            slug: project.slug,
          }),
          generateProjectSchema({
            title: project.title,
            description: project.description,
            github: project.github,
            link: project.link,
            tags: project.tags,
            image: project.image,
            slug: project.slug,
          }),
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Projects", url: "/projects" },
            { name: project.title, url: `/projects/${project.slug}` },
          ]),
        ]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-violet/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <div className="container relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-(--text-secondary) hover:text-brand-blue transition-colors group"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-1 transition-transform group-hover:-translate-x-1" />
              <span className="font-semibold text-sm">Back to Projects</span>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Visual Card */}
            <div className="relative aspect-16/10 rounded-3xl overflow-hidden bg-(--bg-secondary) border border-(--border-color) shadow-2xl">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-brand-cyan/20 to-brand-violet/20">
                  <CodeIcon className="w-8 h-8 text-cyan-400" strokeWidth={2.5} />
                </div>
              )}

              {project.badge && (
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-white backdrop-blur-md border border-white/20">
                    {project.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-(--text-primary)">
                  {project.title}
                </h1>
                {project.tagline && (
                  <p className="text-lg font-semibold text-brand-blue mb-4">
                    {project.tagline}
                  </p>
                )}
                <p className="text-lg text-(--text-secondary) leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Problem & Solution Breakdown */}
              {(project.problem || project.solution) && (
                <div className="space-y-4 pt-2">
                  {project.problem && (
                    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20">
                      <div className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
                        Business Problem
                      </div>
                      <p className="text-sm text-(--text-secondary) leading-relaxed">
                        {project.problem}
                      </p>
                    </div>
                  )}

                  {project.solution && (
                    <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                      <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                        Engineering Solution
                      </div>
                      <p className="text-sm text-(--text-secondary) leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-(--bg-secondary) text-(--text-secondary) text-xs font-semibold border border-(--border-color)"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-(--border-color)">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-(--bg-secondary) text-(--text-primary) border border-(--border-color) hover:border-brand-blue/50 text-xs font-bold transition-all hover:scale-[1.02]"
                  >
                    <GitHubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                {project.link && project.link !== project.github && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue/90 shadow-md shadow-brand-blue/20 transition-all hover:scale-[1.02]"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                    <span>Live Demonstration</span>
                  </a>
                )}
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-(--bg-card) border border-brand-blue/40 text-brand-blue text-xs font-bold hover:bg-brand-blue/10 transition-all ml-auto"
                >
                  <span>Build Similar Solution</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture Breakdown */}
      <section className="section bg-(--bg-secondary)/30 border-y border-(--border-color)">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-8 text-(--text-primary)">
              Technologies Used in This Project
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {aiAndShopifyTags.length > 0 && (
                <div className="p-6 rounded-2xl bg-(--bg-card) border border-(--border-color)">
                  <div className="flex items-center gap-3 mb-4">
                    <CloudIcon className="w-6 h-6 text-brand-cyan" />
                    <h3 className="text-lg font-bold">AI &amp; Platform</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {aiAndShopifyTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-brand-cyan/10 text-brand-cyan text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {backendTags.length > 0 && (
                <div className="p-6 rounded-2xl bg-(--bg-card) border border-(--border-color)">
                  <div className="flex items-center gap-3 mb-4">
                    <ServerIcon className="w-6 h-6 text-brand-blue" />
                    <h3 className="text-lg font-bold">Backend &amp; Data</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {backendTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-brand-blue/10 text-brand-blue text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {frontendTags.length > 0 && (
                <div className="p-6 rounded-2xl bg-(--bg-card) border border-(--border-color)">
                  <div className="flex items-center gap-3 mb-4">
                    <CodeIcon className="w-6 h-6 text-brand-violet" />
                    <h3 className="text-lg font-bold">Frontend &amp; UI</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {frontendTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-brand-violet/10 text-brand-violet text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Inquire Banner */}
            <div className="mt-12 p-8 rounded-3xl bg-linear-to-r from-brand-blue/10 via-brand-cyan/10 to-brand-violet/10 border border-brand-blue/30 text-center space-y-4">
              <h3 className="text-xl font-bold text-(--text-primary)">
                Have a similar challenge in your company?
              </h3>
              <p className="text-sm text-(--text-secondary) max-w-xl mx-auto">
                I can help analyze your requirements and implement a production-ready solution tailored to your workflow.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-blue text-white font-bold text-sm shadow-md shadow-brand-blue/25 hover:bg-brand-blue/90 transition-all"
              >
                <span>Start a Project</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation to More Projects */}
      <section className="section">
        <div className="container text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-violet transition-colors group"
          >
            <span>Explore All Projects</span>
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getProjects();

  const paths = projects.map((project: any) => ({
    params: { slug: project.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params?.slug) {
      return { notFound: true };
    }

    const project = await getProjectBySlug(params.slug as string);

    if (!project) {
      return { notFound: true };
    }

    return {
      props: {
        project: JSON.parse(JSON.stringify(project)),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return { notFound: true };
  }
};
