"use client";

import { Route, Globe, Clock, Timer } from 'lucide-react'
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft } from "@/lib/utils";

export function BiggerProblem() {
  const data = [
          "65% of US finance teams navigate the complexity of different routing numbers for ACH and wire payments",
          "43% of businesses struggle to send international wires due to insufficient banking information from counterparties",
          "Average time to complete domestic wire setup: 35 minutes",
          "Average time to complete international SWIFT wire setup: 55 minutes"
        ]
  return (
    <section className="bg-white py-8 sm:py-12 ">
      {/* Title */}
      <motion.div {...fadeInUp()}>
        <h2 className="text-4xl md:text-7xl font-light tracking-tight text-black text-center mb-6 sm:mb-8 md:mb-10">
          The Problem Is Bigger Than Fraud
        </h2>
        {/* Subtitle */}
        <p className="w-full text-lg sm:text-xl text-gray-400 leading-relaxed text-center mb-6 sm:mb-8 md:mb-10">
          The current system is broken in ways most people don&apos;t realize:
        </p>
      </motion.div>
      {/* Data Rows */}
      <motion.div {...fadeInLeft()} className="w-full max-w-6xl mx-auto flex flex-col gap-2 sm:gap-3">
        {
        data.map((text, index) => (
          <div
            key={index}
            className="group flex items-center border border-[#ebebeb] bg-[#fcfcff] rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 mb-1 opacity-70 transition-all duration-500 hover:opacity-100 hover:scale-[1.02] hover:shadow-sm cursor-pointer"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-[#ebebeb] flex-shrink-0 mr-3 sm:mr-4 transition-all duration-500 group-hover:bg-[#4914FF] group-hover:border-blue-300 flex items-center justify-center">
              {index === 0 && <Route className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-white transition-colors duration-500" />}
              {index === 1 && <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-white transition-colors duration-500" />}
              {index === 2 && <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-white transition-colors duration-500" />}
              {index === 3 && <Timer className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-white transition-colors duration-500" />}
            </div>
            <span className="text-gray-700 font-medium text-sm sm:text-base md:text-lg leading-relaxed">
              {text}
            </span>
          </div>
        ))}
      </motion.div>
      {/* Aplite Box */}
      <motion.div {...fadeInUp(0.2)} className="mt-6 sm:mt-8 mx-auto w-full max-w-6xl">
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 py-6 sm:py-8 md:py-10 rounded-xl sm:rounded-2xl px-4 sm:px-6 text-white text-center shadow-lg">
          <div className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">Aplite Changes This.</div>
          <div className="text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-4xl mx-auto">
            With structured, verified banking data, payments now take seconds. Finance teams don't need routing number expertise. Aplite provides exact details for each payment type, formatted correctly, verified completely.
          </div>
        </div>
      </motion.div>
    </section>
  )
}