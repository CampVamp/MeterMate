import { Router } from "express";
import { getAllUserLogs, createUserLog } from "./logs.controller";
import { authenticateJWT } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticateJWT, getAllUserLogs);
router.post("/", authenticateJWT, createUserLog);
