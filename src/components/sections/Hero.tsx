import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-(--bg-primary) overflow-hidden pt-24 pb-16">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-violet-500/15 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Profile Image */}
        <div className="mb-6">
          <div className="relative w-28 h-28 mx-auto">
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-full animate-gradient-shift" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-(--bg-primary) shadow-2xl">
              <Image
                src="/695d03a731783_download.jpg"
                alt="Omkar Sonawane - AI & Full-Stack Developer"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Eyebrow */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20">
          <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
          <span className="text-xs sm:text-sm font-bold text-brand-blue tracking-wide">
            AI • Shopify • Node.js • Business Automation
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-(--text-primary) leading-tight mb-6 tracking-tight">
          I Build{" "}
          <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
            AI-Powered Applications
          </span>
          <br />
          &amp; Business Automation
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-(--text-secondary) max-w-3xl mx-auto mb-8 leading-relaxed">
          I help startups and businesses build AI applications, Shopify solutions, scalable backend systems, dashboards and custom automation using modern web technologies.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <Link href="/#contact">
            <button className="px-8 py-4 bg-brand-blue text-white font-bold rounded-full hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 transition-all duration-300 w-full sm:w-auto cursor-pointer">
              Start a Project
            </button>
          </Link>
          <Link href="/#work">
            <button className="px-8 py-4 bg-(--bg-card) text-(--text-primary) font-bold rounded-full border border-(--border-color) hover:border-brand-blue/40 hover:bg-(--bg-secondary) transition-all duration-300 w-full sm:w-auto cursor-pointer">
              View My Work
            </button>
          </Link>
        </div>

        {/* Credibility Line */}
        <p className="text-xs sm:text-sm font-semibold text-(--text-tertiary)">
          Full-Stack Development • AI Integrations • Shopify • APIs • Automation
        </p>
      </div>
    </section>
  );
}
