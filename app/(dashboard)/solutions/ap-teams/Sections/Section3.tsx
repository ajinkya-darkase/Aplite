import BlankCard from "@/components/ui/BlankCard";
import Button from "@/components/ui/Buttons";
import { CircleArrowOutUpRight } from "lucide-react";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/utils";

export default function Section3() {
  return (
    <BlankCard>
      <motion.div {...fadeInUp()} className="p-6 space-y-6">
        <div className="text-center">
          <p className="text-2xl font-medium  leading-tight">
            Ready to transform your AP process?
          </p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button
            label="Verify Your First Vendor"
            //onClick={onButtonClick}
            variant="primary"
            size="sm"
          />

          <Button
            icon={CircleArrowOutUpRight}
            label="Join Aplite"
            //onClick={onButtonClick}
            variant="primary"
            size="sm"
          />
        </div>
      </motion.div>
    </BlankCard>
  );
}
