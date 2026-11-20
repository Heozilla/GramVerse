import { Router } from "express";
import { getHealth } from "../controller/healthController.js";

const router = Router();

router.get("/", getHealth);

export default router;
