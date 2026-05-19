"use client";

const techs = [
  { i: "🐦", n: "Flutter" },
  { i: "🤖", n: "Android" },
  { i: "⚡", n: "Kotlin" },
  { i: "☕", n: "Java" },
  { i: "🍎", n: "SwiftUI" },
  { i: "🟿", n: "Node.js" },
  { i: "🌱", n: "Spring Boot" },
  { i: "🔥", n: "Firebase" },
  { i: "🧠", n: "TensorFlow" },
  { i: "🔭", n: "ML Kit" },
  { i: "📡", n: "WebRTC" },
  { i: "🐳", n: "Docker" },
  { i: "⚙️", n: "GitHub" },
  { i: "🎯", n: "Dart" },
  { i: "🔄", n: "CI/CD" },
];

function Track({ delay }: { delay: string }) {
  const doubled = [...techs, ...techs];
  return (
    <div className="marquee-track" style={{ animationDelay: delay }}>
      {doubled.map((t, i) => (
        <div key={i} className="marquee-item">
          {t.i} {t.n}
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section id="marquee">
      <div className="marquee-wrap">
        <Track delay="0s" />
        <Track delay="-13s" />
      </div>
    </section>
  );
}
