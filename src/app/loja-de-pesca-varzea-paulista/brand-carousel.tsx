"use client";

import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { MouseEvent, PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { storeLinks } from "./store-links";

const brands = [
  {
    name: "Lori Fishing",
    image: "/images/brands/lori-fishing.svg",
    href: storeLinks.catalog,
  },
  {
    name: "KV",
    image: "/images/brands/kv.png",
    href: storeLinks.catalog,
  },
  {
    name: "Megabass",
    image: "/images/brands/megabass.svg",
    href: storeLinks.catalog,
  },
  {
    name: "Daiwa",
    image: "/images/brands/daiwa.png",
    href: storeLinks.catalog,
  },
  {
    name: "Saint",
    image: "/images/brands/saint.png",
    href: storeLinks.catalog,
  },
  {
    name: "Extreme Jigs",
    image: "/images/brands/extreme-jigs.png",
    href: storeLinks.catalog,
  },
];

export function BrandCarousel() {
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
          ? -Math.max(280, node.clientWidth * 0.8)
          : Math.max(280, node.clientWidth * 0.8),
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
    <div className="relative">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-3xl font-bold uppercase leading-tight text-paper md:text-4xl">
          Marcas mais procuradas
        </h2>
        <a
          href={storeLinks.catalog}
          className="focus-ring inline-flex items-center gap-2 rounded-card border border-white/10 bg-white/8 px-4 py-2 text-sm font-black uppercase text-lime transition hover:border-lime/70 hover:bg-lime hover:text-charcoal"
        >
          veja mais marcas
          <ArrowRight aria-hidden="true" size={16} />
        </a>
      </div>

      <div className="relative rounded-card border border-white/10 bg-graphite/95 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.22)] md:p-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-graphite via-graphite/90 to-transparent md:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-graphite via-graphite/90 to-transparent md:block" />

        <button
          type="button"
          aria-label="Ver marcas anteriores"
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
          {brands.map((brand) => (
            <a
              key={brand.name}
              href={brand.href}
              aria-label={`Ver produtos da marca ${brand.name}`}
              draggable={false}
              onClick={handleItemClick}
              className="focus-ring group grid min-h-32 min-w-[210px] place-items-center rounded-card border border-white/10 bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:border-water/70 hover:shadow-[0_16px_34px_rgba(0,159,227,0.16)] sm:min-w-[230px] md:min-w-[250px]"
            >
              <div className="relative h-20 w-full">
                <Image
                  src={brand.image}
                  alt={`Produtos ${brand.name}`}
                  fill
                  sizes="250px"
                  className="object-contain transition duration-300 group-hover:scale-105"
                />
              </div>
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label="Ver próximas marcas"
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
