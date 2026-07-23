"use client";

import { ChevronLeft, ChevronRight, ExternalLink, Quote, Star } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import type { GoogleReviewsFeed } from "@/lib/google-reviews";

function formatDate(date: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function Stars() {
  return (
    <div className="flex gap-1 text-lime" aria-label="5 estrelas">
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} aria-hidden="true" size={16} fill="currentColor" strokeWidth={1.5} />
      ))}
    </div>
  );
}

export function ReviewsSection({
  reviews,
  averageRating,
  totalReviewCount,
  sourceUrl,
  isConfigured,
  isFallback,
}: GoogleReviewsFeed) {
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const drag = useRef({ pointerId: -1, startX: 0, didMove: false });
  const reviewsPerPage = isMobile ? 1 : 3;
  const pageCount = Math.max(1, Math.ceil(reviews.length / reviewsPerPage));
  const visibleReviews = reviews.slice(
    page * reviewsPerPage,
    page * reviewsPerPage + reviewsPerPage,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => {
      setIsMobile(mediaQuery.matches);
      setPage(0);
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      didMove: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (drag.current.pointerId !== event.pointerId) return;

    if (Math.abs(event.clientX - drag.current.startX) > 6) {
      drag.current.didMove = true;
      event.preventDefault();
    }
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (drag.current.pointerId !== event.pointerId) return;

    const distance = event.clientX - drag.current.startX;
    const didMove = drag.current.didMove;
    drag.current.pointerId = -1;

    if (didMove && Math.abs(distance) > 45) {
      setPage((current) =>
        distance > 0
          ? Math.max(0, current - 1)
          : Math.min(pageCount - 1, current + 1),
      );
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <section id="avaliacoes" className="surface-line border-y border-white/10 bg-graphite-soft py-20">
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex rounded-card border border-lime/35 bg-lime/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-lime">
              Avaliações da loja
            </p>
            <h2 className="font-display text-4xl font-bold uppercase leading-tight text-paper md:text-5xl">
              Quem compra com a Pacu Pesca recomenda
            </h2>
            <p className="mt-4 text-base leading-8 text-smoke md:text-lg">
              Experiências reais de clientes da Pacu Pesca. Mostramos somente avaliações com 5 estrelas.
            </p>
          </div>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-card border border-white/15 bg-white/8 px-5 py-3 text-sm font-extrabold uppercase text-paper transition duration-300 hover:border-lime/70 hover:bg-lime/10"
          >
            Ver no Google
            <ExternalLink aria-hidden="true" size={17} />
          </a>
        </div>

        {reviews.length > 0 ? (
          <>
            <div className="mb-7 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-card border border-lime/20 bg-charcoal/55 px-5 py-4 text-sm text-smoke">
              <span className="inline-flex items-center gap-2 font-black text-paper">
                <span className="font-display text-3xl text-lime">{averageRating?.toFixed(1) ?? "5,0"}</span>
                <span className="sr-only">de 5 estrelas</span>
                <Stars />
              </span>
              {totalReviewCount ? <span>{totalReviewCount} avaliações no Google</span> : null}
              {isFallback ? <span className="text-white/60">Avaliações fixadas temporariamente</span> : null}
              <span className="text-lime/80">Filtro: somente 5 estrelas</span>
            </div>
            <div
              className="grid cursor-grab select-none gap-4 touch-pan-y active:cursor-grabbing md:grid-cols-2 lg:grid-cols-3"
              aria-live="polite"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerEnd}
              onPointerCancel={handlePointerEnd}
            >
              {visibleReviews.map((review) => (
                <article key={review.id} className="flex h-[390px] flex-col overflow-hidden rounded-card border border-white/10 bg-charcoal p-5 shadow-[0_18px_45px_rgba(0,0,0,0.16)] sm:h-[340px]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {review.profilePhotoUrl ? (
                        // Google profile photos are external and may change, so keep them as a lightweight optional enhancement.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={review.profilePhotoUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
                      ) : (
                        <div aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-water/15 font-black text-water">
                          {review.author.slice(0, 1).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="text-sm font-black text-paper">{review.author}</h3>
                        <p className="mt-1 text-xs text-smoke">{review.dateLabel || formatDate(review.createdAt)}</p>
                      </div>
                    </div>
                    <Quote aria-hidden="true" className="shrink-0 text-water/70" size={22} />
                  </div>
                  <div className="mt-4"><Stars /></div>
                  <p className="scrollbar-hide mt-4 flex-1 overflow-y-auto whitespace-pre-line pr-1 text-sm leading-7 text-smoke">“{review.comment}”</p>
                </article>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2" role="tablist" aria-label="Páginas de avaliações">
                {Array.from({ length: pageCount }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    aria-selected={page === index}
                    aria-label={`Mostrar avaliações ${index * reviewsPerPage + 1} a ${Math.min((index + 1) * reviewsPerPage, reviews.length)}`}
                    onClick={() => setPage(index)}
                    className={`focus-ring h-2 rounded-full transition-all ${page === index ? "w-7 bg-lime" : "w-2 bg-white/30 hover:bg-white/60"}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Avaliações anteriores"
                  disabled={page === 0}
                  onClick={() => setPage((current) => Math.max(0, current - 1))}
                  className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-charcoal text-paper transition hover:border-lime/60 hover:text-lime disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronLeft aria-hidden="true" size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Próximas avaliações"
                  disabled={page === pageCount - 1}
                  onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
                  className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-charcoal text-paper transition hover:border-lime/60 hover:text-lime disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronRight aria-hidden="true" size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-card border border-dashed border-white/20 bg-charcoal/45 p-6 text-sm leading-7 text-smoke md:p-8">
            {isConfigured ? (
              <p>As avaliações 5 estrelas serão exibidas assim que a conexão com o Perfil da Empresa no Google estiver autorizada.</p>
            ) : (
              <p>Conecte as credenciais do Perfil da Empresa no Google para carregar automaticamente as 10 primeiras avaliações com 5 estrelas.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
