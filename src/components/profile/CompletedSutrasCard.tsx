import Link from "next/link";
import { IconCheck, IconEye } from "@tabler/icons-react";
import { LotusIcon } from "@/components/icons/BuddhistIcons";
import type { CompletedSutra } from "@/types/profile";
import { EmptyState } from "./EmptyState";

interface CompletedSutrasCardProps {
  sutras: CompletedSutra[];
}

export function CompletedSutrasCard({ sutras }: CompletedSutrasCardProps) {
  const numberFormat = new Intl.NumberFormat("vi-VN");

  return (
    <section
      aria-labelledby="completed-sutras-heading"
      className="ck-glass tw:rounded-2xl tw:p-6 tw:bg-[rgba(255,253,246,0.95)] tw:border tw:border-[rgba(214,164,64,0.3)] tw:shadow-[0_4px_24px_rgba(107,74,18,0.06)]"
    >
      <div className="tw:flex tw:items-center tw:justify-between tw:mb-4">
        <div className="tw:flex tw:items-center tw:gap-2.5">
          <span className="tw:p-1.5 tw:rounded-lg tw:bg-emerald-100 tw:text-emerald-800">
            <LotusIcon size={20} strokeWidth={1.6} />
          </span>
          <div>
            <h3
              id="completed-sutras-heading"
              className="tw:text-base tw:font-bold tw:text-brown-900 tw:font-serif"
            >
              Kinh Điển Viên Mãn
            </h3>
            <p className="tw:text-xs tw:text-brown-600">
              Công đức hoàn thành trọn vẹn từng bộ kinh
            </p>
          </div>
        </div>
        <span className="tw:text-xs tw:font-semibold tw:px-2.5 tw:py-1 tw:rounded-full tw:bg-emerald-100/80 tw:text-emerald-900">
          {sutras.length} biến hoàn mãn
        </span>
      </div>

      {sutras.length === 0 ? (
        <EmptyState
          title="Chưa có bản kinh nào hoàn thành"
          description="Mỗi chữ là một hạt bồ đề. Hãy kiên trì từng ngày để hoàn thành bản kinh đầu tiên của bạn."
        />
      ) : (
        <div className="tw:divide-y tw:divide-amber-200/50">
          {sutras.map((sutra) => (
            <div
              key={sutra.id}
              className="tw:py-3.5 tw:first:pt-1 tw:last:pb-1 tw:flex tw:flex-col tw:sm:flex-row tw:sm:items-center tw:justify-between tw:gap-2"
            >
              <div className="tw:space-y-0.5">
                <div className="tw:flex tw:items-center tw:gap-2">
                  <h4 className="tw:text-sm tw:font-bold tw:text-brown-950 tw:font-serif">
                    {sutra.title}
                  </h4>
                  <span className="tw:inline-flex tw:items-center tw:gap-1 tw:px-2 tw:py-0.5 tw:rounded-full tw:text-[0.68rem] tw:font-bold tw:bg-emerald-100 tw:text-emerald-800">
                    <IconCheck size={11} stroke={2.5} /> Viên mãn
                  </span>
                </div>
                <div className="tw:flex tw:items-center tw:gap-3 tw:text-xs tw:text-brown-600">
                  <span>Hoàn thành: {sutra.completedAt}</span>
                  <span>•</span>
                  <span>{numberFormat.format(sutra.totalChars)} chữ</span>
                </div>
              </div>

              <div>
                <Link
                  href={`/chep-kinh/${sutra.slug}`}
                  className="tw:inline-flex tw:items-center tw:gap-1.5 tw:px-3 tw:py-1.5 tw:rounded-lg tw:text-xs tw:font-medium tw:text-brown-800 tw:bg-amber-100/70 tw:hover:bg-amber-200/80 tw:transition-colors"
                >
                  <IconEye size={14} stroke={1.8} />
                  <span>Xem lại bản kinh</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
