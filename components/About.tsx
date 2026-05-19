"use client";

import { useEffect, useRef } from "react";

const pills = [
  "Flutter", "Dart", "Android", "Kotlin", "Java",
  "SwiftUI", "Node.js", "Spring Boot", "Firebase",
  "TFLite", "ML Kit", "WebRTC", "REST APIs",
  "Clean Arch", "Docker",
];

const stats = [
  { label: "Apps Published", value: 30, suffix: "+" },
  { label: "Flutter Packages", value: 10, suffix: "" },
  { label: "Package Downloads", value: 50, suffix: "K+" },
  { label: "Years Experience", value: 7, suffix: "+" },
  { label: "Satisfied Clients", value: 40, suffix: "+" },
];

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

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          // Reveal
          entry.target.querySelectorAll<HTMLElement>(".rv").forEach((el) => el.classList.add("in"));
          // Count
          entry.target.querySelectorAll<HTMLSpanElement>("[data-count]").forEach((el) => {
            const val = parseInt(el.dataset.count || "0");
            animateCount(el, val);
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
    <section id="about" className="section" ref={sectionRef}>
      <div className="section-label">
        <span className="num">01</span> About
      </div>

      <div className="about-grid">
        <div className="rv">
          <h2 className="about-h">
            I build apps<br />
            people <em>love</em><br />
            to use.
          </h2>
          <p className="about-p">
            I&apos;m a <strong>Senior Mobile Developer</strong> with 7+ years of experience
            crafting production-grade applications. With{" "}
            <strong>30+ apps shipped</strong> to millions of users, I specialise in Android,
            Flutter, and full-stack mobile architecture.
          </p>
          <p className="about-p">
            As a <strong>Flutter package publisher</strong> on pub.dev, I contribute tools
            that thousands of developers rely on globally — from face liveness detection to
            screenshot protection and download managers.
          </p>
          <p className="about-p">
            My work spans <strong>AI integrations, WebRTC video calling, healthcare
            platforms</strong> and enterprise-grade security. I care deeply about clean
            architecture and UI that feels inevitable.
          </p>
          <div className="skill-pills">
            {pills.map((p) => (
              <span key={p} className="skill-pill">{p}</span>
            ))}
          </div>
        </div>

        <div className="stats-list rv d2">
          {stats.map((s) => (
            <div key={s.label} className="stat-row">
              <span className="stat-label">{s.label}</span>
              <span className="stat-value">
                <span data-count={s.value}>0</span>
                <span className="stat-suffix">{s.suffix}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
