import Link from "next/link";
import Image from "next/image";

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
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto">
            {/* Gradient border effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-full animate-gradient-shift" />
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
        </div>

        {/* Brand Name */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white tracking-wider">
            OMKAR SONAWANE
          </h2>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8">
          BUILDING DISTRIBUTED
          <br />
          <span
            className="bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent"
            style={{ backgroundSize: "200% 200%" }}
          >
            SYSTEMS
          </span>{" "}
          THAT SCALE.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12">
          Full-stack engineer specializing in high-performance backend
          architectures, distributed systems, and production-grade APIs. Expert
          in Node.js, TypeScript, and system design.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/projects">
            <button className="px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-105 w-full sm:w-auto">
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
        </div>
      </div>
    </section>
  );
}
