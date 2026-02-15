"use client";

import Link from "next/link";
import { ChangeEvent } from "react";
import { motion } from "framer-motion";
import { FaXTwitter } from "react-icons/fa6";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

interface FormProps {
  name: string;
  email: string;
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  loading: boolean;
}

export default function Form({
  name,
  email,
  handleNameChange,
  handleEmailChange,
  handleSubmit,
  loading,
}: FormProps) {
  return (
    <motion.div
      className="flex w-full max-w-[388px] flex-col gap-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Name field - stacked above */}
      <motion.div variants={itemVariants}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={handleNameChange}
          className="h-[38px] w-full rounded-[10px] border border-white/15 bg-black/28 px-3 text-sm tracking-[-0.02em] text-white placeholder:text-[#A1A3AA] focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
        />
      </motion.div>

      {/* Email + Join button - inline row per design */}
      <motion.div
        variants={itemVariants}
        className="flex h-[38px] w-full gap-2 overflow-hidden rounded-[10px]"
      >
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={handleEmailChange}
          className="h-full flex-1 min-w-0 rounded-[10px] border border-white/15 bg-black/28 px-3 text-sm tracking-[-0.02em] text-white placeholder:text-[#A1A3AA] focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="flex h-full shrink-0 items-center justify-center rounded-[10px] bg-white px-4 font-medium tracking-[-0.02em] text-black transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "..." : "Join waitlist"}
        </button>
      </motion.div>

      {/* Social proof - creators have joined */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2"
      >
        <span className="text-xs tracking-[-0.02em] text-[#A1A3AA]">
          creators have already joined
        </span>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/11 bg-black/56 backdrop-blur-[15.5px]">
          <span className="text-[10px] font-normal tracking-[-0.02em] text-white">
            63+
          </span>
        </div>
      </motion.div>

      {/* Twitter link */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-1 text-[#A1A3AA]"
      >
        <span className="text-xs">For any queries, reach out at</span>
        <Link
          href="https://x.com/optifyai"
          rel="noopener noreferrer"
          target="_blank"
          className="text-[#A1A3AA] transition-colors hover:text-white"
        >
          <FaXTwitter className="h-4 w-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
