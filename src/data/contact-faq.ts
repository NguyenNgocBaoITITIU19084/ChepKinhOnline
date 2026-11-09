import type { ContactCategoryOption, FaqItem } from "@/types/contact";
import type { DailyQuote } from "@/types/article";

/**
 * Bốn việc người viết có thể thưa với Ban biên tập. Chữ Hán chỉ để trang trí.
 */
export const CONTACT_CATEGORIES: ContactCategoryOption[] = [
  {
    id: "sutra_edit",
    label: "Sửa lỗi bản kinh",
    han: "校",
  },
  {
    id: "sutra_suggest",
    label: "Đề xuất kinh mới",
    han: "經",
  },
  {
    id: "tech_issue",
    label: "Báo lỗi kỹ thuật",
    han: "技",
  },
  {
    id: "general",
    label: "Tâm tình, góp ý",
    han: "心",
  },
];

/**
 * Câu kệ trên dải phong cảnh cuối trang: góp sửa bản kinh cũng là bố thí pháp.
 */
export const CONTACT_EPIGRAPH: DailyQuote = {
  id: "phap-cu-354",
  verse: "Pháp thí, thắng mọi thí.",
  source: "Kinh Pháp Cú, kệ 354",
};

/**
 * Những câu hỏi hay gặp
 */
export const CONTACT_FAQS: FaqItem[] = [
  {
    id: "sutra-correction",
    question: "Báo lỗi trong bài kinh thế nào cho nhanh được sửa?",
    answer:
      "Chọn “Sửa lỗi bản kinh”, ghi tên bài kinh và câu bị sai, nếu được thì chép kèm câu đúng và nguồn đối chiếu. Ban biên tập so lại với bản gốc và sửa trong khoảng 24 đến 48 giờ.",
  },
  {
    id: "sutra-suggest",
    question: "Có thể đề xuất một bài kinh chưa có trên trang không?",
    answer:
      "Có. Chọn “Đề xuất kinh mới”, ghi tên kinh, bản dịch hoặc dịch giả bạn mong muốn. Bản kinh nào có nguồn in rõ ràng sẽ được đưa lên trước.",
  },
  {
    id: "non-profit",
    question: "Trang có thu phí hay nhận đóng góp tiền không?",
    answer:
      "Không. Chép Kinh Online miễn phí và không nhận tiền dưới bất kỳ hình thức nào. Nếu ai nhân danh trang để xin tiền, xin đừng tin.",
  },
  {
    id: "typing-issue",
    question: "Đang chép thì kẹt phím hoặc mất dấu tiếng Việt?",
    answer:
      "Kiểm tra bộ gõ đang để bảng mã Unicode, kiểu gõ Telex hoặc VNI. Nếu chữ vẫn hiện sai, tải lại trang: bài chép được lưu từng chữ trên trình duyệt nên không mất.",
  },
];
