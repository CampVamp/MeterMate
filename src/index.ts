import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import router from "./api";
import "dotenv/config";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
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
