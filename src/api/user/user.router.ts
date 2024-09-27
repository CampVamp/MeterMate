import { Router } from "express";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} from "./user.controller";
import { authenticateJWT } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/create", createUser);
router.get("/:userId", authenticateJWT, getUserById);
router.put("/:userId", authenticateJWT, updateUser);
router.delete("/:userId", deleteUser);
router.post("/login", loginUser);

export default router;
