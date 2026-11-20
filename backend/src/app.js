import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";
import env from "./config/env.js";
import apiRoutes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Tách app khỏi server.js để sau này test bằng supertest mà không cần mở cổng.
const app = express();

app.disable("x-powered-by");
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } })); // cho phép frontend tải ảnh/audio upload
app.use(cors({ origin: env.corsOrigins, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.isProduction ? "combined" : "dev"));

app.use("/uploads", express.static(path.join(__dirname, "..", "public", "uploads")));
app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
