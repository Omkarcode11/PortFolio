import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 300px, hide when near the bottom contact section
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          setVisible(false);
          return;
        }
      }
      setVisible(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 lg:hidden animate-fade-in">
      <div className="p-2 rounded-2xl bg-(--bg-card)/90 backdrop-blur-xl border border-(--border-color) shadow-2xl flex items-center justify-between gap-3">
        <div className="pl-3 min-w-0">
          <div className="text-xs font-bold text-(--text-primary) truncate">
            Building a product or automation?
          </div>
          <div className="text-[11px] text-(--text-secondary) truncate">
            Available for select client projects
          </div>
        </div>

        <Link
          href="#contact"
          className="shrink-0 px-4 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold shadow-md shadow-brand-blue/30 active:scale-95 transition-all flex items-center gap-1.5"
        >
          <span>Start a Project</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
