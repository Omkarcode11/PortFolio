import * as Icons from "../icons";

const skillCategories = [
  {
    title: "Backend Engineering",
    description: "Primary Strength",
    skills: [
      {
        name: "Node.js",
        icon: <Icons.NodejsIcon className="text-2xl text-[#339933]" />,
      },
      {
        name: "Express.js",
        icon: <Icons.ExpressIcon className="text-2xl" />,
      },
      {
        name: "TypeScript",
        icon: <Icons.TypeScriptIcon className="text-2xl" />,
      },
      {
        name: "REST APIs",
        icon: <Icons.ServerIcon className="text-2xl text-brand-blue" />,
      },
    ],
  },
  {
    title: "Databases & Caching",
    description: "Data Layer",
    skills: [
      {
        name: "MongoDB",
        icon: <Icons.MongodbIcon className="text-2xl text-[#47A248]" />,
      },
      {
        name: "PostgreSQL",
        icon: <Icons.PostgresqlIcon className="text-2xl text-[#336791]" />,
      },
      {
        name: "Redis",
        icon: <Icons.RedisIcon className="text-2xl text-[#DC382D]" />,
      },
    ],
  },
  {
    title: "DevOps & Infrastructure",
    description: "Deployment",
    skills: [
      {
        name: "Docker",
        icon: <Icons.DockerIcon className="text-2xl text-[#2496ED]" />,
      },
      {
        name: "Kubernetes",
        icon: <Icons.KubernetesIcon className="text-2xl text-[#326CE5]" />,
      },
      {
        name: "AWS",
        icon: <Icons.AWSIcon className="text-2xl text-[#FF9900]" />,
      },
      {
        name: "Git",
        icon: <Icons.GitIcon className="text-2xl text-[#F05032]" />,
      },
    ],
  },
  {
    title: "Frontend",
    description: "Secondary",
    skills: [
      {
        name: "React.js",
        icon: <Icons.ReactIcon className="text-2xl text-[#61DAFB]" />,
      },
      {
        name: "Next.js",
        icon: <Icons.NextjsIcon className="text-2xl" />,
      },
      {
        name: "Tailwind CSS",
        icon: <Icons.TailwindIcon className="text-2xl text-[#38B2AC]" />,
      },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section bg-black py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            TECHNICAL EXPERTISE
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to build production systems.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <div
              key={category.title}
              className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors"
            >
              {/* Category Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-500 uppercase tracking-wider">
                  {category.description}
                </p>
              </div>

              {/* Skills List */}
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-2xl text-cyan-400">{skill.icon}</span>
                    <span className="text-sm font-medium text-gray-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
