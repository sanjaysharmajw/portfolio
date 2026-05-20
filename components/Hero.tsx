"use client";

import { useEffect, useState } from "react";

const roles = [
  "Flutter Developer",
  "Android Developer",
  "AI Specialist",
  "Node.js Dev",
  "Spring Boot Dev",
  "App Architect",
];

function useTyping(list: string[]) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [forward, setForward] = useState(true);

  useEffect(() => {
    const word = list[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (forward) {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 58);
      } else {
        timeout = setTimeout(() => setForward(false), 2300);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length - 1)), 30);
      } else {
        setForward(true);
        setIdx((i) => (i + 1) % list.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, forward, idx, list]);

  return displayed;
}

export default function Hero() {
  const role = useTyping(roles);

  return (
    <section id="hero">
      <div className="hero-top">
        <div className="hero-label">
          SENIOR MOBILE DEVELOPER<br />
          Based in India · Open to Remote
        </div>
        <div className="hero-avail">Available for Projects</div>
      </div>

      <h1 className="hero-h1">
        Sanjay<br />
        <span className="hero-dim">Sharma —</span>
        <span className="hero-role">
          {role}
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "0.75em",
              background: "var(--lime)",
              marginLeft: "2px",
              verticalAlign: "text-bottom",
              animation: "dotPulse 1s infinite",
            }}
          />
        </span>
      </h1>

      <div className="hero-bottom">
        <p className="hero-tagline">
          Building <strong>scalable mobile apps</strong>, AI-powered solutions &amp;
          <br />
          beautiful digital experiences.
          <br />
          <strong>Flutter · Android · Node.js · Spring Boot</strong>
        </p>

<div className="hero-scroll">SCROLL TO EXPLORE</div>
      </div>
    </section>
  );
}
