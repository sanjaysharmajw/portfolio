"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Packages", href: "#packages", id: "packages" },
  { label: "Apps", href: "#apps", id: "apps" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(saved ? saved === "dark" : prefersDark);

    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = links.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#hero" className="nav-logo">
          SS<span className="dot">.</span>
        </a>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className={activeId === l.id ? "nav-active" : ""}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button className="nav-theme" onClick={toggleTheme} aria-label="Toggle theme">
            {dark ? "☀" : "☾"}
          </button>
          <a href="#contact" className="nav-hire">
            Let&apos;s Talk →
          </a>
          <a
            href="https://drive.google.com/file/d/1UX5XPnQTsxgHAKVDzSBviEfp3oOFPpfm/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-hire"
          >
            Resume ⬇
          </a>
          <a href="mailto:sanjaysharmajw@gmail.com" className="nav-hire">
            Hire Me →
          </a>
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Scroll progress bar */}
        <div className="nav-progress" style={{ width: `${progress}%` }} />
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>
              ✕
            </button>
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
