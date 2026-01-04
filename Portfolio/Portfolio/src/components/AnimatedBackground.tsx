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
      {/* Enhanced Gradient Mesh Background */}
      <div 
        className="absolute inset-0 blur-[100px] opacity-60"
        style={{
          background: `
            radial-gradient(at 10% 20%, rgba(99, 102, 241, 0.15) 0px, transparent 50%),
            radial-gradient(at 90% 10%, rgba(14, 165, 233, 0.12) 0px, transparent 50%),
            radial-gradient(at 80% 80%, rgba(139, 92, 246, 0.12) 0px, transparent 50%),
            radial-gradient(at 20% 90%, rgba(59, 130, 246, 0.1) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(168, 85, 247, 0.08) 0px, transparent 50%)
          `,
        }}
      />

      {/* Animated Gradient Orbs */}
      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, 150, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ 
          background: 'radial-gradient(circle, var(--color-brand-blue) 0%, transparent 70%)',
          top: '10%', 
          left: '10%',
          opacity: 0.2 // explicitly set opacity in style if needed for motion value, but here it's static
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
        animate={{
          x: [0, -120, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ 
          background: 'radial-gradient(circle, var(--color-brand-cyan) 0%, transparent 70%)',
          top: '50%', 
          right: '10%' 
        }}
      />

      {/* Ripple Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 select-none">
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              className="absolute rounded-full border border-primary-500/20 bg-primary-500/5"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.8],
                opacity: [0, ripple.opacity, 0],
              }}
              transition={{
                duration: 8,
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

      {/* Enhanced Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.03) 1.5px, transparent 1.5px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary-500/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
