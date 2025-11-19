"use client";

import CardComponent from "@/components/ui/CardComponent";
import CardsGrid from "@/components/ui/GridCard";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/utils";

export function Stats() {
  return (
    <div className="">
      <motion.div {...fadeInUp()} className="p-10">
        <h2 className="text-4xl md:text-7xl font-light tracking-tight text-black text-center">
          The True Cost of Payment Fraud
        </h2>
      </motion.div>
      <motion.div {...fadeInUp(0.2)} className="">
        <CardsGrid>
          <CardComponent
            imageSrc="/home/stats/79-percentage.png"
            title="79%"
            subtitle="of organizations faced payment fraud in 2024 - AFP 2024 Payments Fraud and Control Report"
          />
          <CardComponent
            imageSrc="/home/stats/50-billions.png"
            title="$50B+"
            subtitle="lost to vendor impersonation and wire scams - FBI IC3 2024 Internet Crime Report"
          />
          <CardComponent
            imageSrc="/home/stats/183k-losses.png"
            title="$183k"
            subtitle="average loss per incident from payment fraud attacks"
          />
        </CardsGrid>
      </motion.div>
    </div>
  );
}