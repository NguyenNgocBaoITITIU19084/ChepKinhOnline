# Editorial & Tu Học Article Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, responsive, zen-themed Buddhist editorial & article listing page at `/tu-hoc` using mock data and modular reusable components (`ArticleCard`, `ArticleGrid`, `ArticleHero`, `CategoryFilter`, `QuoteBox`, `SutraCtaCard`) designed for reuse across future content sections.

**Architecture:** Components are located in `src/components/article/` and accept generic props with clean boundaries. Data models and mock content live in `src/types/article.ts` and `src/data/articles-mock.ts`. The page route `src/app/(app)/tu-hoc/page.tsx` integrates the layout, manages category filter client state, and displays the editorial hero, filter bar, article grid, daily quote box, and sutra CTA card. Styling follows the project's design system tokens (`--gold-*`, `--brown-*`, `--paper`, `--glass-*`, Lora and Be Vietnam Pro fonts).

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tabler Icons (`@tabler/icons-react`), CSS Modules (`article.module.css`) and Tailwind CSS (`tw:` prefix).

## Global Constraints

- **Git Commit Rule**: DO NOT run git commit automatically. The user explicitly specified: *"khi nào tôi kêu commit thì hẵng commit nha"*. Save all changes to files and verify without committing to git.
- **Design Tokens**: Strict adherence to tokens: gold (`--gold-500`, `--gold-700`), brown (`--brown-800`, `--brown-900`), paper (`--paper`, `--paper-hi`, `--paper-edge`), and glass (`--glass`, `--glass-border`, `--shadow-glass`).
- **Typography**: `var(--font-book)` / `var(--font-display)` (Lora) for titles and poetic quotes; `var(--font-sans)` (Be Vietnam Pro) for UI labels, metadata, and body text.
- **Reusability**: All components in `src/components/article/` must be generic (`ArticleCard`, `ArticleHero`, etc.) without hardcoding "Tu học" specific strings into component primitives.

---

### Task 1: Data Types & Mock Dataset

**Files:**
- Create: `src/types/article.ts`
- Create: `src/data/articles-mock.ts`

**Interfaces:**
- Produces: `ArticleCategorySlug`, `ArticleCategory`, `Article`, `DailyQuote` interfaces.
- Produces: `ARTICLE_CATEGORIES`, `MOCK_ARTICLES`, `MOCK_DAILY_QUOTE` arrays/objects.

- [ ] **Step 1: Create `src/types/article.ts`**

```typescript
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
  isFeatured?: boolean;
  isEditorPick?: boolean;
  relatedSutraSlug?: string;
  relatedSutraTitle?: string;
}

export interface DailyQuote {
  id: string;
  verse: string;
  source: string;
  meaning?: string;
}
```

- [ ] **Step 2: Create `src/data/articles-mock.ts`**

Populate realistic Buddhist tu-học articles, categories, and quote of the day.

```typescript
import { Article, ArticleCategory, DailyQuote } from "@/types/article";

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  { id: "cat-all", slug: "all", label: "Tất cả" },
  { id: "cat-giai-nghia", slug: "giai-nghia", label: "Giải nghĩa kinh" },
  { id: "cat-nghi-thuc", slug: "nghi-thuc", label: "Nghi thức tụng niệm" },
  { id: "cat-cam-nang", slug: "cam-nang", label: "Cẩm nang tu học" },
  { id: "cat-phat-ngon", slug: "phat-ngon", label: "Lời Phật dạy" },
];

export const MOCK_DAILY_QUOTE: DailyQuote = {
  id: "quote-1",
  verse: "Tâm dẫn đầu mọi pháp,\nTâm làm chủ, tâm tạo;\nNếu với tâm thanh tịnh,\nNói năng hay hành động,\nAn lạc bước theo sau,\nNhư bóng không rời hình.",
  source: "Kinh Pháp Cú (Dhammapada) — Phẩm Song Yếu, Kệ số 2",
  meaning: "Mọi việc đều bắt nguồn từ tâm khởi. Giữ tâm chánh niệm thanh tịnh khi chép từng nét chữ thì an lạc tự nhiên hiển hiện.",
};

export const MOCK_ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "y-nghia-sau-mau-bat-nha-tam-kinh",
    title: "Ý Nghĩa Sâu Mầu Của Bát Nhã Ba La Mật Đa Tâm Kinh",
    excerpt: "260 chữ của Bát Nhã Tâm Kinh là tinh hoa đúc kết toàn bộ giáo lý Đại thừa về tính 'Không' (Śūnyatā). Khám phá cách quán chiếu ngũ uẩn giai không để vượt qua mọi khổ ách trong đời sống hiện đại.",
    category: "giai-nghia",
    categoryLabel: "Giải nghĩa kinh",
    readTime: "7 phút đọc",
    publishedAt: "Rằm tháng Chạp, 2026",
    coverImage: "/storage/buddha.jpg",
    isFeatured: true,
    relatedSutraSlug: "bat-nha-tam-kinh",
    relatedSutraTitle: "Bát Nhã Ba La Mật Đa Tâm Kinh",
  },
  {
    id: "art-2",
    slug: "huong-dan-nghi-thuc-chep-kinh-tai-gia",
    title: "Nghi Thức Chép Kinh Tại Gia Cho Người Bận Rộn",
    excerpt: "Trước khi đặt bút chép kinh, rửa tay sạch sẽ, thắp nén tâm hương, giữ thân tâm ngay ngắn. Các bước cơ bản giúp thiết lập không gian tĩnh lặng ngay trong ngôi nhà của bạn.",
    category: "nghi-thuc",
    categoryLabel: "Nghi thức tụng niệm",
    readTime: "5 phút đọc",
    publishedAt: "Mùng 1 tháng Giêng, 2026",
    coverImage: "/storage/buddha.jpg",
    isEditorPick: true,
  },
  {
    id: "art-3",
    slug: "chuyen-hoa-tam-san-qua-tung-net-chu",
    title: "Chuyển Hóa Cơn Giận Và Tâm Bất An Bằng Phương Pháp Chép Kinh",
    excerpt: "Khi tâm nổi sóng gió, đặt từng ngón tay gõ chậm rãi hay nắn nót từng nét chữ chính là một liệu pháp thiền định đưa tâm trí trở về với hơi thở hiện tại.",
    category: "cam-nang",
    categoryLabel: "Cẩm nang tu học",
    readTime: "4 phút đọc",
    publishedAt: "28 tháng Chạp, 2026",
    coverImage: "/storage/buddha.jpg",
    isEditorPick: true,
  },
  {
    id: "art-4",
    slug: "tim-hieu-chu-dai-bi-va-84-hoa-than-quan-am",
    title: "Tìm Hiểu Thần Chú Đại Bi Và Hạnh Nguyện Đại Bi Quán Thế Âm",
    excerpt: "Chú Đại Bi là bài thần chú linh thiêng đem lại sự an lành và cứu khổ cứu nạn. Khám phá nguồn gốc và công đức vô lượng khi trì tụng cũng như biên chép thần chú này.",
    category: "giai-nghia",
    categoryLabel: "Giải nghĩa kinh",
    readTime: "8 phút đọc",
    publishedAt: "20 tháng Chạp, 2026",
    coverImage: "/storage/buddha.jpg",
    relatedSutraSlug: "chu-dai-bi",
    relatedSutraTitle: "Đại Bi Thần Chú",
  },
  {
    id: "art-5",
    slug: "phuoc-duc-tu-viec-an-chay-va-phong-sanh",
    title: "Phước Đức Vẹn Toàn Từ Việc Trì Giới Và Ăn Chay Tinh Tấn",
    excerpt: "Nuôi dưỡng lòng từ bi không chỉ qua lời nói mà bằng hành động cụ thể mỗi ngày: tôn trọng mạng sống, giảm bớt sát nghiệp và thanh lọc cơ thể lẫn tâm hồn.",
    category: "phat-ngon",
    categoryLabel: "Lời Phật dạy",
    readTime: "6 phút đọc",
    publishedAt: "15 tháng Chạp, 2026",
    coverImage: "/storage/buddha.jpg",
  },
  {
    id: "art-6",
    slug: "nghi-thuc-hoi-huong-sau-khi-chep-kinh",
    title: "Ý Nghĩa Của Nghi Thức Hồi Hướng Công Đức Sau Khi Chép Kinh",
    excerpt: "Công đức sinh ra không giữ riêng cho mình mà trang trải khắp mười phương pháp giới, hồi hướng cho cửu huyền thất tổ, cha mẹ hiện tiền và muôn loài chúng sinh.",
    category: "nghi-thuc",
    categoryLabel: "Nghi thức tụng niệm",
    readTime: "5 phút đọc",
    publishedAt: "10 tháng Chạp, 2026",
    coverImage: "/storage/buddha.jpg",
  },
  {
    id: "art-7",
    slug: "thap-thien-nghiep-kim-chi-nam-an-vui",
    title: "Mười Điều Lành (Thập Thiện) — Kim Chỉ Nam Cho Cuộc Sống An Lạc",
    excerpt: "Thân ba, khẩu bốn, ý ba — mười nguyên tắc căn bản giúp người học Phật xây dựng nền tảng đạo đức vững chắc giữa những biến động xô bồ.",
    category: "cam-nang",
    categoryLabel: "Cẩm nang tu học",
    readTime: "6 phút đọc",
    publishedAt: "5 tháng Chạp, 2026",
    coverImage: "/storage/buddha.jpg",
  },
];
```

- [ ] **Step 3: Verify typescript compilation**
Run: `npx tsc --noEmit`
Expected: 0 errors.

---

### Task 2: CSS Module Styling for Article Components

**Files:**
- Create: `src/components/article/article.module.css`

**Interfaces:**
- Produces: CSS classes complying with design tokens (`.container`, `.header`, `.heroGrid`, `.featuredCard`, `.picksColumn`, `.filterBar`, `.filterBtn`, `.activeFilter`, `.articleGrid`, `.card`, `.quoteBox`, `.ctaBanner`).

- [ ] **Step 1: Create `src/components/article/article.module.css`**

Implement full CSS classes matching tokens from `docs/design-system/`:
- Glass panels with `rgba(255, 255, 255, 0.72)` background, `rgba(214, 164, 64, 0.35)` borders, and subtle blur.
- Paper cards with `#fbf7ec` background, gold badges, Lora titles, warm hover transformations.
- Tab filter with rounded pill radius and gold button gradient.
- Responsive breakpoints (1024px, 768px, 480px).

- [ ] **Step 2: Verify CSS syntax and classes**
Ensure all referenced CSS variables match `globals.css` / `copy.module.css` (`--gold-500`, `--gold-700`, `--brown-800`, `--brown-900`, `--paper`, etc.).

---

### Task 3: Header, Daily Quote & CTA Components

**Files:**
- Create: `src/components/article/ArticleHeader.tsx`
- Create: `src/components/article/QuoteBox.tsx`
- Create: `src/components/article/SutraCtaCard.tsx`

**Interfaces:**
- Produces: `ArticleHeader({ eyebrow, title, subtitle })`
- Produces: `QuoteBox({ quote: DailyQuote })`
- Produces: `SutraCtaCard({ title, description, buttonText, buttonHref })`

- [ ] **Step 1: Create `src/components/article/ArticleHeader.tsx`**
Render eyebrow tag with `gold-700`, Lora title with `brown-900`, and subtitle.

- [ ] **Step 2: Create `src/components/article/QuoteBox.tsx`**
Render Dhammapada quote with lotus icon, Lora italic verses, source line, and subtle Buddhist decorative border.

- [ ] **Step 3: Create `src/components/article/SutraCtaCard.tsx`**
Render call-to-action glass card with gold pill button linking to `/kinh/dai-thua` or `/chep-kinh/bat-nha-tam-kinh`.

- [ ] **Step 4: Verify type safety**
Run: `npx tsc --noEmit`

---

### Task 4: Card & Grid Components

**Files:**
- Create: `src/components/article/ArticleCard.tsx`
- Create: `src/components/article/ArticleGrid.tsx`

**Interfaces:**
- Produces: `ArticleCard({ article: Article })`
- Produces: `ArticleGrid({ articles: Article[], emptyMessage?: string })`

- [ ] **Step 1: Create `src/components/article/ArticleCard.tsx`**
Render paper-style card:
- Image thumbnail with hover zoom.
- Category tag pill (`gold-100` background, `gold-700` text).
- Article title in Lora font (`title-vi` style).
- Excerpt with 2-line clamp.
- Metadata: read time, publication date.
- Badge if `relatedSutraSlug` is present ("Có bản chép kinh" with `IconPencil`).

- [ ] **Step 2: Create `src/components/article/ArticleGrid.tsx`**
Render responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`):
- Map articles into `ArticleCard`.
- Empty state if no articles match the selected category.

- [ ] **Step 3: Verify type safety**
Run: `npx tsc --noEmit`

---

### Task 5: Editorial Hero & Category Filter Components

**Files:**
- Create: `src/components/article/ArticleHero.tsx`
- Create: `src/components/article/CategoryFilter.tsx`

**Interfaces:**
- Produces: `ArticleHero({ featuredArticle: Article, editorPicks: Article[] })`
- Produces: `CategoryFilter({ categories: ArticleCategory[], activeSlug: ArticleCategorySlug, onSelect: (slug: ArticleCategorySlug) => void })`

- [ ] **Step 1: Create `src/components/article/ArticleHero.tsx`**
- Left column: Large featured card with large image, badge, prominent title, long excerpt, "Đọc bài viết" button.
- Right column: 2 editor pick articles with horizontal list card layout.

- [ ] **Step 2: Create `src/components/article/CategoryFilter.tsx`**
- Client component or callback-driven filter pill row.
- Scrollable on mobile without ugly scrollbars.
- Smooth active pill indicator with gold button style.

- [ ] **Step 3: Verify type safety**
Run: `npx tsc --noEmit`

---

### Task 6: Page Integration at `/tu-hoc`

**Files:**
- Create: `src/app/(app)/tu-hoc/page.tsx`
- Modify: `src/components/layout/SiteNav.tsx` (ensure "Tu học" links navigate gracefully)

**Interfaces:**
- Produces: Next.js page at `/tu-hoc` orchestrating filter state, Hero, Grid, Quote, and CTA.

- [ ] **Step 1: Create `src/app/(app)/tu-hoc/page.tsx`**
- Mark as client component (`"use client"`) or wrapper to allow instant reactive filtering when clicking category tabs.
- Filter `MOCK_ARTICLES` based on `activeCategory`.
- Extract `featuredArticle` and `editorPicks` for `ArticleHero`.
- Render:
  1. `ArticleHeader`
  2. `ArticleHero`
  3. `QuoteBox`
  4. `CategoryFilter`
  5. `ArticleGrid`
  6. `SutraCtaCard`

- [ ] **Step 2: Check `SiteNav.tsx` navigation**
Ensure clicking on the header's "Tu học" category links can reach `/tu-hoc` smoothly.

- [ ] **Step 3: Verify type safety**
Run: `npx tsc --noEmit`

---

### Task 7: Build Verification, Responsive Smoke Test & Code Review

**Files:**
- Test all created files for compilation, linting, and responsiveness.

- [ ] **Step 1: Run Next.js lint and build check**
Run: `npm run lint` and `npm run build`
Expected: Successful build with `/tu-hoc` statically or dynamically generated, 0 TypeScript errors.

- [ ] **Step 2: Verify UI visual consistency**
Verify:
- Color contrast meets WCAG standards (brown-800 on paper/glass).
- Tabler icons are consistently sized (16-18px).
- Mobile responsiveness down to 360px without horizontal overflow.

- [ ] **Step 3: Confirm with user (DO NOT commit automatically)**
Report status to user and wait for their explicit instruction before running any git commit.
