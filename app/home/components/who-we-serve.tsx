"use client";

import CardFlowAnimation from "@/components/ui/CardFlowAnimation";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/utils";

export function WhoWeServe() {
  return (
    <div className=" bg-white">
      <motion.div {...fadeInUp()} className="p-10">
        <h2 className="text-4xl md:text-7xl font-light tracking-tight text-black text-center">
          Who We Serve
        </h2>
      </motion.div>
      <motion.div {...fadeInUp(0.2)} className="w-full">
        <CardFlowAnimation cards={[
          {
            imageSrc: "/home/who-we-serve/hero-ap.png",
            title: "Accounts Payable Teams",
            subtitle: "Search, verify, and pay in seconds"
          },
          {
            imageSrc: "/home/who-we-serve/hero-ar.png",
            title: "Accounts Receivable Teams",
            subtitle: "Share your banking information securely through an immutable payment profile that customers can trust."
          },
          {
            imageSrc: "/home/who-we-serve/hero-banks.png",
            title: "Banks & Fintechs",
            subtitle: "Integrate verified, structured payment data that reduces errors, speeds processing, and eliminates fraud risk."
          },
          {
            imageSrc: "/home/who-we-serve/hero-ai.png",
            title: "The Agentic Future",
            subtitle: "We're building the structured payment infrastructure that AI agents need to process transactions autonomously and accurately."
          }
        ]} />
      </motion.div>
    </div>
  );
}
