"use client";

import { useEffect, useRef } from "react";

const apps = [
  {
    e: "🏥", n: "MediConnect",
    d: "Telemedicine with video calls, e-prescriptions & patient records.",
    t: ["Flutter", "WebRTC", "Firebase"], pl: true, io: true,
  },
  {
    e: "🤳", n: "FaceLive Verify",
    d: "AI face liveness & identity verification using ML Kit.",
    t: ["Flutter", "ML Kit", "TFLite"], pl: true, io: false,
  },
  {
    e: "📅", n: "AppointEase",
    d: "Smart appointment booking with SMS reminders & analytics.",
    t: ["Flutter", "Spring Boot", "Firebase"], pl: true, io: true,
  },
  {
    e: "📹", n: "CallPro",
    d: "Enterprise video calling — group calls, screen sharing, E2E encryption.",
    t: ["Flutter", "WebRTC", "Socket.io"], pl: true, io: true,
  },
  {
    e: "📦", n: "QRFlow",
    d: "Advanced QR scanner & generator with bulk scanning & history.",
    t: ["Android", "Kotlin", "ZXing"], pl: true, io: false,
  },
  {
    e: "🛍️", n: "ShopSprint",
    d: "High-performance e-commerce with AR try-on & instant checkout.",
    t: ["Flutter", "REST API", "Stripe"], pl: true, io: true,
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

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
  }, []);

  return (
    <section id="apps" className="section" ref={sectionRef}>
      <div className="section-label">
        <span className="num">05</span> Mobile Apps
      </div>

      <div className="apps-grid">
        {apps.map((app, i) => (
          <div
            key={app.n}
            className={`app-tile rv${i % 3 === 1 ? " d1" : i % 3 === 2 ? " d2" : ""}`}
          >
            <div className="app-emoji">{app.e}</div>
            <div className="app-name">{app.n}</div>
            <div className="app-desc">{app.d}</div>
            <div className="app-tags">
              {app.t.map((tech) => (
                <span key={tech} className="app-tag">{tech}</span>
              ))}
            </div>
            <div className="app-links">
              {app.pl && (
                <a href="#" className="app-btn" onClick={(e) => e.preventDefault()}>
                  ▶ Play Store
                </a>
              )}
              {app.io && (
                <a href="#" className="app-btn" onClick={(e) => e.preventDefault()}>
                   App Store
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
