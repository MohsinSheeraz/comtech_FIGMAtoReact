"use client";

import { useEffect, useRef, useState } from "react";

const COUNTER_DURATION = 1600;
const NUMBER_PATTERN = /^([\d,]+(?:\.\d+)?)(.*)$/;

export function AnimatedNumber({ value }: { value: string }) {
  const match = NUMBER_PATTERN.exec(value);
  const numberText = match?.[1];
  const suffix = match?.[2] ?? "";
  const target = numberText ? Number(numberText.replace(/,/g, "")) : Number.NaN;
  const decimalPlaces = numberText?.split(".")[1]?.length ?? 0;
  const elementRef = useRef<HTMLElement>(null);
  const [count, setCount] = useState(Number.isFinite(target) ? target : 0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !Number.isFinite(target)) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setCount(0);

    let frame = 0;
    let startedAt: number | undefined;

    const animate = (time: number) => {
      if (startedAt === undefined) startedAt = time;
      const progress = Math.min((time - startedAt) / COUNTER_DURATION, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setCount(target * easedProgress);

      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    if (typeof IntersectionObserver === "undefined") {
      frame = requestAnimationFrame(animate);
    } else {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            frame = requestAnimationFrame(animate);
          }
        },
        { threshold: 0.3 },
      );
      observer.observe(element);

      return () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
      };
    }

    return () => cancelAnimationFrame(frame);
  }, [target]);

  const formattedCount = count.toLocaleString("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  return (
    <b ref={elementRef} aria-label={value}>
      {numberText ? `${formattedCount}${suffix}` : value}
    </b>
  );
}
