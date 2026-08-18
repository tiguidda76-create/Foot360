import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Foot360 | Autonomous European Football News & Tactical Intelligence",
  description:
    "Premier League, La Liga, Bundesliga, Serie A, Ligue 1, and Champions League tactical analysis, verified transfer rumors, and matchday intelligence compliant with Google E-E-A-T standards.",
  keywords: [
    "Football News",
    "European Football",
    "Premier League",
    "Champions League",
    "Tactical Analysis",
    "Transfer Rumors",
    "Opta Stats",
    "Expected Goals",
  ],
  authors: [{ name: "Foot360 Senior Editorial Board" }],
  openGraph: {
    title: "Foot360 - European Football News & Tactical Intelligence",
    description:
      "Deep tactical breakdowns, authenticated transfer tiers, and match reporting across Europe's top 5 leagues.",
    siteName: "Foot360",
    images: [
      {
        url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Foot360 European Football Intelligence",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-0000000000000000";

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "Foot360",
    "url": "https://foot360.vercel.app",
    "logo": "https://foot360.vercel.app/logo.png",
    "sameAs": [
      "https://twitter.com/foot360_intel",
      "https://facebook.com/foot360",
      "https://youtube.com/@foot360"
    ],
    "publishingPrinciples": "https://foot360.vercel.app/editorial-policy",
    "correctionsPolicy": "https://foot360.vercel.app/editorial-policy#corrections",
    "diversityPolicy": "https://foot360.vercel.app/about#diversity",
    "ethicsPolicy": "https://foot360.vercel.app/editorial-policy#ethics"
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Google AdSense Script Tag */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
          crossOrigin="anonymous"
        />
        {/* Organization Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
