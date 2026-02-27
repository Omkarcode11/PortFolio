const skillCategories = [
  {
    title: "Backend Engineering",
    description: "Primary Strength",
    skills: [
      {
        name: "Node.js",
        icon: <i className="devicon-nodejs-plain text-2xl coloured"></i>,
      },
      {
        name: "Express.js",
        icon: <i className="devicon-express-original text-2xl"></i>,
      },
      {
        name: "TypeScript",
        icon: <i className="devicon-typescript-plain text-2xl coloured"></i>,
      },
      {
        name: "REST APIs",
        icon: <i className="fa-solid fa-server text-2xl text-brand-blue"></i>,
      },
    ],
  },
  {
    title: "Databases & Caching",
    description: "Data Layer",
    skills: [
      {
        name: "MongoDB",
        icon: <i className="devicon-mongodb-plain text-2xl coloured"></i>,
      },
      {
        name: "PostgreSQL",
        icon: <i className="devicon-postgresql-plain text-2xl coloured"></i>,
      },
      {
        name: "Redis",
        icon: <i className="devicon-redis-plain text-2xl coloured"></i>,
      },
    ],
  },
  {
    title: "DevOps & Infrastructure",
    description: "Deployment",
    skills: [
      {
        name: "Docker",
        icon: <i className="devicon-docker-plain text-2xl coloured"></i>,
      },
      {
        name: "Kubernetes",
        icon: <i className="devicon-kubernetes-plain text-2xl coloured"></i>,
      },
      {
        name: "AWS",
        icon: (
          <i className="devicon-amazonwebservices-original text-2xl coloured"></i>
        ),
      },
      {
        name: "Git",
        icon: <i className="devicon-git-plain text-2xl coloured"></i>,
      },
    ],
  },
  {
    title: "Frontend",
    description: "Secondary",
    skills: [
      {
        name: "React.js",
        icon: <i className="devicon-react-original text-2xl coloured"></i>,
      },
      {
        name: "Next.js",
        icon: <i className="devicon-nextjs-original text-2xl"></i>,
      },
      {
        name: "Tailwind CSS",
        icon: <i className="devicon-tailwindcss-plain text-2xl coloured"></i>,
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
