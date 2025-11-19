import { CheckCircle, Key, TrendingUp, UserCircle } from "lucide-react";

import BlankCard from "@/components/ui/BlankCard";
import CardsGrid from "@/components/ui/GridCard";
import CardComponent from "@/components/ui/CardComponent";
import ReusableReactIcon from "@/components/ui/ReusableReactIcon";
import AnimatedSplitSteps from "@/components/ui/AnimatedSplitSection";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, fadeInUp } from "@/lib/utils";

export default function Section2() {
  const [iconSize, setIconSize] = useState<"sm" | "md" | "lg">("md");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setIconSize("sm");
      else if (window.innerWidth < 1024) setIconSize("md");
      else setIconSize("lg");
    };

    handleResize(); // set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const cardData = [
    {
      imageSrc: "/solutions/ar-teams/search.png",
      title: "Search and retrieve verified business",
      subtitle:
        "Find any vendor's verified payment details in seconds—no more chasing contacts, validating screenshots, or waiting on call-backs.",
    },
    {
      imageSrc: "/solutions/ar-teams/process-payment.png",
      title: "Process payments with confidence",
      subtitle:
        "Pay using verified banking information that's audit-ready and fraud-proof. Every profile is timestamped and immutable.",
    },
    {
      imageSrc: "/solutions/ar-teams/stay-protective.png",
      title: "Stay proactive with real-time alerts",
      subtitle:
        "Get notified instantly when vendor payment information changes.",
    },
  ];

  const features = [
    "Stop sending banking details via email",
    "Tamper-proof payment information",
    "Reduce payment delays",
    "Instant updates to all customers",
    "Eliminate misdirected payments",
    "Reduce customer verification calls",
    "Professional, verified presence",
    "Build trust at scale",
  ];

  const steps = [
    {
      id: 1,
      icon: UserCircle,
      title: "Create your verified profile",
      description:
        "Set up your business profile with verified banking information.",
      images: ["/solutions/ar-teams/workflow-1.png"],
    },
    {
      id: 2,
      icon: Key,
      title: "Add Aplite PIN to invoices",
      description:
        "Include your unique PIN instead of editable banking details.",
      images: ["/solutions/ar-teams/workflow-2.png"],
    },
    {
      id: 3,
      icon: CheckCircle,
      title: "Access verified details",
      description:
        "They enter your PIN on Aplite and see your verified payment information.",
      images: ["/solutions/ar-teams/workflow-3.png"],
    },
    {
      id: 4,
      icon: TrendingUp,
      title: "Get paid faster",
      description:
        "No verification delays, just immediate confidence and payment.",
      images: ["/solutions/ar-teams/workflow-4.png"],
    },
  ];

  return (
    <>
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
                <div className="mb-2 lg:mb-1">Share Banking Details</div>

                <div className="mb-2 lg:mb-1 lg:pl-20 xl:pl-64">
                  Securely Through
                </div>

                <div className="mb-0 lg:mb-0 lg:text-right">
                  Verified Profiles.
                </div>
              </h1>
            </motion.div>

            <motion.div
              {...fadeInRight()}
              className="flex justify-center p-4 lg:justify-end"
            >
              <p className="text-lg sm:text-xl text-gray-400 leading-relaxed text-center lg:text-right max-w-2xl">
                Stop sending banking details via email. Share your payment
                information through an immutable, verified profile that customers
                can trust, reducing verification delays and payment errors.
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
            Why Accounts Receivable Teams choose Aplite
          </h1>
        </motion.div>

        {/* Responsive grid for features */}
        <motion.div
          {...fadeInUp()}
          className="grid grid-cols-1 py-4 sm:grid-cols-2 gap-x-6 gap-y-4 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {features.map((feature, index) => (
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

        <motion.div {...fadeInUp()} className="py-6 px-4">
          <h1 className="text-center text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 leading-tight tracking-tight mt-4 sm:mt-6 md:mt-8">
            How It Works
          </h1>
        </motion.div>

        <AnimatedSplitSteps steps={steps} />
      </BlankCard>
    </>
  );
}
