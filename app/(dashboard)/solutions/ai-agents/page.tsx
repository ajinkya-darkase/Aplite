"use client";

import { motion } from "framer-motion";
import HeroSec from "@/components/sections/HeroSec";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import React from "react";

export default function AIAgentsPage() {

  React.useEffect(() => {
    document.body.classList.add('solutions-gradient');
    return () => {
      document.body.classList.remove('solutions-gradient');
    };
  }, []);

  const fadeInAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  return (
    <div className="space-y-4">
      <section>
        <motion.div
          key="hero-sec1"
          initial={fadeInAnimation.initial}
          animate={fadeInAnimation.animate}
          transition={fadeInAnimation.transition}
        >
          <HeroSec
            subtitle="aplite"
            title="The Agentic Future"
            description="We're building the structured payment infrastructure that AI agents need to process transactions autonomously and accurately."
            buttonLabel="Talk To Sales Team"
            onButtonClick={() => alert("Talk To Sales Team...")}
          />
        </motion.div>
      </section>

      <section>
        <Section2 />
      </section>
      <section>
        <Section3 />
      </section>
    </div>
  );
}
