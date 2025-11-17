"use client";

import { Play, Pause } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ApliteAdvantage() {
  const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);
  const [isSolutionPaused, setIsSolutionPaused] = useState(false);
  const solutionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isSolutionPaused) {
      solutionIntervalRef.current = setInterval(() => {
        setActiveSolutionIndex((prev) => (prev + 1) % solutions.length);
      }, 3000);
    } else {
      if (solutionIntervalRef.current) clearInterval(solutionIntervalRef.current);
    }

    return () => {
      if (solutionIntervalRef.current) clearInterval(solutionIntervalRef.current);
    };
  }, [isSolutionPaused]);

  const toggleSolutionPause = () => {
    setIsSolutionPaused(!isSolutionPaused);
  };

  const handleSolutionClick = (index: number) => {
    setActiveSolutionIndex(index);
    setIsSolutionPaused(true);
  };

  const solutions = [
    {
      title: "Single Source of Verified Truth",
      content: "No more juggling emails, spreadsheets, and vendor portals. Aplite consolidates verified banking information in one searchable repository, reducing payment errors by 99.9% and giving finance teams one place to trust."
    },
    {
      title: "Immutable Payment Profiles",
      content: "Banking details can't be edited, altered, or spoofed like invoices and PDFs. Once verified, your payment information lives in a tamper- proof profile that customers can trust—eliminating the number one vector for payment fraud."
    },
    {
      title: "Real-Time Change Verification",
      content: "When vendors update their banking information, we verify it before notifying your Accounts Payable team. Your AP team only acts on changes we've confirmed are legitimate."
    },
    {
      title: "Built for the Agentic Future",
      content: "Structured, machine-readable payment data that AI agents can process instantly. While others scramble to adapt, Aplite provides the infrastructure autonomous payments need—ACH, Wire, and SWIFT details in the exact format agents require."
    },
  ];

  const advantageImages = [
    "/home/aplite-advantage/single-source.png",
    "/home/aplite-advantage/immutable-payment.png",
    "/home/aplite-advantage/real-time.png",
    "/home/aplite-advantage/built-future.png",
  ];

  return (
    <section className="bg-white py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10">
        <motion.div {...fadeInUp()} className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 md:mb-8 font-light tracking-tight text-black text-center leading-tight">
            Aplite Advantage
          </h2>
          <p className="w-full text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed text-center px-4">
            Discover how Aplite transforms your payment process.
          </p>
        </motion.div>

        {/* Solutions Section */}
        <motion.div {...fadeInLeft()} className="mb-8 sm:mb-12 lg:mb-16 overflow-hidden">
          <div className="grid gap-3 sm:gap-4 md:gap-6 lg:gap-20 lg:grid-cols-2">
            {/* Left sub-section - Solutions */}
            <div className="flex flex-col p-2 sm:p-3 md:p-4 h-[800px] sm:h-[850px] md:h-[900px] lg:h-[750px] xl:h-[800px] order-2 lg:order-1">
              <h3 className="mb-4 sm:mb-6 md:mb-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold flex-shrink-0">Aplite Solutions</h3>
              <ul className="space-y-3 sm:space-y-4 md:space-y-6 flex-1 flex flex-col justify-evenly overflow-hidden">
                {solutions.map((solution, index) => (
                  <div key={index}>
                    <hr className={`transition-all duration-300 ${index === activeSolutionIndex ? 'border-2 border-gray-900' : 'border-gray-300'
                      }`} />
                    <li
                      className="flex flex-col gap-1 sm:gap-2 transition-all duration-300 cursor-pointer hover:bg-gray-50 p-2 sm:p-3 rounded-lg"
                      onClick={() => handleSolutionClick(index)}
                    >
                      <span className={`transition-all duration-300 text-sm sm:text-base md:text-lg lg:text-xl ${index === activeSolutionIndex
                        ? 'text-gray-900'
                        : 'text-gray-500'
                        }`}>
                        {solution.title}
                      </span>
                      <p className={`text-xs sm:text-sm mt-1 sm:mt-2 transition-all duration-300 ${index === activeSolutionIndex
                        ? 'text-gray-600'
                        : 'text-gray-400'
                        }`}>
                        {solution.content}
                      </p>
                    </li>
                  </div>
                ))}
              </ul>

              {/* Pause/Play Button */}
              <div className="mt-4 sm:mt-6 flex justify-center flex-shrink-0">
                <Button
                  onClick={toggleSolutionPause}
                  className="flex border-none items-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-white text-black shadow-lg rounded-lg hover:bg-[#4914FF] hover:text-white transition-colors"
                >
                  {isSolutionPaused ? <Play className="w-3 h-3 sm:w-4 sm:h-4" /> : <Pause className="w-3 h-3 sm:w-4 sm:h-4" />}
                  {isSolutionPaused ? 'Play' : 'Pause'}
                </Button>
              </div>
            </div>

            {/* Right sub-section - Animated based on active solution */}
            <div className="bg-gray-100 rounded-2xl h-[400px] sm:h-[450px] md:h-[500px] lg:h-[750px] xl:h-[800px] order-1 lg:order-2">
              <div className="rounded-2xl bg-white h-full transition-all duration-500 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={advantageImages[activeSolutionIndex] || "/solutions/erp/workflow-5.png"}
                    alt={`Advantage ${activeSolutionIndex + 1}`}
                    fill
                    className={`rounded-lg object-contain transition-all duration-500 ${
                      activeSolutionIndex === 0 ? '' :
                      activeSolutionIndex === 1 ? '' :
                      activeSolutionIndex === 2 ? '' :
                      ''
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
