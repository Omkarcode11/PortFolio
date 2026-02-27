import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Custom404() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>404 - Page Not Found | Portfolio</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist."
        />
      </Head>

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-(--bg-primary)">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Orbs */}
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20 animate-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20 animate-pulse delay-700"
            style={{
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-[100px] opacity-15 animate-pulse delay-1000"
            style={{
              background:
                "radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Main Content */}
        <div className="container relative z-10 px-4">
          <div className="text-center max-w-4xl mx-auto animate-in fade-in duration-700">
            {/* 404 Number */}
            <div className="mb-8 relative animate-in zoom-in duration-500">
              <h1 className="text-[120px] md:text-[180px] lg:text-[240px] font-extrabold leading-none">
                <span
                  className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan via-brand-blue to-brand-violet animate-aurora"
                  style={{ backgroundSize: "200% 200%" }}
                >
                  404
                </span>
              </h1>
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full border-4 border-brand-blue/20 animate-ping opacity-20" />
            </div>

            {/* Error Message */}
            <div className="mb-12 animate-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-(--text-primary)">
                Page Not Found
              </h2>
              <p className="text-lg md:text-xl text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
                Oops! The page you&apos;re looking for seems to have wandered
                off into the digital void.
                <br className="hidden md:block" />
                Let&apos;s get you back on track.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
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
            </div>

            {/* Quick Links */}
            <div className="mt-16 animate-in slide-in-from-bottom-4 duration-500 delay-400 fill-mode-both">
              <p className="text-sm font-semibold text-(--text-secondary) mb-6 uppercase tracking-wider">
                Popular Pages
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { name: "Projects", href: "/projects" },
                  { name: "About", href: "/about" },
                  { name: "Articles", href: "/articles" },
                  { name: "API Docs", href: "/api-docs" },
                ].map((link, index) => (
                  <div
                    key={link.href}
                    className="animate-in fade-in zoom-in duration-300"
                    style={
                      {
                        animationDelay: `${0.5 + index * 0.1}s`,
                        fillMode: "both",
                      } as any
                    }
                  >
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-(--bg-secondary) border border-(--border-color) text-(--text-primary) hover:border-brand-blue/50 hover:text-brand-blue transition-all duration-300 font-medium text-sm hover:scale-105 active:scale-95"
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
                  </div>
                ))}
              </div>
            </div>

            {/* Fun Element */}
            <div className="mt-20 pt-8 border-t border-(--border-color) animate-in fade-in duration-500 delay-700 fill-mode-both">
              <p className="text-sm text-(--text-tertiary)">
                Error Code: 404 | Status: Lost in Space 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
