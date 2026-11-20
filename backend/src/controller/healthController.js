import prisma from "../lib/prisma.js";
import { ok, fail } from "../utils/response.js";

// GET /api/health – kiểm tra server và kết nối PostgreSQL
export async function getHealth(req, res) {
  const startedAt = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    return ok(res, {
      status: "ok",
      database: "up",
      latencyMs: Date.now() - startedAt,
      uptimeSec: Math.round(process.uptime()),
    });
  } catch {
    return fail(res, 503, "Không kết nối được cơ sở dữ liệu", {
      status: "degraded",
      database: "down",
    });
  }
}
