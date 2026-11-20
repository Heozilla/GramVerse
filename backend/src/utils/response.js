// Định dạng JSON thống nhất cho mọi API GramVerse:
//   Thành công: { success: true, data, message? }
//   Lỗi:        { success: false, message, details? }

export function ok(res, data, message) {
  return res.json({ success: true, data, ...(message ? { message } : {}) });
}

export function created(res, data, message = "Tạo thành công") {
  return res.status(201).json({ success: true, data, message });
}

export function fail(res, status, message, details) {
  return res.status(status).json({ success: false, message, ...(details ? { details } : {}) });
}
