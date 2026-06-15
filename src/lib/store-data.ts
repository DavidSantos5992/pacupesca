export type Category = {
  name: string;
  href: string;
  image: string;
  description: string;
  featured?: boolean;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  oldPrice?: number;
  installments: string;
  pixLabel: string;
  badge?: string;
  stockLabel: string;
  href: string;
};

export type Brand = {
  name: string;
  highlight: string;
};

export type FishTarget = {
  name: string;
  setup: string;
  href: string;
};

export type Review = {
  name: string;
  location: string;
  text: string;
  rating: number;
};

export type TrustItem = {
  title: string;
  description: string;
};

export const siteConfig = {
  name: "Pacu Pesca",
  url: "https://pacupesca.com",
  logo:
    "https://dcdn-us.mitiendanube.com/stores/004/667/562/themes/common/logo-1376414902-1754001335-1593be752904a9ded28c5659259d0f0c1754001335-640-0.webp",
  description:
    "Compre produtos de pesca esportiva na Pacu Pesca. Iscas artificiais, varas, linhas, molinetes e acessórios com atendimento especializado.",
  whatsapp: "5511933973588",
  email: "pacupesca@yahoo.com",
  address: "Loja online de pesca esportiva com atendimento para todo o Brasil.",
  freeShippingLabel: "Frete grátis acima de R$300",
  installmentsLabel: "Parcele em até 12x",
};

export const heroImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85";

export const navItems = [
  "Varas",
  "Molinetes",
  "Carretilhas",
  "Linhas",
  "Iscas Artificiais",
  "Anzóis",
  "Acessórios",
  "Kits",
  "Vestuário",
  "Promoções",
];

export const categories: Category[] = [
  {
    name: "Varas",
    href: "/produtos/?categoria=varas",
    image:
      "https://images.unsplash.com/photo-1541742425281-c1d3fc8aff96?auto=format&fit=crop&w=900&q=80",
    description: "Modelos para carretilha, molinete e telescópicas.",
    featured: true,
  },
  {
    name: "Molinetes",
    href: "/produtos/?categoria=molinetes",
    image:
      "https://dcdn-us.mitiendanube.com/stores/004/667/562/products/br-11134207-7r98o-lskma9qfcgmzd9-353546d65d46f1cb0717162337776029-480-0.webp",
    description: "Equipamentos leves, médios e robustos para sua pescaria.",
  },
  {
    name: "Carretilhas",
    href: "/produtos/?categoria=carretilhas",
    image:
      "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=900&q=80",
    description: "Precisão para arremessos e pesca esportiva.",
  },
  {
    name: "Linhas",
    href: "/produtos/?categoria=linhas",
    image:
      "https://dcdn-us.mitiendanube.com/stores/004/667/562/products/4-capa-53d2ba0e9e77ec700a17173754401987-480-0.webp",
    description: "Monofilamento, multifilamento e fluorcarbono.",
  },
  {
    name: "Iscas",
    href: "/produtos/?categoria=iscas",
    image:
      "https://dcdn-us.mitiendanube.com/stores/004/667/562/products/1-5-80bae3e980998ea42d17173768205116-480-0.webp",
    description: "Artificiais, softs, superfície e meia água.",
    featured: true,
  },
  {
    name: "Anzóis",
    href: "/produtos/?categoria=anzois",
    image:
      "https://dcdn-us.mitiendanube.com/stores/004/667/562/products/1-00-1-b8b2ca32f42a8dbb8317173771356071-480-0.webp",
    description: "Opções para peixes de pequeno a grande porte.",
  },
  {
    name: "Boias",
    href: "/produtos/?categoria=boias",
    image:
      "https://dcdn-us.mitiendanube.com/stores/004/667/562/products/br-11134207-7r98o-llv3h3lggxyuc5-63031174064d00887d17159192704111-480-0.webp",
    description: "Boias cevadeiras, torpedos e sinalizadoras.",
  },
  {
    name: "Alicates",
    href: "/produtos/?categoria=alicates",
    image:
      "https://dcdn-us.mitiendanube.com/stores/004/667/562/products/br-11134201-23010-ga6wghej2zlva9-779f35f7c2ab56734c17159202264282-480-0.webp",
    description: "Ferramentas para montagem e manuseio seguro.",
  },
  {
    name: "Vestuário",
    href: "/produtos/?categoria=vestuario",
    image:
      "https://dcdn-us.mitiendanube.com/stores/004/667/562/products/br-11134207-7r98o-ln3bjhdalwasa5-87021992a82f40dd4417162332594847-480-0.webp",
    description: "Proteção solar, conforto e visual outdoor.",
  },
];

export const fishTargets: FishTarget[] = [
  { name: "Pacu", setup: "Massas, boias, anzóis e linhas de resistência.", href: "/produtos/?peixe=pacu" },
  { name: "Tambaqui", setup: "Kits reforçados para pesqueiros e lagos.", href: "/produtos/?peixe=tambaqui" },
  { name: "Tilápia", setup: "Montagens leves, varas sensíveis e iscas naturais.", href: "/produtos/?peixe=tilapia" },
  { name: "Traíra", setup: "Iscas de superfície, frogs e líderes resistentes.", href: "/produtos/?peixe=traira" },
  { name: "Tucunaré", setup: "Zaras, sticks, jigs e carretilhas rápidas.", href: "/produtos/?peixe=tucunare" },
  { name: "Robalo", setup: "Softs, jig heads e varas de ação rápida.", href: "/produtos/?peixe=robalo" },
];

export const products: Product[] = [
  {
    id: "robozinho-varas",
    name: "Suporte Robozinho para Varas Telescópicas Alta Qualidade",
    brand: "Pacu Pesca",
    category: "Acessórios",
    image:
      "https://dcdn-us.mitiendanube.com/stores/004/667/562/products/robozinho-91d12250d65ebee5a817173742512877-480-0.webp",
    price: 34.9,
    oldPrice: 44.9,
    installments: "até 3x de R$11,63",
    pixLabel: "R$33,16 no Pix",
    badge: "Mais vendido",
    stockLabel: "Pronta entrega",
    href: "/produtos/suportes-robozinho-para-varas-telescopicas-alta-qualidade/",
  },
  {
    id: "molinete-ultra-light",
    name: "Molinete Ultra Light para Pesca Esportiva",
    brand: "Marine Sports",
    category: "Molinetes",
    image:
      "https://dcdn-us.mitiendanube.com/stores/004/667/562/products/br-11134207-7r98o-lskma9qfcgmzd9-353546d65d46f1cb0717162337776029-480-0.webp",
    price: 189.9,
    oldPrice: 219.9,
    installments: "até 10x de R$18,99",
    pixLabel: "5% off no Pix",
    badge: "Oferta",
    stockLabel: "Últimas unidades",
    href: "/produtos/",
  },
  {
    id: "linha-multifilamento",
    name: "Linha Multifilamento Verde Oliva 100m",
    brand: "Albatroz",
    category: "Linhas",
    image:
      "https://dcdn-us.mitiendanube.com/stores/004/667/562/products/4-capa-53d2ba0e9e77ec700a17173754401987-480-0.webp",
    price: 49.9,
    installments: "até 5x de R$9,98",
    pixLabel: "R$47,40 no Pix",
    badge: "Novo",
    stockLabel: "Envio rápido",
    href: "/produtos/",
  },
  {
    id: "isca-artificial",
    name: "Isca Artificial Meia Água para Tucunaré e Traíra",
    brand: "Maruri",
    category: "Iscas",
    image:
      "https://dcdn-us.mitiendanube.com/stores/004/667/562/products/1-5-80bae3e980998ea42d17173768205116-480-0.webp",
    price: 27.9,
    oldPrice: 34.9,
    installments: "até 2x de R$13,95",
    pixLabel: "R$26,50 no Pix",
    badge: "20% off",
    stockLabel: "Pronta entrega",
    href: "/produtos/",
  },
  {
    id: "boia-cevadeira",
    name: "Boia Cevadeira para Pesqueiro com Alta Flutuabilidade",
    brand: "Pacu Pesca",
    category: "Boias",
    image:
      "https://dcdn-us.mitiendanube.com/stores/004/667/562/products/br-11134207-7r98o-llv3h3lggxyuc5-63031174064d00887d17159192704111-480-0.webp",
    price: 22.9,
    installments: "até 2x de R$11,45",
    pixLabel: "R$21,76 no Pix",
    stockLabel: "Envio rápido",
    href: "/produtos/",
  },
  {
    id: "alicate-pesca",
    name: "Alicate de Pesca com Bico e Corte para Linha",
    brand: "Rapala",
    category: "Alicates",
    image:
      "https://dcdn-us.mitiendanube.com/stores/004/667/562/products/br-11134201-23010-ga6wghej2zlva9-779f35f7c2ab56734c17159202264282-480-0.webp",
    price: 64.9,
    oldPrice: 79.9,
    installments: "até 6x de R$10,81",
    pixLabel: "R$61,65 no Pix",
    badge: "Essencial",
    stockLabel: "Pronta entrega",
    href: "/produtos/",
  },
];

export const brands: Brand[] = [
  { name: "Marine Sports", highlight: "carretilhas e molinetes" },
  { name: "Shimano", highlight: "precisão premium" },
  { name: "Daiwa", highlight: "performance esportiva" },
  { name: "Rapala", highlight: "iscas e ferramentas" },
  { name: "Albatroz", highlight: "linhas e acessórios" },
  { name: "Maruri", highlight: "iscas artificiais" },
];

export const trustItems: TrustItem[] = [
  { title: "Entrega rápida", description: "Frete grátis acima de R$300 e envio para todo o Brasil." },
  { title: "Compra segura", description: "Ambiente protegido, pagamentos mockados e jornada clara." },
  { title: "Produtos originais", description: "Curadoria de marcas reconhecidas no mercado de pesca." },
  { title: "Atendimento especializado", description: "Dúvidas pelo WhatsApp com foco em pesca esportiva." },
];

export const reviews: Review[] = [
  {
    name: "Carlos Mendes",
    location: "São Paulo, SP",
    text: "Comprei acessórios para pesqueiro e recebi orientação certeira pelo WhatsApp.",
    rating: 5,
  },
  {
    name: "Renata Prado",
    location: "Campinas, SP",
    text: "A seleção de iscas e linhas facilitou muito montar o kit para o fim de semana.",
    rating: 5,
  },
  {
    name: "João Henrique",
    location: "Atibaia, SP",
    text: "Loja direta, confiável e com produtos que chegam prontos para a pescaria.",
    rating: 5,
  },
];

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
