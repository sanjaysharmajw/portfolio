"use client";

import { useEffect, useRef } from "react";

const testimonials = [
  {
    text: "Sanjay delivered an exceptional Flutter application exceeding all expectations. Code quality, architecture, and UI details were remarkable. AI features worked flawlessly from day one.",
    name: "Arjun Kapoor",
    role: "CTO, HealthTech Startup",
  },
  {
    text: "Working with Sanjay was a game-changer. His Flutter expertise allowed us to ship a cross-platform app in record time without quality compromise. Highly professional throughout.",
    name: "Priya Singh",
    role: "Product Lead, FinTech Co.",
  },
  {
    text: "The flutter_face_liveness package saved us months of work. Incredibly well-documented, performant, and the support has been world-class. Outstanding open-source contribution.",
    name: "Marco Rossi",
    role: "Sr. Dev, Security Platform",
  },
  {
    text: "We hired Sanjay to build a real-time video calling app using WebRTC and Flutter. The result was buttery-smooth with enterprise-grade security. Spring Boot backend equally impressive.",
    name: "David Nguyen",
    role: "Founder, TeleCom Startup",
  },
];

export default function Testimonials() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className="section" ref={sectionRef}>
      <div className="section-label">
        <span className="num">06</span> Testimonials
      </div>

      <div className="testi-grid">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className={`testi-card rv${i === 1 ? " d1" : i === 2 ? " d2" : i === 3 ? " d3" : ""}`}
          >
            <div className="testi-quote">&ldquo;</div>
            <p className="testi-text">{t.text}</p>
            <div className="testi-footer">
              <div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-role">{t.role}</div>
              </div>
              <div className="testi-stars">★★★★★</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
