"use client";

import { Mail, AlertTriangle, ShieldAlert, Clock, Database, IdCard, Lock, BellRing, MailCheck, FileCheck, Handshake, LucideIcon } from 'lucide-react';
import ReusableReactIcon from "@/components/ui/ReusableReactIcon";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/lib/utils";

type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  sizeprop?: "sm" | "md";
};

const beforeFeatures: FeatureItem[] = [
  { icon: Mail, title: "Scattered Communication Channels", description: "Businesses manage banking info via emails, invoices, and phone calls, with no central system."},
  { icon: AlertTriangle, title: "No Way to Verify Details", description: "Any typo or compromised email can lead to severe financial losses—average $183K per incident."},
  { icon: ShieldAlert, title: "Email Is the #1 Fraud Vector", description: "Banking changes arrive through email, making every update a massive risk for fraud." },
  { icon: Clock, title: "Wasted Verification Effort", description: "Finance teams spend hours cross-checking info across sources, still exposed to risk." },
  { icon: Database, title: "No Central Repository", description: "Lack of a unified, verifiable source causes confusion, delays, and increased exposure." },
];

const afterFeatures: FeatureItem[] = [
  { icon: IdCard, title: "Verified Digital Payment Profile", description: "Every business gets an instantly accessible, authenticated profile—pay with confidence." },
  { icon: Lock, title: "All Banking Details Authenticated", description: "Details are verified and stored securely, eliminating manual verification and fraud risk." },
  { icon: BellRing, title: "Real-Time Verified Alerts", description: "Receive instant, source-verified alerts for every banking change—block fraud before it starts." },
  { icon: MailCheck, title: "No More Email Risks", description: "Eliminate manual email updates, so payments can't be hijacked by attackers." },
  { icon: FileCheck, title: "Centralized, Tamper-Proof Repository", description: "All updates are stored in one secure source—compliance and audit made easy." },
  { icon: Handshake, title: "Trusted, Secure Relationships", description: "Strengthen partnerships with fraud-proof payments and trusted verification." },
];

const FeatureSection = ({ title, features }: { title: string; features: FeatureItem[] }) => (
  <div className="w-full p-3 sm:p-6 flex flex-col lg:flex-row gap-4 sm:gap-8 lg:gap-20">
    <div className="flex w-full lg:w-2/3">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6">{title}</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-4 sm:gap-6 lg:gap-8">
          <div>
            <ReusableReactIcon
              sizeprop={"md"}
              squareBgColor="#003cff"
              icon={feature.icon}
              iconBgColor="#93c5fd"
            />
          </div>
          <div>
            <span className="font-semibold text-base sm:text-lg text-gray-800">{feature.title}</span>
            <p className="text-gray-700 text-sm sm:text-base">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export function BeforeAfterAplite() {
  return (
    <section className="bg-white px-4 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16 lg:pb-0">
      <div className="max-w-full mx-auto px-2 sm:px-4">
        <motion.div {...fadeInUp()}>
          <h2 className="text-4xl mb-8 md:text-7xl font-light tracking-tight text-black text-center">
            How Businesses Handle <br /> Banking Information - And How Aplite Redefines It
          </h2>
          <p className="w-full text-lg sm:text-xl text-gray-400 leading-relaxed text-center">
            The traditional approach exposes businesses to fraud and errors.<br />
            Here's how Aplite transforms the process.
          </p>
        </motion.div>
        <section className="flex flex-col gap-8 py-12 mt-10">
          <motion.div {...fadeInLeft()}>
            <FeatureSection title="Before Aplite" features={beforeFeatures} />
          </motion.div>
          <hr />
          <motion.div {...fadeInRight()}>
            <FeatureSection title="After Aplite" features={afterFeatures} />
          </motion.div>
        </section>
      </div>
    </section>
  );
}