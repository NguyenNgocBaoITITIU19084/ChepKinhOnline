// Dữ liệu kinh dùng chung: prisma/seed.ts nạp vào database, src/lib/sutra-repo.ts dùng làm mock khi chưa có database
// Quy ước nội dung:
// - Mỗi chương mở đầu bằng một dòng "# Tên chương" (kinh không chia chương thì bỏ qua)
// - Mỗi câu kinh một dòng; các trang cách nhau bởi một dòng trống (chỉ để chia trang tạm,
//   trang thật được chia lại theo cỡ chữ khi chép)
type Chapter = { title: string; pages: string[][] };

const toContent = (chapters: Chapter[]) =>
  chapters
    .map((chapter) => `# ${chapter.title}\n` + chapter.pages.map((page) => page.join("\n")).join("\n\n"))
    .join("\n\n");

// Tâm Kinh theo nghi thức tụng: khai kinh, chánh kinh, thần chú, hồi hướng
export const TAM_KINH = toContent([
  {
    title: "Khai kinh kệ",
    pages: [
      [
        "Vô thượng thâm thâm vi diệu pháp,",
        "Bách thiên vạn kiếp nan tao ngộ,",
        "Ngã kim kiến văn đắc thọ trì,",
        "Nguyện giải Như Lai chân thật nghĩa.",
      ],
    ],
  },
  {
    title: "Chánh kinh",
    pages: [
      [
        "Quán Tự Tại Bồ Tát hành thâm Bát Nhã Ba La Mật Đa thời, chiếu kiến ngũ uẩn giai không, độ nhất thiết khổ ách.",
        "Xá Lợi Tử, sắc bất dị không, không bất dị sắc, sắc tức thị không, không tức thị sắc, thọ tưởng hành thức diệc phục như thị.",
      ],
      [
        "Xá Lợi Tử, thị chư pháp không tướng, bất sinh bất diệt, bất cấu bất tịnh, bất tăng bất giảm.",
        "Thị cố không trung vô sắc, vô thọ tưởng hành thức, vô nhãn nhĩ tỷ thiệt thân ý, vô sắc thanh hương vị xúc pháp, vô nhãn giới nãi chí vô ý thức giới.",
      ],
      [
        "Vô vô minh diệc vô vô minh tận, nãi chí vô lão tử diệc vô lão tử tận. Vô khổ tập diệt đạo, vô trí diệc vô đắc, dĩ vô sở đắc cố.",
        "Bồ Đề Tát Đỏa y Bát Nhã Ba La Mật Đa cố, tâm vô quái ngại, vô quái ngại cố, vô hữu khủng bố, viễn ly điên đảo mộng tưởng, cứu cánh Niết Bàn.",
      ],
      [
        "Tam thế chư Phật y Bát Nhã Ba La Mật Đa cố, đắc A Nậu Đa La Tam Miệu Tam Bồ Đề.",
        "Cố tri Bát Nhã Ba La Mật Đa thị đại thần chú, thị đại minh chú, thị vô thượng chú, thị vô đẳng đẳng chú, năng trừ nhất thiết khổ, chân thật bất hư.",
      ],
    ],
  },
  {
    title: "Thần chú",
    pages: [
      [
        "Cố thuyết Bát Nhã Ba La Mật Đa chú, tức thuyết chú viết:",
        "Yết đế, yết đế, ba la yết đế, ba la tăng yết đế, bồ đề tát bà ha.",
      ],
    ],
  },
  {
    title: "Hồi hướng",
    pages: [
      [
        "Nguyện dĩ thử công đức, trang nghiêm Phật tịnh độ,",
        "Thượng báo tứ trọng ân, hạ tế tam đồ khổ.",
        "Nhược hữu kiến văn giả, tất phát Bồ Đề tâm,",
        "Tận thử nhất báo thân, đồng sinh Cực Lạc quốc.",
      ],
    ],
  },
]);

// Chú Đại Bi trích đoạn mẫu
export const CHU_DAI_BI = `# Phát nguyện
Nam mô Đại Bi Quán Thế Âm Bồ Tát.
Nguyện con mau biết tất cả pháp,
Nguyện con sớm được mắt trí tuệ,
Nguyện con mau độ các chúng sinh,
Nguyện con sớm được phương tiện khéo,
Nguyện con mau lên thuyền bát nhã,
Nguyện con sớm vượt qua biển khổ.

# Đại Bi Thần Chú
Nam mô hắc ra đát na đa ra dạ da.
Nam mô a rị da, bà lô kiết đế, thước bát ra da, bồ đề tát đỏa bà da, ma ha tát đỏa bà da, ma ha ca lô ni ca da.
Án, tát bàn ra phạt duệ, số đát na đát tỏa.
Nam mô tất kiết lật đỏa, y mông a rị da, bà lô kiết đế thất Phật ra lăng đà bà.

# Hồi hướng
Nguyện tiêu tam chướng trừ phiền não,
Nguyện đắc trí tuệ chân minh liễu,
Phổ nguyện tội chướng tất tiêu trừ,
Thế thế thường hành Bồ Tát đạo.`;

export const KINH_DUOC_SU = `# Nguyện hương
Khói trầm tỏa ngát khắp mười phương,
Kính lạy Dược Sư cõi Cát Tường,
Mười hai đại nguyện trừ bệnh khổ,
Tiêu tai diên thọ phước vô biên.

# Dược Sư Quán Đảnh Chân Ngôn
Nam mô bạt già phạt đế, bệ sát xã, lũ lô thích lưu ly, bác lặc bà, hắc ra xà dã.
Đát tha yết đa dã, a ra ha đế, tam miệu tam bột đà dã.
Đát điệt tha: Án, bệ sát thệ, bệ sát thệ, bệ sát xã, tam một yết đế tát bà ha.

# Hồi hướng
Dược Sư Phật diên thọ vương,
Quang minh chiếu thấu mười phương cõi trần,
Nguyện tiêu tật bệnh tai ương,
Thân tâm thanh tịnh miên trường an vui.`;

export const CHU_LANG_NGHIEM = `# Khai kệ
Đại Phật Đảnh Thủ Lăng Nghiêm,
Diệu trạm tổng trì bất động tôn,
Thủ Lăng Nghiêm Vương thế hy hữu,
Tiêu ngã ức kiếp điên đảo tưởng.

# Lăng Nghiêm Tâm Chú
Đát điệt tha: Án, a na lệ, tỳ xá đề, bệ ra bạt xà ra đà rị, bàn đà bàn đà nễ, bạt xà ra bàng ni phấn, hổ hồng đô lô ung phấn, tát bà ha.

# Hồi hướng
Nguyện đắc Lăng Nghiêm định kiên cố,
Hàng phục ma chướng chuyển pháp luân,
Độ khắp muôn loài lìa biển khổ,
Đồng chứng Vô Thượng Chánh Đẳng Giác.`;

export const KINH_DIA_TANG = `# Nguyện hương
Lòng từ bi rộng lớn vô cùng,
Địa Tạng Vương đại nguyện sâu xa,
Tay cầm tích trượng phá ngục hình,
Tay nâng minh châu soi u tối.

# Thần chú Diệt Định Nghiệp
Án, bát ra mạt lân đà nẵng, ta bà ha.
Án, bát ra mạt lân đà nẵng, ta bà ha.
Án, bát ra mạt lân đà nẵng, ta bà ha.

# Đại nguyện hồi hướng
Địa ngục vị không, thệ bất thành Phật,
Chúng sinh độ tận, phương chứng Bồ Đề.`;

export const KINH_SAM_HOI = `# Khai kinh kệ
Vô thượng thâm thâm vi diệu pháp,
Bách thiên vạn kiếp nan tao ngộ,
Ngã kim kiến văn đắc thọ trì,
Nguyện giải Như Lai chân thật nghĩa.

# Chí tâm sám hối
Đệ tử kính lạy mười phương Phật,
Chư vị Bồ Tát, bậc Thánh Hiền,
Hôm nay quy mạng trước Phật tiền,
Chí tâm sám hối bao oan nghiệp.

Tội từ tâm khởi đem tâm sám,
Tâm được tịnh rồi tội liền tiêu,
Tội tiêu tâm tịnh thảy đều không,
Đó mới thật là chân sám hối.

# Hồi hướng sám hối
Nguyện tiêu tam chướng trừ phiền não,
Nguyện đắc trí tuệ chân minh liễu,
Phổ nguyện tội chướng tất tiêu trừ,
Thế thế thường hành Bồ Tát đạo.`;

export const KINH_VU_LAN = `# Khai kinh kệ
Phật pháp rộng sâu rất nhiệm mầu,
Trăm ngàn muôn kiếp khó tìm cầu,
Nay con nghe thấy chuyên trì tụng,
Nguyện hiểu Như Lai nghĩa nhiệm mầu.

# Kinh Vu Lan Bồn
Một thuở nọ Thế Tôn an trụ,
Xá Vệ thành Kỳ Thụ Viên trung,
Mục Liên mới đặng lục thông,
Muốn cho cha mẹ khỏi vòng trầm luân.

Công dưỡng dục khôn xiết kể xiết,
Nghĩa sinh thành sâu tựa biển khơi,
Lòng con hiếu thảo muôn đời,
Nguyện cầu phụ mẫu siêu sinh cõi lành.

# Hồi hướng báo hiếu
Nguyện đem công đức tụng kinh này,
Hồi hướng mẹ cha chốn trần ai,
Hiện tiền tăng trưởng phước thọ khang,
Quá vãng vãng sinh cõi Liên Đài.`;

export const KINH_HONG_DANH = `# Tán Phật
Đại từ đại bi thương chúng sanh,
Đại hỷ đại xả cứu hàm thức,
Tướng hảo quang minh dĩ tự nghiêm,
Chúng đẳng chí tâm quy mạng lễ.

# Đảnh lễ Hồng Danh Chư Phật
Nam mô Phổ Quang Phật.
Nam mô Phổ Minh Phật.
Nam mô Phổ Tịnh Phật.
Nam mô Đa Ma La Bạt Chiên Đàn Hương Phật.
Nam mô Chiên Đàn Quang Phật.
Nam mô Ma Ni Tràng Phật.
Nam mô Hoan Hỷ Tạng Ma Ni Bảo Tích Phật.
Nam mô Nhất Thiết Thế Gian Nhạo Kiến Thượng Đại Tinh Tấn Phật.

# Hồi hướng
Hồng danh chư Phật tiêu trừ tội,
Trí tuệ viên minh chiếu mười phương,
Nguyện khắp chúng sinh đồng giải thoát,
Đồng sinh An Lạc quốc đạo tràng.`;

export const KINH_PHAP_CU = `# Lời vàng Phật dạy
Tâm dẫn đầu mọi pháp,
Tâm làm chủ, tâm tạo,
Nếu với tâm thanh tịnh,
Nói lên hoặc hành động,
An lạc bước theo sau,
Như bóng không rời hình.

# Pháp Cú hồi hướng
Không làm các điều ác,
Nguyện làm các hạnh lành,
Giữ tâm ý trong sạch,
Là lời chư Phật dạy.`;

// Các bộ kinh bổ sung để tương thích ngược với các liên kết cũ (Bát Nhã Tâm Kinh, Pháp Cú, v.v.)
export const ADDITIONAL_SUTRAS: SutraSeed[] = [
  {
    slug: "bat-nha-tam-kinh",
    title: "Ma Ha Bát Nhã Ba La Mật Đa Tâm Kinh",
    originalTitle: "摩訶般若波羅蜜多心經",
    description: "Cốt tủy của trí tuệ Bát Nhã, soi chiếu năm uẩn đều không, độ thoát hết thảy khổ ách, đưa hành giả đến bờ giác ngộ.",
    content: TAM_KINH,
  },
  {
    slug: "chu-lang-nghiem",
    title: "Đại Phật Đảnh Thủ Lăng Nghiêm Thần Chú",
    originalTitle: "大佛頂首楞嚴神咒",
    description: "Được mệnh danh là vua của các câu chú trong Phật giáo, phá trừ tà ma ngoại đạo, khai mở định lực vô thượng và trí tuệ chân như.",
    content: CHU_LANG_NGHIEM,
  },
  {
    slug: "kinh-phap-cu",
    title: "Kinh Pháp Cú (Dhammapada)",
    originalTitle: "法句經",
    description: "Tuyển tập những lời dạy vàng ngọc của Đức Phật Thích Ca Mâu Ni về tâm trí, đạo đức giải thoát và nếp sống an lạc tỉnh thức mỗi ngày.",
    content: KINH_PHAP_CU,
  },
];

export type SutraSeed = {
  slug: string;
  title: string;
  originalTitle: string | null;
  description: string | null;
  content: string;
};

// 6 bộ kinh mẫu theo yêu cầu:
// 1. Kinh Địa Tạng
// 2. Chú Đại Bi
// 3. Kinh Sám Hối
// 4. Kinh Dược Sư
// 5. Kinh Vu Lan Báo Hiếu
// 6. Kinh Sám Hối Hồng Danh
export const SUTRAS: SutraSeed[] = [
  {
    slug: "kinh-dia-tang",
    title: "Kinh Địa Tạng Bồ Tát Bổn Nguyện",
    originalTitle: "地藏菩薩本願經",
    description: "Đại hiếu và đại nguyện sâu rộng như đất dày của Bồ Tát Địa Tạng, cứu bạt cha mẹ, tổ tiên nhiều đời cùng muôn loài chúng sinh trong cõi u minh.",
    content: KINH_DIA_TANG,
  },
  {
    slug: "chu-dai-bi",
    title: "Đại Bi Tâm Đà La Ni (Chú Đại Bi)",
    originalTitle: "千手千眼大悲心陀羅尼",
    description: "Oai lực từ bi vô lượng của Đức Quán Thế Âm Bồ Tát, phá tan chướng nạn khổ đau, che chở bình an, hộ trì tâm bồ đề kiên cố.",
    content: CHU_DAI_BI,
  },
  {
    slug: "kinh-sam-hoi",
    title: "Kinh Sám Hối (Từ Bi Thủy Sám)",
    originalTitle: "慈悲水懺法",
    description: "Dòng nước cam lộ từ bi gột rửa sạch ba nghiệp thân khẩu ý, hóa giải nghiệp chướng oan khiên nhiều đời, đưa tâm về thanh tịnh bản nhiên.",
    content: KINH_SAM_HOI,
  },
  {
    slug: "kinh-duoc-su",
    title: "Kinh Dược Sư Lưu Ly Quang Vương Phật",
    originalTitle: "藥師琉璃光如來本願功德經",
    description: "Mười hai đại nguyện của Đức Dược Sư Như Lai tiêu trừ tật bệnh thân tâm, diên thọ bình an, chuyển hóa ách nạn và tăng trưởng phước báu.",
    content: KINH_DUOC_SU,
  },
  {
    slug: "kinh-vu-lan-bao-hieu",
    title: "Kinh Vu Lan Báo Hiếu (Vu Lan Bồn)",
    originalTitle: "佛說盂蘭盆經",
    description: "Khắc ghi thâm ân sinh thành dưỡng dục sâu dày như biển trời của cha mẹ; nương nhờ tha lực mười phương chư Phật cứu độ cửu huyền thất tổ.",
    content: KINH_VU_LAN,
  },
  {
    slug: "kinh-sam-hoi-hong-danh",
    title: "Kinh Hồng Danh Sám Hối (88 Vị Phật)",
    originalTitle: "八十八佛洪名寶懺",
    description: "Chí thành xưng tụng và đảnh lễ hồng danh tám mươi tám Đức Phật Thế Tôn, tiêu trừ vô lượng tội khiên vi tế, viên mãn công đức giải thoát vô thượng.",
    content: KINH_HONG_DANH,
  },
];
