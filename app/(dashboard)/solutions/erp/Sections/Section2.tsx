import AnimatedSplitSteps from "@/components/ui/AnimatedSplitSection";
import BlankCard from "@/components/ui/BlankCard";
import CardComponent from "@/components/ui/CardComponent";
import CardsGrid from "@/components/ui/GridCard";
import ReusableReactIcon from "@/components/ui/ReusableReactIcon";
import {
  CheckCircle,
  ClipboardList,
  Key,
  Server,
  ShieldCheck,
} from "lucide-react";
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

  // Card data array
  const cardData = [
    {
      imageSrc: "/solutions/erp/integrate-aplites.png",
      title: "Integrate Aplite's API to autofill payment information",
      subtitle:
        "Users enter an Aplite PIN—verified banking details populate instantly. Cut manual entry by 99%, eliminate transcription errors, and reduce payment failures.",
    },
    {
      imageSrc: "/solutions/erp/keep-vendor-data.png",
      title: "Keep vendor data current automatically",
      subtitle:
        "Real-time updates from Aplite mean no outdated banking information in your ERP. Every payment uses verified, current details with audit-ready documentation.",
    },
    {
      imageSrc: "/solutions/erp/integrate-aplites.png",
      title: "Seamless integration",
      subtitle:
        "Simple API integration that works with your existing ERP workflows. No complex setup, just verified payment data when you need it.",
    },
  ];

  // Features data array for the grid
  const featuresData = [
    "99% reduction in manual entry",
    "Zero transcription errors",
    "Real-time data updates",
    "Audit-ready documentation",
    "Eliminate payment failures",
    "Verified banking details",
    "Seamless API integration",
    "Automatic vendor updates",
  ];

  const steps = [
    {
      id: 1,
      icon: Key,
      title: "User enters Aplite PIN",
      description:
        "The paying user or system inputs the unique Aplite PIN found on the invoice.",
      images: ["/solutions/erp/workflow-1.png"],
    },
    {
      id: 2,
      icon: Server,
      title: "API call to Aplite",
      description:
        "Your system initiates a secure API request to the Aplite service, sending the PIN for verification.",
      images: ["/solutions/erp/workflow-2.png"],
    },
    {
      id: 3,
      icon: ShieldCheck,
      title: "Verified data returns",
      description:
        "Aplite verifies the PIN against the business's profile and returns the confirmed banking details securely.",
      images: ["/solutions/erp/workflow-3.png"],
    },
    {
      id: 4,
      icon: ClipboardList,
      title: "ERP autofill's payment form",
      description:
        "The returned, verified banking information automatically populates the payment fields within your ERP or accounting software.",
      images: ["/solutions/erp/workflow-4.png"],
    },
    {
      id: 5,
      icon: CheckCircle,
      title: "User confirms & pays",
      description:
        "With instant confidence in the payee's details, the user quickly confirms the payment and completes the transaction.",
      images: ["/solutions/erp/workflow-5.png"],
    },
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
              <div className="mb-2 lg:mb-1">Autofill Verified</div>

              <div className="mb-2 lg:mb-1 lg:pl-20 xl:pl-64">
                Banking Information
              </div>

              <div className="mb-0 lg:mb-0 lg:text-right">
                In Your ERP.
              </div>
            </h1>
          </motion.div>

          <motion.div
            {...fadeInRight()}
            className="flex justify-center p-4 lg:justify-end"
          >
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed text-center lg:text-right max-w-2xl">
              Cut manual entry by 99% and eliminate transcription errors. Aplite's
              API delivers verified banking details directly into your ERP,
              keeping vendor data current automatically.
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
          Why ERP Systems integrate Aplite
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

      <motion.div {...fadeInUp()} className="py-6 px-4">
        <h1 className="text-center text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 leading-tight tracking-tight mt-4 sm:mt-6 md:mt-8">
          How It Works
        </h1>
      </motion.div>

      <AnimatedSplitSteps steps={steps} />
    </BlankCard>
  );
}
