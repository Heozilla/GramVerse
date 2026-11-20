import { Router } from "express";
import healthRoutes from "./health.js";

// Gom toàn bộ route dưới tiền tố /api. Mỗi lát cắt thêm một dòng tại đây.
const router = Router();

router.use("/health", healthRoutes);

export default router;
