import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const TAM_KINH = `Quán Tự Tại Bồ Tát hành thâm Bát Nhã Ba La Mật Đa thời, chiếu kiến ngũ uẩn giai không, độ nhất thiết khổ ách.
Xá Lợi Tử, sắc bất dị không, không bất dị sắc, sắc tức thị không, không tức thị sắc, thọ tưởng hành thức diệc phục như thị.
Xá Lợi Tử, thị chư pháp không tướng, bất sinh bất diệt, bất cấu bất tịnh, bất tăng bất giảm.`;

async function main() {
  await prisma.sutra.upsert({
    where: { slug: "bat-nha-tam-kinh" },
    update: {},
    create: {
      slug: "bat-nha-tam-kinh",
      title: "Bát Nhã Ba La Mật Đa Tâm Kinh",
      description: "Bản phiên âm Hán Việt (trích đoạn)",
      content: TAM_KINH,
    },
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
