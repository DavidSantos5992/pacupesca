import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  CreditCard,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircle,
  Share2,
  ShieldCheck,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/store-data";

const institutional = [
  ["Sobre a Pacu Pesca", "/sobre-nos/"],
  ["Produtos", "/produtos/"],
  ["Promoções", "/produtos/?promocao=true"],
  ["Contato", "/contato/"],
];

const support = [
  ["Política de Privacidade", "/politica-de-privacidade/"],
  ["Trocas e Devoluções", "/trocas-e-devolucoes/"],
  ["Frete e Entrega", "/frete/"],
  ["Minha conta", "/account/login/"],
];

export function Footer() {
  return (
    <footer className="bg-[#111111] px-4 pt-14 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link className="relative block h-20 w-32" href="/">
              <Image
                alt="Pacu Pesca"
                className="object-contain"
                fill
                sizes="128px"
                src={siteConfig.logo}
              />
            </Link>
            <p className="mt-4 max-w-sm leading-7 text-[#d8dfd8]">
              Equipamentos de pesca esportiva, acessórios e atendimento
              especializado para sua próxima aventura.
            </p>
            <div className="mt-5 flex gap-3">
              <Link
                aria-label="Instagram"
                className="grid size-10 place-items-center rounded-md bg-white/10 hover:bg-white/20"
                href="https://www.instagram.com/"
              >
                <Camera className="size-5" />
              </Link>
              <Link
                aria-label="Facebook"
                className="grid size-10 place-items-center rounded-md bg-white/10 hover:bg-white/20"
                href="https://www.facebook.com/"
              >
                <Share2 className="size-5" />
              </Link>
            </div>
          </div>

          <FooterColumn links={institutional} title="Institucional" />
          <FooterColumn links={support} title="Atendimento" />

          <div>
            <h2 className="text-lg font-black">Fale conosco</h2>
            <div className="mt-4 space-y-3 text-sm text-[#d8dfd8]">
              <Link
                className="flex items-center gap-2 hover:text-[#50d04c]"
                href={`https://wa.me/${siteConfig.whatsapp}`}
              >
                <MessageCircle className="size-4 text-[#50d04c]" />
                {siteConfig.whatsapp}
              </Link>
              <Link
                className="flex items-center gap-2 hover:text-[#50d04c]"
                href={`mailto:${siteConfig.email}`}
              >
                <Mail className="size-4 text-[#50d04c]" />
                {siteConfig.email}
              </Link>
              <span className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 text-[#50d04c]" />
                {siteConfig.address}
              </span>
            </div>

            <div className="mt-6 grid gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-4 text-sm">
              <span className="inline-flex items-center gap-2">
                <CreditCard className="size-4 text-[#50d04c]" />
                Pix, cartões e parcelamento mockado
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#50d04c]" />
                Produtos originais
              </span>
              <span className="inline-flex items-center gap-2">
                <LockKeyhole className="size-4 text-[#50d04c]" />
                Ambiente seguro
              </span>
            </div>
          </div>
        </div>

        <Separator className="mt-10 bg-white/10" />

        <div className="flex flex-col justify-between gap-3 py-6 text-sm text-[#b9c4bb] sm:flex-row">
          <p>Copyright PACU PESCA - 2026. Todos os direitos reservados.</p>
          <p>MVP frontend sem checkout real ou cobrança.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  links,
  title,
}: {
  links: string[][];
  title: string;
}) {
  return (
    <div>
      <h2 className="text-lg font-black">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm text-[#d8dfd8]">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link className="hover:text-[#50d04c]" href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
