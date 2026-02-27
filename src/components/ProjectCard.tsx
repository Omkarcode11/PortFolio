import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    github?: string;
    link?: string;
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="transition-all duration-300">
      <Link href={`/projects/${project.slug}`}>
        <div className="group relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300">
          {/* Gradient Border on Hover */}
          <div className="absolute -inset-px bg-linear-to-br from-cyan-500/30 to-violet-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized={project.image?.includes("placehold.co")}
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent opacity-60" />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Category Badge */}
            <span className="inline-block px-3 py-1 text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
              Backend System
            </span>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium text-gray-300 bg-gray-800 rounded-md"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="px-2.5 py-1 text-xs font-medium text-gray-500 bg-gray-800 rounded-md">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </Link>
    </article>
  );
}
