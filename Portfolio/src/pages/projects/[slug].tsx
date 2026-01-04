import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCode, FaServer, FaDatabase, FaCloud } from 'react-icons/fa';
import { getProjects, getProjectBySlug } from '../../lib/api';
import SEO from '../../components/SEO';
import { 
  generateSoftwareApplicationSchema, 
  generateProjectSchema, 
  generateBreadcrumbSchema,
  siteConfig 
} from '../../lib/seo';

interface ProjectDetail {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  createdAt: string;
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
          <p className="text-[var(--text-secondary)]">Loading project...</p>
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
            <p className="text-[var(--text-secondary)] mb-8">The project you're looking for doesn't exist.</p>
            <Link href="/projects" className="btn">
              Back to Projects
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Categorize tags for better display
  const frontendTags = project.tags.filter(tag => 
    ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'HTML', 'CSS', 'JavaScript'].some(tech => 
      tag.toLowerCase().includes(tech.toLowerCase())
    )
  );
  const backendTags = project.tags.filter(tag => 
    ['Node.js', 'Express', 'REST API', 'GraphQL', 'MongoDB', 'PostgreSQL', 'Redis'].some(tech => 
      tag.toLowerCase().includes(tech.toLowerCase())
    )
  );
  const devOpsTags = project.tags.filter(tag => 
    ['Docker', 'AWS', 'Kubernetes', 'CI/CD', 'Nginx', 'Linux'].some(tech => 
      tag.toLowerCase().includes(tech.toLowerCase())
    )
  );
  const otherTags = project.tags.filter(tag => 
    !frontendTags.includes(tag) && !backendTags.includes(tag) && !devOpsTags.includes(tag)
  );

  const projectKeywords = [
    project.title,
    ...project.tags,
    'Backend Developer Project',
    'Node.js Project',
    'Portfolio Project'
  ];

  return (
    <>
      <SEO
        title={`${project.title} | Backend Developer Portfolio | ${project.tags[0] || 'Project'}`}
        description={`${project.description} Built with ${project.tags.slice(0, 3).join(', ')}. Explore the architecture, implementation, and impact of this ${project.title.toLowerCase()} project.`}
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
            slug: project.slug
          }),
          generateProjectSchema({
            title: project.title,
            description: project.description,
            github: project.github,
            link: project.link,
            tags: project.tags,
            image: project.image,
            slug: project.slug,
            createdAt: project.createdAt
          }),
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Projects', url: '/projects' },
            { name: project.title, url: `/projects/${project.slug}` }
          ])
        ]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-violet/10 rounded-full blur-[120px] -z-10" />

        <div className="container relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-brand-blue transition-colors group"
            >
              <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Projects</span>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-2xl"
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-cyan/20 to-brand-violet/20">
                  <FaCode className="w-24 h-24 text-brand-blue/30" />
                </div>
              )}
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
                  {project.title}
                </h1>
                <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
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
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] hover:border-brand-blue/50 flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaGithub className="w-5 h-5" />
                    <span>View Code</span>
                  </motion.a>
                )}
                {project.link && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet text-white border-none shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaExternalLinkAlt className="w-5 h-5" />
                    <span>Live Demo</span>
                  </motion.a>
                )}
              </div>

              {/* Metadata */}
              {project.createdAt && (
                <div className="pt-4 border-t border-[var(--border-color)]">
                  <p className="text-sm text-[var(--text-tertiary)]">
                    Created: {new Date(project.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Breakdown */}
      {(frontendTags.length > 0 || backendTags.length > 0 || devOpsTags.length > 0) && (
        <section className="section bg-[var(--bg-secondary)]/30 border-y border-[var(--border-color)]">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8">Tech Stack</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {frontendTags.length > 0 && (
                  <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
                    <div className="flex items-center gap-3 mb-4">
                      <FaCode className="w-6 h-6 text-brand-cyan" />
                      <h3 className="text-xl font-bold">Frontend</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {frontendTags.map((tag) => (
                        <span key={tag} className="px-3 py-1.5 rounded-lg bg-brand-cyan/10 text-brand-cyan text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {backendTags.length > 0 && (
                  <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
                    <div className="flex items-center gap-3 mb-4">
                      <FaServer className="w-6 h-6 text-brand-blue" />
                      <h3 className="text-xl font-bold">Backend</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {backendTags.map((tag) => (
                        <span key={tag} className="px-3 py-1.5 rounded-lg bg-brand-blue/10 text-brand-blue text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {devOpsTags.length > 0 && (
                  <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
                    <div className="flex items-center gap-3 mb-4">
                      <FaCloud className="w-6 h-6 text-brand-violet" />
                      <h3 className="text-xl font-bold">DevOps & Infrastructure</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {devOpsTags.map((tag) => (
                        <span key={tag} className="px-3 py-1.5 rounded-lg bg-brand-violet/10 text-brand-violet text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {otherTags.length > 0 && (
                  <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
                    <div className="flex items-center gap-3 mb-4">
                      <FaDatabase className="w-6 h-6 text-brand-blue" />
                      <h3 className="text-xl font-bold">Other Technologies</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {otherTags.map((tag) => (
                        <span key={tag} className="px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-sm font-medium border border-[var(--border-color)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
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
              <FaArrowLeft className="w-4 h-4 rotate-180" />
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
    fallback: 'blocking', // Enable ISR for new projects
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
    console.error('Error fetching project:', error);
    return {
      notFound: true,
    };
  }
};

