import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { categories } from "@/lib/store-data";

export function CategoryGrid() {
  return (
    <section className="bg-white px-4 py-12 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="border-l-4 border-[#8f0010] pl-3 text-sm font-black uppercase text-[#8f0010]">
              Categorias em destaque
            </p>
            <h2 className="mt-2 text-3xl font-black text-[#171717] sm:text-4xl">
              Encontre pelo tipo de equipamento
            </h2>
          </div>
          <Link
            className="inline-flex items-center gap-2 font-bold text-[#8f0010]"
            href="/produtos/"
          >
            Ver todos os produtos
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              className="group overflow-hidden rounded-lg border border-[#dddddd] bg-[#f7f7f7] shadow-sm transition hover:-translate-y-1 hover:border-[#8f0010] hover:shadow-lg"
              href={category.href}
              key={category.name}
            >
              <div className="relative aspect-[5/3] bg-white">
                <Image
                  alt={category.name}
                  className="object-contain p-3 transition duration-300 group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 50vw, 240px"
                  src={category.image}
                />
              </div>
              <div className="min-h-24 bg-white p-3 text-center">
                <h3 className="text-base font-black text-[#171717]">
                  {category.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#606060]">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
