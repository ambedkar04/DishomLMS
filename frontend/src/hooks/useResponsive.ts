import { useEffect, useState } from "react";

// Returns true on desktop-sized viewports (md and up)
export default function useResponsive(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    if (typeof window.matchMedia === "function") {
      return window.matchMedia(`(min-width: ${breakpoint}px)`).matches;
    }
    return window.innerWidth >= breakpoint;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (typeof window.matchMedia === "function") {
      const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
      // Sync initial state on mount and when breakpoint changes
      setIsDesktop(mq.matches);

      const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);

      if (typeof mq.addEventListener === "function") {
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
      } else if (typeof mq.addListener === "function") {
        // Fallback for older browsers
        mq.addListener(onChange);
        return () => mq.removeListener(onChange);
      }

      // If no event API available, no-op cleanup
      return;
    } else {
      const onResize = () => setIsDesktop(window.innerWidth >= breakpoint);
      // Ensure state is synced on mount and when breakpoint changes
      onResize();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }
  }, [breakpoint]);

  return isDesktop;
}
