"use client";
import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/utils";
import { Check } from "lucide-react";
import HeroSec from "@/components/sections/HeroSec";

const pricingTiers = [
  {
    name: "Starter",
    invoiceSize: "$10k – $100k",
    price: "$99",
    period: "month",
  },
  {
    name: "Business",
    invoiceSize: "$100,001 – $1M",
    price: "$249",
    period: "month",
  },
  {
    name: "Enterprise",
    invoiceSize: "$1M – $5M",
    price: "$999",
    period: "month",
  },
  {
    name: "Custom",
    invoiceSize: "$5M+",
    price: "Contact Us",
    period: "",
  },
];

const features = [
  "Secure vendor payment details protected by your unique Aplite PIN",
  "White-glove onboarding for all your suppliers",
  "Real-time notifications of vendor banking changes",
  "Live, fraud-proof verification for every business on the platform",
];

export default function PricingPage() {
  // Apply red gradient for pricing page
  React.useEffect(() => {
    document.body.classList.add('pricing-gradient');
    return () => {
      document.body.classList.remove('pricing-gradient');
    };
  }, []);

  const fadeInAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  return (
    <>
      <motion.div
        key="hero-sec1"
        initial={fadeInAnimation.initial}
        animate={fadeInAnimation.animate}
        transition={fadeInAnimation.transition}
      >
        <HeroSec
          subtitle="aplite"
          title="Founding Customer Pricing"
          description="Flat monthly fee — unlimited vendors during pilot"
          buttonLabel=""
        />
      </motion.div>
      <div className="min-h-screen mx-10 py-12 sm:py-16 lg:py-20">
        <div className="p-2 mx-auto">
          {/* Header */}

          {/* Value Summary */}
          <motion.div
            {...fadeInUp()}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16 shadow-xl"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#141b3c] mb-4 sm:mb-6">
              Every customer receives:
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              With Aplite, your payments are protected from Day 1. We secure your vendor details, verify every business live, and keep you informed in real time — so you always know who you're paying.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#120d61] to-[#4914FF] flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                {...fadeInUp()}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col"
              >
                <div className="flex-grow">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#141b3c] mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                    Total Monthly Invoice Size
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-gray-700 mb-6 sm:mb-8">
                    {tier.invoiceSize}
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex items-baseline gap-1 mb-6">
                    {tier.period ? (
                      <>
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141b3c]">
                          {tier.price}
                        </span>
                        <span className="text-base sm:text-lg text-gray-600">
                          /{tier.period}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl sm:text-3xl font-bold text-[#141b3c]">
                        {tier.price}
                      </span>
                    )}
                  </div>
                  <button
                    className={`w-full py-3 sm:py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${tier.name === "Custom"
                        ? "bg-gradient-to-r from-[#120d61] to-[#4914FF] text-white hover:shadow-lg hover:scale-105"
                        : "bg-gray-100 text-[#141b3c] hover:bg-gray-200"
                      }`}
                  >
                    {tier.name === "Custom" ? "Contact Sales" : "Get Started"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Why Aplite Section */}
          <motion.div
            {...fadeInUp()}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#141b3c] mb-4 sm:mb-6">
              Why Aplite?
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              In a world racing toward automation and AI shortcuts, fraudsters exploit the gaps. Aplite takes the opposite approach: every account is verified live — no shortcuts, no blind automation — so the information you see is always information you can trust.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
