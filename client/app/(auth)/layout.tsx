import { openSans } from "@/lib/utils";
import "../globals.css";

export default function AuthLayout({
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
