import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";

// Store connected WebSocket clients
const clients = new Set<WebSocket>();

export const setupWebSocket = (server: Server, wss: WebSocketServer) => {
  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });

  wss.on("connection", (ws) => {
    console.log("New WebSocket connection established");

    // Add the new client to the Set
    clients.add(ws);

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

        // Send data to all clients
        clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ broadcast: data }));
          }
        });
      } catch (err) {
        console.error("Failed to parse message:", err);
        ws.send(JSON.stringify({ status: "error", error: "Invalid JSON" }));
      }
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
      // Remove the client from the Set when it disconnects
      clients.delete(ws);
    });

    ws.on("error", (err) => {
      console.error("WebSocket error:", err);
      // Remove the client from the Set if an error occurs
      clients.delete(ws);
    });
  });
};

// Function to send a command to the ESP8266
export const sendCommandToESP8266 = (command: string) => {
  const message = JSON.stringify({ command });

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
      console.log(`Command sent to ESP8266: ${message}`);
    }
  });
};
