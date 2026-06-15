import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  Headphones,
  PackageCheck,
  Quote,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  brands,
  fishTargets,
  products,
  reviews,
  siteConfig,
  trustItems,
} from "@/lib/store-data";
import { ProductCard } from "./product-card";

const trustIcons = [Truck, ShieldCheck, BadgeCheck, Headphones];

export function TrustBar() {
  return (
    <section className="border-y border-[#dedede] bg-white px-4 py-5">
      <div className="mx-auto grid max-w-7xl gap-0 divide-y divide-[#dedede] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {trustItems.map((item, index) => {
          const Icon = trustIcons[index] ?? ShieldCheck;
          return (
            <div
              className="flex items-center gap-4 px-4 py-3 text-[#171717]"
              key={item.title}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-md border border-[#8f0010]/25 bg-[#fff5f6] text-[#8f0010]">
                <Icon className="size-6" />
              </span>
              <div>
                <h2 className="text-sm font-black uppercase">{item.title}</h2>
                <p className="mt-1 text-sm leading-5 text-[#606060]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function FishFinder() {
  return (
    <section className="bg-white px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="border-l-4 border-[#8f0010] pl-3 text-sm font-black uppercase text-[#8f0010]">
            Comprar por peixe
          </p>
          <h2 className="mt-2 text-3xl font-black text-[#171717] sm:text-4xl">
            Monte o kit pela pescaria
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fishTargets.map((fish) => (
            <Link
              className="group rounded-lg border border-[#dddddd] bg-[#f7f7f7] p-5 transition hover:border-[#8f0010] hover:bg-white"
              href={fish.href}
              key={fish.name}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-[#171717]">
                    {fish.name}
                  </h3>
                  <p className="mt-2 leading-6 text-[#606060]">{fish.setup}</p>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-md bg-[#171717] text-white transition group-hover:bg-[#50d04c] group-hover:text-[#101010]">
                  <ArrowRight className="size-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  return (
    <section className="bg-[#f3f3f3] px-4 py-14 sm:py-16" id="produtos">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="border-l-4 border-[#8f0010] pl-3 text-sm font-black uppercase text-[#8f0010]">
              Lançamentos
            </p>
            <h2 className="mt-2 text-3xl font-black text-[#171717] sm:text-4xl">
              Produtos prontos para colocar no carrinho
            </h2>
          </div>
          <Button asChild className="rounded-md bg-[#171717] text-white hover:bg-[#2a2a2a]">
            <Link href="/produtos/">Ver vitrine completa</Link>
          </Button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-3 lg:grid lg:grid-cols-3 xl:grid-cols-5">
          {products.map((product) => (
            <div className="w-[78vw] shrink-0 sm:w-[320px] lg:w-auto" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BrandCarousel() {
  return (
    <section className="bg-white px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="border-l-4 border-[#8f0010] pl-3 text-sm font-black uppercase text-[#8f0010]">
              Marcas parceiras
            </p>
            <h2 className="mt-2 text-3xl font-black text-[#171717]">
              Marcas que o pescador reconhece
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <Link
              className="rounded-lg border border-[#dddddd] bg-[#f7f7f7] p-5 text-center transition hover:border-[#8f0010] hover:bg-white"
              href={`/produtos/?marca=${brand.name.toLowerCase()}`}
              key={brand.name}
            >
              <span className="block text-lg font-black text-[#171717]">
                {brand.name}
              </span>
              <span className="mt-2 block text-sm text-[#606060]">
                {brand.highlight}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MidBanner() {
  return (
    <section className="bg-[#171717] px-4 py-14 text-white" id="promocoes">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <Badge className="mb-4 rounded-md bg-[#8f0010] text-white">
            Promoções e kits
          </Badge>
          <h2 className="text-3xl font-black sm:text-5xl">
            Preparado para sua próxima pescaria?
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-white/80">
            Encontre conjuntos prontos para pesqueiro, pesca esportiva e
            aventuras ao ar livre com equipamentos essenciais em um só lugar.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <span className="inline-flex items-center gap-3">
              <PackageCheck className="size-5 text-[#50d04c]" />
              Kits por modalidade
            </span>
            <span className="inline-flex items-center gap-3">
              <CreditCard className="size-5 text-[#50d04c]" />
              Até 12x no cartão
            </span>
            <span className="inline-flex items-center gap-3">
              <Headphones className="size-5 text-[#50d04c]" />
              Ajuda no WhatsApp
            </span>
          </div>
          <Button asChild className="mt-6 h-12 w-full rounded-md bg-[#50d04c] font-black text-[#101010] hover:bg-[#5ee25a]">
            <Link href="/produtos/?categoria=kits">Ver kits e ofertas</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function SeoContent() {
  return (
    <section className="bg-[#f3f3f3] px-4 py-14">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="border-l-4 border-[#8f0010] pl-3 text-sm font-black uppercase text-[#8f0010]">
            Pacu Pesca
          </p>
          <h2 className="mt-2 text-3xl font-black text-[#171717] sm:text-4xl">
            Loja de pesca esportiva com curadoria e atendimento especializado
          </h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-[#444444]">
          <p>
            A Pacu Pesca reúne equipamentos para pescadores que buscam
            praticidade, confiança e produtos originais. A seleção inclui iscas
            artificiais, varas de pesca, molinetes, linhas, anzóis, boias,
            alicates, acessórios e kits para diferentes modalidades.
          </p>
          <p>
            Este MVP moderniza a experiência da loja, valorizando busca,
            navegação por categoria, compra por peixe e informações claras de
            preço, Pix, parcelamento e atendimento. A estrutura foi pensada para
            futura integração com plataformas como Shopify, Nuvemshop,
            WooCommerce ou uma API própria.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="border-l-4 border-[#8f0010] pl-3 text-sm font-black uppercase text-[#8f0010]">
            Depoimentos
          </p>
          <h2 className="mt-2 text-3xl font-black text-[#171717]">
            Confiança de quem vive a pescaria
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <Card className="rounded-lg border-[#dddddd] bg-[#f7f7f7]" key={review.name}>
              <CardContent className="p-6">
                <Quote className="size-8 text-[#8f0010]" />
                <div className="mt-4 flex gap-1 text-[#f1b400]">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star className="size-4 fill-current" key={index} />
                  ))}
                </div>
                <p className="mt-4 leading-7 text-[#444444]">{review.text}</p>
                <Separator className="my-5 bg-[#dddddd]" />
                <p className="font-black text-[#171717]">{review.name}</p>
                <p className="text-sm text-[#606060]">{review.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  return (
    <section className="bg-[#63000a] px-4 py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase text-white/80">
            Newsletter
          </p>
          <h2 className="mt-2 text-3xl font-black">
            Receba ofertas e dicas de pesca
          </h2>
        </div>
        <form className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input
            aria-label="Nome"
            className="h-12 rounded-md border border-white/20 bg-white px-4 text-[#171717] outline-none"
            placeholder="Seu nome"
          />
          <input
            aria-label="E-mail"
            className="h-12 rounded-md border border-white/20 bg-white px-4 text-[#171717] outline-none"
            placeholder="seuemail@exemplo.com"
            type="email"
          />
          <Button className="h-12 rounded-md bg-[#50d04c] px-7 font-black text-[#101010] hover:bg-[#5ee25a]">
            Cadastrar
          </Button>
        </form>
      </div>
    </section>
  );
}

export function FloatingWhatsApp() {
  return (
    <Link
      aria-label="Falar com a Pacu Pesca pelo WhatsApp"
      className="fixed right-5 bottom-5 z-50 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-2xl transition hover:scale-105"
      href={`https://wa.me/${siteConfig.whatsapp}?text=Ol%C3%A1%2C%20vim%20pelo%20novo%20site%20da%20Pacu%20Pesca`}
    >
      <Headphones className="size-7" />
    </Link>
  );
}
