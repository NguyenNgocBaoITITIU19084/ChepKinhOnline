import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// book: sách mở (máy tính hai trang); sheet: từng tờ giấy rời, chép xong tờ thì sang tờ mới
export type CopyLayout = "book" | "sheet";

type CopySettingsState = {
  fontSize: number;
  showGuide: boolean; // hiện chữ mờ của bản kinh phía dưới khi chép
  layout: CopyLayout;
  setFontSize: (size: number) => void;
  toggleGuide: () => void;
  setLayout: (layout: CopyLayout) => void;
};

export const MIN_FONT_SIZE = 16;
export const MAX_FONT_SIZE = 40;

export const useCopySettings = create<CopySettingsState>()(
  persist(
    (set) => ({
      fontSize: 22,
      showGuide: true,
      layout: "book",
      setFontSize: (size) => set({ fontSize: Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, size)) }),
      toggleGuide: () => set((state) => ({ showGuide: !state.showGuide })),
      setLayout: (layout) => set({ layout }),
    }),
    {
      name: "chep-kinh:copy-settings",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ fontSize, showGuide, layout }) => ({ fontSize, showGuide, layout }),
      // Nạp lại sau khi hydrate (xem useCopySettings.persist.rehydrate ở các component dùng store)
      skipHydration: true,
    },
  ),
);
