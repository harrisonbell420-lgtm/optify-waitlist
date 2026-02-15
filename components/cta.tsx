import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function CTA() {
  return (
    <motion.div
      className="mb-6 flex w-full flex-col gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        variants={itemVariants}
        className="font-chakra-petch text-center text-3xl font-semibold leading-[1.21] tracking-[-0.02em] text-white sm:text-4xl"
      >
        Smarter Website Optimization&nbsp;Starts Here
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="mx-auto max-w-[372px] text-center text-base leading-[1.3] tracking-[-0.02em] text-[#A1A3A9]"
      >
        Join the waitlist to be notified when Optify launches
      </motion.p>
    </motion.div>
  );
}
