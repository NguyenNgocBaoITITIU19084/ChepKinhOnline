import Image from "next/image";
import { fontDisplay } from "@/components/article/styles";
import { cx } from "@/components/article/utils";

interface ProfileAvatarProps {
  /** Ảnh đại diện; rỗng thì hiện chữ cái đầu tên. */
  src: string;
  initials: string;
  /** Đường kính, px. */
  size: number;
  className?: string;
}

/**
 * Ảnh đại diện tròn: vành gradient vàng như nút vàng (gold-button-top → gold-500 → gold-700),
 * một vòng giấy kem mảnh ngăn vành với ảnh. Không có ảnh thì hiện chữ cái đầu tên trên giấy.
 */
export function ProfileAvatar({ src, initials, size, className }: ProfileAvatarProps) {
  const ring = Math.max(2, Math.round(size * 0.04));
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, padding: ring }}
      className={cx(
        "tw:inline-block tw:shrink-0 tw:rounded-[50%] tw:bg-[linear-gradient(160deg,#fff0c2,var(--gold-500)_55%,var(--gold-700))]",
        "tw:shadow-[0_8px_20px_-8px_rgba(90,60,10,0.55)]",
        className,
      )}
    >
      <span
        style={{ padding: Math.max(1, Math.round(ring / 2)) }}
        className="tw:block tw:size-full tw:rounded-[50%] tw:bg-[#fffdf8]"
      >
        <span className="tw:relative tw:grid tw:place-items-center tw:size-full tw:overflow-hidden tw:rounded-[50%] tw:bg-[radial-gradient(circle_at_50%_35%,#fffdf6_0%,#fbf1d8_100%)]">
          {src ? (
            <Image src={src} alt="" fill sizes={`${size}px`} className="tw:object-cover" unoptimized={src.startsWith("blob:")} />
          ) : (
            <span
              className={cx("tw:font-semibold tw:leading-none tw:text-brown-900", fontDisplay)}
              style={{ fontSize: Math.round(size * 0.32) }}
            >
              {initials}
            </span>
          )}
        </span>
      </span>
    </span>
  );
}
