import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // More robust scroll reset: run immediately, on next frame, and after small delays
    const resetScrollOnce = () => {
      try { window.scrollTo({ top: 0, left: 0, behavior: "auto" }); } catch {}
      try {
        const doc = document.scrollingElement || document.documentElement;
        if (doc) doc.scrollTop = 0;
      } catch {}
      try { document.body.scrollTop = 0; } catch {}

      const all = Array.from(document.querySelectorAll<HTMLElement>("*") || []);
      const scrollables = all.filter((el) => {
        try {
          const cs = getComputedStyle(el);
          const overflowY = (cs.overflowY || cs.overflow || "").toLowerCase();
          const canScroll = (overflowY === "auto" || overflowY === "scroll");
          return canScroll && el.scrollHeight > el.clientHeight;
        } catch { return false; }
      });

      scrollables.forEach((el) => { try { el.scrollTop = 0; } catch {} });
    };

    const timers: Array<number> = [];

    // run multiple times to handle async renders / mounted components
    resetScrollOnce();
    // next animation frame
    const raf = requestAnimationFrame(() => resetScrollOnce());
    // short delays to catch later DOM updates
    timers.push(window.setTimeout(() => resetScrollOnce(), 50));
    timers.push(window.setTimeout(() => resetScrollOnce(), 250));

    return () => {
      try { cancelAnimationFrame(raf); } catch {}
      timers.forEach((t) => clearTimeout(t));
    };
  }, [pathname]);

  return null;
}
