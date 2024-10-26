import { Router } from "express";
import { getAllUserLogs, createLog } from "./logs.controller";
import { authenticateJWT } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", getAllUserLogs);
router.post("/", createLog);

export default router;
