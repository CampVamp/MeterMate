import { Router } from "express";
import { getAllUserLogs, createLog } from "./logs.controller";
import { authenticateJWT } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticateJWT, getAllUserLogs);
router.post("/", authenticateJWT, createLog);

export default router;
