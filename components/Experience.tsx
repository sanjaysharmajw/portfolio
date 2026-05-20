"use client";

import { useEffect, useRef } from "react";
import { FaMobileAlt, FaStar, FaBriefcase, FaHospital } from "react-icons/fa";
import { SiFlutter } from "react-icons/si";
import { BiBrain } from "react-icons/bi";
import type { IconType } from "react-icons";

function animateCount(el: HTMLSpanElement, target: number) {
  const duration = 1500;
  let start: number | null = null;
  const step = (ts: number) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    el.textContent = String(Math.floor(p * target));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const items: { icon: IconType; color: string; num: number; sup: string; label: string; desc: string }[] = [
  { icon: FaMobileAlt, color: "#3DDC84", num: 30, sup: "+", label: "Apps Published",   desc: "Production apps on Play Store & App Store" },
  { icon: SiFlutter,  color: "#54C5F8", num: 10, sup: "",  label: "Flutter Packages", desc: "Open-source tools on pub.dev" },
  { icon: FaStar,     color: "#FFCA28", num: 50, sup: "K", label: "Downloads",        desc: "Packages downloaded worldwide" },
  { icon: BiBrain,    color: "#4285F4", num: 5,  sup: "+", label: "AI Integrations",  desc: "Face detection & ML-powered features" },
  { icon: FaHospital, color: "#FF6F6F", num: 3,  sup: "+", label: "Healthcare Apps",  desc: "Telemedicine & patient platforms" },
  { icon: FaBriefcase,color: "#A78BFA", num: 7,  sup: "+", label: "Years Experience", desc: "Growing with the mobile ecosystem" },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.querySelectorAll<HTMLElement>(".rv").forEach((el) => el.classList.add("in"));
          entry.target.querySelectorAll<HTMLSpanElement>("[data-count]").forEach((el) => {
            animateCount(el, parseInt(el.dataset.count || "0"));
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="achievements" className="section" ref={sectionRef}>
      <div className="section-label">
        <span className="num">03</span> Achievements
      </div>

      <div className="achieve-grid">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
          <div
            key={item.label}
            className={`achieve-item rv${i % 3 === 1 ? " d1" : i % 3 === 2 ? " d2" : ""}`}
          >
            <span className="achieve-icon"><Icon size={22} color={item.color} /></span>
            <div className="achieve-number">
              <span data-count={item.num}>0</span>
              {item.sup && <sup>{item.sup}</sup>}
            </div>
            <div className="achieve-label">{item.label}</div>
            <div className="achieve-desc">{item.desc}</div>
          </div>
          );
        })}
      </div>
    </section>
  );
}
