"use client";

import Image from "next/image";
import { CreditCard, ShieldCheck, ShoppingCart, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatCurrency, products, siteConfig } from "@/lib/store-data";

const cartItems = products.slice(0, 2);
const subtotal = cartItems.reduce((total, product) => total + product.price, 0);

export function CartSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Abrir carrinho"
          className="relative size-11 rounded-md bg-white/10 text-white hover:bg-white/20"
          size="icon"
        >
          <ShoppingCart className="size-5" />
          <span className="absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-[#50d04c] text-[11px] font-black text-[#101010]">
            {cartItems.length}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[92vw] overflow-y-auto bg-[#f6f6f6] sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-2xl text-[#171717]">
            Carrinho
          </SheetTitle>
          <SheetDescription>
            Checkout demonstrativo para o MVP visual da Pacu Pesca.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          {cartItems.map((product) => (
            <div
              className="grid grid-cols-[84px_1fr] gap-3 rounded-lg border border-[#d8d2bd] bg-white p-3"
              key={product.id}
            >
              <div className="relative aspect-square overflow-hidden rounded-md bg-white">
                <Image
                  alt={product.name}
                  className="object-contain p-2"
                  fill
                  sizes="84px"
                  src={product.image}
                />
              </div>
              <div className="min-w-0">
                <Badge className="mb-2 bg-[#eeeeee] text-[#202020]">
                  {product.stockLabel}
                </Badge>
                <p className="line-clamp-2 text-sm font-semibold text-[#171717]">
                  {product.name}
                </p>
                <p className="mt-1 text-sm text-[#606060]">{product.brand}</p>
                <p className="mt-2 font-black text-[#8f0010]">
                  {formatCurrency(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator className="bg-[#dddddd]" />

        <div className="space-y-3 rounded-lg bg-white p-4 text-sm shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#606060]">Subtotal</span>
            <strong className="text-[#171717]">{formatCurrency(subtotal)}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#606060]">Frete</span>
            <span className="font-bold text-[#8f0010]">
              {siteConfig.freeShippingLabel}
            </span>
          </div>
          <Separator className="bg-[#dddddd]" />
          <div className="flex items-center justify-between text-lg">
            <span className="font-semibold text-[#171717]">Total</span>
            <strong className="text-[#8f0010]">{formatCurrency(subtotal)}</strong>
          </div>
        </div>

        <div className="grid gap-2 text-sm text-[#444444]">
          <span className="inline-flex items-center gap-2">
            <CreditCard className="size-4 text-[#8f0010]" />
            Pix com desconto e parcelamento em até 12x.
          </span>
          <span className="inline-flex items-center gap-2">
            <Truck className="size-4 text-[#8f0010]" />
            Cálculo de frete será conectado na próxima fase.
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="size-4 text-[#8f0010]" />
            Compra simulada, sem cobrança real.
          </span>
        </div>

        <Button className="h-12 w-full rounded-md bg-[#50d04c] text-base font-black text-[#101010] hover:bg-[#5ee25a]">
          Finalizar pedido mockado
        </Button>
      </SheetContent>
    </Sheet>
  );
}
