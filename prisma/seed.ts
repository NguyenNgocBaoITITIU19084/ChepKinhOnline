import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { SUTRAS } from "../src/data/sutras";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  for (const { slug, ...sutra } of SUTRAS) {
    await prisma.sutra.upsert({ where: { slug }, update: sutra, create: { slug, ...sutra } });
  }

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
