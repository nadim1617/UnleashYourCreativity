import "./globals.css";

export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL("https://unleashyourcreativity.vercel.app"),
  title: {
    default: "Unleash Your Creativity Season 2.0 | DIUPS National Photography Exhibition",
    template: "%s | UYC 2.0",
  },
  description:
    "Submit your best photographs to UYC 2.0 — the national photography exhibition by Daffodil International University Photographic Society (DIUPS). Open for University, School & College levels. Deadline: December 30, 2025.",
  keywords: [
    "photography exhibition",
    "DIUPS",
    "Unleash Your Creativity",
    "UYC 2.0",
    "Daffodil International University",
    "photography contest",
    "national photography",
    "Bangladesh photography",
  ],
  authors: [{ name: "DIUPS" }, { name: "Daffodil International University Photographic Society" }],
  creator: "DIUPS",
  publisher: "DIUPS",
  alternates: {
    canonical: "/",
  },
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
    title: "Unleash Your Creativity Season 2.0 | DIUPS",
    description:
      "A national photography exhibition by Daffodil International University Photographic Society. Submit your entries now!",
    url: "https://unleashyourcreativity.vercel.app",
    siteName: "Unleash Your Creativity Season 2.0",
    images: [
      {
        url: "/images/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "UYC 2.0 Photography Exhibition Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unleash Your Creativity Season 2.0 | DIUPS",
    description:
      "Submit your best photographs to UYC 2.0 — the national photography exhibition by Daffodil International University Photographic Society (DIUPS).",
    images: ["/images/hero-bg.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="krjJ7DUPuioiDOJu8aRAq5qRFmAKx7CtES1mv1jG-K0" />
        <link rel="icon" href="/images/diups-logo.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
