import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://how-log.com"),
  title: {
    default: "How-Log — Know Your Time, Beautifully",
    template: "%s | How-Log",
  },
  description:
    "The fastest, most beautiful date calculator on the internet. Find how long ago any date was, calculate days between dates, and create stunning countdowns.",
  keywords: [
    "how long ago",
    "date calculator",
    "days between dates",
    "countdown timer",
    "day of the week",
    "age calculator",
    "time calculator",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "How-Log",
    title: "How-Log — Know Your Time, Beautifully",
    description: "The fastest, most beautiful date calculator on the internet.",
  },
  twitter: {
    card: "summary_large_image",
    title: "How-Log — Know Your Time, Beautifully",
    description: "The fastest, most beautiful date calculator on the internet.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
