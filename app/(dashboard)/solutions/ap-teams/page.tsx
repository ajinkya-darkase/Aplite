"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import HeroSec from "@/components/sections/HeroSec";
import React from "react";

const Section2 = dynamic(() => import("./Sections/Section2"), {
  loading: () => (
    <p className="text-center py-10 text-gray-400">Loading Section...</p>
  ),
  ssr: false,
});

const Section3 = dynamic(() => import("./Sections/Section3"), {
  loading: () => (
    <p className="text-center py-10 text-gray-400">Loading Section...</p>
  ),
  ssr: false,
});

export default function APTeamsPage() {

  React.useEffect(() => {
  document.body.classList.add('solutions-gradient');
  return () => {
    document.body.classList.remove('solutions-gradient');
  };
}, []);

  const fadeInAnimation = {
    initial: { opacity: 0, y: 30 },
    animate:{ opacity: 1, y: 0 } ,
    transition: { duration: 0.8 },
  };

  return (
    <div className="space-y-10">
      <section>
        <motion.div
          key="hero-sec1"
          initial={fadeInAnimation.initial}
          animate={fadeInAnimation.animate}
          transition={fadeInAnimation.transition}
        >
          <HeroSec
            subtitle="aplite"
            title="Built for Accounts Payable Teams"
            description="Search, Verify & Pay in seconds"
            buttonLabel="Get Started"
            onButtonClick={() => alert("Get Started...")}
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
