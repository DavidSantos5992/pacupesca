"use client";

import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Fish,
  PawPrint,
} from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";

type HeroSlide = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  secondaryImage: string;
  secondaryAlt: string;
  tertiaryImage: string;
  tertiaryAlt: string;
  accent: "lime" | "water" | "fish";
};

const slides: HeroSlide[] = [
  {
    eyebrow: "Equipamentos para começar bem",
    title: "A tralha certa muda toda pescaria",
    description:
      "Encontre varas, linhas e acessórios selecionados para montar um conjunto que acompanha o seu ritmo.",
    image: "/images/products/vara-telescopica-carbono.webp",
    alt: "Vara telescópica de carbono",
    secondaryImage: "/images/products/linha-marine-vexter.webp",
    secondaryAlt: "Linha Marine Vexter Ultimate",
    tertiaryImage: "/images/products/suporte-para-varas.webp",
    tertiaryAlt: "Suporte para varas",
    accent: "lime",
  },
  {
    eyebrow: "Iscas e montagens",
    title: "Mais estratégia em cada arremesso",
    description:
      "Iscas, anzóis e itens de apoio para você testar novas montagens e aproveitar melhor o seu dia na água.",
    image: "/images/products/isca-artificial-lori.webp",
    alt: "Isca artificial Lori",
    secondaryImage: "/images/products/anzol-kawasemi.webp",
    secondaryAlt: "Anzol Kawasemi",
    tertiaryImage: "/images/products/rede-sambura-pesca.webp",
    tertiaryAlt: "Rede samburá de pesca",
    accent: "water",
  },
  {
    eyebrow: "Pesqueiro, lazer e camping",
    title: "Prepare o próximo momento de pesca",
    description:
      "Do suporte à ração, os detalhes que deixam sua experiência mais organizada, confortável e completa.",
    image: "/images/products/suporte-para-varas.webp",
    alt: "Suporte para varas de pesca",
    secondaryImage: "/images/products/racao-bio-truta.webp",
    secondaryAlt: "Ração Bio Truta Premium",
    tertiaryImage: "/images/products/vara-pesca-praia-costao-gt.webp",
    tertiaryAlt: "Vara para pesca de praia e costão",
    accent: "fish",
  },
];

const accentClasses = {
  lime: {
    text: "text-lime",
    border: "border-lime/35",
    glow: "bg-lime/12",
    button: "bg-lime text-charcoal hover:bg-[#c8ff28]",
    dot: "bg-lime",
  },
  water: {
    text: "text-water",
    border: "border-water/35",
    glow: "bg-water/12",
    button: "bg-water text-white hover:bg-[#17b5f2]",
    dot: "bg-water",
  },
  fish: {
    text: "text-fish",
    border: "border-fish/35",
    glow: "bg-fish/12",
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
      className="relative isolate min-h-[640px] touch-pan-y overflow-hidden bg-charcoal pt-48 md:min-h-[680px] md:pt-28"
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

      {slides.map((item, index) => (
        <div
          key={item.title}
          aria-hidden={index !== active}
          className={`absolute inset-0 -z-10 transition duration-700 ease-out ${
            index === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.96)_0%,rgba(5,6,7,0.78)_36%,rgba(5,6,7,0.2)_68%,rgba(5,6,7,0.42)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,6,7,0.82),transparent_38%)]" />
        </div>
      ))}

      <div className="section-shell relative flex min-h-[492px] items-center py-12 md:min-h-[552px] md:py-16">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-4">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <p className={`inline-flex items-center gap-2 rounded-full border ${accent.border} ${accent.glow} px-3 py-2 text-xs font-black uppercase tracking-[0.14em] ${accent.text}`}>
                <Fish aria-hidden="true" size={15} />
                {slide.eyebrow}
              </p>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                Pacu Pesca
              </span>
            </div>
            <h1 className="max-w-xl font-display text-5xl font-bold uppercase leading-[0.94] text-paper md:text-7xl lg:text-[5.4rem]">
              {slide.title}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-smoke md:text-lg md:leading-8">
              {slide.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#produtos"
                className={`focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-card px-5 py-3 text-sm font-extrabold uppercase shadow-[0_18px_44px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-0.5 ${accent.button}`}
              >
                Comprar agora
                <ArrowRight aria-hidden="true" size={18} strokeWidth={2.5} />
              </a>
              <a
                href="https://pacupesca.com/produtos/"
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-card border border-white/15 bg-white/8 px-5 py-3 text-sm font-extrabold uppercase text-paper transition duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/12"
              >
                Ver produtos
              </a>
            </div>
            <p className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-white/65">
              <PawPrint aria-hidden="true" size={15} className="text-lime" />
              Também trabalhamos com linha pet
            </p>
          </div>

          <div className="relative mx-auto h-[320px] w-full max-w-[620px] sm:h-[390px] lg:h-[500px]">
            <div className={`absolute left-[12%] top-[11%] h-56 w-56 rounded-full blur-3xl sm:h-72 sm:w-72 ${accent.glow}`} />
            <div className="absolute left-[7%] top-[12%] h-[76%] w-[64%] rotate-[-5deg] overflow-hidden rounded-[28px] border border-white/20 bg-white p-3 shadow-[0_28px_70px_rgba(0,0,0,0.38)] sm:p-5">
              <Image
                key={`${active}-main`}
                src={slide.image}
                alt={slide.alt}
                fill
                priority={active === 0}
                sizes="(min-width: 1024px) 36vw, (min-width: 640px) 60vw, 88vw"
                className="object-contain p-3 transition duration-700 sm:p-5"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-charcoal/85 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white sm:bottom-5 sm:left-5">
                Em destaque
              </span>
            </div>
            <div className="absolute right-[3%] top-[3%] h-[39%] w-[34%] rotate-[7deg] overflow-hidden rounded-2xl border border-white/20 bg-white p-2 shadow-[0_18px_42px_rgba(0,0,0,0.3)] sm:p-3">
              <Image
                key={`${active}-secondary`}
                src={slide.secondaryImage}
                alt={slide.secondaryAlt}
                fill
                sizes="(min-width: 1024px) 18vw, 34vw"
                className="object-contain p-2 sm:p-3"
              />
            </div>
            <div className="absolute bottom-[4%] right-[10%] h-[36%] w-[31%] rotate-[-6deg] overflow-hidden rounded-2xl border border-white/20 bg-white p-2 shadow-[0_18px_42px_rgba(0,0,0,0.3)] sm:p-3">
              <Image
                key={`${active}-tertiary`}
                src={slide.tertiaryImage}
                alt={slide.tertiaryAlt}
                fill
                sizes="(min-width: 1024px) 17vw, 32vw"
                className="object-contain p-2 sm:p-3"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="section-shell pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between">
        <button
          type="button"
          aria-label="Destaque anterior"
          onClick={goPrevious}
          className="focus-ring pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-charcoal/60 text-white transition hover:border-white/35 hover:bg-white/10"
        >
          <ChevronLeft aria-hidden="true" size={19} />
        </button>
        <button
          type="button"
          aria-label="Próximo destaque"
          onClick={goNext}
          className="focus-ring pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-charcoal/60 text-white transition hover:border-white/35 hover:bg-white/10"
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
                active === index ? `w-10 ${accent.dot}` : "w-2 bg-white/35 hover:bg-white/65"
              }`}
            />
          ))}
          <span className="ml-2 text-xs font-black uppercase tracking-wider text-white/55">
            0{active + 1} / 0{slides.length}
          </span>
        </div>
      </div>
    </section>
  );
}
