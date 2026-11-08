import {
  IconBook2,
  IconSparkles,
  IconHeartHandshake,
  IconKeyboard,
} from "@tabler/icons-react";
import type { ContactCategoryOption, FaqItem } from "@/types/contact";

/**
 * 4 nhóm danh mục chủ đề để người dùng lựa chọn trong biểu mẫu liên hệ
 */
export const CONTACT_CATEGORIES: ContactCategoryOption[] = [
  {
    id: "sutra_edit",
    label: "Sửa lỗi bản kinh",
    emoji: "📿",
    description: "Phản ánh lỗi chính tả, phiên âm chữ Hán/Việt hoặc lỗi câu chữ trong bài kinh",
  },
  {
    id: "sutra_suggest",
    label: "Đề xuất kinh mới",
    emoji: "📜",
    description: "Đóng góp nguồn kinh điển, bài kinh hoặc bản dịch mới chưa có trên trang",
  },
  {
    id: "tech_issue",
    label: "Báo lỗi kỹ thuật",
    emoji: "⚙️",
    description: "Sự cố bộ gõ tiếng Việt, lỗi lưu bài chép, lỗi giao diện hoặc hiển thị",
  },
  {
    id: "general",
    label: "Tâm tình & Khác",
    emoji: "🌸",
    description: "Chia sẻ cảm nghĩ tu học, đóng góp ý kiến chung hoặc gửi lời chào hoan hỷ",
  },
];

/**
 * Dữ liệu 4 câu hỏi thường gặp (FAQ) chuyên sâu về chép kinh và nền tảng
 */
export const CONTACT_FAQS: FaqItem[] = [
  {
    id: "sutra-correction",
    question: "Làm sao để báo lỗi chính tả hoặc câu chữ trong bài kinh?",
    answer:
      "Quý đạo hữu vui lòng chọn chủ đề 'Sửa lỗi bản kinh', ghi rõ tên bộ kinh và câu/đoạn phát hiện sai sót (kèm ảnh chụp hoặc câu đúng nếu có). Ban biên tập sẽ đối chiếu cẩn trọng với Tam Tạng kinh điển và hiệu đính trong vòng 24 - 48 giờ.",
    icon: IconBook2,
  },
  {
    id: "sutra-suggest",
    question: "Làm sao để đề xuất một bộ kinh mới chưa có trên trang?",
    answer:
      "Quý đạo hữu hãy chọn chủ đề 'Đề xuất kinh mới' và cung cấp tên bài kinh, bản dịch mong muốn hoặc nguồn xuất bản uy tín (Viện Nghiên cứu Phật học, chư tôn đức dịch giải). Chúng tôi luôn hoan hỷ đón nhận để làm phong phú kho tàng kinh điển.",
    icon: IconSparkles,
  },
  {
    id: "non-profit",
    question: "Trang web có thu phí hay nhận quyên góp tài chính không?",
    answer:
      "Chép Kinh Online là dự án phi thương mại phụng sự Phật pháp và cộng đồng, hoàn toàn miễn phí và không kêu gọi quyên góp tài chính dưới bất kỳ hình thức nào. Mọi công đức huân tu chép kinh đều xin hồi hướng cho sự an lạc của muôn loài.",
    icon: IconHeartHandshake,
  },
  {
    id: "typing-issue",
    question: "Gặp sự cố khi đang gõ chép kinh (kẹt phím, lỗi dấu tiếng Việt)?",
    answer:
      "Đạo hữu vui lòng kiểm tra bộ gõ tiếng Việt (chọn bảng mã Unicode dựng sẵn và kiểu gõ Telex hoặc VNI). Nếu gặp lỗi hiển thị, hãy thử tải lại trang — hệ thống luôn tự động lưu từng ký tự chép trên trình duyệt nên tiến trình của đạo hữu sẽ không bị mất.",
    icon: IconKeyboard,
  },
];
