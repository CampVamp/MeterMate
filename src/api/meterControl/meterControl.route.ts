import { Router } from "express";
import { relayControl } from "./meterControl.controller";
import { authenticateJWT } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/relay", authenticateJWT, relayControl);

export default router;
