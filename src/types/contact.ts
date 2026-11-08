import type { Icon } from "@tabler/icons-react";

/**
 * Danh mục các chủ đề phản hồi / liên hệ
 */
export type ContactCategory =
  | "sutra_edit"
  | "sutra_suggest"
  | "tech_issue"
  | "general";

/**
 * Thông tin chi tiết của từng tùy chọn chủ đề
 */
export interface ContactCategoryOption {
  id: ContactCategory;
  label: string;
  emoji?: string;
  description?: string;
}

/**
 * Dữ liệu người dùng nhập trong biểu mẫu liên hệ
 */
export interface ContactFormData {
  category: ContactCategory;
  sutraReference?: string;
  name: string;
  email: string;
  message: string;
}

/**
 * Lỗi kiểm tra hợp lệ của biểu mẫu
 */
export interface FormErrors {
  name?: string;
  email?: string;
  sutraReference?: string;
  message?: string;
}

/**
 * Một mục câu hỏi thường gặp (FAQ)
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  icon: Icon | string;
}

/**
 * Trạng thái gửi phản hồi của biểu mẫu
 */
export type ContactSubmitStatus = "idle" | "submitting" | "success" | "error";
