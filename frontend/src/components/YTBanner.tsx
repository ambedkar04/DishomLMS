import React, { useEffect, useRef } from "react";
import { Play } from "lucide-react";

type Channel = {
  name: string;
  subscribers: string;
  href?: string;
};

const channels: Channel[] = [
  { name: "Safal BCECE", subscribers: "1.35M Subscribers", href: "#" },
  { name: "Safal DCECE", subscribers: "980K Subscribers", href: "#" },
  { name: "Safal Botany", subscribers: "620K Subscribers", href: "#" },
  { name: "Safal Zoology", subscribers: "540K Subscribers", href: "#" },
];

const YTBanner: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches;
    if (!isMobile) return;
    const el = scrollerRef.current;
    if (!el) return;

    let rafId: number | null = null;
    let last = 0;
    const speed = 0.4; // px per ms

    const tick = (t: number) => {
      if (!last) last = t;
      const dt = t - last;
      last = t;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
        el.scrollTo({ left: 0 });
      } else {
        el.scrollLeft += dt * speed;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="w-full py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollerRef}
          className="grid grid-flow-col auto-cols-[80%] gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-2 md:grid-cols-4 sm:overflow-visible sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {channels.map((c) => (
            <a
              key={c.name}
              href={c.href || "#"}
              className="block rounded-[12px] bg-gradient-to-b from-amber-50 to-amber-100 shadow-sm ring-1 ring-black/5 p-4 sm:p-6 text-center hover:shadow-md transition-shadow snap-start"
            >
              <div className="mx-auto mb-3 sm:mb-4 h-12 w-12 rounded-[10px] bg-amber-200/70 flex items-center justify-center">
                <Play className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-base sm:text-lg font-semibold text-gray-900">{c.name}</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">{c.subscribers}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YTBanner;
