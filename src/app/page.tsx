import { CategoryGrid } from "@/components/store/category-grid";
import { Footer } from "@/components/store/footer";
import { Header } from "@/components/store/header";
import { Hero } from "@/components/store/hero";
import {
  BrandCarousel,
  FeaturedProducts,
  FishFinder,
  FloatingWhatsApp,
  MidBanner,
  Newsletter,
  SeoContent,
  Testimonials,
  TrustBar,
} from "@/components/store/home-sections";
import { products, siteConfig } from "@/lib/store-data";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.logo,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${siteConfig.whatsapp}`,
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
    sameAs: ["https://pacupesca.com"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/produtos/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Produtos em destaque Pacu Pesca",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        brand: {
          "@type": "Brand",
          name: product.brand,
        },
        image: product.image,
        category: product.category,
        url: `${siteConfig.url}${product.href}`,
        offers: {
          "@type": "Offer",
          price: product.price.toFixed(2),
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          url: `${siteConfig.url}${product.href}`,
        },
      },
    })),
  },
];

export default function Home() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <FeaturedProducts />
        <CategoryGrid />
        <FishFinder />
        <BrandCarousel />
        <MidBanner />
        <SeoContent />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
