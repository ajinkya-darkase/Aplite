"use client";

import React from "react";
import HeroSec from "@/components/sections/HeroSec";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import { motion } from "framer-motion";
import BlankCard from "@/components/ui/BlankCard";
import { fadeInUp } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CompanyPage() {
  const fadeInAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  // Apply orange gradient for company page
  React.useEffect(() => {
    document.body.classList.add('company-gradient');
    return () => {
      document.body.classList.remove('company-gradient');
    };
  }, []);

  return (
    <div className="space-y-10">
      <section>
        <motion.div
          key="hero-company"
          initial={fadeInAnimation.initial}
          animate={fadeInAnimation.animate}
          transition={fadeInAnimation.transition}
        >
          <HeroSec
            subtitle="aplite"
            title="About Aplite"
            description="We are on a mission to eliminate payment fraud and errors by providing instant access to verified business banking information."
            buttonLabel=""
          />
        </motion.div>
      </section>

      <BlankCard>
      <section>
        {/* <div className="bg-white rounded-2xl sm:rounded-3xl p-8 m-2 sm:m-4 md:m-6 lg:m-8 xl:m-10 space-y-10"> */}
          <Section2 />
          <Section3 />
        {/* </div> */}
      </section>
      </BlankCard>
      <BlankCard>
      <motion.div {...fadeInUp()}>
        <div className="space-y-4 text-center p-6">
          <p className="text-2xl font-medium">
            We don't move money. We direct where it goes.
          </p>
          <Button
            variant="primary"
            size="sm"
            showIcon={true}
            onClick={() => alert("Contact Us...")}
          >
            Contact Us
          </Button>
        </div>
      </motion.div>
    </BlankCard>
    </div>
  );
}
