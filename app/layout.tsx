import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "GPJobs.au - GP Recruitment & Jobs in Australia",
  description:
    "Find GP jobs across Australia or recruit qualified doctors for your practice. Expert guidance on AHPRA registration, Medicare provider numbers, DPA, MMM classifications, and GP training programs.",
  keywords:
    "GP jobs, doctor jobs, medical recruitment, general practitioner, Australia, DPA, MMM, AHPRA, Medicare provider numbers",
  authors: [{ name: "GPJobs.au" }],
  creator: "GPJobs.au",
  publisher: "GPJobs.au",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://gpjobs.au",
    siteName: "GPJobs.au",
    title: "GPJobs.au - GP Recruitment & Jobs in Australia",
    description:
      "Find GP jobs across Australia or recruit qualified doctors for your practice. Expert guidance on AHPRA registration, Medicare provider numbers, DPA, MMM classifications, and GP training programs.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GPJobs.au - Connecting GPs with the right practices across Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GPJobs.au - GP Recruitment & Jobs in Australia",
    description:
      "Find GP jobs across Australia or recruit qualified doctors for your practice. Expert guidance on AHPRA registration, Medicare provider numbers, DPA, MMM classifications, and GP training programs.",
    images: ["/og-image.jpg"],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
