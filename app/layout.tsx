import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Siyaratech Innovations | AI & Digital Transformation",
    template: "%s | Siyaratech Innovations"
  },
  description: "Transform your business with Siyaratech Innovations. We specialize in AI, machine learning, cloud services, and custom software development to drive growth.",
  keywords: ["AI Consulting", "Digital Transformation", "Software Development", "Cloud Services", "Machine Learning", "Web Development", "Siyaratech"],
  authors: [{ name: "Siyaratech Innovations" }],
  creator: "Siyaratech Innovations",
  publisher: "Siyaratech Innovations",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://siyaratechin.com",
    siteName: "Siyaratech Innovations",
    title: "Siyaratech Innovations | AI & Digital Transformation",
    description: "Transform your business with Siyaratech Innovations. We specialize in AI, machine learning, cloud services, and custom software development.",
    images: [
      {
        url: "/static_images/og-image.jpg", // Ensure this image exists or use a placeholder
        width: 1200,
        height: 630,
        alt: "Siyaratech Innovations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siyaratech Innovations | AI & Digital Transformation",
    description: "Transform your business with Siyaratech Innovations. We specialize in AI, machine learning, cloud services, and custom software development.",
    images: ["/static_images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Siyaratech Innovations",
  "url": "https://siyaratechin.com",
  "logo": "https://siyaratechin.com/static_images/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/siyaratech",
    "https://twitter.com/siyaratech"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567", // Replace with actual
    "contactType": "customer service"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased pt-0 m-0`}>
        <Providers>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}