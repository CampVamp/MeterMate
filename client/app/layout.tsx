import type { Metadata } from "next";
import { openSans } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: "MeterMate",
  description: "Monitor your energy consumption",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className} antialiased h-screen w-full flex`}
      >
        {children}
      </body>
    </html>
  );
}
