import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import router from "./api";
import { createServer } from "http";
import "dotenv/config";
import { WebSocketServer } from "ws";
import { setupWebSocket } from "./sockets/socket.server";

const app = express();
const server = createServer(app); // Create the HTTP server
const wss = new WebSocketServer({ noServer: true }); // Attach WebSocket to the HTTP server

const morganFormat =
  process.env.NODE_ENV === "development" ? "dev" : "combined";

app.use(cors());
app.use(helmet());
app.use(morgan(morganFormat));
app.use(express.json());

// Routes
app.use("/api", router);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("MeterMate API is running!");
});

// Setup WebSocket
setupWebSocket(server, wss);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});