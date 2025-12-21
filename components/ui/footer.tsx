"use client";
import { motion } from "framer-motion";
import { itemVariants } from "@/lib/animation-variants";

export default function Footer() {
  return (
    <motion.footer
      className="w-full text-center text-xs text-gray-400 pb-16 pt-2 z-20 relative"
      style={{ marginTop: "6rem" }}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
    </motion.footer>
  );
}
