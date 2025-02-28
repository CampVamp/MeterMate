import { Router } from "express";
import userRouter from "./user/user.router";
import logsRouter from "./logs/logs.router";
import meterRouter from "./meterControl/meterControl.router";

const router = Router();

router.use("/user", userRouter);
router.use("/logs", logsRouter);
router.use("/meterControl", meterRouter);

export default router;
