import type { Article, ArticleCategorySlug } from "@/types/article";

/** Bỏ dấu tiếng Việt và viết thường, để "bat nha" khớp với "Bát Nhã". */
export function normalizeSearchText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

export interface ArticleFilter {
  category?: ArticleCategorySlug;
  query?: string;
}

/** Lọc bài theo chuyên mục và từ khóa (tìm trong tiêu đề, tóm tắt, tên chuyên mục). */
export function filterArticles(articles: Article[], { category = "all", query = "" }: ArticleFilter) {
  const q = normalizeSearchText(query);
  return articles.filter((article) => {
    if (category !== "all" && article.category !== category) return false;
    if (!q) return true;
    return [article.title, article.excerpt, article.categoryLabel].some((field) =>
      normalizeSearchText(field).includes(q),
    );
  });
}
