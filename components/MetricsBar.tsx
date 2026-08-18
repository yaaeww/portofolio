"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function MetricsBar() {
  return (
    <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50 px-4 py-8 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto grid max-w-2xl grid-cols-3 gap-6 text-center">
        <div>
          <span className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            <AnimatedNumber target={4} />
          </span>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Projects</p>
        </div>
        <div>
          <span className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            <AnimatedNumber target={32} />
          </span>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Certificates</p>
        </div>
        <div>
          <span className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            <AnimatedNumber target={6} suffix="+" />
          </span>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Months Internship</p>
        </div>
      </div>
    </section>
  );
}
