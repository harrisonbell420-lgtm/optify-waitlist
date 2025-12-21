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
  const _v = Date.now();
  return {
    title: "Optify - Join the Waitlist",
    description:
      "Join the Optify waitlist for smarter, AI-powered website optimization. Be the first to know when we launch.",
    openGraph: {
      title: 'Optify',
      description: 'AI-powered waitlist and onboarding for your product.',
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
      title: 'Optify',
      description: 'AI-powered waitlist and onboarding for your product.',
      images: [`https://optifyai.app/twitter-image.png?v=${_v}`],
    },
    other: [
      {
        tagName: 'meta',
        attributes: {
          property: 'twitter:image',
          content: `https://optifyai.app/twitter-image.png?v=${_v}`,
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
      <head>
        <meta property="og:image" content="/opengraph-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="832" />
        <meta
          property="og:site_name"
          content="Next.js + Notion — Waitlist Template"
        />
      </head>
      <body className={`${GeistFont.className} ${ChakraPetch.variable} overflow-hidden`}> 
        {children}
        <Toaster richColors position="top-center" />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
