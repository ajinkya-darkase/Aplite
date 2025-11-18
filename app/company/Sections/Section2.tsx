"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight } from "@/lib/utils";

export default function Section2() {
  return (
    <section className="flex flex-col mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-6 md:px-8 lg:px-8">
      {/*Upper Section */}
      <motion.div {...fadeInLeft()} className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 items-center mb-8 sm:mb-10 lg:mb-12">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="rounded-xl sm:rounded-2xl w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] flex items-center justify-center relative">
            <Image src="/company/mission.png" alt="Mission product demo" fill className="rounded-xl sm:rounded-2xl object-cover" />
          </div>
        </div>
        {/* Right: Mission Text */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#141b3c] mb-3 sm:mb-4">
            What's Our Mission
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
            Our mission is simple yet powerful — to eliminate payment fraud and streamline banking data for faster, smarter, and more secure payment processing.
          </p>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
            We strive to build a transparent financial ecosystem where every transaction is verified, every process is efficient, and every business can operate with confidence.
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Through innovation, automation, and data intelligence, we aim to redefine how organizations handle payments — making them safer, faster, and future-ready.
          </p>
        </div>
      </motion.div>
      {/*Lower Section */}
      <motion.div {...fadeInRight()} className="flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-10 items-center">
        {/* Left: Mission Text */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#141b3c] mb-3 sm:mb-4">
            We're building the verified trust layer for business payments.
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
            Every day, billions of dollars move between businesses based on unverified banking information shared through emails, invoices, and phone calls.
          </p>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
            The result? $50 billion lost annually to payment fraud, and countless hours wasted by finance teams chasing verification.
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Aplite fixes this. Innovation, automation, and data intelligence, we aim to redefine how organizations handle payments — making them safer, faster, and future-ready.
          </p>
        </div>
        {/* Right: Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="rounded-xl sm:rounded-2xl w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] flex items-center justify-center relative">
            <Image src="/company/futuristic-business.png" alt="Futuristic Business demo" fill className="rounded-xl sm:rounded-2xl object-cover" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}