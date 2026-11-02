import { create } from "zustand";

type CopySettingsState = {
  fontSize: number;
  showGuide: boolean; // hiện chữ mờ của bản kinh phía dưới khi chép
  setFontSize: (size: number) => void;
  toggleGuide: () => void;
};

export const MIN_FONT_SIZE = 16;
export const MAX_FONT_SIZE = 40;

export const useCopySettings = create<CopySettingsState>()((set) => ({
  fontSize: 22,
  showGuide: true,
  setFontSize: (size) =>
    set({ fontSize: Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, size)) }),
  toggleGuide: () => set((state) => ({ showGuide: !state.showGuide })),
}));
