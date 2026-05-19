"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  let rx = 0, ry = 0;
  let mx = 0, my = 0;
  let rafId: number;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top = my + "px";
      }
    };

    const lerp = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      rafId = requestAnimationFrame(lerp);
    };
    rafId = requestAnimationFrame(lerp);

    document.addEventListener("mousemove", onMove);

    const interactables = document.querySelectorAll("a, button, input, textarea, [data-hover]");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", () => ringRef.current?.classList.add("hovered"));
      el.addEventListener("mouseleave", () => ringRef.current?.classList.remove("hovered"));
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cur" aria-hidden="true" />
      <div ref={ringRef} className="cur-r" aria-hidden="true" />
    </>
  );
}
