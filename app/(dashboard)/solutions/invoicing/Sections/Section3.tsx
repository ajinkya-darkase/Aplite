import BlankCard from "@/components/ui/BlankCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/utils";

export default function Section3() {
  return (
    <BlankCard>
      <motion.div {...fadeInUp()} className="space-y-8">
        <div className="space-y-4 text-center p-6">
          <p className="text-2xl font-medium">
            Ready to eliminate invoice fraud?
          </p>
          <Button
            variant="primary"
            size="sm"
            showIcon={true}
            onClick={() => alert("Talk To Our Team...")}
          >
            Talk To Our Team
          </Button>
        </div>
      </motion.div>
    </BlankCard>
  );
}
