import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pacupesca.com"),
  title: {
    default: "Pacu Pesca | Equipamentos de pesca esportiva",
    template: "%s | Pacu Pesca",
  },
  description:
    "Loja online Pacu Pesca com iscas artificiais, varas, molinetes, linhas, anzóis e acessórios para pesca esportiva.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pacu Pesca | Equipamentos de pesca esportiva",
    description:
      "MVP moderno da loja Pacu Pesca com navegação mobile-first, produtos em destaque e atendimento especializado.",
    url: "https://pacupesca.com",
    siteName: "Pacu Pesca",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://dcdn-us.mitiendanube.com/stores/004/667/562/themes/common/logo-1376414902-1754001335-1593be752904a9ded28c5659259d0f0c1754001335.png?0",
        width: 714,
        height: 695,
        alt: "Pacu Pesca",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
