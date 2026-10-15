import type { Metadata, Viewport } from "next";
import "./globals.css";

const TITLE = "Dipendra P. Yadav — Founder & Engineer";
const DESCRIPTION =
  "Founder of Queuella, a multi-tenant queue, booking and POS platform with a native iOS app. Senior data engineer building regulated, enterprise-scale pipelines on AWS.";

export const metadata: Metadata = {
  metadataBase: new URL("https://dipenyadav.com"),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  authors: [{ name: "Dipendra P. Yadav" }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://dipenyadav.com",
    siteName: "Dipendra P. Yadav",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export const viewport: Viewport = { themeColor: "#080f1a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
