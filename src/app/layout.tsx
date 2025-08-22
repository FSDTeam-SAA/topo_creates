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
  title: "Musa Gala",
  description: "Effortless fashion hire",
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
