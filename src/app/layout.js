import "./globals.css";

export const metadata = {
  title: "Unleash Your Creativity Season 2.0 | DIUPS National Photography Exhibition",
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
  openGraph: {
    title: "Unleash Your Creativity Season 2.0 | DIUPS",
    description:
      "A national photography exhibition by Daffodil International University Photographic Society. Submit your entries now!",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/diups-logo.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
