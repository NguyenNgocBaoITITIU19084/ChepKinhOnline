import { useSyncExternalStore } from "react";

// Server luôn trả false (giao diện mobile trước), client cập nhật ngay sau khi hydrate
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
