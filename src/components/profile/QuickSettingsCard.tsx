"use client";

import { useState } from "react";
import { IconBell, IconVolume, IconTypography, IconCheck } from "@tabler/icons-react";
import { SingingBowlIcon } from "@/components/icons/BuddhistIcons";

export function QuickSettingsCard() {
  const [bellEnabled, setBellEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [fontSize, setFontSize] = useState<"standard" | "large">("standard");
  const [savedNotice, setSavedNotice] = useState(false);

  const triggerNotice = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <section
      aria-labelledby="quick-settings-heading"
      className="ck-glass tw:rounded-2xl tw:p-5 tw:bg-[rgba(255,253,246,0.95)] tw:border tw:border-[rgba(214,164,64,0.3)] tw:shadow-[0_4px_20px_rgba(107,74,18,0.05)]"
    >
      <div className="tw:flex tw:items-center tw:justify-between tw:mb-4">
        <div className="tw:flex tw:items-center tw:gap-2">
          <span className="tw:text-gold-600">
            <SingingBowlIcon size={18} strokeWidth={1.6} />
          </span>
          <h3
            id="quick-settings-heading"
            className="tw:text-sm tw:font-bold tw:uppercase tw:tracking-wider tw:text-brown-900"
          >
            Cài Đặt Chép Kinh
          </h3>
        </div>
        {savedNotice && (
          <span className="tw:inline-flex tw:items-center tw:gap-1 tw:text-[0.75rem] tw:text-emerald-700 tw:bg-emerald-50 tw:px-2 tw:py-0.5 tw:rounded-full tw:animate-pulse">
            <IconCheck size={12} stroke={2.5} /> Đã lưu
          </span>
        )}
      </div>

      <div className="tw:space-y-3.5">
        {/* Toggle 1: Chuông chánh niệm */}
        <div className="tw:flex tw:items-center tw:justify-between tw:gap-3">
          <div className="tw:flex tw:items-center tw:gap-2.5">
            <span className="tw:text-brown-600">
              <IconBell size={16} stroke={1.7} />
            </span>
            <div>
              <p className="tw:text-xs tw:font-medium tw:text-brown-900">Chuông chánh niệm</p>
              <p className="tw:text-[0.72rem] tw:text-brown-500">Ngân chuông khi hoàn thành đoạn</p>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={bellEnabled}
            onClick={() => {
              setBellEnabled(!bellEnabled);
              triggerNotice();
            }}
            className={`tw:relative tw:inline-flex tw:h-6 tw:w-11 tw:shrink-0 tw:cursor-pointer tw:rounded-full tw:border-2 tw:border-transparent tw:transition-colors tw:duration-200 tw:ease-in-out tw:focus:outline-none ${
              bellEnabled ? "tw:bg-gold-500" : "tw:bg-stone-300"
            }`}
          >
            <span
              className={`tw:pointer-events-none tw:inline-block tw:size-5 tw:transform tw:rounded-full tw:bg-white tw:shadow tw:ring-0 tw:transition tw:duration-200 tw:ease-in-out ${
                bellEnabled ? "tw:translate-x-5" : "tw:translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Toggle 2: Tiếng gõ mõ / lật trang */}
        <div className="tw:flex tw:items-center tw:justify-between tw:gap-3">
          <div className="tw:flex tw:items-center tw:gap-2.5">
            <span className="tw:text-brown-600">
              <IconVolume size={16} stroke={1.7} />
            </span>
            <div>
              <p className="tw:text-xs tw:font-medium tw:text-brown-900">Âm thanh lật trang</p>
              <p className="tw:text-[0.72rem] tw:text-brown-500">Hiệu ứng lật trang xuyến chỉ</p>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={soundEnabled}
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              triggerNotice();
            }}
            className={`tw:relative tw:inline-flex tw:h-6 tw:w-11 tw:shrink-0 tw:cursor-pointer tw:rounded-full tw:border-2 tw:border-transparent tw:transition-colors tw:duration-200 tw:ease-in-out tw:focus:outline-none ${
              soundEnabled ? "tw:bg-gold-500" : "tw:bg-stone-300"
            }`}
          >
            <span
              className={`tw:pointer-events-none tw:inline-block tw:size-5 tw:transform tw:rounded-full tw:bg-white tw:shadow tw:ring-0 tw:transition tw:duration-200 tw:ease-in-out ${
                soundEnabled ? "tw:translate-x-5" : "tw:translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Option 3: Cỡ chữ mặc định */}
        <div className="tw:pt-2 tw:border-t tw:border-amber-200/50">
          <div className="tw:flex tw:items-center tw:justify-between tw:mb-2">
            <span className="tw:inline-flex tw:items-center tw:gap-1.5 tw:text-xs tw:font-medium tw:text-brown-900">
              <IconTypography size={15} stroke={1.7} /> Cỡ chữ trang kinh:
            </span>
          </div>
          <div className="tw:grid tw:grid-cols-2 tw:gap-2">
            <button
              type="button"
              onClick={() => {
                setFontSize("standard");
                triggerNotice();
              }}
              className={`tw:py-1.5 tw:px-3 tw:rounded-lg tw:text-xs tw:font-medium tw:transition-all tw:cursor-pointer ${
                fontSize === "standard"
                  ? "tw:bg-gold-500 tw:text-brown-950 tw:shadow-sm"
                  : "tw:bg-amber-100/60 tw:text-brown-800 tw:hover:bg-amber-100"
              }`}
            >
              Tiêu chuẩn (18px)
            </button>
            <button
              type="button"
              onClick={() => {
                setFontSize("large");
                triggerNotice();
              }}
              className={`tw:py-1.5 tw:px-3 tw:rounded-lg tw:text-xs tw:font-medium tw:transition-all tw:cursor-pointer ${
                fontSize === "large"
                  ? "tw:bg-gold-500 tw:text-brown-950 tw:shadow-sm"
                  : "tw:bg-amber-100/60 tw:text-brown-800 tw:hover:bg-amber-100"
              }`}
            >
              Lớn & Dễ đọc (22px)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
