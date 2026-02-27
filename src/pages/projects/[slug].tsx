import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { getProjects, getProjectBySlug } from "../../lib/api";
import SEO from "../../components/SEO";
import {
  generateSoftwareApplicationSchema,
  generateProjectSchema,
  generateBreadcrumbSchema,
  siteConfig,
} from "../../lib/seo";

interface ProjectDetail {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
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
          <title>Project Not Found | Portfolio</title>
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

  // Categorize tags for better display
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
    ].some((tech) => tag.toLowerCase().includes(tech.toLowerCase())),
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
    ].some((tech) => tag.toLowerCase().includes(tech.toLowerCase())),
  );
  const devOpsTags = project.tags.filter((tag) =>
    ["Docker", "AWS", "Kubernetes", "CI/CD", "Nginx", "Linux"].some((tech) =>
      tag.toLowerCase().includes(tech.toLowerCase()),
    ),
  );
  const otherTags = project.tags.filter(
    (tag) =>
      !frontendTags.includes(tag) &&
      !backendTags.includes(tag) &&
      !devOpsTags.includes(tag),
  );

  const projectKeywords = [
    project.title,
    ...project.tags,
    "Backend Developer Project",
    "Node.js Project",
    "Portfolio Project",
  ];

  return (
    <>
      <SEO
        title={`${project.title} | Backend Developer Portfolio | ${project.tags[0] || "Project"}`}
        description={`${project.description} Built with ${project.tags.slice(0, 3).join(", ")}. Explore the architecture, implementation, and impact of this ${project.title.toLowerCase()} project.`}
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
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-violet/10 rounded-full blur-[120px] -z-10" />

        <div className="container relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-(--text-secondary) hover:text-brand-blue transition-colors group"
            >
              <i className="fa-solid fa-arrow-left w-4 h-4 group-hover:-translate-x-1 transition-transform"></i>
              <span className="font-medium">Back to Projects</span>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Image */}
            <div className="relative aspect-16/10 rounded-3xl overflow-hidden bg-(--bg-secondary) border border-(--border-color) shadow-2xl">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-brand-cyan/20 to-brand-violet/20">
                  <i className="fa-solid fa-code text-5xl text-brand-blue/30"></i>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
                  {project.title}
                </h1>
                <p className="text-xl text-(--text-secondary) leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 pt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-semibold border border-brand-blue/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-(--bg-primary) text-(--text-primary) border border-(--border-color) hover:bg-(--bg-secondary) hover:border-brand-blue/50 flex items-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <i className="fa-brands fa-github text-xl"></i>
                    <span>View Code</span>
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-linear-to-r from-brand-cyan via-brand-blue to-brand-violet text-white border-none shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square text-lg"></i>
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Breakdown */}
      {(frontendTags.length > 0 ||
        backendTags.length > 0 ||
        devOpsTags.length > 0) && (
        <section className="section bg-(--bg-secondary)/30 border-y border-(--border-color)">
          <div className="container">
            <div>
              <h2 className="text-3xl font-bold mb-8">Tech Stack</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {frontendTags.length > 0 && (
                  <div className="p-6 rounded-2xl bg-(--bg-card) border border-(--border-color)">
                    <div className="flex items-center gap-3 mb-4">
                      <i className="fa-solid fa-code text-2xl text-brand-cyan"></i>
                      <h3 className="text-xl font-bold">Frontend</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {frontendTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-lg bg-brand-cyan/10 text-brand-cyan text-sm font-medium"
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
                      <i className="fa-solid fa-server text-2xl text-brand-blue"></i>
                      <h3 className="text-xl font-bold">Backend</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {backendTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-lg bg-brand-blue/10 text-brand-blue text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {devOpsTags.length > 0 && (
                  <div className="p-6 rounded-2xl bg-(--bg-card) border border-(--border-color)">
                    <div className="flex items-center gap-3 mb-4">
                      <i className="fa-solid fa-cloud text-2xl text-brand-violet"></i>
                      <h3 className="text-xl font-bold">
                        DevOps & Infrastructure
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {devOpsTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-lg bg-brand-violet/10 text-brand-violet text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {otherTags.length > 0 && (
                  <div className="p-6 rounded-2xl bg-(--bg-card) border border-(--border-color)">
                    <div className="flex items-center gap-3 mb-4">
                      <i className="fa-solid fa-database text-2xl text-brand-blue"></i>
                      <h3 className="text-xl font-bold">Other Technologies</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {otherTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-lg bg-(--bg-secondary) text-(--text-secondary) text-sm font-medium border border-(--border-color)"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">More Projects</h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-violet transition-colors font-medium"
            >
              View All Projects
              <i className="fa-solid fa-arrow-left w-4 h-4 rotate-180"></i>
            </Link>
          </div>
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
    fallback: "blocking", // Enable ISR for new projects
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params?.slug) {
      return {
        notFound: true,
      };
    }

    const project = await getProjectBySlug(params.slug as string);

    if (!project) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        project: JSON.parse(JSON.stringify(project)),
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return {
      notFound: true,
    };
  }
};
