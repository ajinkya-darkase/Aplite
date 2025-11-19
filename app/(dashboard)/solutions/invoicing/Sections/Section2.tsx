import AnimatedSplitSteps from "@/components/ui/AnimatedSplitSection";
import BlankCard from "@/components/ui/BlankCard";
import CardComponent from "@/components/ui/CardComponent";
import CardsGrid from "@/components/ui/GridCard";
import ReusableReactIcon from "@/components/ui/ReusableReactIcon";
import { CheckCircle, Key, UserCircle } from "lucide-react";
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
      imageSrc: "/solutions/invoicing/embed-aplite.png",
      title: "Embed Aplite PINs on invoices",
      subtitle:
        "Vendors add their Aplite PIN instead of account numbers. Customers pay using tamper-proof information pulled directly from Aplite—no altered PDFs, no fraudulent wire instructions.",
    },
    {
      imageSrc: "/solutions/invoicing/faster-payments.png",
      title: "Faster payments, zero fraud risk",
      subtitle:
        "Customers pay immediately when they trust the banking details. No verification delays, no compromised attachments, just verified information and instant confidence.",
    },
    {
      imageSrc: "/solutions/invoicing/embed-aplite.png",
      title: "Professional verification badge",
      subtitle:
        "Stand out with verified payment credentials that build customer trust and differentiate your invoicing platform from competitors.",
    },
  ];

  // Features data array for the grid
  const featuresData = [
    "Eliminate invoice-based payment fraud",
    "Reduce payment delays",
    "Professional verification badge",
    "Competitive differentiation",
    "Simple PIN integration",
    "No complex API required",
    "Instant customer trust",
    "Improved payment success rates",
  ];

  const steps = [
    {
      id: 1,
      icon: UserCircle,
      title: "Vendor adds Aplite PIN to invoice template",
      description:
        "The vendor replaces editable banking details on their invoices with their unique, non-editable Aplite PIN.",
      images: ["/solutions/invoicing/feature-1.png"],
    },
    {
      id: 2,
      icon: Key,
      title: "Customer enters PIN on Aplite",
      description:
        "The customer inputs the PIN on the Aplite platform (or via API) to initiate quick and easy verification of the payee.",
      images: ["/solutions/invoicing/feature-2.png"],
    },
    {
      id: 3,
      icon: CheckCircle,
      title:
        "Verified banking details display instantly - customer pays with confidence",
      description:
        "The customer instantly receives the secure, tamper-proof banking details, allowing them to pay with immediate trust and confidence.",
      images: ["/solutions/invoicing/feature-3.png"],
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
              <div className="mb-2 lg:mb-1">Embed Aplite PINs</div>

              <div className="mb-2 lg:mb-1 lg:pl-20 xl:pl-64">
                Not Editable Banking
              </div>

              <div className="mb-0 lg:mb-0 lg:text-right">
                Details On Invoices.
              </div>
            </h1>
          </motion.div>

          <motion.div
            {...fadeInRight()}
            className="flex justify-center p-4 lg:justify-end"
          >
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed text-center lg:text-right max-w-2xl">
              Eliminate invoice-based payment fraud. Vendors embed their Aplite
              PIN instead of account numbers, ensuring customers always pay using
              verified, tamper-proof banking information.
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
          Why Invoicing Platforms integrate Aplite
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
