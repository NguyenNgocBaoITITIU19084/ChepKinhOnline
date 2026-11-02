import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Tiến độ chép của một bộ kinh
type SutraProgress = {
  chapter: number; // chương đang chép
  // Phần đã gõ của từng chương: trang được chia lại theo cỡ chữ nên không lưu theo trang
  typed: string[];
};

type CopySessionState = SutraProgress & {
  slug: string | null; // bộ kinh đang mở
  saved: Record<string, SutraProgress>; // tiến độ mọi bộ kinh, lưu vào trình duyệt
  start: (slug: string, chapterCount: number) => void;
  setChapter: (chapter: number) => void;
  setTyped: (text: string) => void;
  reset: (slug: string, chapterCount: number) => void;
};

const empty = (chapterCount: number): SutraProgress => ({ chapter: 0, typed: Array(chapterCount).fill("") });

export const useCopySession = create<CopySessionState>()(
  persist(
    (set) => ({
      slug: null,
      chapter: 0,
      typed: [],
      saved: {},
      // Mở một bộ kinh: lấy lại tiến độ đã lưu (nếu số chương vẫn khớp), không thì bắt đầu mới
      start: (slug, chapterCount) =>
        set((state) => {
          if (state.slug === slug && state.typed.length === chapterCount) return state;
          const saved = state.saved[slug];
          const progress = saved && saved.typed.length === chapterCount ? saved : empty(chapterCount);
          return { slug, ...progress };
        }),
      setChapter: (chapter) =>
        set((state) => ({
          chapter,
          saved: state.slug ? { ...state.saved, [state.slug]: { chapter, typed: state.typed } } : state.saved,
        })),
      setTyped: (text) =>
        set((state) => {
          const typed = [...state.typed];
          typed[state.chapter] = text;
          return {
            typed,
            saved: state.slug ? { ...state.saved, [state.slug]: { chapter: state.chapter, typed } } : state.saved,
          };
        }),
      // Chép lại cả bộ kinh từ đầu
      reset: (slug, chapterCount) =>
        set((state) => ({ slug, ...empty(chapterCount), saved: { ...state.saved, [slug]: empty(chapterCount) } })),
    }),
    {
      name: "chep-kinh:copy-session",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ saved: state.saved }),
      // Server không có localStorage: nạp lại sau khi trang đã hydrate để HTML hai bên khớp nhau
      skipHydration: true,
    },
  ),
);
