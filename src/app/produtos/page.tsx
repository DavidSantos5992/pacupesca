import type { Metadata } from "next";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

import { Footer } from "@/components/store/footer";
import { Header } from "@/components/store/header";
import { ProductCard } from "@/components/store/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories, fishTargets, products } from "@/lib/store-data";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Vitrine mockada da Pacu Pesca com varas, iscas, linhas, molinetes e acessórios para pesca esportiva.",
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f3f3f3]">
        <section className="bg-[#171717] px-4 py-14 text-white">
          <div className="mx-auto max-w-7xl">
            <Badge className="rounded-md bg-[#8f0010] text-white">
              Vitrine MVP
            </Badge>
            <h1 className="mt-4 max-w-3xl text-4xl font-black sm:text-5xl">
              Produtos para pesca esportiva
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-white/80">
              Navegação demonstrativa com produtos reais e mocks realistas da
              Pacu Pesca. Filtros e checkout serão conectados em uma próxima fase.
            </p>
          </div>
        </section>

        <section className="px-4 py-10">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="space-y-6">
              <div className="rounded-lg border border-[#dddddd] bg-white p-5">
                <h2 className="flex items-center gap-2 text-lg font-black text-[#171717]">
                  <SlidersHorizontal className="size-5 text-[#8f0010]" />
                  Categorias
                </h2>
                <div className="mt-4 grid gap-2">
                  {categories.map((category) => (
                    <Link
                      className="rounded-md px-3 py-2 text-sm font-bold text-[#444444] transition hover:bg-[#f3f3f3] hover:text-[#8f0010]"
                      href={category.href}
                      key={category.name}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-[#dddddd] bg-white p-5">
                <h2 className="text-lg font-black text-[#171717]">
                  Comprar por peixe
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {fishTargets.map((fish) => (
                    <Badge
                      className="bg-[#eeeeee] text-[#202020]"
                      key={fish.name}
                      variant="secondary"
                    >
                      {fish.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </aside>

            <div>
              <div className="mb-5 flex flex-col justify-between gap-3 rounded-lg border border-[#dddddd] bg-white p-4 sm:flex-row sm:items-center">
                <p className="font-semibold text-[#171717]">
                  {products.length} produtos encontrados
                </p>
                <Button className="rounded-md bg-[#171717] text-white hover:bg-[#2a2a2a]">
                  Ordenar por destaque
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
