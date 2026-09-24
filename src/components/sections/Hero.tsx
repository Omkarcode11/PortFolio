import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ArchitectureVisualization from "../ArchitectureVisualization";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("omkarsonawaneomkar2@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = "mailto:omkarsonawaneomkar2@gmail.com";
    }
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center pt-20 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-(--bg-primary)"
    >
      {/* Ambient Aurora Effect - Bound within section to avoid mobile horizontal scroll */}
      <div 
        className="absolute top-[-10%] right-[-10%] w-[260px] sm:w-[450px] md:w-[650px] h-[260px] sm:h-[450px] md:h-[650px] bg-brand-cyan/15 rounded-full blur-[70px] sm:blur-[110px] -z-10 pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-[-10%] left-[-10%] w-[260px] sm:w-[400px] md:w-[600px] h-[260px] sm:h-[400px] md:h-[600px] bg-brand-violet/15 rounded-full blur-[70px] sm:blur-[110px] -z-10 pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 sm:opacity-15 -z-10" 
        aria-hidden="true" 
      />

      <div className="container relative z-10 px-4 sm:px-6 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Hero Value Proposition */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 sm:space-y-6">
            
            {/* Live Availability Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 backdrop-blur-md shadow-xs max-w-full">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500" />
              </span>
              <span className="text-[11px] sm:text-xs md:text-sm font-bold text-emerald-600 dark:text-emerald-400 tracking-wide truncate">
                Available for Projects &amp; Contracts • Q1/Q2
              </span>
              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-emerald-500/40" />
              <span className="hidden sm:inline-block text-[11px] font-semibold text-(--text-secondary)">
                &lt; 4h reply
              </span>
            </div>

            {/* Profile Avatar with Verified Developer Badge - Centered on Mobile, Left-aligned on Desktop */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-linear-to-tr from-brand-cyan via-brand-blue to-brand-violet shadow-md shadow-brand-blue/20 shrink-0">
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-(--bg-primary)">
                  <Image
                    src="/695d03a731783_download.jpg"
                    alt="Omkar Sonawane - Freelance AI and Full-Stack Developer"
                    width={80}
                    height={80}
                    priority
                    className="object-cover w-full h-full"
                  />
                </div>
                <div 
                  className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-brand-blue border-2 border-(--bg-primary) flex items-center justify-center text-white text-[10px] font-black"
                  title="Verified Full-Stack &amp; AI Engineer"
                  aria-label="Verified Engineer"
                >
                  ✓
                </div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-(--text-primary) tracking-tight">
                  Omkar Sonawane
                </div>
                <div className="text-xs sm:text-sm font-semibold text-brand-blue">
                  AI • Shopify • Node.js • Automation
                </div>
                <div className="text-[11px] text-(--text-secondary) flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Bengaluru, India • Available Globally</span>
                </div>
              </div>
            </div>

            {/* Main SEO Heading */}
            <div className="space-y-3 sm:space-y-4 max-w-2xl">
              <h1 
                id="hero-heading"
                className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.16] sm:leading-[1.1] tracking-tight text-(--text-primary) break-words"
              >
                <span>I Build </span>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan via-brand-blue to-brand-violet">
                  AI-Powered Applications
                </span>
                <br className="hidden sm:inline" />{" "}
                <span>Shopify &amp; Business Automation</span>
              </h1>

              {/* Subheading / Value Proposition */}
              <p className="text-sm sm:text-base md:text-lg text-(--text-secondary) font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                I help startups, e-commerce brands, and business operators build custom AI applications, sub-second Shopify storefronts (<strong className="font-semibold text-(--text-primary)">&lt;1s load time</strong>), scalable Node.js backends, and end-to-end automation workflows that eliminate manual work.
              </p>
            </div>

            {/* CTA Buttons Cluster - Mobile-Optimized Layout */}
            <div className="w-full sm:w-auto flex flex-col gap-2.5 pt-1">
              {/* Primary Action Button */}
              <Link
                href="#contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-sm sm:text-base shadow-lg shadow-brand-blue/30 hover:shadow-brand-blue/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                aria-label="Start a project with Omkar Sonawane"
              >
                <span>Start a Project</span>
                <span aria-hidden="true">→</span>
              </Link>

              {/* Secondary Actions in 2-Column Grid on Mobile */}
              <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-3 w-full">
                <Link
                  href="#case-studies"
                  className="px-4 py-3 rounded-full bg-(--bg-card) text-(--text-primary) border border-(--border-color) hover:border-brand-blue/40 hover:bg-(--bg-secondary) font-bold text-xs sm:text-sm flex items-center justify-center transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                  aria-label="View in-depth engineering case studies"
                >
                  Case Studies
                </Link>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-4 py-3 rounded-full bg-(--bg-secondary) hover:bg-(--bg-tertiary) text-(--text-secondary) hover:text-(--text-primary) border border-(--border-color) font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 active:scale-[0.98]"
                  aria-label="Copy email address to clipboard"
                  title="Copy omkarsonawaneomkar2@gmail.com"
                >
                  <span>{copied ? "✓ Copied!" : "📋 Copy Email"}</span>
                </button>
              </div>
            </div>

            {/* Verified Performance Metrics Strip - Clean 2x2 on Mobile */}
            <div className="pt-2 w-full max-w-xl">
              <div className="text-[10px] sm:text-[11px] font-bold text-(--text-tertiary) uppercase tracking-wider mb-2 text-center lg:text-left">
                Verified Production Outcomes
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-(--bg-secondary)/70 border border-(--border-color) text-center hover:border-brand-cyan/40 transition-colors">
                  <div className="text-base sm:text-xl font-black text-brand-cyan">
                    &lt; 1s
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-medium text-(--text-secondary) mt-0.5 leading-tight">
                    Shopify Speed (3.2s → &lt;1s)
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-(--bg-secondary)/70 border border-(--border-color) text-center hover:border-emerald-400/40 transition-colors">
                  <div className="text-base sm:text-xl font-black text-emerald-500 dark:text-emerald-400">
                    -60%
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-medium text-(--text-secondary) mt-0.5 leading-tight">
                    API Latency (Redis)
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-(--bg-secondary)/70 border border-(--border-color) text-center hover:border-brand-violet/40 transition-colors">
                  <div className="text-base sm:text-xl font-black text-brand-violet">
                    85%
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-medium text-(--text-secondary) mt-0.5 leading-tight">
                    Workflow Hours Saved
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-(--bg-secondary)/70 border border-(--border-color) text-center hover:border-brand-blue/40 transition-colors">
                  <div className="text-base sm:text-xl font-black text-brand-blue">
                    750+
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-medium text-(--text-secondary) mt-0.5 leading-tight">
                    LeetCode Algorithmic
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Domain Anchors */}
            <div className="pt-1 text-[11px] sm:text-xs font-semibold text-(--text-tertiary) flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 sm:gap-x-3 gap-y-1">
              <Link href="#services" className="hover:text-brand-blue transition-colors">
                AI Solutions
              </Link>
              <span aria-hidden="true">•</span>
              <Link href="#shopify-experience" className="hover:text-brand-blue transition-colors">
                Shopify Development
              </Link>
              <span aria-hidden="true">•</span>
              <Link href="#work" className="hover:text-brand-blue transition-colors">
                Node.js &amp; APIs
              </Link>
              <span aria-hidden="true">•</span>
              <Link href="#case-studies" className="hover:text-brand-blue transition-colors">
                Automation Pipelines
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Product Console Visualizer */}
          <div className="relative w-full max-w-full overflow-hidden flex items-center justify-center pt-2 sm:pt-0">
            <ArchitectureVisualization />
          </div>

        </div>
      </div>
    </section>
  );
}
