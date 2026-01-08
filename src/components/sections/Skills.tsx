import { motion } from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaGitAlt,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiKubernetes,
} from 'react-icons/si';

const skillCategories = [
  {
    title: 'Backend Engineering',
    description: 'Primary Strength',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs /> },
      { name: 'Express.js', icon: <SiExpress /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'REST APIs', icon: <FaNodeJs /> },
    ],
  },
  {
    title: 'Databases & Caching',
    description: 'Data Layer',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'Redis', icon: <SiRedis /> },
    ],
  },
  {
    title: 'DevOps & Infrastructure',
    description: 'Deployment',
    skills: [
      { name: 'Docker', icon: <FaDocker /> },
      { name: 'Kubernetes', icon: <SiKubernetes /> },
      { name: 'AWS', icon: <FaAws /> },
      { name: 'Git', icon: <FaGitAlt /> },
    ],
  },
  {
    title: 'Frontend',
    description: 'Secondary',
    skills: [
      { name: 'React.js', icon: <FaReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section bg-black py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            TECHNICAL EXPERTISE
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to build production systems.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
