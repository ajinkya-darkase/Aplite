"use client";

import BlankCard from "@/components/ui/BlankCard";
import CardsGrid from "@/components/ui/GridCard";
import CardComponent from "@/components/ui/CardComponent";
import ReusableReactIcon from "@/components/ui/ReusableReactIcon";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, fadeInUp } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Section2() {
  const [iconSize, setIconSize] = useState<"sm" | "md" | "lg">("md");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setIconSize("sm");
      else if (window.innerWidth < 1024) setIconSize("md");
      else setIconSize("lg");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardData = [
    {
      imageSrc: "/solutions/banks-fintech/api.png",
      title: "Integrate Aplite's powerful API",
      subtitle:
        "Reduce manual banking information entry and eliminate payment errors by 99.9%. Our API delivers verified banking details directly into your payment flows.",
    },
    {
      imageSrc: "/solutions/banks-fintech/instant-autofill.png",
      title: "Instant autofill for payment forms",
      subtitle:
        "Users enter an Aplite PIN, choose their preferred payment method (ACH, Wire, or SWIFT), and forms autofill instantly with accurate details for the intended recipient.",
    },
    {
      imageSrc: "/solutions/banks-fintech/meet-iso.png",
      title: "Meet ISO 20022 compliance standards",
      subtitle:
        "Enrich payment data with verified business information, reduce payment fraud and returns, and ensure regulatory compliance all through one integration.",
    },
  ];

  const featuresData = [
    "Reduce payment errors by 99.9%",
    "Instant form autofill",
    "ISO 20022 compliance ready",
    "Verified banking data API",
    "Reduce chargebacks significantly",
    "Improve payment success rates",
    "Real-time verification",
    "Build customer trust at scale",
  ];

  return (
    <BlankCard>
      <div className="pt-10 lg:pt-16 px-4 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <div>
          {/* Heading */}
          <motion.div {...fadeInLeft()}>
            <h1
              className="
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
          tracking-tight leading-tight
          text-center lg:text-left
        "
            >
              <div className="mb-2 lg:mb-1">Empower Your Systems</div>

              <div className="mb-2 lg:mb-1 lg:pl-20 xl:pl-64">
                With Verified Payment
              </div>

              <div className="mb-0 lg:mb-0 lg:text-right">
                Intelligence.
              </div>
            </h1>
          </motion.div>

          <motion.div
            {...fadeInRight()}
            className="flex justify-center p-4 lg:justify-end"
          >
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed text-center lg:text-right max-w-2xl">
              Integrate verified, structured payment data that reduces errors,
              speeds processing, and eliminates fraud risk. Turn verification into
              a competitive advantage for your platform.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="px-4 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        <CardsGrid>
          {cardData.map((card, index) => (
            <CardComponent
              key={index}
              imageSrc={card.imageSrc}
              title={card.title}
              subtitle={card.subtitle}
            />
          ))}
        </CardsGrid>
      </div>

      <motion.div {...fadeInRight()}>
        <h1 className="text-center text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 leading-tight tracking-tight mt-4 sm:mt-6 md:mt-8">
          Why Banks & Fintech choose Aplite
        </h1>
      </motion.div>

      {/* Responsive grid for features */}
      <motion.div
        {...fadeInUp()}
        className="grid grid-cols-1 py-4 sm:grid-cols-2 gap-x-6 gap-y-4 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className="flex items-start sm:items-center gap-3 text-base sm:text-lg md:text-xl"
          >
            <div className="flex-shrink-0">
              <ReusableReactIcon
                sizeprop={iconSize}
                squareBgColor="#003cff"
                icon={CheckCircle}
                iconBgColor="#93c5fd"
              />
            </div>
            <p className="font-medium leading-snug sm:leading-tight">
              {feature}
            </p>
          </div>
        ))}
      </motion.div>
    </BlankCard>
  );
}
