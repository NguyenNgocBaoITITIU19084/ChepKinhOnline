// Quy tắc kiểm tra dùng chung cho các form xác thực. Trả về câu báo lỗi, hoặc undefined nếu hợp lệ.

export const PASSWORD_MIN_LENGTH = 6;

export function validateEmail(email: string): string | undefined {
  const value = email.trim();
  if (!value) return "Vui lòng nhập địa chỉ thư điện tử.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Địa chỉ thư điện tử không hợp lệ.";
  return undefined;
}

/** Mật khẩu mới (đăng ký): bắt buộc và đủ độ dài tối thiểu. */
export function validateNewPassword(password: string): string | undefined {
  if (!password) return "Vui lòng nhập mật khẩu.";
  if (password.length < PASSWORD_MIN_LENGTH) return `Mật khẩu cần tối thiểu ${PASSWORD_MIN_LENGTH} ký tự.`;
  return undefined;
}

export function validateConfirmPassword(password: string, confirm: string): string | undefined {
  if (!confirm) return "Vui lòng xác nhận lại mật khẩu.";
  if (confirm !== password) return "Mật khẩu xác nhận không trùng khớp.";
  return undefined;
}
