"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Anchor,
  Cable,
  CircleDot,
  Fish,
  Heart,
  Menu,
  MessageCircle,
  Package,
  Search,
  ShieldCheck,
  Shirt,
  Sparkles,
  Tent,
  User,
  Wrench,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories, fishTargets, navItems, siteConfig } from "@/lib/store-data";
import { CartSheet } from "./cart-sheet";

const departmentIcons = [
  Fish,
  Sparkles,
  Anchor,
  CircleDot,
  Cable,
  Wrench,
  Package,
  Fish,
  Shirt,
  Tent,
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#d9d9d9] bg-white shadow-md">
      <div className="bg-[#63000a] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-xs font-semibold">
          <span>Seja bem-vindo a Pacu Pesca</span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">{siteConfig.freeShippingLabel}</span>
            <Link
              className="inline-flex items-center gap-1.5 hover:text-[#f5c7c7]"
              href={`https://wa.me/${siteConfig.whatsapp}`}
            >
              <MessageCircle className="size-3.5" />
              Atendimento
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#171717] text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-[44px_1fr_auto] items-center gap-3 px-4 py-4 lg:grid-cols-[190px_1fr_auto] lg:gap-8">
          <div className="lg:hidden">
            <MobileMenu />
          </div>

          <Link
            aria-label="Pacu Pesca"
            className="relative hidden h-16 w-40 lg:block"
            href="/"
          >
            <Image
              alt="Pacu Pesca"
              className="object-contain"
              fill
              priority
              sizes="160px"
              src={siteConfig.logo}
            />
          </Link>

          <Link
            aria-label="Pacu Pesca"
            className="relative block h-14 w-24 lg:hidden"
            href="/"
          >
            <Image
              alt="Pacu Pesca"
              className="object-contain"
              fill
              priority
              sizes="96px"
              src={siteConfig.logo}
            />
          </Link>

          <form className="relative col-span-3 row-start-2 lg:col-span-1 lg:row-start-auto">
            <Input
              aria-label="Buscar produtos"
              className="h-12 rounded-md border-0 bg-white pr-14 pl-4 text-sm text-[#171717] shadow-inner placeholder:text-[#6f6f6f]"
              placeholder="Buscar produtos para pesca"
            />
            <Button
              aria-label="Buscar"
              className="absolute top-1 right-1 h-10 w-12 rounded-md bg-[#8f0010] p-0 text-white hover:bg-[#b10018]"
              size="icon"
              type="submit"
            >
              <Search className="size-5" />
            </Button>
          </form>

          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <Button
              aria-label="Minha conta"
              className="hidden h-11 gap-2 rounded-md px-3 text-white hover:bg-white/10 sm:inline-flex"
              variant="ghost"
            >
              <User className="size-5" />
              <span className="hidden text-left text-xs leading-tight xl:block">
                Minha conta
                <strong className="block">Entrar</strong>
              </span>
            </Button>
            <Button
              aria-label="Favoritos"
              className="hidden rounded-md text-white hover:bg-white/10 sm:inline-flex"
              size="icon"
              variant="ghost"
            >
              <Heart className="size-5" />
            </Button>
            <CartSheet />
          </div>
        </div>
      </div>

      <nav className="hidden bg-[#2a2a2a] text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4">
          <div className="flex min-w-0 flex-1 items-stretch justify-between gap-1">
            {navItems.map((item, index) => {
              const Icon = departmentIcons[index] ?? Package;
              return (
                <Link
                  className="group flex min-h-20 min-w-0 flex-1 flex-col items-center justify-center gap-1.5 px-2 py-3 text-center text-xs font-bold transition hover:bg-[#3a3a3a]"
                  href={`/produtos/?categoria=${item.toLowerCase()}`}
                  key={item}
                >
                  <Icon className="size-6 text-white transition group-hover:text-[#50d04c]" />
                  <span className="leading-tight">{item}</span>
                </Link>
              );
            })}
          </div>
          <div className="ml-3 inline-flex items-center gap-2 border-l border-white/15 pl-5 text-sm font-bold">
            <ShieldCheck className="size-4 text-[#50d04c]" />
            Loja segura
          </div>
        </div>
      </nav>
    </header>
  );
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Abrir menu"
          className="size-11 rounded-md bg-white/10 text-white hover:bg-white/20"
          size="icon"
          variant="ghost"
        >
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[92vw] overflow-y-auto bg-[#f6f6f6] p-0 text-[#171717]" side="left">
        <SheetHeader className="border-b border-[#dddddd] bg-[#171717] p-5 text-left text-white">
          <SheetTitle className="flex items-center gap-3 text-white">
            <span className="relative block h-12 w-24">
              <Image
                alt="Pacu Pesca"
                className="object-contain"
                fill
                sizes="96px"
                src={siteConfig.logo}
              />
            </span>
            Menu
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-5 p-5">
          <form className="relative">
            <Input
              aria-label="Buscar produtos no menu"
              className="h-12 rounded-md bg-white pr-12 pl-4"
              placeholder="Buscar na loja"
            />
            <Search className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-[#8f0010]" />
          </form>

          <Accordion className="w-full" defaultValue="departamentos" type="single" collapsible>
            <AccordionItem value="departamentos">
              <AccordionTrigger className="text-base font-black">
                Departamentos
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {navItems.map((item, index) => {
                    const Icon = departmentIcons[index] ?? Package;
                    return (
                      <Link
                        className="flex min-h-20 flex-col items-center justify-center gap-2 rounded-md bg-white px-3 py-3 text-center text-sm font-bold shadow-sm"
                        href={`/produtos/?categoria=${item.toLowerCase()}`}
                        key={item}
                      >
                        <Icon className="size-6 text-[#8f0010]" />
                        {item}
                      </Link>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="categorias">
              <AccordionTrigger className="text-base font-black">
                Categorias em destaque
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  {categories.map((category) => (
                    <Link
                      className="rounded-md bg-white px-3 py-3 shadow-sm"
                      href={category.href}
                      key={category.name}
                    >
                      <span className="block font-bold">{category.name}</span>
                      <span className="text-sm text-[#5d5d5d]">
                        {category.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="peixes">
              <AccordionTrigger className="text-base font-black">
                Comprar por peixe
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  {fishTargets.map((fish) => (
                    <Link
                      className="rounded-md bg-white px-3 py-3 shadow-sm"
                      href={fish.href}
                      key={fish.name}
                    >
                      <span className="block font-bold">{fish.name}</span>
                      <span className="text-sm text-[#5d5d5d]">{fish.setup}</span>
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button asChild className="h-12 w-full rounded-md bg-[#50d04c] text-[#101010] hover:bg-[#5ee25a]">
            <Link href={`https://wa.me/${siteConfig.whatsapp}`}>
              Falar com especialista
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
