"use client";

import { useEffect, useRef, useState } from "react";

interface PkgData {
  n: string;
  i: string;
  d: string;
  p: string[];
  ver: string;
  likes: string | number;
}

const staticPkgs: Omit<PkgData, "ver" | "likes">[] = [
  { n: "flutter_face_liveness", i: "👁️", d: "AI face liveness detection SDK — anti-spoofing with blink, smile & motion challenges.", p: ["Android", "iOS"] },
  { n: "flutter_any_download", i: "⬇️", d: "Powerful download manager with multi-threaded downloads, pause/resume & progress.", p: ["Android", "iOS"] },
  { n: "extensions_pro", i: "🧩", d: "Comprehensive Dart & Flutter extensions — string, list, number, date, context helpers.", p: ["Android", "iOS", "Web", "Desktop"] },
  { n: "sim_reader", i: "📱", d: "Read SIM card info: IMSI, ICCID, carrier name, phone number on Android.", p: ["Android"] },
  { n: "flutter_screenshot_blocker", i: "🔐", d: "Prevent screenshots & screen recording in your app for enhanced data security.", p: ["Android", "iOS"] },
  { n: "flutter_neumorphism_ui", i: "🎨", d: "Beautiful Neumorphism UI kit — soft-UI widgets, cards, buttons, and inputs.", p: ["Android", "iOS", "Web"] },
  { n: "flutter_shield", i: "🛡️", d: "Security hardening — root detection, emulator checks, tamper protection.", p: ["Android", "iOS"] },
  { n: "anti_screenshot_protection", i: "🕵️", d: "Advanced screenshot & screen-capture prevention with configurable behaviour.", p: ["Android", "iOS"] },
  { n: "navigation_rail_flutter", i: "🧭", d: "Enhanced NavigationRail with animations, badge support & full customisation.", p: ["Android", "iOS", "Web", "Desktop"] },
  { n: "flutter_chuck_inspection", i: "🔍", d: "In-app HTTP traffic inspector — view requests, responses & timing on-device.", p: ["Android", "iOS"] },
];

export default function Packages() {
  const [pkgs, setPkgs] = useState<PkgData[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const load = async () => {
      const results = await Promise.all(
        staticPkgs.map(async (pkg) => {
          let ver = "–", likes: string | number = "–";
          try {
            const [d, m] = await Promise.all([
              fetch(`https://pub.dev/api/packages/${pkg.n}`).then((r) => r.ok ? r.json() : null),
              fetch(`https://pub.dev/api/packages/${pkg.n}/metrics`).then((r) => r.ok ? r.json() : null),
            ]);
            if (d) ver = d.latest?.version || "–";
            if (m) likes = m.score?.likeCount ?? "–";
          } catch {
            // use defaults
          }
          return { ...pkg, ver, likes };
        })
      );
      setPkgs(results);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.querySelectorAll<HTMLElement>(".rv").forEach((el) => el.classList.add("in"));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [pkgs]);

  return (
    <section id="packages" className="section" ref={sectionRef}>
      <div className="section-label">
        <span className="num">04</span> Flutter Packages
        <a
          href="https://pub.dev/publishers/sanjaysharma.info/packages"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: ".68rem", color: "var(--t3)", marginLeft: "auto", marginRight: 0, display: "flex", alignItems: "center", gap: 5 }}
        >
          pub.dev →
        </a>
      </div>

      {loading ? (
        <div className="pkg-loader rv">
          <div className="spinner" />
          Fetching from pub.dev…
        </div>
      ) : (
        <div>
          {pkgs.map((pkg, i) => (
            <div key={pkg.n} className="pkg-row rv" style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="pkg-idx">{String(i + 1).padStart(2, "0")}</div>
              <div className="pkg-meta">
                <div className="pkg-name">{pkg.n}</div>
                <div className="pkg-info">
                  <span className="pkg-desc">{pkg.d}</span>
                  {pkg.p.map((plat) => (
                    <span key={plat} className="pkg-tag">{plat}</span>
                  ))}
                </div>
              </div>
              <div className="pkg-right">
                <span className="pkg-stat">v{pkg.ver}</span>
                <span className="pkg-stat">♥ {pkg.likes}</span>
                <a
                  href={`https://pub.dev/packages/${pkg.n}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pkg-link"
                >
                  pub.dev{" "}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
