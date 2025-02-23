import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import router from "./api";
import { createServer } from "http";
import "dotenv/config";
import { WebSocketServer } from "ws";

const app = express();
const server = createServer(app); // Create the HTTP server
const wss = new WebSocketServer({ noServer: true }); // Attach WebSocket to the HTTP server

const morganFormat =
  process.env.NODE_ENV === "development" ? "dev" : "combined";

app.use(cors());
app.use(helmet());
app.use(morgan(morganFormat));
app.use(express.json());
app.use("/api", router);

// Optional: Add a default route for HTTP requests
app.get("/", (req: Request, res: Response) => {
  res.send("MeterMate API is running!");
});

// Handle WebSocket connections
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

// Integrate WebSocket server with HTTP server
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});