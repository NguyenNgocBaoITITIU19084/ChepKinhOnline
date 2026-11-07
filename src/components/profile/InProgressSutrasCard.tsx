import Link from "next/link";
import { IconBook2, IconArrowRight, IconClock } from "@tabler/icons-react";
import type { InProgressSutra } from "@/types/profile";
import { EmptyState } from "./EmptyState";

interface InProgressSutrasCardProps {
  sutras: InProgressSutra[];
}

export function InProgressSutrasCard({ sutras }: InProgressSutrasCardProps) {
  return (
    <section
      aria-labelledby="in-progress-sutras-heading"
      className="ck-glass tw:rounded-2xl tw:p-6 tw:bg-[rgba(255,253,246,0.95)] tw:border tw:border-[rgba(214,164,64,0.3)] tw:shadow-[0_4px_24px_rgba(107,74,18,0.06)]"
    >
      <div className="tw:flex tw:items-center tw:justify-between tw:mb-4">
        <div className="tw:flex tw:items-center tw:gap-2.5">
          <span className="tw:p-1.5 tw:rounded-lg tw:bg-amber-100 tw:text-amber-800">
            <IconBook2 size={20} stroke={1.8} />
          </span>
          <div>
            <h3
              id="in-progress-sutras-heading"
              className="tw:text-base tw:font-bold tw:text-brown-900 tw:font-serif"
            >
              Kinh Điển Đang Chép
            </h3>
            <p className="tw:text-xs tw:text-brown-600">
              Tiếp nối từng trang kinh chánh niệm
            </p>
          </div>
        </div>
        <span className="tw:text-xs tw:font-semibold tw:px-2.5 tw:py-1 tw:rounded-full tw:bg-amber-100/80 tw:text-brown-800">
          {sutras.length} bản kinh
        </span>
      </div>

      {sutras.length === 0 ? (
        <EmptyState
          title="Chưa có bản kinh nào đang chép"
          description="Hãy chọn một bài kinh yêu thích và bắt đầu hành trình chép kinh định tâm ngay hôm nay."
          action={{
            label: "Khám phá kinh điển",
            href: "/#kinh-dien",
          }}
        />
      ) : (
        <div className="tw:space-y-3.5">
          {sutras.map((sutra) => (
            <div
              key={sutra.id}
              className="tw:p-4 tw:rounded-xl tw:bg-white/70 tw:border tw:border-amber-200/60 tw:hover:border-gold-500/70 tw:hover:shadow-md tw:transition-all tw:duration-200"
            >
              <div className="tw:flex tw:flex-col tw:sm:flex-row tw:sm:items-center tw:justify-between tw:gap-2 tw:mb-2.5">
                <div>
                  <h4 className="tw:text-sm tw:font-bold tw:text-brown-950 tw:font-serif">
                    {sutra.title}
                  </h4>
                  {sutra.originalTitle && (
                    <span className="tw:text-[0.72rem] tw:font-serif tw:text-brown-500 tw:tracking-widest">
                      {sutra.originalTitle}
                    </span>
                  )}
                </div>

                <div className="tw:flex tw:items-center tw:gap-3">
                  <span className="tw:inline-flex tw:items-center tw:gap-1 tw:text-[0.72rem] tw:text-brown-500">
                    <IconClock size={13} /> {sutra.lastPracticedAt}
                  </span>
                  <Link
                    href={`/chep-kinh/${sutra.slug}`}
                    className="tw:inline-flex tw:items-center tw:gap-1.5 tw:px-3 tw:py-1.5 tw:rounded-lg tw:text-xs tw:font-semibold tw:text-brown-950 tw:bg-gold-400 tw:hover:bg-gold-500 tw:transition-colors tw:shrink-0"
                  >
                    <span>Tiếp tục chép</span>
                    <IconArrowRight size={14} stroke={2} />
                  </Link>
                </div>
              </div>

              {/* Thanh tiến độ */}
              <div className="tw:space-y-1">
                <div className="tw:flex tw:items-center tw:justify-between tw:text-xs">
                  <span className="tw:text-brown-600 tw:font-medium">
                    {sutra.typedChars} / {sutra.totalChars} ký tự
                  </span>
                  <span className="tw:font-bold tw:text-amber-800">
                    {sutra.progressPercent}%
                  </span>
                </div>
                <div className="tw:w-full tw:h-2 tw:rounded-full tw:bg-amber-100 tw:overflow-hidden">
                  <div
                    className="tw:h-full tw:rounded-full tw:bg-gradient-to-r tw:from-amber-400 tw:to-gold-500 tw:transition-all tw:duration-500"
                    style={{ width: `${sutra.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
