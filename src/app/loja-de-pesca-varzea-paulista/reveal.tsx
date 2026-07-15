"use client";

import {
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type RevealProps = {
  as?: "div" | "section";
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function Reveal({
  as,
  children,
  className = "",
  ...props
}: RevealProps) {
  const Component = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const setNode = useCallback((node: HTMLElement | null) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  if (Component === "section") {
    return (
      <section
        ref={setNode}
        className={`reveal ${isVisible ? "reveal-visible" : ""} ${className}`}
        {...props}
      >
        {children}
      </section>
    );
  }

  return (
    <div
      ref={setNode}
      className={`reveal ${isVisible ? "reveal-visible" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
