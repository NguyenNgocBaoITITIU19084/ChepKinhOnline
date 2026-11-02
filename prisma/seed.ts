import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

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
const TAM_KINH = toContent([
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
        "Yết đế yết đế, ba la yết đế, ba la tăng yết đế, Bồ Đề tát bà ha.",
      ],
    ],
  },
  {
    title: "Hồi hướng",
    pages: [["Nguyện đem công đức này,", "Hướng về khắp tất cả,", "Đệ tử và chúng sinh,", "Đều trọn thành Phật đạo."]],
  },
]);

async function main() {
  const tamKinh = {
    title: "Ma Ha Bát Nhã Ba La Mật Đa Tâm Kinh",
    originalTitle: "摩訶般若波羅蜜多心經",
    description: "Bản phiên âm Hán Việt",
    content: TAM_KINH,
  };

  await prisma.sutra.upsert({
    where: { slug: "bat-nha-tam-kinh" },
    update: tamKinh,
    create: { slug: "bat-nha-tam-kinh", ...tamKinh },
  });

  await prisma.user.upsert({
    where: { email: "demo@chepkinh.local" },
    update: {},
    create: { email: "demo@chepkinh.local", name: "Phật tử Demo" },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
