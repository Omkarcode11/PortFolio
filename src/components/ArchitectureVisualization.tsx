
import { motion } from 'framer-motion';
import { FaNodeJs } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiPostgresql } from 'react-icons/si';

interface ArchitectureVisualizationProps {
  prefersReducedMotion: boolean;
}

export default function ArchitectureVisualization({ prefersReducedMotion }: ArchitectureVisualizationProps) {
  return (
    <div className="relative hidden lg:block h-[600px] w-full perspective-1000 group">
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, rotateY: 15, x: 50 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, rotateY: -5, x: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 1, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center transform hover:scale-[1.02] transition-transform duration-500 ease-out"
      >
        {/* System Architecture Panel */}
        <div className="relative w-[500px] h-[380px] bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl shadow-brand-blue/10 z-20 overflow-hidden">
          {/* Terminal Header */}
          <div className="h-12 border-b border-white/10 flex items-center px-6 gap-2 bg-white/5">
            <div className="w-3 h-3 rounded-full bg-red-400 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-green-400 opacity-80" />
            <span className="ml-4 text-xs text-white/60 font-mono">system-architecture.json</span>
          </div>
          
          {/* Architecture Visualization */}
          <div className="p-6 space-y-4">
            {/* API Layer */}
            <div className="h-20 rounded-xl bg-gradient-to-r from-brand-cyan/30 to-brand-blue/30 border border-white/20 flex items-center justify-center relative overflow-hidden group/api">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              <div className="relative z-10 text-center">
                <div className="text-xs font-mono text-white/90 mb-1">API Gateway</div>
                <div className="text-[10px] text-white/60 font-mono">10K+ req/s • &lt;100ms latency</div>
              </div>
            </div>
            
            {/* Service Layer */}
            <div className="grid grid-cols-2 gap-3">
              <div className="h-24 rounded-xl bg-white/10 border border-white/10 flex flex-col items-center justify-center relative group/service">
                <FaNodeJs size={24} className="text-brand-blue mb-2 group-hover/service:scale-110 transition-transform" />
                <div className="text-[10px] font-mono text-white/70">Service A</div>
                <div className="text-[9px] text-white/50 font-mono mt-1">Node.js</div>
              </div>
              <div className="h-24 rounded-xl bg-white/10 border border-white/10 flex flex-col items-center justify-center relative group/service">
                <SiMongodb size={24} className="text-brand-cyan mb-2 group-hover/service:scale-110 transition-transform" />
                <div className="text-[10px] font-mono text-white/70">Service B</div>
                <div className="text-[9px] text-white/50 font-mono mt-1">Database</div>
              </div>
            </div>

            {/* Database Layer */}
            <div className="h-16 rounded-xl bg-gradient-to-r from-brand-violet/20 to-brand-blue/20 border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs font-mono text-white/80 mb-1">Distributed Cache • Message Queue</div>
                <div className="text-[10px] text-white/50 font-mono">Redis • RabbitMQ</div>
              </div>
            </div>

            {/* Connection Lines Animation */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <svg className="w-full h-full">
                <motion.path
                  d="M 80 100 Q 250 150 420 100"
                  stroke="rgba(59, 130, 246, 0.5)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </div>
          </div>

          {/* Hover Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-white/40 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            Hover to explore architecture
          </div>
        </div>

        {/* Floating Tech Icons */}
        <motion.div
          className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-brand-violet to-brand-blue rounded-xl z-30 shadow-lg border border-white/10 flex items-center justify-center text-white"
          animate={prefersReducedMotion ? {} : { y: [0, -15, 0] }}
          transition={prefersReducedMotion ? {} : {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          title="TypeScript"
          aria-label="TypeScript"
          role="img"
        >
          <SiTypescript size={32} className="drop-shadow-md" />
        </motion.div>

        <motion.div
          className="absolute -bottom-5 -left-5 w-20 h-20 bg-gradient-to-br from-brand-cyan to-brand-blue rounded-full z-30 shadow-lg border border-white/10 flex items-center justify-center text-white"
          animate={prefersReducedMotion ? {} : { y: [0, 15, 0] }}
          transition={prefersReducedMotion ? {} : {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          title="Node.js"
          aria-label="Node.js"
          role="img"
        >
          <FaNodeJs size={32} className="drop-shadow-md" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 -right-8 w-16 h-16 bg-gradient-to-br from-brand-blue/80 to-brand-cyan/80 rounded-lg z-30 shadow-lg border border-white/10 flex items-center justify-center text-white"
          animate={prefersReducedMotion ? {} : { rotate: [0, 10, -10, 0] }}
          transition={prefersReducedMotion ? {} : {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          title="Database"
          aria-label="PostgreSQL Database"
          role="img"
        >
          <SiPostgresql size={24} className="drop-shadow-md" />
        </motion.div>

        {/* Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-blue/20 blur-[100px] rounded-full -z-10" />
      </motion.div>
    </div>
  );
}
