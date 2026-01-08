import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-violet-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 text-center px-6 max-w-7xl mx-auto">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 mx-auto">
            {/* Gradient border effect */}
            <div className="absolute inset-[-4px] bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-full animate-gradient-shift" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-black shadow-2xl">
              <Image
                src="/695d03a731783_download.jpg"
                alt="Omkar Sonawane - Full Stack Engineer"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white tracking-wider">
            OMKAR SONAWANE
          </h2>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8"
        >
          BUILDING DISTRIBUTED
          <br />
          <span 
            className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent"
            style={{ backgroundSize: '200% 200%' }}
          >
            SYSTEMS
          </span>{' '}
          THAT SCALE.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12"
        >
          Full-stack engineer specializing in high-performance backend
          architectures, distributed systems, and production-grade APIs.
          Expert in Node.js, TypeScript, and system design.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/projects">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              View Projects
            </button>
          </Link>
          <a 
            href="https://drive.google.com/uc?export=download&id=1XZDKxASreLIoy2nrLmduwrhmB4pxDLdy" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-xl border border-gray-700 hover:border-blue-500 hover:bg-gray-900 transition-all duration-300 w-full sm:w-auto">
              Download Resume
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
