import "./globals.css";

import type { Metadata } from "next";
import { Inter, Chakra_Petch } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/ui/footer";

// Using Inter which is very similar to Geist
// For true Geist font, you would need to download and use localFont
const GeistFont = Inter({ 
  subsets: ["latin"],
  variable: "--font-geist"
});
const ChakraPetch = Chakra_Petch({ 
  subsets: ["latin"],
  weight: "600", // Semi-Bold
  variable: "--font-chakra-petch"
});

export function generateMetadata() {
  // Append timestamp query param to force scrapers to fetch a fresh image
  const _v = Date.now();
  return {
    title: "Optify — Join the Waitlist for AI-powered Website Optimization",
    description:
      "Join the Optify waitlist for smarter, AI-powered website optimization. Be the first to know when we launch.",
    openGraph: {
      title: 'Optify — Join the Waitlist for AI-powered Website Optimization',
      description: 'Join the Optify waitlist for smarter, AI-powered website optimization. Be the first to know when we launch.',
      url: 'https://www.optifyai.app',
      type: 'website',
      images: [
        {
          url: `https://optifyai.app/opengraph-image.png?v=${_v}`,
          width: 1365,
          height: 768,
          alt: 'Optify Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Optify — Join the Waitlist for AI-powered Website Optimization',
      description: 'Join the Optify waitlist for smarter, AI-powered website optimization. Be the first to know when we launch.',
      images: [`https://optifyai.app/twitter-image.png?v=${_v}`],
    },
    other: [
      {
        tagName: 'meta',
        attributes: {
          property: 'og:url',
          content: 'https://www.optifyai.app',
        },
      },
      {
        tagName: 'meta',
        attributes: {
          property: 'og:type',
          content: 'website',
        },
      },
      {
        tagName: 'meta',
        attributes: {
          property: 'twitter:image',
          content: `https://optifyai.app/twitter-image.png?v=${_v}`,
        },
      },
      {
        tagName: 'meta',
        attributes: {
          property: 'twitter:domain',
          content: 'optifyai.app',
        },
      },
      {
        tagName: 'meta',
        attributes: {
          property: 'twitter:url',
          content: 'https://www.optifyai.app',
        },
      },
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-hidden" suppressHydrationWarning>
      <head />
      <body className={`${GeistFont.className} ${ChakraPetch.variable} overflow-hidden`}> 
        {children}
        <Toaster richColors position="top-center" />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
