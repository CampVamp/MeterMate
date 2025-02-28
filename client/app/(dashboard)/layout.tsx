import Sidebar from "@/components/shared/Sidebar";
import { WebSocketProvider } from "../contexts/WebSocketContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-full flex">
      <WebSocketProvider>
        <Sidebar />
        {children}
      </WebSocketProvider>
    </div>
  );
}
