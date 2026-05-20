"use client";

import { useEffect, useRef } from "react";
import {
  SiFlutter, SiDart, SiAndroid, SiKotlin,
  SiSwift, SiNodedotjs, SiSpring,
  SiFirebase, SiTensorflow, SiDocker,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbApi, TbWifi } from "react-icons/tb";
import { BiBrain } from "react-icons/bi";
import type { IconType } from "react-icons";

const CIRC = 2 * Math.PI * 16;

const skillsData: { icon: IconType; color: string; name: string; cat: string; pct: number }[] = [
  { icon: SiFlutter,    color: "#54C5F8", name: "Flutter",     cat: "Mobile",      pct: 97 },
  { icon: SiDart,       color: "#00B4AB", name: "Dart",        cat: "Language",    pct: 96 },
  { icon: SiAndroid,    color: "#3DDC84", name: "Android",     cat: "Native",      pct: 95 },
  { icon: SiKotlin,     color: "#7F52FF", name: "Kotlin",      cat: "Language",    pct: 92 },
  { icon: FaJava,       color: "#ED8B00", name: "Java",        cat: "Language",    pct: 88 },
  { icon: SiSwift,      color: "#F05138", name: "SwiftUI",     cat: "iOS",         pct: 75 },
  { icon: SiNodedotjs,  color: "#5FA04E", name: "Node.js",     cat: "Backend",     pct: 85 },
  { icon: SiSpring,     color: "#6DB33F", name: "Spring Boot", cat: "Backend",     pct: 80 },
  { icon: SiFirebase,   color: "#FFCA28", name: "Firebase",    cat: "Cloud",       pct: 93 },
  { icon: SiTensorflow, color: "#FF6F00", name: "TensorFlow",  cat: "AI/ML",       pct: 82 },
  { icon: BiBrain,      color: "#4285F4", name: "ML Kit",      cat: "AI/ML",       pct: 88 },
  { icon: TbWifi,       color: "#00B4AB", name: "WebRTC",      cat: "Real-time",   pct: 82 },
  { icon: TbApi,        color: "#6366F1", name: "REST APIs",   cat: "Integration", pct: 95 },
  { icon: SiDocker,     color: "#2496ED", name: "Docker",      cat: "DevOps",      pct: 73 },
];

export default function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.querySelectorAll<HTMLElement>(".rv").forEach((el) => el.classList.add("in"));
          // Animate rings
          entry.target.querySelectorAll<SVGCircleElement>(".ring-fill").forEach((circle) => {
            const offset = parseFloat(circle.dataset.offset || "0");
            circle.style.strokeDashoffset = String(offset);
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.05 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section">
      <div className="section-label">
        <span className="num">02</span> Skills
      </div>

      <div className="skills-grid" ref={gridRef}>
        {skillsData.map((s, i) => {
          const offset = CIRC * (1 - s.pct / 100);
          const delay = (i % 5) * 0.08;
          const Icon = s.icon;
          return (
            <div
              key={s.name}
              className="skill-card rv"
              style={{ transitionDelay: `${delay}s` }}
            >
              <div className="skill-top">
                <div className="skill-icon">
                  <Icon size={20} color={s.color} />
                </div>
                <div className="skill-ring">
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle className="ring-track" cx="20" cy="20" r="16" />
                    <circle
                      className="ring-fill"
                      cx="20" cy="20" r="16"
                      style={{
                        strokeDasharray: `${CIRC} ${CIRC}`,
                        strokeDashoffset: CIRC,
                      }}
                      data-offset={offset}
                    />
                  </svg>
                  <div className="ring-label">{s.pct}%</div>
                </div>
              </div>
              <div>
                <div className="skill-name">{s.name}</div>
                <div className="skill-cat">{s.cat}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
