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
        <div className="flex items-center justify-center gap-2 mt-4">
          <a href="https://x.com/optifyai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors">
            <svg width="20" height="20" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1200 0L1097.54 109.09L682.09 564.36L1097.54 1117.91L1200 1227H1012.73L600.91 701.09L187.27 1227H0L108.18 1117.91L517.27 564.36L108.18 109.09L0 0H187.27L600.91 525.45L1012.73 0H1200Z" fill="currentColor"/>
            </svg>
            X/Twitter
          </a>
          <span className="text-zinc-400">or</span>
          <a href="https://discord.gg/GGKAVYYENQ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors">
            <svg width="20" height="20" viewBox="0 0 127.14 96.36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M107.15 8.29A105.15 105.15 0 0082.13.36a.37.37 0 00-.39.18c-1.5 2.65-3.18 6.13-4.36 8.89-13.14-1.97-26.16-1.97-39.14 0-1.19-2.77-2.87-6.24-4.36-8.89a.37.37 0 00-.39-.18A105.15 105.15 0 0019.99 8.29a.34.34 0 00-.16.13C2.58 33.6-1.44 58.36.39 82.89a.4.4 0 00.15.27c16.44 12.1 32.4 19.44 48.19 24.18a.38.38 0 00.42-.14c3.7-5.07 7-10.41 9.7-16.08a.37.37 0 00-.2-.5c-5.3-2.01-10.36-4.44-15.23-7.19a.37.37 0 01-.04-.61c1.02-.77 2.04-1.57 3.01-2.39a.37.37 0 01.38-.06c31.94 14.6 66.54 14.6 98.41 0a.37.37 0 01.39.05c.98.82 2 1.62 3.02 2.39a.37.37 0 01-.03.61c-4.87 2.75-9.93 5.18-15.23 7.19a.37.37 0 00-.2.5c2.7 5.67 6 11.01 9.7 16.08a.38.38 0 00.42.14c15.79-4.74 31.75-12.08 48.19-24.18a.4.4 0 00.15-.27c1.83-24.53-2.19-49.29-19.44-74.47a.34.34 0 00-.16-.13zM42.02 65.36c-3.13 0-5.7-2.87-5.7-6.39 0-3.52 2.53-6.39 5.7-6.39 3.19 0 5.72 2.87 5.7 6.39 0 3.52-2.53 6.39-5.7 6.39zm43.1 0c-3.13 0-5.7-2.87-5.7-6.39 0-3.52 2.53-6.39 5.7-6.39 3.19 0 5.72 2.87 5.7 6.39 0 3.52-2.53 6.39-5.7 6.39z" fill="currentColor"/>
            </svg>
            Discord
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
