import BlankCard from "@/components/ui/BlankCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/utils";

export default function Section3() {

  return (
    <BlankCard>
      <motion.div {...fadeInUp()}>
        <div className="space-y-4 text-center p-6">
          <p className="text-2xl font-medium">
            RReady to build autonomous payment systems?
          </p>
          <Button
            variant="primary"
            size="sm"
            showIcon={true}
            onClick={() => alert("Contact Us...")}
          >
            Contact Us
          </Button>
        </div>
      </motion.div>
    </BlankCard>
  );
}
