export type SutraAspiration =
  | "all"
  | "tri-tue"    // Khai Mở Trí Tuệ
  | "cau-an"     // Cầu An & Trị Bệnh
  | "cau-sieu"   // Cầu Siêu & Báo Hiếu
  | "sam-hoi";   // Sám Hối Nghiệp Chướng

export interface SutraCatalogItem {
  id: string;
  slug: string;
  title: string;
  originalTitle?: string | null;
  aspiration: SutraAspiration;
  aspirationLabel: string;
  meritBadge: string;
  image: string;
  objectPosition?: string;
  verseExcerpt: string[];
  estimatedMinutes?: number;
  chapterCount: number;
  description?: string | null;
}

export interface AspirationTab {
  id: SutraAspiration;
  label: string;
  description?: string;
}
