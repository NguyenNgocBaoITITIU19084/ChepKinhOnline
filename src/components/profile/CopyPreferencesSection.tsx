"use client";

import { useEffect, type ReactNode } from "react";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { focusable, pill } from "@/components/article/styles";
import { cx } from "@/components/article/utils";
import { MAX_FONT_SIZE, MIN_FONT_SIZE, useCopySettings, type CopyLayout } from "@/stores/copy-settings";
import { ProfilePanel } from "./ProfilePanel";
import { fieldHint, rowDivider } from "./styles";

/** Nút biểu tượng vuông 36px, góc radius-control (ToolRow). */
const iconButton = cx(
  "ck-font-inherit tw:inline-grid tw:place-items-center tw:size-9 tw:p-0 tw:text-brown-800 tw:bg-[rgba(255,248,230,0.7)]",
  "tw:border tw:border-[rgba(214,164,64,0.45)] tw:rounded-[10px] tw:cursor-pointer tw:transition-colors tw:motion-reduce:transition-none",
  "tw:hover:text-brown-900 tw:hover:bg-[rgba(232,199,122,0.3)]",
  focusable,
);

const LAYOUTS: { value: CopyLayout; label: string }[] = [
  { value: "book", label: "Sách mở" },
  { value: "sheet", label: "Kiểu tờ giấy" },
];

function SettingRow({ title, hint, children, first }: { title: string; hint: string; children: ReactNode; first?: boolean }) {
  return (
    <div
      className={cx(
        "tw:flex tw:items-center tw:justify-between tw:gap-4 tw:py-4 tw:upto-560:flex-col tw:upto-560:items-start",
        !first && rowDivider,
      )}
    >
      <div className="tw:flex tw:flex-col tw:gap-0.5 tw:min-w-0">
        <span className="tw:text-[0.92rem] tw:font-medium tw:text-brown-900">{title}</span>
        <p className={fieldHint}>{hint}</p>
      </div>
      <div className="tw:shrink-0">{children}</div>
    </div>
  );
}

/**
 * Mục Cài đặt chép kinh: dùng chung store với trang chép kinh (lưu trong trình duyệt),
 * nên đổi ở đây thì lần chép sau áp dụng ngay.
 */
export function CopyPreferencesSection() {
  const { fontSize, showGuide, layout, setFontSize, toggleGuide, setLayout } = useCopySettings();

  useEffect(() => {
    useCopySettings.persist.rehydrate();
  }, []);

  const percent = Math.round((fontSize / 22) * 100);

  return (
    <ProfilePanel title="Cài đặt chép kinh" description="Áp dụng trên thiết bị này.">
      <div className="tw:flex tw:flex-col">
        <SettingRow first title="Cỡ chữ kinh" hint={`Từ ${MIN_FONT_SIZE} đến ${MAX_FONT_SIZE}, mỗi bước 2.`}>
          <div className="tw:flex tw:items-center tw:gap-2">
            {/* Nút không dùng được thì ẩn hẳn; giữ chỗ để hàng không xô lệch */}
            <span className="tw:size-9">
              {fontSize > MIN_FONT_SIZE && (
                <button type="button" className={iconButton} aria-label="Giảm cỡ chữ" onClick={() => setFontSize(fontSize - 2)}>
                  <IconMinus size={18} stroke={2} aria-hidden />
                </button>
              )}
            </span>
            <span className="tw:min-w-[4.5rem] tw:text-center tw:text-[0.86rem] tw:font-medium tw:text-brown-900 tw:tabular-nums" aria-live="polite">
              {fontSize}px · {percent}%
            </span>
            <span className="tw:size-9">
              {fontSize < MAX_FONT_SIZE && (
                <button type="button" className={iconButton} aria-label="Tăng cỡ chữ" onClick={() => setFontSize(fontSize + 2)}>
                  <IconPlus size={18} stroke={2} aria-hidden />
                </button>
              )}
            </span>
          </div>
        </SettingRow>

        <SettingRow title="Chữ mờ hướng dẫn" hint="Hiện chữ kinh mờ để chép theo.">
          {/* Công tắc: rãnh track, bật thì gold-500 */}
          <button
            type="button"
            role="switch"
            aria-checked={showGuide}
            aria-label="Chữ mờ hướng dẫn"
            onClick={toggleGuide}
            className={cx(
              "tw:relative tw:inline-flex tw:items-center tw:w-11 tw:h-6 tw:p-0.5 tw:border-0 tw:rounded-[999px] tw:cursor-pointer",
              "tw:transition-colors tw:motion-reduce:transition-none",
              showGuide ? "tw:bg-gold-500" : "tw:bg-[rgba(168,116,26,0.22)]",
              focusable,
            )}
          >
            <span
              className={cx(
                "tw:block tw:size-5 tw:rounded-[50%] tw:bg-paper tw:shadow-[0_1px_3px_rgba(120,85,20,0.3)] tw:transition-transform tw:motion-reduce:transition-none",
                showGuide ? "tw:translate-x-5" : "tw:translate-x-0",
              )}
            />
          </button>
        </SettingRow>

        <SettingRow title="Kiểu trang" hint="Sách mở hai trang hoặc tờ giấy rời.">
          <div role="radiogroup" aria-label="Kiểu trang" className="tw:flex tw:flex-wrap tw:gap-2">
            {LAYOUTS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={layout === value}
                onClick={() => setLayout(value)}
                className={cx(pill(layout === value), focusable)}
              >
                {label}
              </button>
            ))}
          </div>
        </SettingRow>
      </div>

      {/* Xem trước cỡ chữ trên giấy, kiểu verse */}
      <div className="tw:px-6 tw:py-5 tw:rounded-[4px] tw:bg-[radial-gradient(ellipse_at_center,#fffcf3,#f8f1e0_70%,#efe4c8)] tw:shadow-[0_0_0_1px_rgba(190,160,100,0.22)]">
        <p
          className="tw:m-0 tw:font-[family-name:var(--font-book),Georgia,serif] tw:font-medium tw:leading-[1.95] tw:text-ink"
          style={{ fontSize }}
        >
          Nam Mô Bổn Sư Thích Ca Mâu Ni Phật{" "}
          {showGuide && <span className="tw:text-ink-ghost">· Quán Tự Tại Bồ Tát</span>}
        </p>
      </div>
    </ProfilePanel>
  );
}
