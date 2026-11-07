export type SutraAspiration =
  | "all"
  | "tri-tue"    // Khai Mở Trí Tuệ
  | "cau-an"     // Cầu An & Trị Bệnh
  | "cau-sieu"   // Cầu Siêu & Báo Hiếu
  | "sam-hoi";   // Sám Hối Nghiệp Chướng

/** Thể loại văn bản: Kinh (khế kinh), Chú (đà la ni), Sám (sám pháp), Kệ (kệ tụng). */
export type SutraCategory = "kinh" | "chu" | "sam" | "ke";

/** Độ dài thời gian chép ước tính. */
export type SutraLength = "all" | "ngan" | "vua" | "dai";

export type SutraSort = "mac-dinh" | "ngan-truoc" | "dai-truoc" | "ten";

export interface SutraCatalogItem {
  id: string;
  slug: string;
  title: string;
  originalTitle?: string | null;
  category: SutraCategory;
  aspiration: SutraAspiration;
  aspirationLabel: string;
  meritBadge: string;
  image: string;
  objectPosition?: string;
  verseExcerpt: string[];
  estimatedMinutes?: number;
  chapterCount: number;
  /** Số chữ (âm tiết) trong toàn bộ bản kinh. */
  wordCount: number;
  description?: string | null;
}

export interface AspirationTab {
  id: SutraAspiration;
  label: string;
  description?: string;
}

export interface SutraCategoryInfo {
  id: SutraCategory;
  label: string;
  han: string;
  sanskrit: string;
  description: string;
}
