
import BlankCard from "@/components/ui/BlankCard";
import CardComponent from "@/components/ui/CardComponent";
import CardsGrid from "@/components/ui/GridCard";
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
  // Card data array
  const cardData = [
    {
      imageSrc: "/solutions/ap-teams/secure-payment.png",
      title: "Secure Payment",
      subtitle:
        "Eliminate the risk of email-based and invoice-based payment information exchanges. Your banking details live in a secure, verified profile.",
    },
    {
      imageSrc: "/solutions/ap-teams/digital-payment.png",
      title: "Digital Payment Profile",
      subtitle:
        "Your payment information lives in a tamper-proof profile that cannot be edited or altered like invoices and PDFs. Customers always have your correct, verified details.",
    },
    {
      imageSrc: "/solutions/ap-teams/build-trust.png",
      title: "Build Trust",
      subtitle:
        "When customers pay using your Aplite profile, they know the banking details are legitimate, reducing payment delays and fraud concerns.",
    },
  ];

  // Features data array for the grid
  const featuresData = [
    "Cut verification time by 99%",
    "Stop vendor impersonation fraud",
    "Eliminate manual data entry",
    "No more email-based banking updates",
    "Reduce payment errors to zero",
    "Real-time change notifications",
    "Audit-ready documentation",
    "Human-verified, not bot-scraped",
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
              <div className="mb-2 lg:mb-1">Highly Secure</div>

              <div className="mb-2 lg:mb-1 lg:pl-20 xl:pl-64">
                Digital Payments Built
              </div>

              <div className="mb-0 lg:mb-0 lg:text-right">
                On Financial Trust.
              </div>
            </h1>
          </motion.div>

          <motion.div
            {...fadeInRight()}
            className="flex justify-center p-4 lg:justify-end"
          >
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed text-center lg:text-right max-w-2xl">
              Eliminate the risk of email-based and invoice-based payment
              information exchanges. Your banking details live in a secure,
              verified profile that builds trust with every transaction.
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
          Why Accounts Payable Teams choose Aplite
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
