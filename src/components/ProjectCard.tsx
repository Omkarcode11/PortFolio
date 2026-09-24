import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    tagline?: string;
    problem?: string;
    solution?: string;
    description: string;
    tags: string[];
    image: string;
    github?: string;
    link?: string;
    badge?: string;
    category?: string;
    isComingSoon?: boolean;
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isComingSoon = project.isComingSoon || project.slug === "ai-commerce-agent";

  return (
    <article className="transition-all duration-300">
      <Link href={`/projects/${project.slug}`}>
        <div className="group relative bg-(--bg-card) border border-(--border-color) rounded-3xl overflow-hidden cursor-pointer hover:-translate-y-1.5 hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300">
          {/* Image */}
          <div className="relative aspect-video overflow-hidden bg-(--bg-secondary)">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized={project.image?.endsWith(".svg") || project.image?.includes("placehold.co")}
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

            {/* Badges on image */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
              {project.badge && (
                <span
                  className={`px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wide backdrop-blur-md border ${
                    isComingSoon
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      : project.badge.includes("Professional")
                      ? "bg-brand-blue/20 text-blue-200 border-brand-blue/40"
                      : "bg-emerald-500/20 text-emerald-200 border-emerald-500/30"
                  }`}
                >
                  {project.badge}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Title & Tagline */}
            <h3 className="text-xl font-bold text-(--text-primary) mb-1.5 group-hover:text-brand-blue transition-colors">
              {project.title}
            </h3>

            {project.tagline && (
              <p className="text-xs font-semibold text-brand-blue mb-3">
                {project.tagline}
              </p>
            )}

            {/* Description / Summary */}
            <p className="text-sm text-(--text-secondary) mb-4 line-clamp-2 leading-relaxed">
              {project.problem ? `${project.problem} ${project.solution || ""}` : project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium text-(--text-secondary) bg-(--bg-secondary) rounded-lg border border-(--border-color)"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="px-2 py-1 text-xs font-medium text-(--text-tertiary) bg-(--bg-secondary) rounded-lg">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
