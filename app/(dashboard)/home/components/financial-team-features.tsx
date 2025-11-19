"use client";

import CardFlowAnimation from "@/components/ui/CardFlowAnimation";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/utils";

const cards = [
  { imageSrc: "/home/financial-team-features/stops.png", title: "Stops fraud at the source", subtitle: "No more fake invoices, compromised emails, or altered payment details. Every banking update is verified before it ever reaches your AP team, protecting you from the start." },
  { imageSrc: "/home/financial-team-features/grows.png", title: "Grows stronger with every business", subtitle: "Each company that joins Aplite strengthens the network, making every transaction more secure. Together, we’re building the global trust layer for business payments." },
  { imageSrc: "/home/financial-team-features/cuts.png", title: "Cuts verification time by 99%", subtitle: "Instantly search any business and access verified banking information in seconds. Eliminate manual checks and speed up every payment with total confidence." },
  { imageSrc: "/home/financial-team-features/keeps.png", title: "Keeps you in control", subtitle: "Get real-time alerts for every banking change, with full visibility and audit-ready timestamps. Stay informed and in charge before every payment you make." },
  // ...add more as needed
];

export function FinancialTeamFeatures() {
  return (
    <div className="bg-white py-8 sm:py-12 md:py-16 flex flex-col gap-8">
      <motion.div {...fadeInUp()} className="px-4 sm:px-6 md:px-8 lg:px-10 mb-6 sm:mb-8 md:mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-black text-center leading-tight">
          Built For The Whole Financial Team
        </h2>
      </motion.div>
      <motion.div {...fadeInUp(0.2)} className="px-4 sm:px-6 md:px-8">
        <CardFlowAnimation cards={cards} />
      </motion.div>
    </div>
  );
}

