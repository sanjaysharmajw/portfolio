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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 961px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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
          {isDesktop && (
            <>
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
            </>
          )}
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
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed", inset: 0,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
                zIndex: 998,
              }}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: "min(320px, 85vw)",
                background: "#0C0C0B",
                zIndex: 999,
                display: "flex", flexDirection: "column",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 28px" }}>
                <span style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: "1rem", color: "#fff", letterSpacing: "-.02em" }}>
                  SS<span style={{ color: "var(--lime)" }}>.</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{
                    width: 34, height: 34, borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.7)", fontSize: ".85rem", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "transparent",
                  }}
                >✕</button>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

              {/* Links */}
              <nav style={{ display: "flex", flexDirection: "column", flex: 1, padding: "8px 0" }}>
                {links.map((l, i) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "15px 28px",
                      fontFamily: "var(--fd)", fontSize: "1.25rem", fontWeight: 700,
                      color: activeId === l.id ? "var(--lime)" : "rgba(255,255,255,0.35)",
                      borderLeft: activeId === l.id ? "2px solid var(--lime)" : "2px solid transparent",
                      textDecoration: "none",
                      transition: "all .2s",
                    }}
                  >
                    <span style={{ fontFamily: "var(--fm)", fontSize: ".58rem", color: "var(--lime)", opacity: .7, minWidth: 18 }}>
                      0{i + 1}
                    </span>
                    {l.label}
                    <span style={{ marginLeft: "auto", fontSize: ".85rem", opacity: .4 }}>→</span>
                  </motion.a>
                ))}
              </nav>

              {/* Footer */}
              <div style={{ padding: "0 28px 36px" }}>
                <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 20 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                  <a
                    href="#contact"
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      padding: "12px 20px", borderRadius: 100,
                      background: "var(--lime)", color: "#000",
                      fontSize: ".82rem", fontWeight: 600, textDecoration: "none",
                    }}
                  >Let&apos;s Talk →</a>
                  <a
                    href="https://drive.google.com/file/d/1UX5XPnQTsxgHAKVDzSBviEfp3oOFPpfm/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      padding: "12px 20px", borderRadius: 100,
                      border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)",
                      fontSize: ".82rem", fontWeight: 600, textDecoration: "none",
                    }}
                  >Resume ⬇</a>
                </div>
                <div style={{ display: "flex", gap: 20 }}>
                  {[
                    { label: "GitHub", href: "https://github.com/sanjaysharmajw" },
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/sanjaydeveloper/" },
                    { label: "YouTube", href: "https://www.youtube.com/@CodeWithIDE" },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: ".72rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
