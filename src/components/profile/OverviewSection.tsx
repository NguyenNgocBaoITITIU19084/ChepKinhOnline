import Image from "next/image";
import Link from "next/link";
import { eyebrow, focusable, fontDisplay, hoverTint, meta } from "@/components/article/styles";
import { cx } from "@/components/article/utils";
import { progressBar, progressTrack } from "@/components/copy/panelClasses";
import type { UserProfileData } from "@/types/profile";
import { EmptyState } from "./EmptyState";
import { MilestonesPanel } from "./MilestonesPanel";
import { ProfilePanel } from "./ProfilePanel";
import { StreakPanel } from "./StreakPanel";
import { rowDivider, statTile, statValue } from "./styles";

const number = new Intl.NumberFormat("vi-VN");

/** Liên kết chữ nhỏ cạnh tiêu đề thẻ. */
const textLink = cx(
  "tw:text-[0.84rem] tw:font-medium tw:text-brown-800 tw:underline tw:decoration-[rgba(214,164,64,0.6)] tw:underline-offset-4 tw:rounded-[6px]",
  "tw:hover:text-brown-900 tw:hover:decoration-gold-500",
  focusable,
);

/** Hàng bấm được trong danh sách. */
const rowLink = cx(
  "tw:flex tw:items-center tw:gap-4 tw:py-3 tw:px-3 tw:-mx-3 tw:rounded-[10px] tw:no-underline tw:text-inherit tw:hover:no-underline",
  "tw:transition-colors tw:motion-reduce:transition-none",
  hoverTint,
  focusable,
);

/** Ảnh bìa nhỏ: nền paper-edge lúc chờ ảnh, viền mảnh glass-border. */
function Thumb({ src, className }: { src: string; className: string }) {
  return (
    <span className={cx("tw:relative tw:shrink-0 tw:overflow-hidden tw:bg-[#efe4c8] tw:shadow-[0_0_0_1px_rgba(214,164,64,0.35)]", className)}>
      <Image src={src} alt="" fill sizes="96px" className="tw:object-cover" />
    </span>
  );
}

export function OverviewSection({ user }: { user: UserProfileData }) {
  const { metrics } = user;
  const stats = [
    { label: "Chữ đã chép", value: number.format(metrics.totalCharsTyped) },
    { label: "Kinh viên mãn", value: number.format(metrics.completedSutrasCount) },
    { label: "Giờ chép kinh", value: number.format(metrics.totalHoursSpent) },
  ];

  return (
    <div className="tw:flex tw:flex-col tw:gap-6">
      <StreakPanel streak={user.streak} />

      {/* Đang chép */}
      <ProfilePanel
        title="Đang chép"
        description="Chép tiếp từ chỗ đã dừng."
        action={
          <Link href="/" className={textLink}>
            Danh sách kinh
          </Link>
        }
      >
        {user.inProgressSutras.length === 0 ? (
          <EmptyState
            title="Chưa có kinh nào đang chép"
            description="Chọn một bộ kinh để bắt đầu."
            action={{ label: "Chọn kinh để chép", href: "/" }}
          />
        ) : (
          <ul className="tw:m-0 tw:p-0 tw:list-none tw:flex tw:flex-col">
            {user.inProgressSutras.map((sutra, i) => (
              <li key={sutra.id} className={i > 0 ? rowDivider : undefined}>
                <Link href={`/chep-kinh/${sutra.slug}`} className={rowLink}>
                  {/* Bìa dọc tỉ lệ cuốn kinh */}
                  <Thumb src={sutra.cover} className="tw:w-14 tw:h-[76px] tw:rounded-[4px]" />
                  <div className="tw:flex tw:flex-col tw:gap-1.5 tw:flex-1 tw:min-w-0">
                    <span className={cx("tw:text-[1rem] tw:font-semibold tw:leading-[1.35] tw:text-brown-900", fontDisplay)}>
                      {sutra.title}
                    </span>
                    {sutra.originalTitle && (
                      <span lang="zh-Hant" className="tw:font-hanzi tw:text-[0.8rem] tw:text-brown-800 tw:truncate">
                        {sutra.originalTitle}
                      </span>
                    )}
                    <div
                      className={progressTrack}
                      role="progressbar"
                      aria-valuenow={sutra.progressPercent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Tiến độ ${sutra.title}`}
                    >
                      <div className={progressBar} style={{ width: `${sutra.progressPercent}%` }} />
                    </div>
                    <span className={meta}>
                      {number.format(sutra.typedChars)}/{number.format(sutra.totalChars)} chữ · {sutra.progressPercent}% ·{" "}
                      {sutra.lastPracticedAt}
                    </span>
                  </div>
                  <span className="tw:shrink-0 tw:text-[0.86rem] tw:font-medium tw:text-brown-800 tw:upto-480:hidden">Chép tiếp</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </ProfilePanel>

      {/* Số liệu công phu và lời nguyện */}
      <ProfilePanel title="Công phu chép kinh" description="Xin tùy hỷ công đức của đạo hữu.">
        <dl className="tw:m-0 tw:grid tw:grid-cols-3 tw:gap-3 tw:upto-480:grid-cols-1">
          {stats.map((stat) => (
            <div key={stat.label} className={statTile}>
              <dt className={eyebrow}>{stat.label}</dt>
              <dd className={statValue}>{stat.value}</dd>
            </div>
          ))}
        </dl>

        {user.intention && (
          <figure className="tw:m-0 tw:pl-5 tw:[border-left:2px_solid_var(--gold-500)]">
            <figcaption className={cx(eyebrow, "tw:mb-1.5")}>Lời nguyện hồi hướng</figcaption>
            {/* Kiểu chữ merit-verse: Lora nghiêng */}
            <blockquote className="tw:m-0 tw:p-0 tw:[border:0] tw:font-[family-name:var(--font-book),Georgia,serif] tw:text-[1.05rem] tw:italic tw:leading-[1.8] tw:text-brown-900">
              {user.intention}
            </blockquote>
          </figure>
        )}
      </ProfilePanel>

      <MilestonesPanel milestones={user.milestones} />

      <div className="tw:grid tw:grid-cols-2 tw:gap-6 tw:upto-1024:grid-cols-1">
        {/* Đã viên mãn */}
        <ProfilePanel title="Kinh đã viên mãn">
          {user.completedSutras.length === 0 ? (
            <EmptyState title="Chưa có bộ kinh viên mãn" description="Chép trọn một bộ kinh để ghi dấu tại đây." />
          ) : (
            <ul className="tw:m-0 tw:p-0 tw:list-none tw:flex tw:flex-col">
              {user.completedSutras.map((sutra, i) => (
                <li key={sutra.id} className={i > 0 ? rowDivider : undefined}>
                  <Link href={`/chep-kinh/${sutra.slug}`} className={cx(rowLink, "tw:gap-3")}>
                    <Thumb src={sutra.cover} className="tw:w-11 tw:h-[60px] tw:rounded-[3px]" />
                    <div className="tw:flex tw:flex-col tw:gap-0.5 tw:min-w-0">
                      <span className="tw:text-[0.92rem] tw:font-medium tw:leading-[1.4] tw:text-brown-900">{sutra.title}</span>
                      <span className={meta}>
                        Viên mãn {sutra.completedAt} · {number.format(sutra.totalChars)} chữ
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </ProfilePanel>

        {/* Bài tu học đã lưu */}
        <ProfilePanel
          title="Bài đã lưu"
          action={
            <Link href="/tu-hoc" className={textLink}>
              Tu học
            </Link>
          }
        >
          {user.savedArticles.length === 0 ? (
            <EmptyState
              title="Chưa lưu bài nào"
              description="Lưu bài trong mục Tu học để đọc lại."
              action={{ label: "Đến mục Tu học", href: "/tu-hoc" }}
            />
          ) : (
            <ul className="tw:m-0 tw:p-0 tw:list-none tw:flex tw:flex-col">
              {user.savedArticles.map((article, i) => (
                <li key={article.id} className={i > 0 ? rowDivider : undefined}>
                  <Link href={`/tu-hoc/${article.slug}`} className={cx(rowLink, "tw:gap-3")}>
                    <Thumb src={article.cover} className="tw:w-[84px] tw:h-14 tw:rounded-[6px]" />
                    <div className="tw:flex tw:flex-col tw:gap-0.5 tw:min-w-0">
                      <span className="tw:text-[0.92rem] tw:font-medium tw:leading-[1.4] tw:text-brown-900">{article.title}</span>
                      <span className={meta}>
                        {article.category} · {article.readTime} đọc
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </ProfilePanel>
      </div>
    </div>
  );
}
