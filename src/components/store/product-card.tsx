import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, type Product } from "@/lib/store-data";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden rounded-lg border-[#dddddd] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-0">
        <div className="relative aspect-square bg-white">
          <Link href={product.href}>
            <Image
              alt={product.name}
              className="object-contain p-5 transition duration-300 hover:scale-105"
              fill
              sizes="(max-width: 768px) 70vw, 260px"
              src={product.image}
            />
          </Link>
          {product.badge ? (
            <Badge className="absolute top-3 left-3 rounded-md bg-[#ff2342] text-white">
              {product.badge}
            </Badge>
          ) : null}
        </div>

        <div className="space-y-3 border-t border-[#eeeeee] p-4 text-center">
          <p className="text-xs font-black uppercase text-[#8f0010]">
            {product.category}
          </p>

          <Link
            className="line-clamp-2 min-h-11 text-sm font-semibold leading-5 text-[#202020] hover:text-[#8f0010]"
            href={product.href}
          >
            {product.name}
          </Link>

          <div className="space-y-1">
            {product.oldPrice ? (
              <p className="text-sm text-[#808080] line-through">
                {formatCurrency(product.oldPrice)}
              </p>
            ) : null}
            <p className="text-2xl font-black text-[#8f0010]">
              {formatCurrency(product.price)}
            </p>
            <p className="text-sm font-bold text-[#202020]">{product.pixLabel}</p>
            <p className="text-sm text-[#555555]">ou {product.installments} sem juros</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-[#606060]">
            <Badge className="bg-[#eeeeee] text-[#202020]" variant="secondary">
              {product.stockLabel}
            </Badge>
          </div>

          <Button className="h-11 w-full rounded-md bg-[#50d04c] text-base font-black text-[#101010] hover:bg-[#5ee25a]">
            <ShoppingBag className="size-4" />
            Comprar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
