"use client";

import CardComponent from "@/components/ui/CardComponent";
import CardsGrid from "@/components/ui/GridCard";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight } from "@/lib/utils";

export function PaymentFraudNoMargin() {
  return (
    <div className="">
      <div className="pt-10 lg:pt-16 px-4 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div>
          {/* Heading */}
          <motion.div {...fadeInLeft()}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight text-center text-black lg:text-left">
              <div className="mb-2 lg:mb-1">Highly Secure</div>
              <div className="mb-2 lg:mb-1 lg:pl-20 xl:pl-64">Digital Payments Built</div>
              <div className="mb-0 lg:mb-0 lg:text-right">On Financial Trust.</div>
            </h1>
          </motion.div>

          <motion.div {...fadeInRight()} className="flex justify-center p-4 lg:justify-end">
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed text-center lg:text-right max-w-2xl">
              Eliminate the risk of email-based and invoice-based payment information exchanges. Your banking details live in a secure, verified profile that builds trust with every transaction.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="px-4 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <CardsGrid>
          <CardComponent
            imageSrc="/home/payment-fraud-no-margin/search.gif"
            title="Search"
            subtitle="Look up any business instantly using our verified database - simple, fast, and reliable."
          />
          <CardComponent
            imageSrc="/home/payment-fraud-no-margin/review.gif"
            title="Review"
            subtitle="Check verified banking details with complete transparency and peace of mind."
          />
          <CardComponent
            imageSrc="/home/payment-fraud-no-margin/pay.gif"
            title="Pay"
            subtitle="Send money confidently, knowing every transaction reaches the right business."
          />
        </CardsGrid>
      </div>
    </div>
  );
}