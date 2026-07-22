import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";
import {
  Anchor,
  ArrowRight,
  BadgeCheck,
  Boxes,
  CircleDot,
  Fish,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  PawPrint,
  Search,
  ShoppingCart,
  Phone,
  ShieldCheck,
  Shirt,
  Sparkles,
  Tent,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BrandCarousel } from "./brand-carousel";
import { HeroCarousel } from "./hero-carousel";
import { ProductFinderCarousel } from "./product-finder-carousel";
import { Reveal } from "./reveal";
import { ReviewsSection } from "./reviews-section";
import { getGoogleReviews } from "@/lib/google-reviews";

export const revalidate = 3600;

const siteUrl = "https://pacupesca.com";
const landingPath = "/loja-de-pesca-varzea-paulista";
const landingUrl = `${siteUrl}${landingPath}`;
const whatsappNumber = "5511933973588";
const whatsappText = encodeURIComponent(
  "Ola, vim pelo site da Pacu Pesca e quero ajuda para montar minha pescaria.",
);
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
const catalogUrl = "https://pacupesca.com/produtos/";
const heroImage = "/images/banners/frente-loja-pacu-pesca-hero-v2.png";
const address = "Rua Embu, 305 - Jardim Mirante, Várzea Paulista - SP";
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  address,
)}`;

const keywords = [
  "Pacu Pesca",
  "artigos de pesca",
  "equipamentos de pesca",
  "loja de pesca",
  "varas de pesca",
  "molinetes",
  "carretilhas",
  "iscas artificiais",
  "iscas naturais",
  "linhas de pesca",
  "anzóis",
  "acessórios para pesca",
  "pesca esportiva",
  "pesqueiro",
  "camping e pesca",
  "linha pet",
  "produtos para pets",
];

export function generateMetadata(): Metadata {
  return {
    title: "Equipamentos e artigos para pescaria",
    description:
      "Conheça a Pacu Pesca: loja especializada em artigos de pesca, varas, linhas, iscas, anzóis, acessórios e atendimento para montar sua próxima pescaria.",
    alternates: {
      canonical: landingUrl,
    },
    keywords,
    openGraph: {
      title: "Pacu Pesca | Sua próxima pescaria começa aqui",
      description:
        "Uma vitrine da Pacu Pesca com categorias, produtos selecionados e atendimento especializado para pescadores iniciantes e experientes.",
      url: landingUrl,
      siteName: "Pacu Pesca",
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: heroImage,
          width: 1672,
          height: 941,
          alt: "Fachada da loja Pacu Pesca com artigos de pesca em exposição",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Pacu Pesca | Equipamentos e artigos para pescaria",
      description:
        "Varas, linhas, iscas, anzóis e acessórios para preparar sua pescaria com confiança.",
      images: [heroImage],
    },
  };
}

type Category = {
  name: string;
  description: string;
  image: string;
  href: string;
};

type Product = {
  name: string;
  image: string;
  href: string;
};

type Feature = {
  icon: LucideIcon;
  title: string;
  text: string;
};

type HeaderCategory = {
  icon: LucideIcon;
  label: string;
  href: string;
};

const headerCategories: HeaderCategory[] = [
  {
    icon: Fish,
    label: 'Kits de Pesca',
    href: `${catalogUrl}#categoria-kits`,
  },
  {
    icon: Sparkles,
    label: "Iscas Artificiais",
    href: `${catalogUrl}#categoria-iscas-artificiais`,
  },
  {
    icon: BadgeCheck,
    label: "Carretilhas",
    href: `${catalogUrl}#categoria-carretilhas`,
  },
  {
    icon: CircleDot,
    label: "Molinetes",
    href: `${catalogUrl}#categoria-molinetes`,
  },
  {
    icon: Package,
    label: "Linhas",
    href: `${catalogUrl}#categoria-linhas`,
  },
  {
    icon: Anchor,
    label: "Anzóis",
    href: `${catalogUrl}#categoria-anzois`,
  },
  {
    icon: Boxes,
    label: "Acessórios",
    href: `${catalogUrl}#categoria-acessorios`,
  },
  {
    icon: Fish,
    label: "Varas",
    href: `${catalogUrl}#categoria-varas`,
  },
  {
    icon: Shirt,
    label: "Vestuário",
    href: `${catalogUrl}#categoria-vestuario`,
  },
  {
    icon: Tent,
    label: "Camping",
    href: `${catalogUrl}#categoria-camping`,
  },
  {
    icon: PawPrint,
    label: "Linha Pet",
    href: `${catalogUrl}#categoria-linha-pet`,
  },
];

const categories: Category[] = [
  {
    name: "Varas de pesca",
    description:
      "Opções para pesqueiro, praia, lazer e diferentes estilos de arremesso.",
    image: "/images/categories/sem-ver-mais/varas.png",
    href: `${catalogUrl}#categoria-varas`,
  },
  {
    name: "Anzóis",
    description:
      "Modelos para reposição, montagem de linhas e preparação da fisgada.",
    image: "/images/categories/sem-ver-mais/anzois.png",
    href: `${catalogUrl}#categoria-anzois`,
  },
  {
    name: "Linhas",
    description:
      "Itens essenciais para montar conjuntos firmes, equilibrados e confiáveis.",
    image: "/images/categories/sem-ver-mais/linhas.png",
    href: `${catalogUrl}#categoria-linhas`,
  },
  {
    name: "Molinetes",
    description:
      "Equipamentos para quem busca praticidade, controle e bons arremessos.",
    image: "/images/categories/sem-ver-mais/molinetes.png",
    href: `${catalogUrl}#categoria-molinetes`,
  },
  {
    name: "Carretilhas",
    description:
      "Peças para pescadores que gostam de precisão e performance na mão.",
    image: "/images/categories/sem-ver-mais/carretilhas.png",
    href: `${catalogUrl}#categoria-carretilhas`,
  },
];

const products: Product[] = [
  {
    name: "Vara Telescópica 88% Carbono",
    image: "/images/products/vara-telescopica-carbono.webp",
    href: "/produtos/substituir-link-vara-telescopica-carbono",
  },
  {
    name: "Vara Pesca Praia Costão GT",
    image: "/images/products/vara-pesca-praia-costao-gt.webp",
    href: "/produtos/substituir-link-vara-pesca-praia-costao-gt",
  },
  {
    name: "Linha Marine Vexter Ultimate",
    image: "/images/products/linha-marine-vexter.webp",
    href: "/produtos/substituir-link-linha-marine-vexter-ultimate",
  },
  {
    name: "Isca Artificial Lori",
    image: "/images/products/isca-artificial-lori.webp",
    href: "/produtos/substituir-link-isca-artificial-lori",
  },
  {
    name: "Anzol Kawasemi",
    image: "/images/products/anzol-kawasemi.webp",
    href: "/produtos/substituir-link-anzol-kawasemi",
  },
  {
    name: "Suporte para Varas",
    image: "/images/products/suporte-para-varas.webp",
    href: "/produtos/substituir-link-suporte-para-varas",
  },
  {
    name: "Rede Samburá de Pesca",
    image: "/images/products/rede-sambura-pesca.webp",
    href: "/produtos/substituir-link-rede-sambura-pesca",
  },
  {
    name: "Ração Bio Truta Premium",
    image: "/images/products/racao-bio-truta.webp",
    href: "/produtos/substituir-link-racao-bio-truta-premium",
  },
];

const features: Feature[] = [
  {
    icon: Boxes,
    title: "Variedade para montar a tralha",
    text: "Categorias essenciais para preparar desde uma pescaria rápida até um conjunto mais completo.",
  },
  {
    icon: BadgeCheck,
    title: "Produtos selecionados",
    text: "Itens escolhidos para pescadores que valorizam utilidade, resistência e boa composição do equipamento.",
  },
  {
    icon: MessageCircle,
    title: "Atendimento especializado",
    text: "Ajuda direta para escolher linha, vara, isca, anzol ou acessório conforme o tipo de pescaria.",
  },
  {
    icon: ShieldCheck,
    title: "Compra com confiança",
    text: "Canais claros de contato e orientação antes de avançar para o catálogo ou atendimento.",
  },
];

const experiences = [
  {
    title: "Pesqueiro preparado",
    text: "Suportes, linhas, massas, rações, anzóis e acessórios para sair com tudo organizado.",
    image: "/images/banners/suportes-vara-pesqueiro.png",
    alt: "Suporte com varas de pesca na margem de um lago",
  },
  {
    title: "Iscas para cada estratégia",
    text: "Opções para testar ações, aromas e montagens em diferentes momentos da pescaria.",
    image: "/images/banners/iscas-massas-tilapia.png",
    alt: "Iscas e massas para pesca organizadas sobre superfície escura",
  },
  {
    title: "Noite, camping e lazer",
    text: "Equipamentos de apoio para quem transforma a pescaria em uma experiência completa.",
    image: "/images/banners/pesca-noturna-camping.png",
    alt: "Equipamentos para pesca noturna e camping próximos da água",
  },
];

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["SportingGoodsStore", "LocalBusiness"],
  "@id": `${landingUrl}#localbusiness`,
  name: "Pacu Pesca",
  url: siteUrl,
  image: `${siteUrl}/images/logo/pacu-pesca-logo.png`,
  telephone: "+55 11 93397-3588",
  email: "pacupesca@yahoo.com",
  description:
    "Loja especializada em artigos de pesca, equipamentos, iscas, linhas, anzóis, acessórios e atendimento para pescadores.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Embu, 305 - Jardim Mirante",
    addressLocality: "Várzea Paulista",
    addressRegion: "SP",
    postalCode: "13224-610",
    addressCountry: "BR",
  },
  sameAs: [
    "https://www.facebook.com/PACUPESCAVARZEAPAULISTA/",
    "https://www.instagram.com/pacu_pesca/",
  ],
  makesOffer: categories.map((category) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Product",
      name: category.name,
      category: "Artigos de pesca",
    },
  })),
};

function PrimaryLink({
  href,
  children,
  variant = "lime",
}: Readonly<{
  href: string;
  children: React.ReactNode;
  variant?: "lime" | "dark";
}>) {
  const className =
    variant === "lime"
      ? "focus-ring lime-cta-outline inline-flex min-h-12 items-center justify-center gap-2 rounded-card bg-lime px-5 py-3 text-[15px] font-extrabold uppercase shadow-[0_18px_44px_rgba(169,240,0,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#c8ff28]"
      : "focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-card border border-white/15 bg-white/8 px-5 py-3 text-[15px] font-extrabold uppercase text-paper transition duration-300 hover:-translate-y-0.5 hover:border-water/70 hover:bg-water/15";

  return (
    <a href={href} className={className}>
      {children}
      <ArrowRight aria-hidden="true" size={18} strokeWidth={2.4} />
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
}: Readonly<{
  eyebrow: string;
  title: string;
  text: string;
}>) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-3 inline-flex rounded-card border border-water/35 bg-water/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-water">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-bold uppercase leading-tight text-paper md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-smoke md:text-lg">{text}</p>
    </div>
  );
}

export default async function BrandLandingPage() {
  const reviews = await getGoogleReviews();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />

      <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-[#2f302f] shadow-[0_12px_34px_rgba(0,0,0,0.35)]">
        <div className="flex h-20 items-center justify-between bg-[#2d86df] px-4 md:hidden">
          <a href="#categorias" aria-label="Abrir menu de categorias" className="focus-ring grid h-12 w-12 place-items-center text-white">
            <Menu aria-hidden="true" size={30} strokeWidth={2.4} />
          </a>
          <a href="#produtos" aria-label="Buscar produtos" className="focus-ring grid h-12 w-12 place-items-center text-white">
            <Search aria-hidden="true" size={29} strokeWidth={2.3} />
          </a>
          <a href="#inicio" aria-label="Ir para o início" className="focus-ring grid h-16 w-24 place-items-center border border-white/45 px-2">
            <Image
              src="/images/logo/pacu-pesca-logo.png"
              width={1080}
              height={1350}
              priority
              alt="Pacu Pesca"
              className="h-16 w-auto object-contain"
            />
          </a>
          <a href="#contato" aria-label="Acessar contato" className="focus-ring grid h-12 w-12 place-items-center text-white">
            <UserRound aria-hidden="true" size={30} strokeWidth={2.2} />
          </a>
          <a href="https://pacupesca.com/produtos/" aria-label="Abrir carrinho" className="focus-ring relative grid h-12 w-12 place-items-center text-white">
            <ShoppingCart aria-hidden="true" size={31} strokeWidth={2.2} />
            <span className="absolute right-0 top-0 grid h-6 w-6 place-items-center rounded-full bg-lime text-xs font-black text-charcoal">0</span>
          </a>
        </div>
        <nav
          aria-label="Categorias principais"
          className="mx-auto hidden min-h-[70px] max-w-[1360px] items-stretch gap-1 overflow-visible px-2 py-2 md:flex md:justify-center md:gap-2 md:px-3"
        >
          {headerCategories.map((category) => (
            <Fragment key={category.label}>
              <a
                href={category.href}
                className={`focus-ring group flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-card px-1 py-1 text-center text-[11px] font-extrabold leading-tight text-lime transition duration-300 hover:bg-white/8 hover:text-white md:min-w-28 md:flex-none md:px-3 ${
                  headerCategories.indexOf(category) >= 3 ? "hidden md:flex" : ""
                }`}
              >
                <category.icon
                  aria-hidden="true"
                  size={27}
                  strokeWidth={2.3}
                  className="text-lime transition duration-300 group-hover:text-white"
                />
                <span>{category.label}</span>
              </a>
              {category.label === "Linhas" ? (
                <div className="hidden h-full w-20 shrink-0 items-center justify-center bg-[#2f302f] px-2 md:flex">
                  <Image
                    src="/images/logo/pacu-pesca-logo.png"
                    width={1080}
                    height={1350}
                    alt="Pacu Pesca"
                    className="h-16 w-auto object-contain"
                  />
                </div>
              ) : null}
            </Fragment>
          ))}
          <details className="relative flex min-w-0 flex-1 md:hidden">
            <summary className="focus-ring group flex min-w-0 flex-1 cursor-pointer list-none flex-col items-center justify-center gap-1 rounded-card px-1 py-1 text-center text-[11px] font-extrabold leading-tight text-lime transition duration-300 hover:bg-white/8 hover:text-white">
              <Menu
                aria-hidden="true"
                size={27}
                strokeWidth={2.3}
                className="text-lime transition duration-300 group-hover:text-white"
              />
              <span>VER MAIS</span>
            </summary>
            <div className="absolute right-0 top-full z-40 mt-2 w-64 rounded-card border border-white/10 bg-[#2f302f] p-2 shadow-[0_18px_44px_rgba(0,0,0,0.45)]">
              {headerCategories.slice(3).map((category) => (
                <a
                  key={category.label}
                  href={category.href}
                  className="focus-ring group flex items-center gap-3 rounded-card px-3 py-3 text-sm font-extrabold text-lime transition duration-300 hover:bg-white/8 hover:text-white"
                >
                  <category.icon
                    aria-hidden="true"
                    size={21}
                    strokeWidth={2.3}
                    className="text-lime transition duration-300 group-hover:text-white"
                  />
                  <span>{category.label}</span>
                </a>
              ))}
            </div>
          </details>
        </nav>
      </header>

      <a
        href={whatsappUrl}
        aria-label="Falar com a Pacu Pesca pelo WhatsApp"
        className="focus-ring lime-cta-outline fixed bottom-5 right-4 z-50 inline-flex min-h-12 items-center gap-2 rounded-card bg-lime px-4 py-3 text-sm font-extrabold uppercase shadow-[0_18px_44px_rgba(0,0,0,0.35)] transition duration-300 hover:scale-[1.03] hover:bg-[#c8ff28] md:bottom-6 md:right-6"
      >
        <MessageCircle aria-hidden="true" size={20} strokeWidth={2.4} />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      <main id="inicio">
        <HeroCarousel />

        <section className="surface-line border-y border-white/10 bg-graphite-soft py-20">
          <Reveal className="section-shell">
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 inline-flex rounded-card border border-water/35 bg-water/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-water">
                  Catálogo Pacu Pesca
                </p>
                <h2 className="font-display text-4xl font-bold uppercase leading-tight text-paper md:text-5xl">
                  Encontre tudo o que precisa pra sua pescaria aqui!
                </h2>
                <p className="mt-4 text-base leading-8 text-smoke md:text-lg">
                  Navegue pelas categorias e marcas mais procuradas para montar
                  sua tralha com rapidez.
                </p>
              </div>
              <PrimaryLink href={catalogUrl} variant="dark">
                Ver catálogo completo
              </PrimaryLink>
            </div>

            <ProductFinderCarousel />
          </Reveal>
        </section>

        <Reveal id="produtos" as="section" className="section-shell py-20">
          <SectionHeading
            eyebrow="Produtos em destaque"
            title="Seleção para inspirar a próxima montagem"
            text="Uma curadoria visual de produtos da Pacu Pesca, sem preços, pronta para receber os links reais do e-commerce quando eles forem definidos."
          />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {products.map((product) => (
              <a
                key={product.name}
                href={product.href}
                aria-label={`Conhecer ${product.name}`}
                className="focus-ring group flex min-h-full flex-col overflow-hidden rounded-card border border-white/10 bg-graphite transition duration-300 hover:-translate-y-1 hover:border-water/70"
              >
                <div className="relative aspect-square overflow-hidden bg-white">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-4 transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-2xl font-bold uppercase leading-tight text-paper">
                    {product.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className="section-shell py-20">
          <BrandCarousel />
        </Reveal>

        <section
          id="categorias"
          className="surface-line border-y border-white/10 bg-graphite/55 py-20"
        >
          <Reveal className="section-shell">
            <SectionHeading
              eyebrow="Categorias da loja"
              title="Tudo organizado para encontrar o que combina com sua pescaria"
              text="A vitrine apresenta as principais frentes da Pacu Pesca para facilitar a escolha de quem busca desempenho, reposição ou aquele item de apoio que não pode faltar."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href={category.href}
                  className="focus-ring group overflow-hidden rounded-card border border-white/10 bg-charcoal transition duration-300 hover:-translate-y-1 hover:border-lime/60"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                    <Image
                      src={category.image}
                      alt={`${category.name} na Pacu Pesca`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-h-40 p-5">
                    <h3 className="font-display text-2xl font-bold uppercase text-paper">
                      {category.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-smoke">
                      {category.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase text-lime">
                      Explorar categoria
                      <ArrowRight aria-hidden="true" size={16} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        <Reveal as="section" className="section-shell pb-20">
          <div className="relative isolate overflow-hidden rounded-[24px] border border-white/10 bg-[#2e2e2d] px-6 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.34)] md:px-12 md:py-10">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_50%,rgba(169,240,0,0.14),transparent_18rem),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,38px_38px,38px_38px]" />
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <h2 className="font-display text-4xl font-bold uppercase leading-none text-paper md:text-6xl">
                  Compre agora pelo WhatsApp!
                </h2>
                <p className="mt-3 text-xl leading-8 text-paper md:text-2xl">
                  Atendimento{" "}
                  <strong className="font-black text-white">
                    rápido, seguro e prático.
                  </strong>
                </p>
              </div>
              <div className="flex items-center justify-start gap-5 md:justify-end">
                <a
                  href={whatsappUrl}
                  className="focus-ring inline-flex min-h-14 items-center justify-center rounded-full bg-[#2ec64f] px-8 py-3 text-center text-lg font-extrabold leading-tight text-white shadow-[0_14px_28px_rgba(0,0,0,0.34)] transition duration-300 hover:scale-[1.03] hover:bg-[#38d65c]"
                >
                  Clique aqui e
                  <br />
                  compre agora!
                </a>
                <div
                  aria-hidden="true"
                  className="relative hidden h-32 w-28 shrink-0 md:block"
                >
                  <div className="absolute right-10 top-0 h-28 w-14 rotate-[-7deg] rounded-[18px] border-4 border-white bg-charcoal shadow-2xl">
                    <div className="mx-auto mt-2 h-2 w-6 rounded-full bg-white/80" />
                    <div className="mx-2 mt-3 h-16 rounded-card bg-[linear-gradient(160deg,#1b2220,#4c6a5d)]" />
                  </div>
                  <div className="absolute right-0 top-7 h-28 w-14 rotate-[8deg] rounded-[18px] border-4 border-white bg-charcoal shadow-2xl">
                    <div className="mx-auto mt-2 h-2 w-6 rounded-full bg-white/80" />
                    <div className="mx-2 mt-3 h-16 rounded-card bg-[linear-gradient(160deg,#f8fafc,#dff7e5)]" />
                  </div>
                  <div className="absolute bottom-0 left-0 grid h-16 w-16 place-items-center rounded-full bg-[#26c34f] text-white shadow-[0_12px_24px_rgba(0,0,0,0.35)] ring-4 ring-white/20">
                    <MessageCircle size={34} strokeWidth={2.6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal id="marca" as="section" className="section-shell py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Paixão pela pesca"
                title="Uma loja feita para quem prepara cada detalhe"
                text="Mais do que vender equipamentos, a Pacu Pesca ajuda pescadores a escolherem melhor. Da primeira vara ao acessório que salva o dia no pesqueiro, cada categoria conversa com a prática real da pescaria."
              />
              <div className="grid gap-3 sm:grid-cols-3">
                {["Variedade", "Orientação", "Confiança"].map((item) => (
                  <div
                    key={item}
                    className="rounded-card border border-white/10 bg-white/8 p-4 text-sm font-black uppercase text-paper"
                  >
                    <Sparkles
                      aria-hidden="true"
                      className="mb-3 text-water"
                      size={20}
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-card border border-white/10 bg-graphite">
              <Image
                src="/images/banners/linhas-anzois-acessorios.png"
                width={1696}
                height={927}
                alt="Linhas, anzóis e acessórios de pesca em composição premium"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="max-w-xl text-sm font-bold leading-7 text-paper md:text-base">
                  Equipamentos bem escolhidos fazem diferença no arremesso, na
                  fisgada, no conforto e na história que volta junto da pescaria.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <section className="border-y border-white/10 bg-graphite/70 py-20">
          <Reveal className="section-shell">
            <SectionHeading
              eyebrow="Preparação para diferentes pescarias"
              title="Da isca ao apoio, cada detalhe muda a experiência"
              text="A Pacu Pesca combina produtos essenciais com orientação para pescadores iniciantes e experientes escolherem de forma mais segura."
            />
            <div className="grid gap-5 lg:grid-cols-3">
              {experiences.map((item) => (
                <article
                  key={item.title}
                  className="overflow-hidden rounded-card border border-white/10 bg-charcoal"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                  </div>
                  <div className="min-h-44 p-5">
                    <h3 className="font-display text-3xl font-bold uppercase text-paper">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-smoke">
                      {item.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <ReviewsSection {...reviews} />

        <Reveal as="section" className="section-shell py-20">
          <div className="relative overflow-hidden rounded-card border border-white/10 bg-charcoal p-8 md:p-10">
            <Image
              src="/images/banners/duvidas-sobre-compra.png"
              alt="Atendimento Pacu Pesca para dúvidas sobre compra"
              fill
              sizes="100vw"
              className="absolute inset-0 -z-10 object-cover object-[72%_center] opacity-45"
            />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,6,7,0.96),rgba(5,6,7,0.82),rgba(5,6,7,0.56))]" />
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex rounded-card border border-lime/30 bg-lime/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-lime">
                Atendimento direto
              </p>
              <h2 className="font-display text-4xl font-bold uppercase leading-tight text-paper md:text-6xl">
                Precisa montar a tralha? Chame a Pacu Pesca
              </h2>
              <p className="mt-5 text-base leading-8 text-smoke md:text-lg">
                Tire dúvidas sobre produtos, escolha a categoria ideal e prepare
                sua compra com mais segurança antes de ir para o catálogo.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryLink href={whatsappUrl}>
                  Conversar pelo WhatsApp
                </PrimaryLink>
                <PrimaryLink href={catalogUrl} variant="dark">
                  Ver futuro e-commerce
                </PrimaryLink>
              </div>
            </div>
          </div>
        </Reveal>

        <section id="contato" className="section-shell py-20">
          <Reveal className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionHeading
                eyebrow="Localização e contato"
                title="Fale com quem entende de pescaria"
                text="A localização aparece como apoio para quem quer visitar a loja ou falar com atendimento. O foco da landing continua sendo apresentar a Pacu Pesca como marca especializada em pesca."
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <PrimaryLink href={whatsappUrl}>
                  Atendimento via WhatsApp
                </PrimaryLink>
                <PrimaryLink href={mapsUrl} variant="dark">
                  Abrir localização
                </PrimaryLink>
              </div>
            </div>
            <address className="not-italic">
              <div className="overflow-hidden rounded-card border border-white/10 bg-graphite">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/banners/frente-loja-pacu-pesca-fachada.png"
                    alt="Fachada da loja Pacu Pesca em Várzea Paulista"
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-3xl font-bold uppercase text-paper">
                    Pacu Pesca
                  </h3>
                  <div className="mt-5 grid gap-4 text-sm leading-7 text-smoke">
                    <p className="flex gap-3">
                      <MapPin
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-lime"
                        size={20}
                      />
                      <span>{address}</span>
                    </p>
                    <p className="flex gap-3">
                      <Phone
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-lime"
                        size={20}
                      />
                      <a className="focus-ring hover:text-lime" href={whatsappUrl}>
                        (11) 93397-3588
                      </a>
                    </p>
                    <p className="flex gap-3">
                      <MessageCircle
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-lime"
                        size={20}
                      />
                      <a className="focus-ring hover:text-lime" href={whatsappUrl}>
                        WhatsApp da loja
                      </a>
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold text-paper">
                    <a
                      className="focus-ring hover:text-lime"
                      href="https://www.instagram.com/pacu_pesca/"
                    >
                      Instagram
                    </a>
                    <a
                      className="focus-ring hover:text-lime"
                      href="https://www.facebook.com/PACUPESCAVARZEAPAULISTA/"
                    >
                      Facebook
                    </a>
                    <a className="focus-ring hover:text-lime" href={catalogUrl}>
                      Catálogo
                    </a>
                  </div>
                </div>
              </div>
            </address>
          </Reveal>
        </section>

        <Reveal as="section" className="section-shell -mt-10 relative z-10 pb-20">
          <div className="grid gap-px overflow-hidden rounded-card border border-white/10 bg-white/10 md:grid-cols-4">
            {features.map((item) => (
              <article
                key={item.title}
                className="min-h-40 bg-graphite/95 p-5"
              >
                <item.icon
                  aria-hidden="true"
                  className="mb-4 text-lime"
                  size={30}
                  strokeWidth={2.2}
                />
                <h2 className="text-base font-black uppercase text-paper">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-smoke">{item.text}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </main>

      <footer className="border-t border-white/10 bg-charcoal py-8">
        <div className="section-shell flex flex-col gap-5 text-sm text-smoke md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo/pacu-pesca-logo.png"
              width={120}
              height={104}
              alt="Pacu Pesca"
              className="h-14 w-auto object-contain"
            />
            <p>
              Pacu Pesca - artigos, equipamentos e acessórios para quem leva a
              pescaria a sério.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 font-bold">
            <a className="focus-ring hover:text-lime" href="#categorias">
              Categorias
            </a>
            <a className="focus-ring hover:text-lime" href="#produtos">
              Produtos
            </a>
            <a className="focus-ring hover:text-lime" href="#avaliacoes">
              Avaliações
            </a>
            <a className="focus-ring hover:text-lime" href={whatsappUrl}>
              WhatsApp
            </a>
            <a className="focus-ring hover:text-lime" href={mapsUrl}>
              Localização
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
