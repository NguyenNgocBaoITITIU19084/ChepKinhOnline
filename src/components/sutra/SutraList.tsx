import Link from "next/link";
import { connection } from "next/server";
import { IconBook } from "@tabler/icons-react";
import { prisma } from "@/lib/prisma";

export async function SutraList() {
  // Đọc DB lúc request, không prerender lúc build
  await connection();

  const sutras = await prisma.sutra.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "asc" },
    select: { id: true, slug: true, title: true, description: true },
  });

  if (sutras.length === 0) {
    return (
      <div className="list-group-item text-secondary">
        Chưa có kinh nào. Chạy <code>npm run db:seed</code> để thêm dữ liệu mẫu.
      </div>
    );
  }

  return sutras.map((sutra) => (
    <Link
      key={sutra.id}
      href={`/chep-kinh/${sutra.slug}`}
      className="list-group-item list-group-item-action d-flex gap-3 tw:transition-colors tw:hover:bg-amber-50"
    >
      <IconBook size={24} stroke={1.5} className="text-primary" />
      <div>
        <div className="fw-bold">{sutra.title}</div>
        {sutra.description && (
          <div className="text-secondary">{sutra.description}</div>
        )}
      </div>
    </Link>
  ));
}
