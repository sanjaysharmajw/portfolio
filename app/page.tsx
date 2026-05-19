"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Packages from "@/components/Packages";
import Portfolio from "@/components/Portfolio";
import Marquee from "@/components/Marquee";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), { ssr: false });
const CursorGlow = dynamic(() => import("@/components/CursorGlow"), { ssr: false });

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Packages />
        <Portfolio />
        <Marquee />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
