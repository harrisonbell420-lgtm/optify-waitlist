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

export const metadata: Metadata = {
  title: "Optify - Join the Waitlist",
  description:
    "Join the Optify waitlist for smarter, AI-powered website optimization. Be the first to know when we launch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <meta property="og:image" content="/opengraph-image.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="832" />
      <meta
        property="og:site_name"
        content="Next.js + Notion — Waitlist Template"
      />
      <meta
        property="og:url"
        content="https://nextjs-notion-waitlist.vercel.app/"
      />
      <meta name="twitter:image" content="/twitter-image.png" />
      <meta name="twitter:image:type" content="image/png" />
      <meta name="twitter:image:width" content="1280" />
      <meta name="twitter:image:height" content="832" />
      <body className={`${GeistFont.className} ${ChakraPetch.variable}`}>
        {children}
        <Toaster richColors position="top-center" />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
