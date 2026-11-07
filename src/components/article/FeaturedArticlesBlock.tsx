import type { Article } from "@/types/article";
import { ArticleHero } from "./ArticleHero";
import { block, eyebrow as eyebrowClass, sectionDesc, sectionHead, sectionHeading } from "./styles";
import { cx, type ArticleHrefBuilder } from "./utils";

export interface FeaturedArticlesBlockProps {
  featuredArticle?: Article;
  editorPicks?: Article[];
  title?: string;
  eyebrow?: string;
  description?: string;
  getHref?: ArticleHrefBuilder;
  priority?: boolean;
  className?: string;
}

/** Block bài viết nổi bật: đầu block và lưới ArticleHero. Không có bài chính thì không hiện. */
export function FeaturedArticlesBlock({
  featuredArticle,
  editorPicks,
  title = "Bài viết nổi bật",
  eyebrow,
  description,
  getHref,
  priority,
  className,
}: FeaturedArticlesBlockProps) {
  if (!featuredArticle) return null;

  return (
    <section className={cx(block, className)} aria-label={title}>
      <div className={sectionHead}>
        {eyebrow && <span className={eyebrowClass}>{eyebrow}</span>}
        <h2 className={sectionHeading}>{title}</h2>
        {description && <p className={sectionDesc}>{description}</p>}
      </div>
      <ArticleHero
        featuredArticle={featuredArticle}
        editorPicks={editorPicks}
        getHref={getHref}
        priority={priority}
      />
    </section>
  );
}

export default FeaturedArticlesBlock;
