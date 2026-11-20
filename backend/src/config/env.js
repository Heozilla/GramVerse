import "dotenv/config";

// Biến bắt buộc: thiếu là dừng ngay khi khởi động, thay vì lỗi khó hiểu lúc chạy.
const REQUIRED = ["DATABASE_URL"];

const missing = REQUIRED.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`❌ Thiếu biến môi trường: ${missing.join(", ")}. Xem backend/.env.example`);
  process.exit(1);
}

const nodeEnv = process.env.NODE_ENV ?? "development";

const env = Object.freeze({
  nodeEnv,
  isProduction: nodeEnv === "production",
  port: Number(process.env.PORT) || 5000,
  databaseUrl: process.env.DATABASE_URL,
  // Danh sách origin được phép gọi API, phân tách bằng dấu phẩy
  corsOrigins: (process.env.CORS_ORIGINS ?? "http://localhost:5173")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
});

export default env;
