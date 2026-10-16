"use client";

import { useEffect, useRef, useState } from "react";

type Parsed = {
  prefix: string;
  number: number;
  suffix: string;
};

function parseValue(value: string): Parsed | null {
  const match = value.match(/^(\D*?)(\d[\d.,]*)(.*)$/);
  if (!match) return null;
  const raw = match[2].replace(/[.,]/g, "");
  const number = Number.parseInt(raw, 10);
  if (Number.isNaN(number)) return null;
  return { prefix: match[1] ?? "", number, suffix: match[3] ?? "" };
}

export function CountUp({
  value,
  className,
  duration = 1500,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(
    parsed ? `${parsed.prefix}0${parsed.suffix}` : value,
  );
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed || started.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(parsed.number * eased);
          setDisplay(
            `${parsed.prefix}${current.toLocaleString("en-US")}${parsed.suffix}`,
          );
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [parsed, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
