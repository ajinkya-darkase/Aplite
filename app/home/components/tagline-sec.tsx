"use client";

import { Search } from "lucide-react";
import Button from "../../../components/ui/Buttons";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function TaglineSec() {
  const router = useRouter();
  return (
    <motion.div {...fadeInUp()} className="flex flex-col mx-8 sm:mx-8 md:mx-10 my-12 items-center justify-center max-w-full rounded-2xl bg-white py-10 px-6 text-center">
      <h1 className="text-black text-2xl md:text-3xl font-semibold mb-6">
        We don't move money. We direct where it goes.
      </h1>

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center bg-white rounded-2xl px-4 w-[280px] sm:w-[400px] h-10 sm:h-12 md:h-14 border border-gray-300">
          <Search className="text-gray-400 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search Anything"
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        <Button 
          variant="primary" 
          size="lg" 
          label="Get Started"
          onClick={() => router.push("/get-started")} 
          className="w-auto px-6 sm:px-8 h-10 sm:h-12 md:h-14">
        </Button>
      </div>
    </motion.div>
  );
}
