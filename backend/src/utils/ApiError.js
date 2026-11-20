// Lỗi nghiệp vụ có mã HTTP và thông báo tiếng Việt hiển thị được cho người dùng.
// Ném ở controller/service: throw ApiError.notFound("Không tìm thấy hành tinh");
// Express 5 tự chuyển lỗi từ handler async tới errorHandler.
export default class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }

  static badRequest(message = "Dữ liệu gửi lên không hợp lệ", details) {
    return new ApiError(400, message, details);
  }

  static unauthorized(message = "Bạn cần đăng nhập để tiếp tục") {
    return new ApiError(401, message);
  }

  static forbidden(message = "Bạn không có quyền thực hiện thao tác này") {
    return new ApiError(403, message);
  }

  static notFound(message = "Không tìm thấy dữ liệu") {
    return new ApiError(404, message);
  }

  static conflict(message = "Dữ liệu đã tồn tại") {
    return new ApiError(409, message);
  }

  static tooManyRequests(message = "Bạn thao tác quá nhanh, vui lòng thử lại sau") {
    return new ApiError(429, message);
  }
}
