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
  /**
   * Chữ Hán đầu của từ Hán Việt gọi tên chủ đề, chỉ để trang trí:
   * 校 hiệu (校訂 hiệu đính), 經 kinh, 技 kỹ (技術 kỹ thuật), 心 tâm (心情 tâm tình)
   */
  han: string;
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
 * Một mục hỏi đáp
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Trạng thái gửi phản hồi của biểu mẫu
 */
export type ContactSubmitStatus = "idle" | "submitting" | "success" | "error";

// Xuất lại danh mục chủ đề để có thể import từ @/types/contact
export { CONTACT_CATEGORIES } from "@/data/contact-faq";
