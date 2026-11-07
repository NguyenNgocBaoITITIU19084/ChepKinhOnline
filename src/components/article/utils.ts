import type { Article } from "@/types/article";

/** Ghép class, bỏ giá trị rỗng. */
export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Cách tạo đường dẫn tới một bài viết. Truyền hàm khác để dùng block cho chuyên trang khác. */
export type ArticleHrefBuilder = (article: Article) => string;

export const defaultArticleHref: ArticleHrefBuilder = (article) =>
  `/tu-hoc/${article.slug}`;

export const FALLBACK_COVER = "/storage/buddha.jpg";
