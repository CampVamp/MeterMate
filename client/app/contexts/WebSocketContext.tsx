"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface SocketData {
  unitsConsumed: number;
  totalCost: number;
}

interface WebSocketContextType {
  socket: WebSocket | null;
  data: SocketData;
  isConnected: boolean;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [data, setData] = useState<SocketData>({
    unitsConsumed: 0,
    totalCost: 0,
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let ws: WebSocket;
    let reconnectTimeout: NodeJS.Timeout;
    let lastMessageTime = Date.now();
    let heartbeatInterval: NodeJS.Timeout;

    const connect = () => {
      if (socket) return; // Prevent multiple connections

      ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}`);

      ws.onopen = () => {
        console.log("WebSocket connected");
        setSocket(ws);
        setIsConnected(true);
        heartbeatInterval = setInterval(() => {
          const now = Date.now();
          if (now - lastMessageTime > 5000) {
            setIsConnected(false);
          } else {
            setIsConnected(true);
          }
        }, 3000);
      };

      ws.onmessage = (event) => {
        try {
          const { broadcast } = JSON.parse(event.data);
          setData(broadcast);
          lastMessageTime = Date.now();
        } catch (error) {
          console.error("Invalid WebSocket data:", error);
        }
      };

      ws.onerror = (event) => {
        console.error("WebSocket error:", JSON.stringify(event));
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected, attempting reconnect...");
        setSocket(null);
        setIsConnected(false);
        reconnectTimeout = setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      clearTimeout(reconnectTimeout);
      clearInterval(heartbeatInterval);
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket, data, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      "useWebSocketContext must be used within a WebSocketProvider"
    );
  }
  return context;
};
