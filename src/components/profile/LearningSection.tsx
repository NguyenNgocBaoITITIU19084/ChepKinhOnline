"use client";

import { useState } from "react";
import Link from "next/link";
import { eyebrow, focusable, fontDisplay, hoverTint, meta } from "@/components/article/styles";
import { cx } from "@/components/article/utils";
import { progressBar, progressTrack } from "@/components/copy/panelClasses";
import type { LearningReport } from "@/types/profile";
import { ProfilePanel } from "./ProfilePanel";
import { rowDivider, statTile, statValue } from "./styles";

const decimal = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 1 });

/** Chênh lệch so với kỳ trước, nói bằng chữ (bảng màu không có xanh/đỏ để báo tăng giảm). */
function delta(value: number, unit: string) {
  if (value === 0) return "Giữ nguyên";
  return `${value > 0 ? "Tăng" : "Giảm"} ${decimal.format(Math.abs(value))}${unit}`;
}

/** Biểu đồ đường độ chính xác theo tuần: một chuỗi, trục y 85–100%, rê chuột hiện giá trị từng tuần. */
function AccuracyChart({ data }: { data: LearningReport["weeklyAccuracy"] }) {
  const [active, setActive] = useState<number | null>(null);
  const W = 640;
  const H = 220;
  const pad = { top: 16, right: 52, bottom: 30, left: 40 };
  const min = 85;
  const max = 100;
  const x = (i: number) => pad.left + (i * (W - pad.left - pad.right)) / (data.length - 1);
  const y = (v: number) => pad.top + ((max - v) * (H - pad.top - pad.bottom)) / (max - min);
  const path = data.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d.value)}`).join(" ");
  const last = data.length - 1;
  const shown = active ?? last;

  return (
    <figure className="tw:m-0 tw:flex tw:flex-col tw:gap-2">
      <div className="tw:flex tw:items-baseline tw:justify-between tw:gap-3">
        <figcaption className={eyebrow}>Độ chính xác theo tuần</figcaption>
        <span className={meta} aria-live="polite">
          Tuần {data[shown].label} · {decimal.format(data[shown].value)}%
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="tw:w-full tw:h-auto tw:overflow-visible"
        role="img"
        aria-label={`Độ chính xác tăng từ ${decimal.format(data[0].value)}% lên ${decimal.format(data[last].value)}% trong ${data.length} tuần`}
        onMouseLeave={() => setActive(null)}
      >
        {/* Lưới ngang mờ */}
        {[85, 90, 95, 100].map((v) => (
          <g key={v}>
            <line x1={pad.left} x2={W - pad.right} y1={y(v)} y2={y(v)} stroke="rgba(168,116,26,0.15)" strokeWidth={1} />
            <text x={pad.left - 8} y={y(v)} dy="0.32em" textAnchor="end" fontSize={11} fill="var(--brown-800)" className="tw:tabular-nums">
              {v}%
            </text>
          </g>
        ))}
        {data.map((d, i) => (
          <text key={d.label} x={x(i)} y={H - 8} textAnchor="middle" fontSize={11} fill="var(--brown-800)" className="tw:tabular-nums">
            {d.label}
          </text>
        ))}

        {active !== null && (
          <line x1={x(active)} x2={x(active)} y1={pad.top} y2={H - pad.bottom} stroke="var(--gold-500)" strokeWidth={1} strokeDasharray="3 3" />
        )}

        <path d={path} fill="none" stroke="var(--gold-700)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

        {data.map((d, i) => (
          <circle
            key={d.label}
            cx={x(i)}
            cy={y(d.value)}
            r={i === shown ? 5 : 4}
            fill={i === shown ? "var(--gold-700)" : "var(--gold-500)"}
            stroke="var(--paper)"
            strokeWidth={2}
          />
        ))}

        {/* Nhãn trực tiếp ở điểm cuối */}
        <text x={x(last) + 10} y={y(data[last].value)} dy="0.32em" fontSize={12} fontWeight={600} fill="var(--brown-900)" className="tw:tabular-nums">
          {decimal.format(data[last].value)}%
        </text>

        {/* Vùng rê chuột rộng hơn điểm */}
        {data.map((d, i) => (
          <rect
            key={d.label}
            x={x(i) - (W - pad.left - pad.right) / (data.length - 1) / 2}
            y={pad.top}
            width={(W - pad.left - pad.right) / (data.length - 1)}
            height={H - pad.top - pad.bottom}
            fill="transparent"
            onMouseEnter={() => setActive(i)}
          />
        ))}
      </svg>

      {/* Bảng số liệu cho trình đọc màn hình */}
      <table className="tw:sr-only">
        <caption>Độ chính xác chép kinh theo tuần</caption>
        <thead>
          <tr>
            <th scope="col">Tuần bắt đầu</th>
            <th scope="col">Độ chính xác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.label}>
              <td>{d.label}</td>
              <td>{decimal.format(d.value)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

/** Mục Học tập: đánh giá việc chép kinh và đọc bài tu học. Giao diện mẫu, số liệu lấy từ mock. */
export function LearningSection({ report }: { report: LearningReport }) {
  const stats = [
    { label: "Độ chính xác", value: decimal.format(report.accuracy), unit: "%", note: delta(report.accuracyDelta, "%") },
    { label: "Tốc độ chép", value: String(report.speed), unit: "chữ/phút", note: delta(report.speedDelta, " chữ/phút") },
    { label: "Bài đã đọc", value: String(report.articlesRead), unit: "bài", note: delta(report.articlesReadDelta, " bài") },
    { label: "Điểm kiểm tra", value: decimal.format(report.quizAverage), unit: "/10", note: delta(report.quizAverageDelta, " điểm") },
  ];

  return (
    <div className="tw:flex tw:flex-col tw:gap-6">
      <ProfilePanel title="Đánh giá học tập" description="30 ngày gần nhất, so với 30 ngày trước đó.">
        <dl className="tw:m-0 tw:grid tw:grid-cols-4 tw:gap-3 tw:upto-1100:grid-cols-2 tw:upto-400:grid-cols-1">
          {stats.map((s) => (
            <div key={s.label} className={statTile}>
              <dt className={eyebrow}>{s.label}</dt>
              <dd className="tw:m-0 tw:flex tw:flex-col tw:gap-1">
                {/* Con số Lora, đơn vị chữ giao diện nhỏ hơn */}
                <span className={statValue}>
                  {s.value}
                  <span className="tw:ml-0.5 tw:font-ui tw:text-[0.8rem] tw:font-medium tw:text-brown-800">{s.unit}</span>
                </span>
                <span className="tw:text-[0.76rem] tw:leading-[1.4] tw:text-brown-800">{s.note}</span>
              </dd>
            </div>
          ))}
        </dl>

        <AccuracyChart data={report.weeklyAccuracy} />

        <div className={cx("tw:flex tw:flex-col tw:gap-1.5 tw:pt-5", rowDivider)}>
          <span className={eyebrow}>Nhận xét tuần này</span>
          <p className="tw:m-0 tw:text-[0.92rem] tw:leading-[1.65] tw:text-brown-900">
            {report.weeklyNote}
          </p>
        </div>
      </ProfilePanel>

      <div className="tw:grid tw:grid-cols-2 tw:gap-6 tw:upto-1024:grid-cols-1">
        <ProfilePanel title="Lộ trình tu học" description="Bài đã đọc theo chuyên mục.">
          <ul className="tw:m-0 tw:p-0 tw:list-none tw:flex tw:flex-col tw:gap-4">
            {report.paths.map((p) => {
              const percent = Math.round((p.done / p.total) * 100);
              return (
                <li key={p.slug} className="tw:flex tw:flex-col tw:gap-1.5">
                  <div className="tw:flex tw:items-baseline tw:justify-between tw:gap-3">
                    <Link
                      href={`/tu-hoc?category=${p.slug}`}
                      className={cx("tw:text-[0.92rem] tw:font-medium tw:text-brown-900 tw:no-underline tw:hover:underline tw:rounded-[4px]", focusable)}
                    >
                      {p.category}
                    </Link>
                    <span className={meta}>
                      {p.done}/{p.total} bài · {percent}%
                    </span>
                  </div>
                  <div
                    className={progressTrack}
                    role="progressbar"
                    aria-valuenow={percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Tiến độ ${p.category}`}
                  >
                    <div className={progressBar} style={{ width: `${percent}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </ProfilePanel>

        <ProfilePanel title="Chữ hay chép sai" description="Lưu ý ở lần chép sau.">
          <ul className="tw:m-0 tw:p-0 tw:list-none tw:flex tw:flex-col">
            {report.mistakes.map((m, i) => (
              <li key={m.expected} className={cx("tw:flex tw:items-start tw:justify-between tw:gap-4 tw:py-3", i > 0 && rowDivider)}>
                <div className="tw:flex tw:flex-col tw:gap-1 tw:min-w-0">
                  {/* Chữ đúng là mực ink; chữ đã gõ sai là ink-wrong kèm gạch lượn sóng như trên trang kinh */}
                  <span className="tw:font-[family-name:var(--font-book),Georgia,serif] tw:text-[1.02rem] tw:font-medium tw:text-ink">
                    {m.expected}
                  </span>
                  <span className="tw:text-[0.84rem] tw:text-brown-800">
                    Đã gõ:{" "}
                    <span className="tw:text-ink-wrong tw:underline tw:decoration-wavy tw:decoration-ink-wrong tw:underline-offset-4">
                      {m.typed}
                    </span>
                  </span>
                  <span className={meta}>{m.sutra}</span>
                </div>
                <span className="tw:shrink-0 tw:text-[0.84rem] tw:font-semibold tw:text-brown-900 tw:tabular-nums">{m.count} lần</span>
              </li>
            ))}
          </ul>
        </ProfilePanel>
      </div>

      <ProfilePanel title="Bài kiểm tra" description="Câu hỏi ngắn sau mỗi bài tu học.">
        <ul className="tw:m-0 tw:p-0 tw:list-none tw:flex tw:flex-col">
          {report.quizzes.map((q, i) => (
            <li key={q.id} className={i > 0 ? rowDivider : undefined}>
              <Link
                href={`/tu-hoc/${q.articleSlug}`}
                className={cx(
                  "tw:flex tw:items-center tw:gap-4 tw:py-3 tw:px-3 tw:-mx-3 tw:rounded-[10px] tw:no-underline tw:text-inherit tw:hover:no-underline",
                  hoverTint,
                  focusable,
                )}
              >
                <span
                  className={cx(
                    "tw:w-14 tw:shrink-0 tw:text-[1.35rem] tw:font-semibold tw:text-center tw:tabular-nums tw:text-gold-700",
                    fontDisplay,
                  )}
                >
                  {q.score}
                  <span className="tw:text-[0.8rem] tw:text-brown-800">/{q.total}</span>
                </span>
                <div className="tw:flex tw:flex-col tw:gap-0.5 tw:flex-1 tw:min-w-0">
                  <span className="tw:text-[0.92rem] tw:font-medium tw:leading-[1.4] tw:text-brown-900">{q.title}</span>
                  <span className={meta}>{q.takenAt}</span>
                </div>
                <span className="tw:shrink-0 tw:text-[0.84rem] tw:font-medium tw:text-brown-800 tw:upto-480:hidden">
                  {q.score < q.total ? "Làm lại" : "Xem lại"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </ProfilePanel>
    </div>
  );
}
