import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { cx } from "@/components/article/utils";
import { COVER_PHOTOS } from "@/data/mock-profile";
import type { UserProfileData } from "@/types/profile";
import { ProfileAvatar } from "./ProfileAvatar";
import { getInitials } from "./ProfileSidebar";

/** Danh xưng theo số bộ kinh đã viên mãn: lời ghi nhận nhẹ nhàng, không xếp hạng ai hơn ai. */
function practiceTitle(completed: number) {
  if (completed >= 10) return "Hành giả kiên cố";
  if (completed >= 3) return "Hành giả tinh tấn";
  if (completed >= 1) return "Hành giả viên mãn";
  return "Hành giả sơ phát tâm";
}

/** Tên kinh gọn cho nút: bỏ phần trong ngoặc. */
function shortTitle(title: string) {
  return title.replace(/\s*\(.*?\)\s*/g, " ").trim();
}

const cream = "tw:text-[#fff4d6]";
const creamSoft = "tw:text-[rgba(255,244,214,0.88)]";

/**
 * Thẻ hành giả đầu trang tài khoản. Nền là ảnh người dùng chọn (mặc định chùa Bái Đính), phủ dải nâu ấm (brown-900 → cloth-lo)
 * từ trái sang để chữ cloth-title đủ rõ mà ảnh bên phải vẫn hiện. Viền mảnh vàng kem như bìa kinh.
 * Chữ không đặt lên phần công trình trong ảnh.
 */
export function ProfileHero({ user }: { user: UserProfileData }) {
  const continueSutra = user.inProgressSutras[0];
  // Ảnh có sẵn thì lấy khung ảnh và chú thích nơi chụp; ảnh tự tải lên thì canh giữa, không chú thích
  const preset = COVER_PHOTOS.find((p) => p.src === user.cover);

  return (
    <section
      aria-label="Thẻ hành giả"
      className="tw:relative tw:overflow-hidden tw:rounded-[16px] tw:bg-brown-900 tw:shadow-[0_40px_60px_-34px_rgba(90,60,10,0.6),0_14px_26px_rgba(120,85,20,0.2)]"
    >
      <Image
        src={user.cover}
        alt=""
        fill
        priority
        sizes="(max-width: 1200px) 100vw, 1200px"
        unoptimized={user.cover.startsWith("blob:")}
        className="tw:object-cover"
        style={{ objectPosition: preset?.position ?? "50% 50%" }}
      />
      {/* Dải phủ: đặc bên trái (chỗ chữ), trong dần sang phải; màn hẹp phủ từ dưới lên */}
      <div
        aria-hidden
        className={cx(
          "tw:absolute tw:inset-0",
          "tw:bg-[linear-gradient(90deg,rgba(58,38,6,0.96)_0%,rgba(74,50,10,0.9)_40%,rgba(107,74,18,0.5)_64%,rgba(141,99,21,0.1)_100%)]",
          "tw:upto-768:bg-[linear-gradient(0deg,rgba(58,38,6,0.97)_0%,rgba(74,50,10,0.92)_55%,rgba(74,50,10,0)_88%)]",
        )}
      />

      <div className="tw:relative tw:m-3 tw:rounded-[10px] tw:border tw:border-solid tw:border-[rgba(255,238,190,0.4)] tw:upto-480:m-2">
        <div className="tw:flex tw:flex-col tw:gap-6 tw:max-w-[680px] tw:px-8 tw:py-8 tw:upto-768:max-w-none tw:upto-768:px-5 tw:upto-768:pt-44 tw:upto-480:px-4">
          <div className="tw:flex tw:items-center tw:gap-6 tw:upto-480:flex-col tw:upto-480:items-start tw:upto-480:gap-4">
            <ProfileAvatar
              src={user.avatar}
              initials={getInitials(user.name)}
              size={112}
            />

            <div className="tw:flex tw:flex-col tw:gap-1.5 tw:min-w-0">
              <span className="tw:text-[0.68rem] tw:font-semibold tw:tracking-[0.18em] tw:uppercase tw:text-gold-300">
                Nam Mô A Di Đà Phật
              </span>
              <div className="tw:flex tw:items-baseline tw:gap-3 tw:flex-wrap">
                <h2
                  className={cx(
                    "tw:m-0 tw:font-[family-name:var(--font-display),Georgia,serif] tw:text-[length:clamp(1.7rem,3.4vw,2.3rem)] tw:font-semibold tw:leading-[1.2]",
                    cream,
                  )}
                >
                  {user.dharmaName ? `Đạo hữu ${user.dharmaName}` : user.name}
                </h2>
                {user.dharmaNameHan && (
                  // Pháp danh chữ Hán, chỉ để trang trí
                  <span
                    lang="zh-Hant"
                    className="tw:font-hanzi tw:text-[1.25rem] tw:font-semibold tw:text-gold-300"
                  >
                    {user.dharmaNameHan}
                  </span>
                )}
              </div>
              <p className={cx("tw:m-0 tw:text-[0.92rem]", creamSoft)}>
                {user.dharmaName && <>{user.name} · </>}
                {practiceTitle(user.metrics.completedSutrasCount)}
              </p>
              <p
                className={cx(
                  "tw:m-0 tw:text-[0.86rem] tw:leading-[1.6] tw:tabular-nums",
                  creamSoft,
                )}
              >
                Đồng hành{" "}
                <strong
                  className={cx("tw:font-semibold tw:whitespace-nowrap", cream)}
                >
                  {user.companionDays} ngày
                </strong>
                {" · "}tinh tấn{" "}
                <strong
                  className={cx("tw:font-semibold tw:whitespace-nowrap", cream)}
                >
                  {user.streak.current} ngày
                </strong>{" "}
                liền
              </p>
            </div>
          </div>

          {user.favoriteVerse && (
            <figure className="tw:m-0 tw:flex tw:flex-col tw:gap-1 tw:pl-4 tw:[border-left:2px_solid_var(--gold-500)]">
              <blockquote
                className={cx(
                  "tw:m-0 tw:p-0 tw:[border:0] tw:font-[family-name:var(--font-book),Georgia,serif] tw:text-[1.12rem] tw:italic tw:leading-[1.6]",
                  cream,
                )}
              >
                “{user.favoriteVerse}”
              </blockquote>
              {user.favoriteVerseSource && (
                <figcaption className="tw:text-[0.68rem] tw:font-semibold tw:tracking-[0.18em] tw:uppercase tw:text-gold-300">
                  {user.favoriteVerseSource}
                </figcaption>
              )}
            </figure>
          )}

          {continueSutra && (
            <div>
              <Link
                href={`/chep-kinh/${continueSutra.slug}`}
                className="ck-btn-gold tw:no-underline tw:max-w-full"
              >
                <span className="tw:truncate">
                  Chép tiếp: {shortTitle(continueSutra.title)}
                </span>
                <IconArrowRight
                  size={18}
                  stroke={2}
                  className="ck-btn-arrow"
                  aria-hidden
                />
              </Link>
            </div>
          )}
        </div>
      </div>

      {preset && (
        <span className="tw:absolute tw:right-6 tw:bottom-5 tw:text-[0.7rem] tw:text-[rgba(255,244,214,0.85)] tw:[text-shadow:0_1px_2px_rgba(40,25,0,0.6)] tw:upto-768:hidden">
          {preset.caption}
        </span>
      )}
    </section>
  );
}
