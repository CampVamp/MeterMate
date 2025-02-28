import type { Metadata } from "next";
import { openSans } from "@/lib/utils";
import "./globals.css";
import Sidebar from "@/components/shared/Sidebar";
import { WebSocketProvider } from "./contexts/WebSocketContext";

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
        <WebSocketProvider>
          <Sidebar />
          {children}
        </WebSocketProvider>
      </body>
    </html>
  );
}
