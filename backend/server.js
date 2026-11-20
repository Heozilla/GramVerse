import "./src/utils/bigint.js";
import env from "./src/config/env.js";
import app from "./src/app.js";
import prisma from "./src/lib/prisma.js";

const server = app.listen(env.port, () => {
  console.log(`🚀 GramVerse API chạy tại http://localhost:${env.port}/api (${env.nodeEnv})`);
});

// Tắt êm: ngừng nhận request mới, chờ request đang xử lý xong, rồi đóng kết nối DB.
async function shutdown(signal) {
  console.log(`\n${signal} → đang tắt server...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref(); // quá 10s thì buộc dừng
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
