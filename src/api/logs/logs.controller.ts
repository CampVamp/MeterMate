import { Request, Response } from "express";
import { handleGetAllUserLogs, handleCreateLog } from "./logs.service";

export const getAllUserLogs = async (req: Request, res: Response) => {
  const data = await handleGetAllUserLogs(req.user);
  res.status(data.success ? 200 : 404).send(data);
};

export const createUserLog = async (req: Request, res: Response) => {
  const { reading } = req.body;

  const userId = req.user.id;

  const data = await handleCreateLog({ reading, userId });

  if (data.success) {
    const io = req.app.get("io");
    io.emit("new-reading", { reading, userId });

    res.status(201).send(data);
  } else {
    res.status(400).send(data);
  }
};
