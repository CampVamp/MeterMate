import { Request, Response } from "express";
import {
  handleCreateUser,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
  handleUserLogin,
} from "./user.service";

export const createUser = async (req: Request, res: Response) => {
  const data = await handleCreateUser(req.body);
  res.status(data.success ? 200 : 400).send(data);
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const data = await handleGetUserById(userId);
  res.status(data.success ? 200 : 404).send(data);
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const data = await handleUpdateUser(userId, req.body);
  res.status(data.success ? 200 : 400).send(data);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const data = await handleDeleteUser(userId);
  res.status(data.success ? 200 : 400).send(data);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await handleUserLogin(email, password);
  res.status(data.success ? 200 : 401).send(data);
};
