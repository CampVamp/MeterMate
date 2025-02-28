import { Request, Response } from "express";
import {
  handleGetAllUsers,
  handleCreateUser,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
  handleUserLogin,
} from "./user.service";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";

export const getAllUsers = async (req: Request, res: Response) => {
  const data = await handleGetAllUsers();
  res.status(data.success ? 200 : 404).send(data);
};

export const createUser = async (req: Request, res: Response) => {
  const data = await handleCreateUser(req.body);
  res.status(data.success ? 200 : 400).send(data);
};

export const getUserById = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ success: false, message: "User not authenticated" });
    return; // Use `return` to exit the function
  }

  const data = await handleGetUserById(userId);
  res.status(data.success ? 200 : 404).send(data);
};

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ success: false, message: "User not authenticated" });
    return; // Use `return` to exit the function
  }
  const data = await handleUpdateUser(userId, req.body);
  res.status(data.success ? 200 : 400).send(data);
};

export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ success: false, message: "User not authenticated" });
    return; // Use `return` to exit the function
  }
  const data = await handleDeleteUser(userId);
  res.status(data.success ? 200 : 400).send(data);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await handleUserLogin(email, password);
  res.status(data.success ? 200 : 401).send(data);
};
