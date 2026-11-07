# Redesign Article Detail Page Implementation Plan

> **For:** Tu Học Article Detail (`/tu-hoc/[slug]`, e.g. `/tu-hoc/y-nghia-sau-mau-bat-nha-tam-kinh`)  
> **Spec:** [docs/superpowers/specs/2026-11-07-article-detail-redesign-design.md](file:///Users/baonguyen/Developer/ChepKinhOnline/docs/superpowers/specs/2026-11-07-article-detail-redesign-design.md)  
> **Key constraint:** All styling MUST use Tailwind CSS with the `tw:` prefix and existing design tokens from `@/components/article/styles` and `globals.css`.

---

## Proposed Changes

### 1. Data Model & Mock Data
- File: `src/types/article.ts`
  - Add `ArticleSection` and `ArticleComment` types.
  - Extend `Article` interface to optionally include `content`, `sections`, `comments`.
- File: `src/data/articles-mock.ts`
  - Enrich `y-nghia-sau-mau-bat-nha-tam-kinh` with full, inspiring Buddhist article text (4 major sections, quotes from Bát Nhã Ba La Mật Đa Tâm Kinh, contemplative insights).
  - Add initial thoughtful mock comments (Phật tử Diệu Thiện, Tuệ Minh, Tâm An...).

### 2. New Components in `src/components/article/`
- **`ArticleBreadcrumb.tsx`**:
  - Semantic `<nav aria-label="Breadcrumb">`
  - Items: Trang chủ (`/`) → Tu học (`/tu-hoc`) → Chuyên mục (`/tu-hoc?category={slug}`) → Tiêu đề bài viết (truncated).
  - Styled with `tw:text-[0.82rem]`, `tw:text-brown-700`, `tw:hover:text-brown-900`.
- **`ArticleReadingBar.tsx`**:
  - Client component (`"use client"`).
  - Sticky at top: `tw:sticky tw:top-0 tw:z-40`.
  - Amber progress bar (`3px`, `tw:bg-gradient-to-r tw:from-gold-600 tw:to-gold-400`).
  - Mini-bar reveals when scrolled past hero: compact title, reading progress %, back button, and copy-link share button with tooltip/check confirmation.
- **`ArticleComments.tsx`**:
  - Client component (`"use client"`).
  - Peaceful Buddhist styling: "Cảm ngộ & Bình luận", number of comments badge.
  - Input form with name and comment text areas, "Gửi cảm ngộ" button (`ck-btn-gold` / Tailwind `tw:`).
  - Interactive state: prepend new comments instantly.
  - Comment list: serene avatar, commenter name, time badge, comment body, "Hoan hỷ" (tán thán counter) and reply button.

### 3. Article Components Export
- File: `src/components/article/index.ts`
  - Export `ArticleBreadcrumb`, `ArticleReadingBar`, `ArticleComments`.

### 4. Page Redesign
- File: `src/app/(app)/tu-hoc/[slug]/page.tsx`
  - Integrate `ArticleReadingBar` at the top.
  - Wrap in `ArticleLayout` (2-column layout: main article column + 300px sidebar).
  - In Main Column:
    - `ArticleBreadcrumb`.
    - `ArticleHeader` (eyebrow, title, meta with readTime, date, view count).
    - Cover image (16:9, rounded, shadow).
    - Table of Contents box (jump to H2 anchor links).
    - Rich body sections (H2, lead paragraphs, calligraphy quote blocks, callout cards).
    - `SutraCtaCard` linking to `/chep-kinh/bat-nha-tam-kinh`.
    - Author & disclaimer note.
    - `ArticleComments` section.
  - In Sidebar (Desktop sticky):
    - `CategoryList` (configured with client router navigation to `/tu-hoc?category=...`).
    - `PopularArticles` (top read articles).
    - Mini `SutraCtaCard` ("Học pháp sáng tỏ · Chép kinh tịnh tâm").
  - At bottom (full-width section):
    - `RelatedArticles` section with `ArticleGrid` and section heading "Bài cùng chuyên mục".

---

## Verification Plan
1. Run `npm run build` or `npx next build` to guarantee zero TypeScript or build errors.
2. Verify all UI components render correctly on mobile, tablet, and desktop viewports.
3. Verify interactive elements:
   - Scroll page to test progress bar movement and mini-bar appearance.
   - Click TOC items to verify smooth scrolling to headings.
   - Click "Gửi cảm ngộ" in comments form to verify instant comment posting and "Hoan hỷ" interaction.
   - Click category items in sidebar to confirm navigation to `/tu-hoc?category=...`.
   - Click copy link button to verify copied state.
