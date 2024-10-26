import { Request, Response } from "express";
import { handleGetAllUserLogs, handleCreateLog } from "./logs.service";

export const getAllUserLogs = async (req: Request, res: Response) => {
  const data = await handleGetAllUserLogs();
  res.status(data.success ? 200 : 404).send(data);
};

export const getRealTimeData = async (req: Request, res: Response) => {
  const io = req.app.get("io");
  // io.emit("get-real-time-data", { userId: req.user.id });
  res.status(200).send({ success: true });
};

export const createLog = async (req: Request, res: Response) => {
  const { reading } = req.body;
  // const userId = req.user.id;
  const data = await handleCreateLog({ reading });
  if (data.success) {
    res.status(201).send(data);
  } else {
    res.status(400).send(data);
  }
};
