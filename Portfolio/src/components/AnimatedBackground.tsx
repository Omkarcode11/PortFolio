import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const ripples = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    size: 600 + i * 120,
    opacity: 0.4 - i * 0.04,
    delay: i * 0.06,
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Mesh Background */}
      <div 
        className="absolute inset-0 blur-[60px]"
        style={{
          background: `
            radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.08) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(14, 165, 233, 0.08) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.08) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.08) 0px, transparent 50%)
          `,
        }}
      />

      {/* Ripple Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 select-none">
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              className="absolute rounded-full border border-primary-500/25 bg-primary-500/10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.5],
                opacity: [0, ripple.opacity, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: ripple.delay,
              }}
              style={{
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Subtle Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          maskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)',
        }}
      />

      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
