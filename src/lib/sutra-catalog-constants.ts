import type {
  AspirationTab,
  SutraAspiration,
  SutraCategory,
  SutraCategoryInfo,
  SutraLength,
  SutraSort,
} from "@/types/sutra-catalog";

export const ASPIRATION_TABS: AspirationTab[] = [
  { id: "all", label: "Tất cả tâm nguyện" },
  { id: "tri-tue", label: "Khai Mở Trí Tuệ", description: "Bát Nhã, Pháp Cú, Thủ Lăng Nghiêm" },
  { id: "cau-an", label: "Cầu An & Trị Bệnh", description: "Chú Đại Bi, Kinh Dược Sư" },
  { id: "cau-sieu", label: "Cầu Siêu & Báo Hiếu", description: "Kinh Địa Tạng, Kinh Vu Lan" },
  { id: "sam-hoi", label: "Sám Hối Nghiệp Chướng", description: "Từ Bi Thủy Sám, 88 Vị Phật" },
];

export const VALID_ASPIRATIONS: SutraAspiration[] = ASPIRATION_TABS.map((t) => t.id);

// Thứ tự hiển thị các tạng: Kinh trước, rồi Chú, Sám, Kệ
export const SUTRA_CATEGORIES: SutraCategoryInfo[] = [
  {
    id: "kinh",
    label: "Kinh Điển",
    han: "經",
    sanskrit: "Sūtra · Khế kinh",
    description: "Lời Phật thuyết được kết tập, khế lý khế cơ, soi đường cho người tu học.",
  },
  {
    id: "chu",
    label: "Thần Chú",
    han: "咒",
    sanskrit: "Dhāraṇī · Đà la ni",
    description: "Tổng trì mật ngữ, giữ trọn muôn nghĩa trong từng âm thanh thiêng liêng.",
  },
  {
    id: "sam",
    label: "Sám Pháp",
    han: "懺",
    sanskrit: "Kṣama · Sám hối",
    description: "Nghi thức phát lộ, gột rửa ba nghiệp thân khẩu ý trước mười phương chư Phật.",
  },
  {
    id: "ke",
    label: "Kệ Tụng",
    han: "偈",
    sanskrit: "Gāthā · Già đà",
    description: "Những bài kệ ngắn gọn súc tích, dễ thuộc dễ nhớ, đem lời Phật vào đời sống.",
  },
];

export const VALID_CATEGORIES: SutraCategory[] = SUTRA_CATEGORIES.map((c) => c.id);

export const LENGTH_OPTIONS: { id: SutraLength; label: string; hint: string }[] = [
  { id: "all", label: "Mọi độ dài", hint: "" },
  { id: "ngan", label: "Ngắn", hint: "dưới 25 phút" },
  { id: "vua", label: "Vừa", hint: "25 – 35 phút" },
  { id: "dai", label: "Dài", hint: "trên 35 phút" },
];

export const VALID_LENGTHS: SutraLength[] = LENGTH_OPTIONS.map((l) => l.id);

export function matchesLength(minutes: number | undefined, length: SutraLength) {
  if (length === "all") return true;
  const m = minutes ?? 0;
  if (length === "ngan") return m < 25;
  if (length === "vua") return m >= 25 && m <= 35;
  return m > 35;
}

export const SORT_OPTIONS: { id: SutraSort; label: string }[] = [
  { id: "mac-dinh", label: "Theo tạng kinh" },
  { id: "ngan-truoc", label: "Thời gian chép: ngắn trước" },
  { id: "dai-truoc", label: "Thời gian chép: dài trước" },
  { id: "ten", label: "Tên kinh A → Z" },
];

export const VALID_SORTS: SutraSort[] = SORT_OPTIONS.map((s) => s.id);
