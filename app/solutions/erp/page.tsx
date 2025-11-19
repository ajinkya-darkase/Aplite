"use client";

import { motion } from "framer-motion";
import HeroSec from "@/components/sections/HeroSec";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import React from "react";

export default function ERPPage() {

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
            title="Built for ERP System"
            description="Autofill verified banking information. Cut manual entry by 99%."
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
