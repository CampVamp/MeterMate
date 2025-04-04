import { Router } from "express";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  getAllUsers,
} from "./user.controller";
import { authenticateJWT } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/create", createUser);
router.get("/", authenticateJWT, getUserById);
router.get("/all", getAllUsers);
router.put("/", authenticateJWT, updateUser);
router.delete("/", deleteUser);
router.post("/login", loginUser);

export default router;
