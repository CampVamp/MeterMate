import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import router from "./api";
import http from "http";
import { Server } from "socket.io";
import "dotenv/config";

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.set("io", io);

app.get("/", (req: Request, res: Response) => {
  res.send("MeterMate API");
});

const morganFormat =
  process.env.NODE_ENV === "development" ? "dev" : "combined";

app.use(cors());
app.use(helmet());
app.use(morgan(morganFormat));
app.use(express.json());
app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
