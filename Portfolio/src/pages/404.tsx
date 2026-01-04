import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Custom404() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>404 - Page Not Found | Portfolio</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Head>

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[var(--bg-primary)]">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-[100px] opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, 80, 0],
              y: [0, -80, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Main Content */}
        <div className="container relative z-10 px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            {/* 404 Number */}
            <motion.div
              variants={numberVariants}
              className="mb-8 relative"
            >
              <h1 className="text-[120px] md:text-[180px] lg:text-[240px] font-extrabold leading-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet animate-aurora" style={{ backgroundSize: '200% 200%' }}>
                  404
                </span>
              </h1>
              {/* Decorative elements */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full border-4 border-brand-blue/20"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            {/* Error Message */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--text-primary)]">
                Page Not Found
              </h2>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                Oops! The page you&apos;re looking for seems to have wandered off into the digital void.
                <br className="hidden md:block" />
                Let&apos;s get you back on track.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link href="/" className="btn group">
                <svg
                  className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>Go Home</span>
              </Link>

              <button
                onClick={() => router.back()}
                className="btn btn-outline group"
              >
                <svg
                  className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>Go Back</span>
              </button>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="mt-16">
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-6 uppercase tracking-wider">
                Popular Pages
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { name: 'Projects', href: '/projects' },
                  { name: 'About', href: '/about' },
                  { name: 'Articles', href: '/articles' },
                  { name: 'API Docs', href: '/api-docs' },
                ].map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-brand-blue/50 hover:text-brand-blue transition-all duration-300 font-medium text-sm"
                    >
                      {link.name}
                      <svg
                        className="w-4 h-4 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Fun Element */}
            <motion.div
              variants={itemVariants}
              className="mt-20 pt-8 border-t border-[var(--border-color)]"
            >
              <p className="text-sm text-[var(--text-tertiary)]">
                Error Code: 404 | Status: Lost in Space 🚀
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

