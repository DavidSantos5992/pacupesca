"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MouseEvent, PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const finderItems = [
  {
    name: "Varas",
    image: "/images/products/vara-telescopica-carbono.webp",
    href: "/produtos/substituir-link-vara-telescopica-carbono",
  },
  {
    name: "Linhas",
    image: "/images/products/linha-marine-vexter.webp",
    href: "/produtos/substituir-link-linha-marine-vexter-ultimate",
  },
  {
    name: "Iscas",
    image: "/images/products/isca-artificial-lori.webp",
    href: "/produtos/substituir-link-isca-artificial-lori",
  },
  {
    name: "Anzóis",
    image: "/images/products/anzol-kawasemi.webp",
    href: "/produtos/substituir-link-anzol-kawasemi",
  },
  {
    name: "Suportes",
    image: "/images/products/suporte-para-varas.webp",
    href: "/produtos/substituir-link-suporte-para-varas",
  },
  {
    name: "Redes",
    image: "/images/products/rede-sambura-pesca.webp",
    href: "/produtos/substituir-link-rede-sambura-pesca",
  },
  {
    name: "Rações",
    image: "/images/products/racao-bio-truta.webp",
    href: "/produtos/substituir-link-racao-bio-truta-premium",
  },
  {
    name: "Praia e costão",
    image: "/images/products/vara-pesca-praia-costao-gt.webp",
    href: "/produtos/substituir-link-vara-pesca-praia-costao-gt",
  },
];

export function ProductFinderCarousel() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef({
    didDrag: false,
    isPointerDown: false,
    pointerId: -1,
    scrollLeft: 0,
    startX: 0,
  });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const node = scrollerRef.current;

    if (!node) {
      return;
    }

    const maxScrollLeft = node.scrollWidth - node.clientWidth;

    setCanScrollLeft(node.scrollLeft > 4);
    setCanScrollRight(node.scrollLeft < maxScrollLeft - 4);
  }, []);

  useEffect(() => {
    const node = scrollerRef.current;

    if (!node) {
      return;
    }

    node.scrollLeft = 0;
    updateScrollState();
    node.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      node.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  function scroll(direction: "left" | "right") {
    const node = scrollerRef.current;

    if (!node) {
      return;
    }

    node.scrollBy({
      left:
        direction === "left"
          ? -Math.max(260, node.clientWidth * 0.72)
          : Math.max(260, node.clientWidth * 0.72),
      behavior: "smooth",
    });
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    dragState.current = {
      didDrag: false,
      isPointerDown: true,
      pointerId: event.pointerId,
      scrollLeft: event.currentTarget.scrollLeft,
      startX: event.clientX,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const state = dragState.current;

    if (!state.isPointerDown || state.pointerId !== event.pointerId) {
      return;
    }

    const movement = event.clientX - state.startX;

    if (Math.abs(movement) > 5) {
      state.didDrag = true;
      event.preventDefault();
    }

    event.currentTarget.scrollLeft = state.scrollLeft - movement;
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (dragState.current.pointerId !== event.pointerId) {
      return;
    }

    dragState.current.isPointerDown = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handleItemClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!dragState.current.didDrag) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    dragState.current.didDrag = false;
  }

  return (
    <div className="relative rounded-card border border-white/10 bg-graphite/95 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.22)] md:p-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-graphite via-graphite/90 to-transparent md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-graphite via-graphite/90 to-transparent md:block" />

      <div className="relative">
        <button
          type="button"
          aria-label="Ver produtos anteriores"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="focus-ring absolute left-3 top-1/2 z-[60] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-charcoal/95 text-lime shadow-[0_12px_26px_rgba(0,0,0,0.34)] transition hover:bg-lime hover:text-charcoal disabled:pointer-events-none disabled:opacity-35"
        >
          <ChevronLeft aria-hidden="true" size={24} />
        </button>
        <div
          ref={scrollerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          className="scrollbar-hide flex cursor-grab select-none gap-3 overflow-x-auto scroll-smooth px-10 py-1 active:cursor-grabbing md:gap-4 md:px-12"
        >
          {finderItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              draggable={false}
              onClick={handleItemClick}
              className="focus-ring group flex min-w-[128px] flex-col items-center rounded-card border border-white/10 bg-white/[0.04] p-4 text-center text-paper transition duration-300 hover:-translate-y-1 hover:border-water/70 hover:bg-white/[0.08] sm:min-w-[146px] md:min-w-[154px]"
            >
              <div className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-full border border-water/20 bg-white transition duration-300 group-hover:border-water group-hover:shadow-[0_0_0_4px_rgba(0,159,227,0.16)]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-contain p-3 transition duration-300 group-hover:scale-105"
                />
              </div>
              <span className="mt-3 text-sm font-black uppercase leading-tight tracking-wide">
                {item.name}
              </span>
            </a>
          ))}
        </div>
        <button
          type="button"
          aria-label="Ver próximos produtos"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="focus-ring absolute right-3 top-1/2 z-[60] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-charcoal/95 text-lime shadow-[0_12px_26px_rgba(0,0,0,0.34)] transition hover:bg-lime hover:text-charcoal disabled:pointer-events-none disabled:opacity-35"
        >
          <ChevronRight aria-hidden="true" size={24} />
        </button>
      </div>
    </div>
  );
}
