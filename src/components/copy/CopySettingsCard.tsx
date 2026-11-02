"use client";

import { useEffect } from "react";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useCopySettings } from "@/stores/copy-settings";

export function CopySettingsCard() {
  const { fontSize, showGuide, setFontSize, toggleGuide } = useCopySettings();

  // Cài đặt được lưu trong trình duyệt, nạp lại sau khi hydrate
  useEffect(() => {
    useCopySettings.persist.rehydrate();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Cài đặt chép kinh</h3>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Cỡ chữ: {fontSize}px</label>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-icon"
              aria-label="Giảm cỡ chữ"
              onClick={() => setFontSize(fontSize - 2)}
            >
              <IconMinus size={18} />
            </button>
            <button
              type="button"
              className="btn btn-icon"
              aria-label="Tăng cỡ chữ"
              onClick={() => setFontSize(fontSize + 2)}
            >
              <IconPlus size={18} />
            </button>
          </div>
        </div>
        <label className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={showGuide}
            onChange={toggleGuide}
          />
          <span className="form-check-label">Hiện chữ mờ hướng dẫn</span>
        </label>
        <p
          className="mt-3 mb-0 tw:rounded-lg tw:bg-amber-50 tw:p-3 tw:leading-relaxed tw:text-amber-900"
          style={{ fontSize }}
        >
          Nam Mô Bổn Sư Thích Ca Mâu Ni Phật
        </p>
      </div>
    </div>
  );
}
