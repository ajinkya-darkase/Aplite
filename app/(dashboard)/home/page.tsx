"use client";

import React from "react";
import { Hero } from "./components/hero";
import { HomeContent } from "./components/home-content";
import TaglineSec from "./components/tagline-sec";
import { motion } from "framer-motion";

export default function HomePage() {
  const fadeInAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  // Apply purple gradient for home page
  React.useEffect(() => {
    document.body.classList.add('home-gradient');
    return () => {
      document.body.classList.remove('home-gradient');
    };
  }, []);

  return (
    <div className="space-y-10">
      <section>
        <motion.div
          key="hero-home"
          initial={fadeInAnimation.initial}
          animate={fadeInAnimation.animate}
          transition={fadeInAnimation.transition}
        >
          <Hero />
        </motion.div>
      </section>

      <section>
        <HomeContent />
      </section>

      <section>
        <TaglineSec />
      </section>
    </div>
  );
}