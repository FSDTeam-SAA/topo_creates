import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import AppProvider from "@/providers/AppProvider";
import AuthSessionProvider from "@/providers/AuthSessionProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

export const avenir = localFont({
  src: "./fonts/avenir/Avenir Regular.ttf",
  variable: "--font-avenir",
  weight: "100 900",
  display: "swap",
});

export const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muse Gala | Curated Dress Hire Across Australia",
  description:
    "Rent event-ready dresses from Australia’s most-loved labels. Explore curated styles with real-time availability, local pickup, or express delivery options.",
  keywords: [
    "designer dress hire Australia",
    "dress hire near me",
    "Bec and Bridge dress hire",
    "Oh Polly dress hire",
    "Arcina Ori dress hire",
    "LIDÉE dress hire",
    "formal dress hire",
    "party dress hire",
    "event dress hire",
    "last minute dress hire",
  ],
  authors: [{ name: "Muse Gala" }],
  openGraph: {
    title: "Muse Gala | Curated Dress Hire Across Australia",
    description:
      "Discover curated designer dress hire in Australia. Choose from Bec and Bridge, Oh Polly, Arcina Ori, LIDÉE, and more. Local pickup & express delivery.",
    url: "https://musegala.com", // update with your real domain
    siteName: "Muse Gala",
    images: [
      {
        url: "https://musegala.com/og-image.jpg", // replace with actual OG image
        width: 1200,
        height: 630,
        alt: "Muse Gala Designer Dress Hire",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muse Gala | Curated Dress Hire Across Australia",
    description:
      "Rent event-ready dresses from Australia’s most-loved labels. Curated styles with real-time availability, pickup & express delivery.",
    images: ["https://musegala.com/og-image.jpg"], // same as OG image
    creator: "@monirhrabby", // update if you have a Twitter/X handle
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", avenir.variable, inter.className)}>
        <AuthSessionProvider>
          <AppProvider>
            {children}
            {/* <Footer /> */}
            <Toaster />
          </AppProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
