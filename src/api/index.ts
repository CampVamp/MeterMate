import { Router } from "express";
import userRouter from "./user/user.router";
import logsRouter from "./logs/logs.router";

const router = Router();

router.use("/user", userRouter);
router.use("/logs", logsRouter);

export default router;
