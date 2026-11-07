export type ArticleCategorySlug =
  | "all"
  | "giai-nghia"
  | "nghi-thuc"
  | "cam-nang"
  | "phat-ngon";

export interface ArticleCategory {
  id: string;
  slug: ArticleCategorySlug;
  label: string;
  description?: string;
  iconName?: string;
  articleCount?: number;
}

export interface ArticleSection {
  id: string;
  title: string;
  content: string[];
  quote?: {
    text: string;
    source?: string;
  };
  callout?: {
    title: string;
    text: string;
  };
}

export interface ArticleComment {
  id: string;
  authorName: string;
  authorAvatar?: string;
  publishedAt: string;
  content: string;
  likesCount: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategorySlug;
  categoryLabel: string;
  readTime: string;
  publishedAt: string;
  coverImage: string;
  /** Lượt đọc, dùng để xếp "Đọc nhiều nhất". */
  viewCount?: number;
  isFeatured?: boolean;
  isEditorPick?: boolean;
  relatedSutraSlug?: string;
  relatedSutraTitle?: string;
  sections?: ArticleSection[];
  comments?: ArticleComment[];
}

export interface DailyQuote {
  id: string;
  verse: string;
  source: string;
  meaning?: string;
}
