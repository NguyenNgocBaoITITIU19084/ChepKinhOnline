import { fontDisplay, meta } from "@/components/article/styles";
import { cx } from "@/components/article/utils";
import { progressBar, progressTrack } from "@/components/copy/panelClasses";
import type { MeritMilestone } from "@/types/profile";
import { ProfilePanel } from "./ProfilePanel";

/** Chữ số mạ vàng: gradient cloth-hi → cloth → cloth-lo như vải bìa kinh, cắt theo chữ. */
const gildedNumber =
  "tw:bg-[linear-gradient(180deg,#c99a3e_0%,#b5862c_45%,#8d6315_100%)] tw:bg-clip-text tw:[-webkit-text-fill-color:transparent] " +
  "tw:[filter:drop-shadow(0_1px_0_rgba(255,255,255,0.8))_drop-shadow(0_4px_10px_rgba(168,116,26,0.25))]";

/**
 * Dấu ấn công đức: con số mạ vàng là điểm nhấn của mỗi ô, đơn vị đứng ngay sau để số có nghĩa.
 * Đã đạt: nền vàng nhạt, ngày đạt. Chưa đạt: viền nét đứt, số nhạt hơn, thanh tiến độ.
 */
export function MilestonesPanel({ milestones }: { milestones: MeritMilestone[] }) {
  const achieved = milestones.filter((m) => m.achievedAt).length;

  return (
    <ProfilePanel
      title="Dấu ấn công đức"
      description="Những chặng đường đã đi qua."
      action={
        <span className={cx(meta, "tw:font-medium")}>
          {achieved}/{milestones.length} dấu ấn
        </span>
      }
    >
      <ul className="tw:m-0 tw:p-0 tw:list-none tw:grid tw:grid-cols-3 tw:gap-3 tw:upto-1100:grid-cols-2 tw:upto-480:grid-cols-1">
        {milestones.map((m) => {
          const done = Boolean(m.achievedAt);
          const percent = m.progress ? Math.round((m.progress.current / m.progress.target) * 100) : 0;
          return (
            <li
              key={m.id}
              className={cx(
                "tw:flex tw:flex-col tw:gap-1.5 tw:px-5 tw:pt-4 tw:pb-4 tw:rounded-[10px] tw:border",
                done
                  ? "tw:bg-[linear-gradient(180deg,#fff8e6,rgba(255,240,194,0.55))] tw:border-[rgba(214,164,64,0.55)]"
                  : "tw:bg-[rgba(255,253,246,0.6)] tw:border-dashed tw:border-[rgba(214,164,64,0.5)]",
              )}
            >
              <div className="tw:flex tw:items-baseline tw:gap-2 tw:flex-wrap">
                <span
                  className={cx(
                    "tw:text-[2.8rem] tw:font-semibold tw:leading-none tw:tracking-[-0.01em] tw:tabular-nums",
                    done ? gildedNumber : "tw:text-[rgba(168,116,26,0.5)]",
                    fontDisplay,
                  )}
                >
                  {m.mark}
                </span>
                <span className={cx("tw:text-[0.9rem] tw:font-semibold", done ? "tw:text-gold-700" : "tw:text-[rgba(107,74,18,0.7)]")}>
                  {m.unit}
                </span>
              </div>
              <span className={cx("tw:mt-1 tw:text-[1rem] tw:font-semibold tw:leading-[1.3] tw:text-brown-900", fontDisplay)}>
                {m.title}
              </span>
              {m.description && <span className="tw:text-[0.82rem] tw:leading-[1.45] tw:text-brown-800">{m.description}</span>}
              <div className="tw:mt-auto tw:pt-2">
                {done ? (
                  <span className={meta}>Đạt {m.achievedAt}</span>
                ) : (
                  m.progress && (
                    <div className="tw:flex tw:items-center tw:gap-3">
                      <div
                        className={cx(progressTrack, "tw:flex-1")}
                        role="progressbar"
                        aria-valuenow={percent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Tiến độ ${m.title}`}
                      >
                        <div className={progressBar} style={{ width: `${percent}%` }} />
                      </div>
                      <span className={cx(meta, "tw:shrink-0")}>
                        {m.progress.current}/{m.progress.target} {m.progress.unit}
                      </span>
                    </div>
                  )
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </ProfilePanel>
  );
}
