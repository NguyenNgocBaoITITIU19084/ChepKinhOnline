import type { SutraCatalogItem, AspirationTab } from "@/types/sutra-catalog";
import { listSutras } from "@/lib/sutra-repo";
import { splitSutraChapters } from "@/lib/sutra";
import { SUTRAS, ADDITIONAL_SUTRAS } from "@/data/sutras";

export const ASPIRATION_TABS: AspirationTab[] = [
  { id: "all", label: "Tất cả kinh điển" },
  { id: "tri-tue", label: "Khai Mở Trí Tuệ", description: "Bát Nhã, Pháp Cú, Thủ Lăng Nghiêm" },
  { id: "cau-an", label: "Cầu An & Trị Bệnh", description: "Chú Đại Bi, Kinh Dược Sư" },
  { id: "cau-sieu", label: "Cầu Siêu & Báo Hiếu", description: "Kinh Địa Tạng, Kinh Vu Lan" },
  { id: "sam-hoi", label: "Sám Hối Nghiệp Chướng", description: "Từ Bi Thủy Sám, 88 Vị Phật" },
];

export const SUTRA_CATALOG_METADATA: Record<
  string,
  {
    aspiration: "tri-tue" | "cau-an" | "cau-sieu" | "sam-hoi";
    aspirationLabel: string;
    meritBadge: string;
    image: string;
    objectPosition?: string;
    verseExcerpt: string[];
    estimatedMinutes: number;
  }
> = {
  "bat-nha-tam-kinh": {
    aspiration: "tri-tue",
    aspirationLabel: "Khai Mở Trí Tuệ",
    meritBadge: "Soi chiếu ngũ uẩn giai không",
    image: "/storage/buddha.jpg",
    objectPosition: "center 22%",
    verseExcerpt: [
      "Quán Tự Tại Bồ Tát hành thâm Bát Nhã Ba La Mật Đa thời,",
      "Chiếu kiến ngũ uẩn giai không, độ nhất thiết khổ ách.",
    ],
    estimatedMinutes: 15,
  },
  "chu-dai-bi": {
    aspiration: "cau-an",
    aspirationLabel: "Cầu An & Trị Bệnh",
    meritBadge: "Đại bi tâm đà la ni",
    image: "/storage/quan-the-am.jpg",
    objectPosition: "center 25%",
    verseExcerpt: [
      "Nguyện con mau lên thuyền bát nhã,",
      "Nguyện con sớm vượt qua biển khổ.",
    ],
    estimatedMinutes: 20,
  },
  "kinh-duoc-su": {
    aspiration: "cau-an",
    aspirationLabel: "Cầu An & Trị Bệnh",
    meritBadge: "Tiêu tai diên thọ bình an",
    image: "/storage/phat-duoc-su.jpg",
    objectPosition: "center 22%",
    verseExcerpt: [
      "Khói trầm tỏa ngát khắp mười phương,",
      "Kính lạy Dược Sư cõi Cát Tường.",
    ],
    estimatedMinutes: 30,
  },
  "kinh-dia-tang": {
    aspiration: "cau-sieu",
    aspirationLabel: "Cầu Siêu & Báo Hiếu",
    meritBadge: "Đại nguyện độ tận chúng sinh",
    image: "/storage/dia-tang-bo-tat.jpg",
    objectPosition: "center 20%",
    verseExcerpt: [
      "Địa ngục vị không, thệ bất thành Phật,",
      "Chúng sinh độ tận, phương chứng bồ đề.",
    ],
    estimatedMinutes: 45,
  },
  "kinh-vu-lan-bao-hieu": {
    aspiration: "cau-sieu",
    aspirationLabel: "Cầu Siêu & Báo Hiếu",
    meritBadge: "Hiếu hạnh vi tiên",
    image: "/storage/real/kinh_vu_lan_muc_kien_lien.jpg",
    objectPosition: "center 18%",
    verseExcerpt: [
      "Ơn cha lành cao như núi Thái,",
      "Đức mẹ hiền sâu tựa biển khơi.",
    ],
    estimatedMinutes: 25,
  },
  "kinh-sam-hoi": {
    aspiration: "sam-hoi",
    aspirationLabel: "Sám Hối Nghiệp Chướng",
    meritBadge: "Tịnh nghiệp tiêu oan khiên",
    image: "/storage/phat-thich-ca.jpg",
    objectPosition: "center 25%",
    verseExcerpt: [
      "Nghiệp chướng dứt trừ tâm thanh tịnh,",
      "Bồ đề tâm nguyện mãi kiên cố.",
    ],
    estimatedMinutes: 35,
  },
  "kinh-sam-hoi-hong-danh": {
    aspiration: "sam-hoi",
    aspirationLabel: "Sám Hối Nghiệp Chướng",
    meritBadge: "Đảnh lễ 88 Đức Phật Thế Tôn",
    image: "/storage/real/tuong_phat_vang_dien.jpg",
    objectPosition: "38% center",
    verseExcerpt: [
      "Chí tâm quy mạng đảnh lễ Chư Phật,",
      "Nguyện tiêu tội chướng chứng bồ đề.",
    ],
    estimatedMinutes: 30,
  },
  "chu-lang-nghiem": {
    aspiration: "tri-tue",
    aspirationLabel: "Khai Mở Trí Tuệ",
    meritBadge: "Phá trừ vọng tưởng ma chướng",
    image: "/storage/real/khoi_tram_huong.jpg",
    objectPosition: "center 40%",
    verseExcerpt: [
      "Diệu trạm tổng trì bất động tôn,",
      "Thủ Lăng Nghiêm vương thế hy hữu.",
    ],
    estimatedMinutes: 40,
  },
  "kinh-phap-cu": {
    aspiration: "tri-tue",
    aspirationLabel: "Khai Mở Trí Tuệ",
    meritBadge: "Lời vàng giải thoát tỉnh thức",
    image: "/storage/real/buddha_thich_ca.jpg",
    objectPosition: "center 30%",
    verseExcerpt: [
      "Giữ tâm ý trong sạch,",
      "Là lời chư Phật dạy.",
    ],
    estimatedMinutes: 25,
  },
};

const DEFAULT_METADATA = {
  aspiration: "tri-tue" as const,
  aspirationLabel: "Khai Mở Trí Tuệ",
  meritBadge: "Công đức thọ trì",
  image: "/storage/buddha.jpg",
  objectPosition: "center 20%",
  verseExcerpt: [
    "Nguyện dĩ thử công đức, trang nghiêm Phật tịnh độ,",
    "Thượng báo tứ trọng ân, hạ tế tam đồ khổ.",
  ],
  estimatedMinutes: 20,
};

/**
 * Chuẩn hóa chuỗi tiếng Việt để tìm kiếm không dấu
 */
export function normalizeSearchString(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .trim();
}

/**
 * Kiểm tra xem text có chứa query hay không (không phân biệt dấu và hoa thường)
 */
export function searchNormalized(text: string, query: string): boolean {
  if (!query.trim()) return true;
  const normText = normalizeSearchString(text);
  const normQuery = normalizeSearchString(query);
  return normText.includes(normQuery);
}

/**
 * Tải danh mục kinh điển đầy đủ cho trang Thư Viện Kinh
 */
export async function getSutraCatalog(): Promise<SutraCatalogItem[]> {
  const baseSutras = await listSutras();
  const allSeeds = [...SUTRAS, ...(ADDITIONAL_SUTRAS || [])];

  // Kết hợp danh sách kinh từ repo và các kinh bổ sung (nếu repo chưa có)
  const combinedMap = new Map<string, { slug: string; title: string; originalTitle?: string | null; description?: string | null; content?: string }>();

  for (const s of baseSutras) {
    const seed = allSeeds.find((x) => x.slug === s.slug);
    combinedMap.set(s.slug, {
      slug: s.slug,
      title: s.title,
      originalTitle: s.originalTitle,
      description: s.description,
      content: seed?.content,
    });
  }

  for (const seed of allSeeds) {
    if (!combinedMap.has(seed.slug)) {
      combinedMap.set(seed.slug, {
        slug: seed.slug,
        title: seed.title,
        originalTitle: seed.originalTitle,
        description: seed.description,
        content: seed.content,
      });
    }
  }

  const items: SutraCatalogItem[] = [];

  for (const [slug, sutra] of combinedMap.entries()) {
    const meta = SUTRA_CATALOG_METADATA[slug] || DEFAULT_METADATA;
    const chapters = sutra.content ? splitSutraChapters(sutra.content) : [];
    const chapterCount = chapters.length > 0 ? chapters.length : 1;

    items.push({
      id: slug,
      slug,
      title: sutra.title,
      originalTitle: sutra.originalTitle,
      aspiration: meta.aspiration,
      aspirationLabel: meta.aspirationLabel,
      meritBadge: meta.meritBadge,
      image: meta.image,
      objectPosition: meta.objectPosition,
      verseExcerpt: meta.verseExcerpt,
      estimatedMinutes: meta.estimatedMinutes,
      chapterCount,
      description: sutra.description,
    });
  }

  return items;
}
