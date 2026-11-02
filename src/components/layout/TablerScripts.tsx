"use client";

import { useEffect } from "react";

// Tabler JS (dropdown, modal, tooltip...) cần `document`, nên chỉ nạp phía client
export function TablerScripts() {
  useEffect(() => {
    import("@tabler/core/dist/js/tabler.esm.min.js");
  }, []);

  return null;
}
