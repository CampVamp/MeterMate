import { createUser } from "./user.controller";
import { Router } from "express";

const router = Router();

router.post("/create", createUser);

export default router;
