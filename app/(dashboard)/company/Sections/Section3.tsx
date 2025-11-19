"use client";

import CardComponent from "@/components/ui/CardComponent";
import CardsGrid from "@/components/ui/GridCard";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/utils";

export default function Section3() {
  return (
    <section className="flex flex-col gap-8 px-4 sm:px-6 md:px-8 lg:px-8">
      <motion.div {...fadeInUp()}>
        <h1 className="text-3xl md:text-5xl font-normal leading-tight tracking-tight text-[#072484] text-center">
          AI agents lack payment <strong>infrastructure</strong>
        </h1>
      </motion.div>
      <motion.div {...fadeInUp(0.2)} className="mb-40">
        <CardsGrid>
        <CardComponent
          imageSrc="/company/hero-ap.png"
          title="For accounts payable teams"
          subtitle="Search, verify, and pay in seconds."
        />
        <CardComponent
          imageSrc="/company/hero-ar.png"
          title="For accounts receivable teams"
          subtitle="Share your banking information securely through an immutable payment profile that customers can trust."
        />
        <CardComponent
          imageSrc="/company/hero-banks.png"
          title="Banks and fintech's"
          subtitle="Integrate verified, structured payment data that reduces errors, speeds processing, and eliminates fraud risk."
        />
        <CardComponent
          imageSrc="/company/hero-ai.png"
          title="The agentic future"
          subtitle="We're building the structured payment infrastructure that AI agents need to process transactions autonomously and accurately."
        />
      </CardsGrid>
      </motion.div>
    </section>
  );
}