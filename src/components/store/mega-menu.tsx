"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { categories, fishTargets, navItems, brands } from "@/lib/store-data";

export function MegaMenu() {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-10 bg-transparent px-3 text-sm font-semibold text-white hover:bg-white/10 hover:text-white data-active:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white">
            Departamentos
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[880px] grid-cols-[1.2fr_1fr_1fr] gap-6 bg-[#fbfaf5] p-6 text-[#102117]">
              <div>
                <p className="mb-3 text-sm font-bold uppercase text-[#6e5a2a]">
                  Mais procurados
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.slice(0, 8).map((category) => (
                    <NavigationMenuLink asChild key={category.name}>
                      <Link
                        className="rounded-md border border-[#e6e0cf] bg-white p-3 transition hover:border-[#c6a15b] hover:bg-[#f5f0dd]"
                        href={category.href}
                      >
                        <span className="block font-semibold">{category.name}</span>
                        <span className="mt-1 block text-xs text-[#60685f]">
                          {category.description}
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm font-bold uppercase text-[#6e5a2a]">
                  Comprar por peixe
                </p>
                <div className="space-y-2">
                  {fishTargets.map((fish) => (
                    <NavigationMenuLink asChild key={fish.name}>
                      <Link
                        className="block rounded-md px-3 py-2 transition hover:bg-[#edf1e4]"
                        href={fish.href}
                      >
                        <span className="font-semibold">{fish.name}</span>
                        <span className="block text-xs text-[#60685f]">
                          {fish.setup}
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm font-bold uppercase text-[#6e5a2a]">
                  Marcas fortes
                </p>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <NavigationMenuLink asChild key={brand.name}>
                      <Link
                        className="flex items-center justify-between rounded-md px-3 py-2 transition hover:bg-[#edf1e4]"
                        href={`/produtos/?marca=${brand.name.toLowerCase()}`}
                      >
                        <span className="font-semibold">{brand.name}</span>
                        <span className="text-xs text-[#60685f]">
                          {brand.highlight}
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {navItems.slice(0, 8).map((item) => (
          <NavigationMenuItem key={item}>
            <NavigationMenuLink asChild>
              <Link
                className="inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm font-semibold text-white transition hover:bg-white/10"
                href={`/produtos/?categoria=${item.toLowerCase()}`}
              >
                {item}
                {item === "Iscas Artificiais" ? (
                  <ChevronDown className="size-3" />
                ) : null}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
