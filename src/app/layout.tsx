import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Kira - Full Stack Developer",
  description: "Kira - Full Stack Developer",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <Analytics />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
