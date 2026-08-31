import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400"],
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#DFE0DF" },
    { media: "(prefers-color-scheme: dark)", color: "#402E32" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gridhomes.in"),
  title: {
    default: "Grid Homes | Architecture & Interiors",
    template: "%s | Grid Homes",
  },
  description: "Premium architecture and interior design studio creating enduring spaces. Home Interiors and Construction services across Hyderabad, Bangalore, and Visakhapatnam.",
  keywords: ["architecture", "interior design", "construction", "villa design", "luxury interiors", "turnkey projects", "Hyderabad", "Bangalore", "Visakhapatnam"],
  authors: [{ name: "Grid Homes" }],
  creator: "Grid Homes",
  publisher: "Grid Homes",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://gridhomes.in",
    siteName: "Grid Homes",
    title: "Grid Homes | Architecture & Interiors",
    description: "Premium architecture and interior design studio creating enduring spaces.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Grid Homes - Architecture & Interiors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grid Homes | Architecture & Interiors",
    description: "Premium architecture and interior design studio creating enduring spaces.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Grid Homes",
              description: "Premium architecture and interior design studio creating enduring spaces.",
              url: "https://gridhomes.in",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressCountry: "IN"
              }
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-primary text-primary">
        {children}
      </body>
    </html>
  );
}
