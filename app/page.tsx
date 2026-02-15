"use client";

import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter, FaLinkedinIn, FaDiscord } from "react-icons/fa6";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { motion } from "framer-motion";

const SIDEBAR_WIDTH_PX = 508;
const SIDEBAR_WIDTH_PCT = (508 / 1440) * 100; // ~35.28%

const BACKGROUND_IMAGE =
  "https://framerusercontent.com/images/Jhc9DurfuGhdeCVQoZnOwVXeVuQ.png?width=2888&height=1784";
const AVATARS_IMAGE =
  "https://framerusercontent.com/images/lyGRzXUABGuUx4DZhWCVyksgk.png?width=370&height=128";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    const displayName = name.trim() || (email.includes("@") ? email.split("@")[0] : "Waitlist");
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    const promise = new Promise(async (resolve, reject) => {
      try {
        // Save to Supabase waitlist only - no confirmation email
        const notionResponse = await fetch("/api/notion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: displayName, email }),
        });

        if (!notionResponse.ok) {
          if (notionResponse.status === 429) reject("Rate limited");
          else if (notionResponse.status === 409) reject("Duplicate email");
          else reject((await notionResponse.json()).error || "Database error");
        } else {
          resolve({ name: displayName });
        }
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(promise, {
      loading: "Adding you to the waitlist...",
      success: () => {
        setName("");
        setEmail("");
        return "You're on the list!";
      },
      error: (error) => {
        if (error === "Rate limited") return "Too many requests. Please try again in a minute.";
        if (error === "Duplicate email") return "This email is already on the waitlist!";
        return "Something went wrong. Please try again.";
      },
    });

    promise.finally(() => setLoading(false));
  };

  return (
    <main
      className="fixed inset-0 flex overflow-hidden bg-[#050506]"
      style={{ width: "100vw", height: "100dvh" }}
    >
      {/* Background - covers entire viewport without letterboxing */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${BACKGROUND_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Bottom gradient - fades to black at bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          background: "linear-gradient(to top, #000 0%, transparent 100%)",
        }}
      />

      {/* Right gradient - fades to black toward right edge */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[60%]"
        style={{
          background: "linear-gradient(to left, #000 0%, transparent 100%)",
        }}
      />

      {/* Left sidebar - fixed proportion, max 508px */}
      <motion.div
        className="relative flex shrink-0 flex-col"
        style={{
          width: `min(${SIDEBAR_WIDTH_PX}px, ${SIDEBAR_WIDTH_PCT}vw)`,
          minWidth: 280,
          height: "100%",
          backdropFilter: "blur(18.65px)",
          WebkitBackdropFilter: "blur(18.65px)",
          backgroundColor: "#000000cf",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Content - percentage-based to scale with sidebar */}
        <div className="relative flex h-full w-full flex-col" style={{ padding: "3.1% 10.8% 3.1% 10.8%" }}>
          {/* Logo - left edge aligned with email input, slightly bigger */}
          <motion.div
            className="h-[6%] w-[32%] shrink-0"
            style={{ minHeight: 40, minWidth: 120, marginLeft: "-6.5%" }}
            variants={itemVariants}
          >
            <Image
              src="/optify-logo-with-text.svg"
              alt="Optify"
              width={139}
              height={46}
              className="h-full w-full object-contain object-left-top"
            />
          </motion.div>

          {/* Content area - centered in remaining space */}
          <div className="relative flex flex-1 flex-col justify-center" style={{ marginLeft: "-6.5%", width: "113%" }}>
            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-chakra-petch w-full text-center font-semibold leading-[1.21] tracking-[-0.02em] text-white"
              style={{ fontSize: "clamp(24px, 2.5vw, 36px)", marginBottom: "8.5%" }}
            >
              Smarter Website{" "}
              <span className="bg-gradient-to-r from-[#10B519] via-[#3dd948] to-[#5ae865] bg-clip-text text-transparent">
                Optimization
              </span>
              &nbsp;Starts Here
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={itemVariants}
              className="leading-[1.3] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-geist), Geist, Inter, sans-serif",
                color: "rgb(161, 163, 169)",
                fontSize: "clamp(14px, 1.1vw, 16px)",
                marginBottom: "5%",
              }}
            >
              Join the waitlist to be notified when Optify launches
            </motion.p>

            {/* Form row */}
            <motion.div
              variants={itemVariants}
              className="flex gap-2"
              style={{ marginBottom: "4.5%", height: 38 }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={handleEmailChange}
                className="h-full flex-1 min-w-0 rounded-[10px] border border-[#ffffff26] bg-[#00000047] px-3 text-sm leading-[1.3] tracking-[-0.02em] text-white placeholder:text-[rgb(161,163,170)] focus:outline-none focus:ring-1 focus:ring-white/30"
              />
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex h-full shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-white px-4 font-medium leading-[1.11] tracking-[-0.02em] text-black transition-all duration-150 hover:bg-[#f0f0f0] hover:scale-[1.02] active:scale-[0.98] active:bg-[#e5e5e5] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:active:scale-100"
              >
                {loading ? "..." : "Join waitlist"}
              </button>
            </motion.div>

            <input
              type="text"
              placeholder="Your Name (optional)"
              value={name}
              onChange={handleNameChange}
              className="sr-only"
              aria-hidden
            />

            {/* Social proof - centered in sidebar, avatars left, stacked text right */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 self-center"
              style={{ fontSize: "clamp(11px, 0.85vw, 12px)" }}
            >
              <div className="flex shrink-0 items-center">
                <img
                  src={AVATARS_IMAGE}
                  alt=""
                  width={93}
                  height={32}
                  className="h-8 w-auto object-contain object-left"
                />
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#ffffff1c] bg-[#0000008f] [backdrop-filter:blur(15.5px)]"
                  style={{ marginLeft: -8 }}
                >
                  <span
                    className="text-[10px] font-normal leading-[1.25] tracking-[-0.02em] text-white"
                    style={{ fontFamily: "var(--font-geist), Geist, Inter, sans-serif" }}
                  >
                    63+
                  </span>
                </div>
              </div>
              <div
                className="flex flex-col leading-[1.25] tracking-[-0.02em]"
                style={{
                  color: "rgb(161, 163, 170)",
                  fontFamily: "var(--font-geist), Geist, Inter, sans-serif",
                }}
              >
                <span>creators</span>
                <span>have already joined</span>
              </div>
            </motion.div>
          </div>

          {/* Footer - copyright + X, LinkedIn, Discord (icons centered with text) */}
          <motion.div
            variants={itemVariants}
            className="flex shrink-0 items-center justify-between gap-3 pb-[3%]"
            style={{
              color: "rgb(161, 163, 170)",
              fontFamily: "var(--font-geist), Geist, Inter, sans-serif",
              fontSize: "clamp(11px, 0.85vw, 12px)",
            }}
          >
            <span className="leading-[1.3] tracking-[-0.02em]">
              © 2026 Optify AI. All rights reserved.
            </span>
            <div className="flex items-center gap-2">
              <Link
                href="https://x.com/optifyai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center text-[rgb(161,163,170)] transition-colors hover:text-white"
                aria-label="Optify on X"
              >
                <FaXTwitter className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/optify-ai-b4551a3a5/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center text-[rgb(161,163,170)] transition-colors hover:text-white"
                aria-label="Optify on LinkedIn"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </Link>
              <Link
                href="https://discord.gg/U6fXr4BJxh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center text-[rgb(161,163,170)] transition-colors hover:text-white"
                aria-label="Optify on Discord"
              >
                <FaDiscord className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
