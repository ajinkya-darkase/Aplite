"use client";

import { motion } from "framer-motion";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import HeroSec from "@/components/sections/HeroSec";
import React from "react";

export default function ARTeamsPage() {

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
    <>
      <div className="mx-auto space-y-10">
      
       <section>
        <motion.div
          key="hero-sec1"
          initial={fadeInAnimation.initial}
          animate={fadeInAnimation.animate}
          transition={fadeInAnimation.transition}
        >
          <HeroSec
            subtitle="aplite"
            title="Accounts Receivable Teams "
            description="Share your banking information securely through an immutable payment profile that customers can trust"
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
    </>
  );
}
