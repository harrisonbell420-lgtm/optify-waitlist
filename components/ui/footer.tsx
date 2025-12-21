"use client";
import { motion } from "framer-motion";
import { itemVariants } from "@/lib/animation-variants";

export default function Footer() {
  return (
    <motion.footer
      className="w-full text-center text-xs text-gray-400 pb-16 pt-2 z-20 relative"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      © 2025 Optify. All rights reserved.
    </motion.footer>
  );
}
