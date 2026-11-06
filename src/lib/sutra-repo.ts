import { SUTRAS, ADDITIONAL_SUTRAS } from "@/data/sutras";

// Lấy dữ liệu kinh: có DATABASE_URL thì đọc database, không có thì dùng mock trong src/data/sutras.ts
// (đủ để deploy bản xem giao diện mà chưa cần database). Đặt USE_MOCK_DATA=1 để ép dùng mock.
export const isMockData = !process.env.DATABASE_URL || process.env.USE_MOCK_DATA === "1";

export type SutraSummary = {
  id: string;
  slug: string;
  title: string;
  originalTitle?: string | null;
  description: string | null;
};
export type SutraDetail = { slug: string; title: string; originalTitle?: string | null; content: string };

export async function listSutras(): Promise<SutraSummary[]> {
  if (isMockData) {
    return SUTRAS.map(({ slug, title, originalTitle, description }) => ({
      id: slug,
      slug,
      title,
      originalTitle,
      description,
    }));
  }
  try {
    const { prisma } = await import("@/lib/prisma");
    const dbSutras = await prisma.sutra.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "asc" },
      select: { id: true, slug: true, title: true, originalTitle: true, description: true },
    });
    if (dbSutras.length > 0) return dbSutras;
  } catch (err) {
    console.warn("DB lookup failed, falling back to mock sutras:", err);
  }
  return SUTRAS.map(({ slug, title, originalTitle, description }) => ({
    id: slug,
    slug,
    title,
    originalTitle,
    description,
  }));
}

function findMockSutra(slug: string): SutraDetail | null {
  const allSutras = [...SUTRAS, ...(ADDITIONAL_SUTRAS || [])];
  const sutra = allSutras.find((s) => s.slug === slug);
  return sutra
    ? { slug: sutra.slug, title: sutra.title, originalTitle: sutra.originalTitle, content: sutra.content }
    : null;
}

// Cùng quy tắc với listSutras (database lỗi hoặc chưa có kinh nào thì dùng mock),
// để kinh nào đã hiện trong danh sách thì bấm vào cũng mở được.
// Database có kinh mà không có slug này (hoặc kinh đã ẩn) thì vẫn là 404, không lấy mock.
export async function findSutra(slug: string): Promise<SutraDetail | null> {
  if (isMockData) return findMockSutra(slug);
  try {
    const { prisma } = await import("@/lib/prisma");
    const dbSutra = await prisma.sutra.findUnique({
      where: { slug, isPublished: true },
      select: { slug: true, title: true, originalTitle: true, content: true },
    });
    if (dbSutra) return dbSutra;
    const published = await prisma.sutra.count({ where: { isPublished: true } });
    if (published > 0) return null;
  } catch (err) {
    console.warn("DB lookup failed, falling back to mock sutra:", err);
  }
  return findMockSutra(slug);
}
