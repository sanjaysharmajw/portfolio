"use client";

import {
  SiFlutter, SiAndroid, SiKotlin, SiSwift,
  SiNodedotjs, SiSpring, SiFirebase, SiTensorflow,
  SiDocker, SiGithub, SiDart,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbApi, TbWifi } from "react-icons/tb";
import { VscGitMerge } from "react-icons/vsc";
import type { IconType } from "react-icons";

const techs: { icon: IconType; color: string; n: string }[] = [
  { icon: SiFlutter,    color: "#54C5F8", n: "Flutter" },
  { icon: SiAndroid,   color: "#3DDC84", n: "Android" },
  { icon: SiKotlin,    color: "#7F52FF", n: "Kotlin" },
  { icon: FaJava,      color: "#ED8B00", n: "Java" },
  { icon: SiSwift,     color: "#F05138", n: "SwiftUI" },
  { icon: SiNodedotjs, color: "#5FA04E", n: "Node.js" },
  { icon: SiSpring,    color: "#6DB33F", n: "Spring Boot" },
  { icon: SiFirebase,  color: "#FFCA28", n: "Firebase" },
  { icon: SiTensorflow,color: "#FF6F00", n: "TensorFlow" },
  { icon: TbWifi,      color: "#00B4AB", n: "WebRTC" },
  { icon: SiDocker,    color: "#2496ED", n: "Docker" },
  { icon: SiGithub,    color: "#ffffff", n: "GitHub" },
  { icon: SiDart,      color: "#00B4AB", n: "Dart" },
  { icon: VscGitMerge, color: "#A78BFA", n: "CI/CD" },
  { icon: TbApi,       color: "#6366F1", n: "REST APIs" },
];

function Track({ delay }: { delay: string }) {
  const doubled = [...techs, ...techs];
  return (
    <div className="marquee-track" style={{ animationDelay: delay }}>
      {doubled.map((t, i) => {
        const Icon = t.icon;
        return (
          <div key={i} className="marquee-item">
            <Icon size={15} color={t.color} />
            {t.n}
          </div>
        );
      })}
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
