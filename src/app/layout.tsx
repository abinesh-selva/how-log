import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: {
    default: "HowLongToGo — Date Calculators & Countdown Tools",
    template: "%s | HowLongToGo",
  },
  description:
    "Free date calculators, live countdowns, and time tools. Find out how long ago any date was, how long until any event, calculate your exact age, business days, and more.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "https://howlongtogo.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "HowLongToGo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <script defer data-domain="howlongtogo.com" src="https://plausible.io/js/script.js"></script>
      </head>
      <body className="min-h-screen bg-white font-sans antialiased flex flex-col overflow-x-hidden">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
