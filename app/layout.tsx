import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dipendra Yadav — Senior Data Engineer",
  description:
    "Senior Data Engineer with 6+ years of experience in enterprise data pipelines, AWS cloud architecture, and full-stack SaaS development. Founder of Queuella LLC.",
  openGraph: {
    title: "Dipendra Yadav — Senior Data Engineer",
    description:
      "Senior Data Engineer with 6+ years of experience in enterprise data pipelines, AWS cloud architecture, and full-stack SaaS development.",
    url: "https://dipenyadav.com",
    siteName: "Dipendra Yadav",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
