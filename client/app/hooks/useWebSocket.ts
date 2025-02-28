"use client";
import { useEffect, useState } from "react";

const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let ws: WebSocket;
    let reconnectTimeout: NodeJS.Timeout;

    const connect = () => {
      ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("WebSocket connected");
        setSocket(ws);
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          setData(message);
        } catch (error) {
          console.error("Invalid WebSocket data:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected, attempting reconnect...");
        setSocket(null);
        reconnectTimeout = setTimeout(connect, 3000); // Reconnect after 3s
      };
    };

    connect();

    return () => {
      clearTimeout(reconnectTimeout);
      ws.close();
    };
  }, [url]);

  return { socket, data };
};

export default useWebSocket;
