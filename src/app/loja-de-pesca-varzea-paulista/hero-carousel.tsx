"use client";

import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";

type HeroSlide = {
  title: string;
  image: string;
  alt: string;
  accent: "lime" | "water" | "fish";
};

const slides: HeroSlide[] = [
  {
    title: "Massas e iscas",
    image: "/images/banners/massas-e-iscas.png",
    alt: "Banner de massas e iscas para pesca",
    accent: "lime",
  },
  {
    title: "Suporte para robôzinho",
    image: "/images/banners/suporte-robozinho-5-ou-6-varas.png",
    alt: "Banner de suporte para robôzinho para cinco ou seis varas",
    accent: "water",
  },
  {
    title: "Suporte robozão",
    image: "/images/banners/suporte-robozao.png",
    alt: "Banner de suporte robozão para varas de pesca",
    accent: "fish",
  },
];

const accentClasses = {
  lime: {
    glow: "bg-lime/12",
    button: "bg-lime text-charcoal hover:bg-[#c8ff28]",
    dot: "bg-lime",
  },
  water: {
    glow: "bg-water/12",
    button: "bg-water text-white hover:bg-[#17b5f2]",
    dot: "bg-water",
  },
  fish: {
    button: "bg-fish text-white hover:bg-[#ff7441]",
    dot: "bg-fish",
  },
};

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pointerDrag = useRef({
    pointerId: -1,
    startX: 0,
    didMove: false,
  });
  const slide = slides[active];
  const accent = accentClasses[slide.accent];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  function goTo(index: number) {
    setActive((index + slides.length) % slides.length);
  }

  function goPrevious() {
    goTo(active - 1);
  }

  function goNext() {
    goTo(active + 1);
  }

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    pointerDrag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      didMove: false,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const drag = pointerDrag.current;

    if (drag.pointerId !== event.pointerId) {
      return;
    }

    if (Math.abs(event.clientX - drag.startX) > 6) {
      drag.didMove = true;
      event.preventDefault();
    }
  }

  function handlePointerEnd(event: PointerEvent<HTMLElement>) {
    const drag = pointerDrag.current;

    if (drag.pointerId !== event.pointerId) {
      return;
    }

    const distance = event.clientX - drag.startX;
    pointerDrag.current.pointerId = -1;

    if (drag.didMove && Math.abs(distance) > 45) {
      if (distance > 0) {
        goPrevious();
      } else {
        goNext();
      }
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <section
      aria-label="Destaques Pacu Pesca"
      aria-roledescription="carousel"
      className="relative isolate touch-pan-y overflow-hidden bg-charcoal pt-20 md:pt-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_42%,rgba(0,159,227,0.22),transparent_26rem),radial-gradient(circle_at_92%_8%,rgba(169,240,0,0.1),transparent_18rem),linear-gradient(135deg,#050607_0%,#101918_54%,#050607_100%)]" />
      <div className="surface-line absolute inset-0 -z-20 opacity-40 [mask-image:linear-gradient(90deg,transparent,black_28%,black_78%,transparent)]" />
      <div className="absolute -right-44 top-8 -z-10 h-[34rem] w-[34rem] rounded-full border border-white/8 bg-white/[0.02] shadow-[0_0_120px_rgba(0,159,227,0.12)]" />
      <div className="absolute -right-20 top-32 -z-10 h-[25rem] w-[25rem] rounded-full border border-white/8" />

      <div className="relative aspect-[1697/927] w-full">
        {slides.map((item, index) => (
          <div
            key={item.title}
            aria-hidden={index !== active}
            className={`absolute inset-0 transition duration-700 ease-out ${
              index === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,6,7,0.62),transparent_32%)]" />
          </div>
        ))}

        <div className="section-shell pointer-events-none absolute inset-x-0 bottom-8 z-10 flex items-end md:bottom-12">
          <div className="pointer-events-auto flex w-full flex-row justify-center gap-2 md:w-auto md:justify-start">
            <a
              href="#produtos"
              className={`focus-ring inline-flex min-h-10 items-center justify-center gap-1.5 rounded-card px-3 py-2 text-[11px] font-extrabold uppercase shadow-[0_18px_44px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-0.5 md:min-h-12 md:gap-2 md:px-5 md:py-3 md:text-sm ${accent.button}`}
            >
              Comprar agora
              <ArrowRight
                aria-hidden="true"
                size={18}
                strokeWidth={2.5}
                className="h-4 w-4 md:h-[18px] md:w-[18px]"
              />
            </a>
            <a
              href="https://pacupesca.com/produtos/"
              className="focus-ring inline-flex min-h-10 items-center justify-center gap-1.5 rounded-card border border-white/15 bg-white/8 px-3 py-2 text-[11px] font-extrabold uppercase text-paper transition duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/12 md:min-h-12 md:gap-2 md:px-5 md:py-3 md:text-sm"
            >
              Ver produtos
            </a>
          </div>
        </div>

        <div className="section-shell pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between">
          <button
            type="button"
            aria-label="Destaque anterior"
            onClick={goPrevious}
            className="focus-ring pointer-events-auto hidden h-10 w-10 place-items-center rounded-full border border-white/15 bg-charcoal/60 text-white transition hover:border-white/35 hover:bg-white/10 md:grid"
          >
            <ChevronLeft aria-hidden="true" size={19} />
          </button>
          <button
            type="button"
            aria-label="Próximo destaque"
            onClick={goNext}
            className="focus-ring pointer-events-auto hidden h-10 w-10 place-items-center rounded-full border border-white/15 bg-charcoal/60 text-white transition hover:border-white/35 hover:bg-white/10 md:grid"
          >
            <ChevronRight aria-hidden="true" size={19} />
          </button>
        </div>

        <div className="section-shell absolute inset-x-0 bottom-6 z-20 flex items-center justify-center">
          <div className="flex items-center gap-2" role="tablist" aria-label="Selecionar destaque">
            {slides.map((item, index) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-label={`Ir para destaque ${index + 1}: ${item.title}`}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  goTo(index);
                }}
                className={`focus-ring h-2 rounded-full transition-all duration-300 ${
                  active === index ? `w-2 md:w-10 ${accent.dot}` : "w-2 bg-white/35 hover:bg-white/65"
                }`}
              />
            ))}
            <span className="ml-2 hidden text-xs font-black uppercase tracking-wider text-white/55 md:inline">
              0{active + 1} / 0{slides.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
