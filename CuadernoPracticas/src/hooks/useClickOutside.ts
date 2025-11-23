/**
 * Custom hook to detect clicks outside an element
 * Reusable utility following DRY principle
 */

import { useEffect, RefObject } from "react";

export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return;

    function onDocMouseDown(e: MouseEvent): void {
      const target = e.target as Node | null;
      if (ref.current && target && !ref.current.contains(target)) {
        handler();
      }
    }

    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [ref, handler, enabled]);
}
