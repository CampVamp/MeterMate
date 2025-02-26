import { WebSocketServer } from "ws";
import { Server } from "http";

export const setupWebSocket = (server: Server, wss: WebSocketServer) => {
  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });

  wss.on("connection", (ws) => {
    console.log("New WebSocket connection established");

    ws.on("message", (message) => {
      console.log("Received:", message.toString());

      try {
        const data = JSON.parse(message.toString());
        console.log("Parsed data:", data);

        // Example: Log the sensor value
        if (data.sensor === "temperature") {
          console.log(`Temperature: ${data.value} ${data.unit}`);
        }

        // Send acknowledgment to the client
        ws.send(JSON.stringify({ status: "success", received: data }));
      } catch (err) {
        console.error("Failed to parse message:", err);
        ws.send(JSON.stringify({ status: "error", error: "Invalid JSON" }));
      }
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });

    ws.on("error", (err) => {
      console.error("WebSocket error:", err);
    });
  });
};