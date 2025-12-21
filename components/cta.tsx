import { motion } from "framer-motion";
import TextBlur from "@/components/ui/text-blur";
import AnimatedShinyText from "@/components/ui/shimmer-text";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function CTA() {
  return (
    <motion.div
      className="flex w-full max-w-2xl flex-col gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-center">
          <div className="flex w-fit items-center justify-center rounded-full bg-muted/80 text-center">
            <AnimatedShinyText className="px-4 py-1">
              <span>Coming soon!</span>
            </AnimatedShinyText>
          </div>
        </div>
      </motion.div>

      <motion.img
        src="/optify-logo-with-text.svg"
        alt="Optify logo with text"
        className="mx-auto h-16 w-auto object-contain"
        variants={itemVariants}
      />

      <motion.h1
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="text-center text-3xl font-semibold tracking-tighter sm:text-5xl font-chakra-petch drop-shadow-sm">
        Smarter Website Optimization{" "}
        <span className="bg-gradient-to-r from-[#A8FFB0] to-[#00FF0E] bg-clip-text text-transparent">
          Starts Here
        </span>
      </motion.h1>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="mx-auto max-w-[40rem] pt-1.5 text-center text-base text-zinc-300 sm:text-lg"
          text="Join the waitlist to be notified when Optify launches"
          duration={0.8}
        />
      </motion.div>
    </motion.div>
  );
}
