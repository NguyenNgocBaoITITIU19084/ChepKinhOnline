"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { eyebrow, focusable, fontDisplay, meta, pill } from "@/components/article/styles";
import { cx } from "@/components/article/utils";
import type { PracticeDay, PracticeStreak } from "@/types/profile";
import { ProfilePanel } from "./ProfilePanel";
import { fieldHint, rowDivider } from "./styles";

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const GOALS = [3, 5, 7];
const STREAK_TARGETS = [7, 30, 100, 365];
const number = new Intl.NumberFormat("vi-VN");

/**
 * Thang màu tuần tự một sắc vàng, nhạt → đậm theo số chữ chép trong ngày.
 * Ngày không chép là rãnh `track`. Nhãn bên cạnh (chú giải, tooltip) mang ý nghĩa, không chỉ màu.
 */
const LEVELS = [
  { max: 0, className: "tw:bg-[rgba(168,116,26,0.1)]", label: "Không chép" },
  { max: 150, className: "tw:bg-gold-100 tw:shadow-[inset_0_0_0_1px_rgba(214,164,64,0.45)]", label: "Dưới 150 chữ" },
  { max: 300, className: "tw:bg-gold-300", label: "150–300 chữ" },
  { max: 450, className: "tw:bg-gold-500", label: "300–450 chữ" },
  { max: Infinity, className: "tw:bg-gold-700", label: "Trên 450 chữ" },
];

function level(chars: number) {
  return LEVELS.findIndex((l) => chars <= l.max);
}

/** Thứ trong tuần, thứ Hai = 0. */
function weekdayIndex(iso: string) {
  return (new Date(`${iso}T00:00:00Z`).getUTCDay() + 6) % 7;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}/${m}/${y}`;
}

/** Xếp ngày thành cột tuần (thứ Hai trên cùng). Ô trống ở đầu cột đầu và cuối cột cuối là null. */
function toWeeks(days: PracticeDay[]) {
  const padded: (PracticeDay | null)[] = [...Array(weekdayIndex(days[0].date)).fill(null), ...days];
  while (padded.length % 7) padded.push(null);
  const weeks: (PracticeDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  return weeks;
}

/** Chuỗi ngày tinh tấn: số ngày liền, tuần này so với mục tiêu, lịch 26 tuần và cài đặt nhắc nhở (giao diện mẫu). */
export function StreakPanel({ streak }: { streak: PracticeStreak }) {
  const [goal, setGoal] = useState(streak.weeklyGoal);
  const [reminderOn, setReminderOn] = useState(true);
  const [reminderTime, setReminderTime] = useState(streak.reminderTime);
  const [hovered, setHovered] = useState<PracticeDay | null>(null);

  const weeks = useMemo(() => toWeeks(streak.days), [streak.days]);
  // Màn hẹp: lịch cuộn ngang, mở sẵn ở tuần gần nhất
  const calendarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = calendarRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);
  const today = streak.days[streak.days.length - 1];
  const thisWeek = weeks[weeks.length - 1];
  /** Mốc chuỗi kế tiếp để khích lệ. */
  const nextTarget = STREAK_TARGETS.find((t) => t > streak.current);
  const practicedThisWeek =thisWeek.filter((d) => d && d.chars > 0).length;
  const activeDays = streak.days.filter((d) => d.chars > 0).length;

  // Nhãn tháng phía trên cột đầu tiên của mỗi tháng
  const monthLabels = weeks.map((week, i) => {
    const first = week.find(Boolean);
    if (!first) return "";
    const month = Number(first.date.slice(5, 7));
    const prev = i > 0 ? weeks[i - 1].find(Boolean) : null;
    return !prev || Number(prev.date.slice(5, 7)) !== month ? `Th${month}` : "";
  });

  return (
    <ProfilePanel title="Chuỗi ngày tinh tấn" description="Đều đặn mỗi ngày, dù chỉ vài dòng.">
      <div className="tw:grid tw:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] tw:gap-6 tw:upto-768:grid-cols-1">
        {/* Số ngày liền */}
        <div className="tw:flex tw:flex-col tw:gap-3">
          {/* Bảng nâu sẫm như thẻ hành giả (brown-900 → cloth-lo), viền gold-500; số vàng sáng nổi lên trên */}
          <div
            className={cx(
              "tw:relative tw:overflow-hidden tw:flex tw:flex-col tw:gap-3 tw:px-5 tw:py-4 tw:rounded-[10px] tw:border tw:border-[rgba(214,164,64,0.7)]",
              "tw:bg-[linear-gradient(150deg,#6b4a12_0%,var(--brown-900)_55%,#3a2606_100%)]",
              "tw:shadow-[0_8px_22px_-6px_rgba(90,60,10,0.55),inset_0_1px_0_rgba(255,238,190,0.25)]",
            )}
          >
            {/* Quầng sáng góc trên trái */}
            <span
              aria-hidden
              className="tw:absolute tw:-top-10 tw:-left-10 tw:size-32 tw:rounded-[50%] tw:bg-[radial-gradient(circle,rgba(240,196,100,0.4),transparent_70%)] tw:pointer-events-none"
            />
            <div className="tw:relative tw:flex tw:items-end tw:gap-3">
              <span
                className={cx(
                  "tw:text-[4.2rem] tw:font-semibold tw:leading-[0.9] tw:tabular-nums tw:text-gold-300",
                  // Chữ vàng chuyển từ gold-button-top xuống gold-500, có quầng sáng ấm
                  "tw:bg-[linear-gradient(180deg,#fff4d6_0%,#ffe3a0_45%,var(--gold-500)_100%)] tw:bg-clip-text tw:[-webkit-text-fill-color:transparent]",
                  "tw:[filter:drop-shadow(0_0_14px_rgba(240,196,100,0.45))]",
                  fontDisplay,
                )}
              >
                {streak.current}
              </span>
              <span className="tw:flex tw:flex-col tw:pb-1">
                <span className="tw:text-[0.68rem] tw:font-semibold tw:tracking-[0.18em] tw:uppercase tw:text-gold-300">
                  Tinh tấn
                </span>
                <span className="tw:text-[1rem] tw:font-semibold tw:leading-[1.3] tw:text-[#fff4d6]">ngày liền</span>
              </span>
            </div>
            {nextTarget && (
              <div className="tw:relative tw:flex tw:flex-col tw:gap-1.5">
                <div
                  className="tw:h-1.5 tw:rounded-[999px] tw:bg-[rgba(255,238,190,0.18)] tw:overflow-hidden"
                  role="progressbar"
                  aria-valuenow={streak.current}
                  aria-valuemin={0}
                  aria-valuemax={nextTarget}
                  aria-label={`Tiến tới mốc ${nextTarget} ngày`}
                >
                  <div
                    className="tw:h-full tw:rounded-[inherit] tw:bg-[linear-gradient(90deg,var(--gold-500),var(--gold-300))]"
                    style={{ width: `${Math.round((streak.current / nextTarget) * 100)}%` }}
                  />
                </div>
                <span className="tw:text-[0.8rem] tw:font-medium tw:text-[rgba(255,244,214,0.9)] tw:tabular-nums">
                  Còn {nextTarget - streak.current} ngày tới mốc {nextTarget} ngày
                </span>
              </div>
            )}
          </div>
          <dl className="tw:m-0 tw:grid tw:grid-cols-2 tw:gap-3">
            <div className="tw:flex tw:flex-col tw:gap-0.5">
              <dt className={eyebrow}>Dài nhất</dt>
              <dd className="tw:m-0 tw:text-[0.95rem] tw:font-medium tw:text-brown-900 tw:tabular-nums">{streak.longest} ngày</dd>
            </div>
            <div className="tw:flex tw:flex-col tw:gap-0.5">
              <dt className={eyebrow}>Ngày an trú</dt>
              <dd className="tw:m-0 tw:text-[0.95rem] tw:font-medium tw:text-brown-900 tw:tabular-nums">Còn {streak.restDaysLeft}</dd>
            </div>
          </dl>
          <p className={fieldHint}>
            Ngày an trú: nghỉ một ngày mà chuỗi không đứt, mỗi tháng 2 ngày.
          </p>
        </div>

        {/* Tuần này */}
        <div className="tw:flex tw:flex-col tw:gap-3">
          <div className="tw:flex tw:items-baseline tw:justify-between tw:gap-3">
            <span className={eyebrow}>Tuần này</span>
            <span className={meta}>
              {practicedThisWeek}/{goal} ngày ·{" "}
              {practicedThisWeek >= goal ? "đã đạt mục tiêu" : `còn ${goal - practicedThisWeek} ngày`}
            </span>
          </div>
          <ol className="tw:m-0 tw:p-0 tw:list-none tw:grid tw:grid-cols-7 tw:gap-2">
            {thisWeek.map((day, i) => {
              const done = Boolean(day && day.chars > 0);
              const isToday = day?.date === today.date;
              return (
                <li key={i} className="tw:flex tw:flex-col tw:items-center tw:gap-1.5">
                  <span
                    className={cx(
                      "tw:grid tw:place-items-center tw:size-10 tw:rounded-[50%] tw:text-[0.72rem] tw:font-semibold tw:tabular-nums tw:upto-400:size-8",
                      done && "tw:text-brown-900 tw:bg-[linear-gradient(160deg,#fff0c2,var(--gold-500))]",
                      !done && day && "tw:text-brown-800 tw:bg-[rgba(168,116,26,0.1)]",
                      !day && "tw:text-brown-800 tw:border tw:border-dashed tw:border-[rgba(214,164,64,0.55)]",
                      isToday && "tw:shadow-[0_0_0_2px_#fffdf8,0_0_0_3.5px_var(--gold-700)]",
                    )}
                    aria-label={`${WEEKDAYS[i]}: ${day ? (done ? `đã chép ${day.chars} chữ` : "chưa chép") : "chưa tới"}`}
                  >
                    {day ? Number(day.date.slice(8)) : ""}
                  </span>
                  <span className={cx("tw:text-[0.72rem] tw:text-brown-800", isToday && "tw:font-semibold tw:text-brown-900")}>
                    {isToday ? "Hôm nay" : WEEKDAYS[i]}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Lịch 26 tuần */}
      <div className={cx("tw:flex tw:flex-col tw:gap-3 tw:pt-5", rowDivider)}>
        <div className="tw:flex tw:flex-wrap tw:items-baseline tw:justify-between tw:gap-2">
          <span className={eyebrow}>26 tuần qua</span>
          {/* Dòng mô tả ô đang rê chuột; mặc định là tổng quát */}
          <span className={meta} aria-live="polite">
            {hovered
              ? `${formatDate(hovered.date)} · ${hovered.chars > 0 ? `${number.format(hovered.chars)} chữ` : "không chép"}`
              : `${activeDays}/${streak.days.length} ngày có chép`}
          </span>
        </div>

        <div ref={calendarRef} className="tw:overflow-x-auto tw:pb-1">
          <div className="tw:inline-grid tw:grid-cols-[auto_1fr] tw:gap-x-2">
            <span />
            <div className="tw:flex tw:gap-[3px]">
              {monthLabels.map((label, i) => (
                <span key={i} className="tw:w-3 tw:text-[0.68rem] tw:text-brown-800 tw:whitespace-nowrap tw:overflow-visible">
                  {label}
                </span>
              ))}
            </div>
            <div className="tw:grid tw:grid-rows-7 tw:gap-[3px] tw:text-[0.68rem] tw:leading-3 tw:text-brown-800">
              {WEEKDAYS.map((d, i) => (
                <span key={d} className={i % 2 ? "tw:invisible" : undefined}>
                  {d}
                </span>
              ))}
            </div>
            <div className="tw:flex tw:gap-[3px]" onMouseLeave={() => setHovered(null)}>
              {weeks.map((week, wi) => (
                <div key={wi} className="tw:grid tw:grid-rows-7 tw:gap-[3px]">
                  {week.map((day, di) =>
                    day ? (
                      <button
                        key={day.date}
                        type="button"
                        tabIndex={-1}
                        title={`${formatDate(day.date)} · ${day.chars > 0 ? `${number.format(day.chars)} chữ` : "không chép"}`}
                        onMouseEnter={() => setHovered(day)}
                        className={cx(
                          "tw:block tw:size-3 tw:p-0 tw:border-0 tw:rounded-[3px] tw:cursor-default",
                          LEVELS[level(day.chars)].className,
                          day.date === today.date && "tw:outline-2 tw:outline-solid tw:outline-brown-900 tw:outline-offset-1",
                        )}
                      />
                    ) : (
                      <span key={`e${di}`} className="tw:block tw:size-3" />
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-x-4 tw:gap-y-1.5 tw:text-[0.72rem] tw:text-brown-800">
          {LEVELS.map((l) => (
            <span key={l.label} className="tw:inline-flex tw:items-center tw:gap-1.5">
              <span className={cx("tw:inline-block tw:size-3 tw:rounded-[3px]", l.className)} />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      {/* Mục tiêu và nhắc nhở */}
      <div className={cx("tw:grid tw:grid-cols-2 tw:gap-6 tw:pt-5 tw:upto-640:grid-cols-1", rowDivider)}>
        <div className="tw:flex tw:flex-col tw:gap-2">
          <span className="tw:text-[0.92rem] tw:font-medium tw:text-brown-900">Mục tiêu mỗi tuần</span>
          <div role="radiogroup" aria-label="Mục tiêu mỗi tuần" className="tw:flex tw:flex-wrap tw:gap-2">
            {GOALS.map((g) => (
              <button
                key={g}
                type="button"
                role="radio"
                aria-checked={goal === g}
                onClick={() => setGoal(g)}
                className={cx(pill(goal === g), focusable)}
              >
                {g === 7 ? "Mỗi ngày" : `${g} ngày`}
              </button>
            ))}
          </div>
        </div>

        <div className="tw:flex tw:flex-col tw:gap-2">
          <div className="tw:flex tw:items-center tw:justify-between tw:gap-3">
            <span className="tw:text-[0.92rem] tw:font-medium tw:text-brown-900">Nhắc hằng ngày</span>
            <button
              type="button"
              role="switch"
              aria-checked={reminderOn}
              aria-label="Nhắc chép kinh hằng ngày"
              onClick={() => setReminderOn((v) => !v)}
              className={cx(
                "tw:relative tw:inline-flex tw:items-center tw:shrink-0 tw:w-11 tw:h-6 tw:p-0.5 tw:border-0 tw:rounded-[999px] tw:cursor-pointer",
                "tw:transition-colors tw:motion-reduce:transition-none",
                reminderOn ? "tw:bg-gold-500" : "tw:bg-[rgba(168,116,26,0.22)]",
                focusable,
              )}
            >
              <span
                className={cx(
                  "tw:block tw:size-5 tw:rounded-[50%] tw:bg-paper tw:shadow-[0_1px_3px_rgba(120,85,20,0.3)] tw:transition-transform tw:motion-reduce:transition-none",
                  reminderOn ? "tw:translate-x-5" : "tw:translate-x-0",
                )}
              />
            </button>
          </div>
          {reminderOn && (
            <label className="tw:flex tw:items-center tw:gap-3 tw:text-[0.86rem] tw:text-brown-800">
              Nhắc lúc
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className={cx(
                  "tw:min-h-[38px] tw:px-3 tw:font-ui tw:text-[0.9rem] tw:text-ink tw:tabular-nums tw:bg-paper tw:border tw:border-[rgba(214,164,64,0.45)] tw:rounded-[10px]",
                  focusable,
                )}
              />
            </label>
          )}
        </div>
      </div>
    </ProfilePanel>
  );
}
