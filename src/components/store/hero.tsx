import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, BadgePercent, CreditCard, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { heroImage } from "@/lib/store-data";

export function Hero() {
  return (
    <section className="bg-[#f3f3f3] px-4 py-8 sm:py-10">
      <div className="relative mx-auto min-h-[360px] max-w-7xl overflow-hidden rounded-lg bg-[#171717] text-white shadow-lg">
        <Image
          alt="Pescaria esportiva em ambiente natural"
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src={heroImage}
        />
        <div className="absolute inset-0 bg-[#12080a]/68" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#12080a_0%,rgba(54,0,9,0.86)_44%,rgba(18,8,10,0.35)_100%)]" />

        <div className="relative grid min-h-[360px] gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-14">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md bg-[#8f0010] px-4 py-2 text-sm font-black uppercase tracking-wide">
              <BadgePercent className="size-4" />
              Ofertas para sua pescaria
            </div>
            <h1 className="text-4xl font-black leading-[0.98] sm:text-6xl lg:text-7xl">
              Pesque melhor pagando menos
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/90 sm:text-lg">
              Varas, iscas, linhas e acessórios com vitrine rápida, preço em
              Pix, parcelamento e atendimento especializado para montar seu kit.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-md bg-[#50d04c] px-6 text-base font-black text-[#101010] hover:bg-[#5ee25a]"
              >
                <Link href="#produtos">
                  Ver lançamentos
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button
                asChild
                className="h-12 rounded-md border-white/50 bg-white/10 px-6 text-base font-bold text-white hover:bg-white/20"
                variant="outline"
              >
                <Link href="#promocoes">Kits e promoções</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <PromoPill icon={<Truck className="size-5" />} title="Frete grátis" text="Acima de R$300" />
            <PromoPill icon={<CreditCard className="size-5" />} title="Até 12x" text="Parcelamento claro" />
            <PromoPill icon={<BadgePercent className="size-5" />} title="Pix com desconto" text="Preço destacado" />
          </div>
        </div>
      </div>
    </section>
  );
}

function PromoPill({
  icon,
  text,
  title,
}: {
  icon: ReactNode;
  text: string;
  title: string;
}) {
  return (
    <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-md bg-white text-[#8f0010]">
          {icon}
        </span>
        <div>
          <p className="text-lg font-black uppercase leading-tight">{title}</p>
          <p className="text-sm text-white/80">{text}</p>
        </div>
      </div>
    </div>
  );
}
