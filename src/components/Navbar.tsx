import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "../hooks/useTheme";
import { useState, useEffect, useRef } from "react";

interface NavLink {
  name: string;
  path: string;
  section?: string;
}

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detect active section based on scroll position
      if (router.pathname === "/") {
        const sections = [
          "hero",
          "services",
          "work",
          "experience",
          "case-studies",
          "process",
          "technology",
          "about",
          "contact",
        ];
        const scrollPosition = window.scrollY + 180;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i]);
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [router.pathname]);

  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  const navLinks: NavLink[] = [
    { name: "Services", path: "/#services", section: "services" },
    { name: "Work", path: "/#work", section: "work" },
    { name: "Experience", path: "/#experience", section: "experience" },
    { name: "Case Studies", path: "/#case-studies", section: "case-studies" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/#contact", section: "contact" },
  ];

  if (!mounted) return null;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-(--nav-blur)/95 border-b border-(--border-color)/80 shadow-sm"
          : "backdrop-blur-md bg-(--nav-blur)/80 border-b border-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-(--nav-height) px-6 lg:px-8 max-w-[1400px] mx-auto">
        {/* Brand Logo */}
        <Link href="/" className="relative z-10 group" aria-label="Omkar Sonawane Home">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-brand-cyan via-brand-blue to-brand-violet flex items-center justify-center text-white font-extrabold text-base shadow-sm group-hover:scale-105 transition-transform">
              OS
            </div>
            <div>
              <div className="text-base sm:text-lg font-extrabold tracking-tight text-(--text-primary) font-heading leading-tight">
                Omkar Sonawane
              </div>
              <div className="text-[11px] font-semibold text-brand-blue tracking-wide">
                AI &amp; Full-Stack Developer
              </div>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              (router.pathname === link.path && !link.section) ||
              (router.pathname === "/" && link.section && activeSection === link.section);

            return (
              <Link key={link.name} href={link.path} className="relative group">
                <div
                  className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "text-brand-blue"
                      : "text-(--text-secondary) hover:text-(--text-primary)"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <div className="absolute inset-0 rounded-lg bg-brand-blue/10 border border-brand-blue/20" />
                  )}
                </div>
              </Link>
            );
          })}

          <div className="w-px h-5 bg-(--border-color) mx-2" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl border border-(--border-color) flex items-center justify-center text-sm cursor-pointer transition-colors hover:border-brand-blue/50 hover:bg-(--bg-secondary) text-(--text-primary)"
            aria-label="Toggle Dark Mode"
          >
            <span>{theme === "light" ? "🌙" : "☀️"}</span>
          </button>

          {/* Persistent CTA Button */}
          <Link
            href="/#contact"
            className="ml-3 px-5 py-2.5 rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs tracking-wide shadow-md shadow-brand-blue/25 hover:shadow-brand-blue/40 transition-all active:scale-95"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/#contact"
            className="px-3 py-1.5 rounded-full bg-brand-blue text-white text-xs font-bold shadow-xs"
          >
            Start a Project
          </Link>

          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg border border-(--border-color) flex items-center justify-center text-xs text-(--text-primary)"
            aria-label="Toggle Theme"
          >
            <span>{theme === "light" ? "🌙" : "☀️"}</span>
          </button>

          <button
            className="p-2 rounded-lg hover:bg-(--bg-secondary) transition-colors text-(--text-primary)"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            <div className="flex flex-col gap-1.5 w-5">
              <span
                className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-[6px]" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-[6px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="lg:hidden fixed top-[72px] left-0 right-0 z-50 bg-(--bg-card) border-b border-(--border-color) shadow-2xl p-5">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="py-3 px-4 rounded-xl text-base font-semibold text-(--text-primary) hover:bg-(--bg-secondary) transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-brand-blue">→</span>
                </Link>
              ))}

              <div className="pt-4 mt-2 border-t border-(--border-color)">
                <Link
                  href="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 rounded-full bg-brand-blue text-white font-bold text-sm text-center block shadow-md shadow-brand-blue/20"
                >
                  Start a Project
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
