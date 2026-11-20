import env from "../config/env.js";
import ApiError from "../utils/ApiError.js";
import { fail } from "../utils/response.js";

// Route không tồn tại → 404 theo định dạng JSON chung
export function notFound(req, res) {
  return fail(res, 404, `Không tìm thấy đường dẫn ${req.method} ${req.originalUrl}`);
}

// Lỗi Prisma thường gặp → mã HTTP có nghĩa với người dùng
const PRISMA_ERRORS = {
  P2002: [409, "Dữ liệu đã tồn tại"],
  P2003: [400, "Dữ liệu liên kết không hợp lệ"],
  P2025: [404, "Không tìm thấy dữ liệu"],
};

// eslint-disable-next-line no-unused-vars -- Express nhận diện error handler qua 4 tham số
export function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return fail(res, err.status, err.message, err.details);
  }

  // Body JSON sai cú pháp (express.json)
  if (err.type === "entity.parse.failed") {
    return fail(res, 400, "Dữ liệu JSON không hợp lệ");
  }
  if (err.type === "entity.too.large") {
    return fail(res, 413, "Dữ liệu gửi lên quá lớn");
  }

  if (typeof err.code === "string" && PRISMA_ERRORS[err.code]) {
    const [status, message] = PRISMA_ERRORS[err.code];
    return fail(res, status, message);
  }

  console.error(`[${req.method} ${req.originalUrl}]`, err);
  return fail(
    res,
    500,
    "Đã có lỗi xảy ra phía máy chủ, vui lòng thử lại sau",
    env.isProduction ? undefined : { error: err.message }
  );
}
