"use client";

import { useRef, useState, useSyncExternalStore, type TouchEvent } from "react";
import Link from "next/link";
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { lunarDateLabel, lunarMonthHan, todayLabels, upcomingEvents } from "@/lib/buddhist-calendar";

const FOCUS =
  "tw:focus-visible:outline-2 tw:focus-visible:outline-solid tw:focus-visible:outline-gold-500 tw:focus-visible:outline-offset-2";

/** Số ngày lễ mỗi trang của danh sách; bấm ‹ › (hoặc vuốt ngang) để sang trang */
const PAGE_SIZE = 5;

// Hôm nay theo giờ máy người xem. Lúc prerender chưa có nên trả "" và hiện khung chờ.
const noopSubscribe = () => () => {};
function readToday() {
  const d = new Date();
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

function daysLeftLabel(days: number) {
  if (days === 0) return "Hôm nay";
  if (days === 1) return "Ngày mai";
  return `Còn ${days} ngày`;
}

/**
 * Block "Lịch Phật sự" ở trang chủ: ngày lễ, ngày vía trong năm theo âm lịch, ngày dương tự tính
 * (src/lib/lunar.ts). Bên trái là tờ lịch bloc của ngày lễ đang chọn (mặc định ngày gần nhất), bên phải là
 * danh sách các ngày lễ sắp tới trong mười hai tháng, xếp theo ngày gần nhất, chia trang 5 dòng:
 * nút ‹ ›, chấm trang hoặc vuốt ngang để trượt sang các ngày kế tiếp.
 */
export function BuddhistCalendarBlock() {
  const todayKey = useSyncExternalStore(noopSubscribe, readToday, () => "");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  // Hướng trượt của lần chuyển trang gần nhất: 1 sang trang sau, -1 về trang trước
  const [direction, setDirection] = useState<1 | -1>(1);
  const touchStartX = useRef<number | null>(null);

  if (!todayKey) return <CalendarSkeleton />;

  const [day, month, year] = todayKey.split("/").map(Number);
  const today = { day, month, year };
  const occurrences = upcomingEvents(today);
  const labels = todayLabels(today);
  const current = occurrences.find((o) => o.event.id === selectedId) ?? occurrences[0];
  const pageCount = Math.ceil(occurrences.length / PAGE_SIZE);
  const rows = occurrences.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const firstRow = page * PAGE_SIZE + 1;
  const lastRow = page * PAGE_SIZE + rows.length;

  const goTo = (next: number) => {
    if (next < 0 || next >= pageCount || next === page) return;
    setDirection(next > page ? 1 : -1);
    setPage(next);
  };

  // Vuốt ngang trên màn hình cảm ứng: kéo sang trái là xem các ngày kế tiếp
  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 48) return;
    goTo(dx < 0 ? page + 1 : page - 1);
  };
  const todayLunar = labels.lunar.charAt(0).toLowerCase() + labels.lunar.slice(1);

  return (
    <div className="tw:flex tw:flex-col tw:gap-8">
      <p className="tw:m-0 tw:text-center tw:text-[0.9rem] tw:text-brown-800 tw:tabular-nums">
        Hôm nay {todayLunar} · <span className="tw:whitespace-nowrap">Phật lịch {labels.buddhistEra}</span>
      </p>

      <div className="tw:grid tw:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] tw:gap-12 tw:items-start tw:upto-768:grid-cols-[minmax(0,1fr)] tw:upto-768:gap-8">
        {/* Tờ lịch bloc: gáy nâu có hai khoen, tờ giấy ngà, số ngày to ở giữa */}
        <article aria-live="polite" className="tw:w-full tw:max-w-[400px] tw:mx-auto">
          <div className="tw:relative tw:h-7 tw:rounded-t-[12px] tw:bg-[linear-gradient(180deg,#8d6315,#5a3d0c)] tw:shadow-[0_2px_4px_rgba(74,50,10,0.3)]">
            {[0, 1].map((i) => (
              <span
                key={i}
                aria-hidden
                className={`tw:absolute tw:-bottom-2 tw:w-3 tw:h-5 tw:rounded-full tw:bg-[#fbf7ec] tw:border tw:border-[rgba(90,61,12,0.5)] ${i === 0 ? "tw:left-[28%]" : "tw:right-[28%]"}`}
              />
            ))}
          </div>
          <div className="tw:relative tw:px-7 tw:pt-8 tw:pb-7 tw:bg-[radial-gradient(ellipse_at_50%_0%,#fffdf6,#fbf7ec_70%)] tw:border tw:border-t-0 tw:border-[rgba(214,164,64,0.45)] tw:rounded-b-[6px] tw:shadow-[0_24px_48px_-22px_rgba(120,85,20,0.45)] tw:text-center tw:upto-480:px-5">
            {/* Mép giấy xé răng cưa mảnh ở đỉnh tờ */}
            <span aria-hidden className="tw:absolute tw:inset-x-0 tw:top-0 tw:h-1.5 tw:[background:radial-gradient(circle_at_4px_0,transparent_3px,rgba(214,164,64,0.18)_3.5px)_0_0/8px_6px_repeat-x]" />
            <div key={current.event.id} className="tw:flex tw:flex-col tw:items-center tw:gap-1">
              <span className="ck-rise tw:text-[0.7rem] tw:font-semibold tw:tracking-[0.18em] tw:uppercase tw:text-gold-700" style={delay(0)}>
                {current.daysLeft === 0 ? "Hôm nay" : current.event.id === occurrences[0].event.id ? "Sắp đến" : "Ngày lễ"}
              </span>
              <span className="ck-rise font-zen-title tw:text-[5.5rem] tw:font-semibold tw:leading-none tw:text-brown-900 tw:tabular-nums tw:mt-2" style={delay(1)}>
                {current.solar.day}
              </span>
              <span className="ck-rise tw:text-[0.95rem] tw:text-brown-800 tw:tabular-nums" style={delay(1)}>
                {current.weekday} · tháng {current.solar.month} năm {current.solar.year}
              </span>

              <div className="ck-rise tw:flex tw:items-center tw:gap-3 tw:w-full tw:my-4" style={delay(2)}>
                <span className="tw:flex-1 tw:h-px tw:bg-[rgba(214,164,64,0.45)]" />
                <span className="tw:text-[0.88rem] tw:text-brown-900 tw:font-medium">
                  {lunarDateLabel(current.lunarDay, current.event.lunarMonth)}
                  <span lang="zh-Hant" aria-hidden className="font-zen-han tw:ml-2 tw:text-gold-700">
                    {lunarMonthHan(current.event.lunarMonth)}
                  </span>
                </span>
                <span className="tw:flex-1 tw:h-px tw:bg-[rgba(214,164,64,0.45)]" />
              </div>

              <h3 className="ck-rise font-zen-title tw:m-0 tw:text-[1.4rem] tw:font-semibold tw:leading-[1.3] tw:text-brown-900 tw:text-balance" style={delay(3)}>
                {current.event.name}
              </h3>
              <p className="ck-rise tw:m-0 tw:mt-2 tw:text-[0.92rem] tw:leading-[1.7] tw:text-brown-800 tw:text-pretty" style={delay(4)}>
                {current.event.description}
              </p>
              {current.lunarDay !== current.event.lunarDay && (
                <p className="ck-rise tw:m-0 tw:mt-2 tw:text-[0.8rem] tw:italic tw:text-brown-800" style={delay(4)}>
                  Năm nay tháng {current.event.lunarMonth} âm lịch thiếu, nên làm lễ vào ngày {current.lunarDay}.
                </p>
              )}

              <div className="ck-rise tw:flex tw:flex-wrap tw:items-center tw:justify-center tw:gap-3 tw:mt-5" style={delay(5)}>
                <span className="tw:inline-flex tw:items-center tw:min-h-[36px] tw:px-4 tw:rounded-full tw:bg-[#fff0c2] tw:border tw:border-gold-500 tw:text-[0.85rem] tw:font-semibold tw:text-brown-900 tw:tabular-nums">
                  {daysLeftLabel(current.daysLeft)}
                </span>
                {current.event.sutra && (
                  <Link href={`/chep-kinh/${current.event.sutra.slug}`} className="ck-btn-ghost tw:min-h-[36px] tw:px-4 tw:text-[0.85rem]">
                    <span>{current.event.sutra.label}</span>
                    <IconArrowRight size={16} stroke={2} className="ck-btn-arrow" aria-hidden />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Danh sách ngày lễ sắp tới, chia trang; nút ‹ › hoặc vuốt ngang để trượt sang các ngày kế tiếp */}
        <section aria-label="Các ngày lễ sắp tới" className="tw:flex tw:flex-col tw:min-w-0">
          <div className="tw:flex tw:items-center tw:justify-between tw:gap-4 tw:mb-3">
            <span className="tw:text-[0.7rem] tw:font-semibold tw:tracking-[0.18em] tw:uppercase tw:text-gold-700">
              Mười hai tháng tới
            </span>
            <div className="tw:flex tw:items-center tw:gap-2">
              <span aria-live="polite" className="tw:text-[0.8rem] tw:text-brown-800 tw:tabular-nums tw:mr-1">
                {firstRow}–{lastRow} / {occurrences.length}
              </span>
              {/* Nút không dùng được thì ẩn (giữ chỗ), không làm mờ */}
              <button
                type="button"
                onClick={() => goTo(page - 1)}
                aria-label="Xem các ngày lễ trước"
                className={`ck-btn-ghost tw:w-9 tw:h-9 tw:min-h-0 tw:p-0 tw:justify-center ${FOCUS} ${page === 0 ? "tw:invisible" : ""}`}
              >
                <IconChevronLeft size={18} stroke={2} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => goTo(page + 1)}
                aria-label="Xem các ngày lễ kế tiếp"
                className={`ck-btn-ghost tw:w-9 tw:h-9 tw:min-h-0 tw:p-0 tw:justify-center ${FOCUS} ${page >= pageCount - 1 ? "tw:invisible" : ""}`}
              >
                <IconChevronRight size={18} stroke={2} aria-hidden />
              </button>
            </div>
          </div>

          {/* Khung cố định chiều cao một trang đầy để trang cuối ít dòng không làm block co lại */}
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="tw:overflow-hidden tw:min-h-[calc(5*(4.25rem+1px)+1px)] tw:border-t tw:border-t-[rgba(214,164,64,0.35)] tw:[touch-action:pan-y]"
          >
            <ul
              key={page}
              className={`tw:m-0 tw:p-0 tw:list-none ${direction === 1 ? "ck-slide-next" : "ck-slide-prev"}`}
            >
              {rows.map((o) => {
                const selected = o.event.id === current.event.id;
                return (
                  <li key={o.event.id} className="tw:border-b tw:border-b-[rgba(214,164,64,0.35)]">
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setSelectedId(o.event.id)}
                      className={`tw:grid tw:grid-cols-[4.75rem_minmax(0,1fr)_auto] tw:items-center tw:gap-x-4 tw:w-full tw:min-h-[4.25rem] tw:py-3 tw:px-3 tw:text-left tw:bg-transparent tw:border-0 tw:rounded-[10px] tw:cursor-pointer tw:[transition:background-color_0.2s_ease] tw:motion-reduce:transition-none ${FOCUS} ${
                        selected ? "tw:bg-[rgba(255,240,194,0.7)]" : "tw:hover:bg-[rgba(232,199,122,0.2)]"
                      }`}
                    >
                      <span className="tw:flex tw:flex-col tw:leading-tight">
                        <span className="font-zen-title tw:text-[1.15rem] tw:font-semibold tw:text-brown-900 tw:tabular-nums">
                          {o.solar.day}/{o.solar.month}
                        </span>
                        <span className="tw:text-[0.72rem] tw:text-brown-800 tw:tabular-nums">
                          {o.lunarDay}/{o.event.lunarMonth} âm lịch
                        </span>
                      </span>
                      <span className={`tw:text-[0.95rem] tw:leading-[1.4] tw:text-brown-900 ${selected ? "tw:font-semibold" : "tw:font-medium"}`}>
                        {o.event.name}
                      </span>
                      <span className="tw:text-[0.78rem] tw:text-brown-800 tw:tabular-nums tw:whitespace-nowrap tw:upto-480:hidden">
                        {o.daysLeft === 0 ? "Hôm nay" : `${o.daysLeft} ngày`}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Chấm trang: bấm để nhảy thẳng tới trang */}
          <div className="tw:flex tw:justify-center tw:gap-1 tw:mt-4">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Trang ${i + 1}`}
                aria-current={i === page ? "true" : undefined}
                className={`tw:grid tw:place-items-center tw:w-7 tw:h-7 tw:p-0 tw:bg-transparent tw:border-0 tw:cursor-pointer tw:rounded-full ${FOCUS}`}
              >
                <span
                  className={`tw:block tw:h-1.5 tw:rounded-full tw:[transition:width_0.3s_ease,background-color_0.3s_ease] tw:motion-reduce:transition-none ${
                    i === page ? "tw:w-5 tw:bg-gold-500" : "tw:w-1.5 tw:bg-[rgba(168,116,26,0.35)]"
                  }`}
                />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function delay(step: number) {
  return { animationDelay: `${step * 60}ms` };
}

/** Khung chờ lúc chưa biết ngày hôm nay (prerender), giữ đúng chiều cao để trang không nhảy */
function CalendarSkeleton() {
  return (
    <div aria-hidden className="tw:grid tw:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] tw:gap-12 tw:mt-[3.25rem] tw:upto-768:grid-cols-[minmax(0,1fr)]">
      <div className="tw:w-full tw:max-w-[400px] tw:mx-auto tw:h-[520px] tw:rounded-[12px] tw:bg-[rgba(239,228,200,0.45)]" />
      <div className="tw:h-[420px] tw:rounded-[12px] tw:bg-[rgba(239,228,200,0.3)] tw:upto-768:hidden" />
    </div>
  );
}
