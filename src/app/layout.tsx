import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BaronOS — Strategy, in motion",
  description:
    "Red Baron's agentic strategy and campaign execution workspace.",
  icons: {
    icon: "/baron-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
