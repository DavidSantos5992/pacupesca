# Relatorio da Landing Local SEO - Pacu Pesca

Data: 02/07/2026  
Rota implementada: `/loja-de-pesca-varzea-paulista`  
Stack: Next.js App Router, SSG com ISR diario, Tailwind CSS, `next/image`

## Palavras-chave e fontes analisadas

Fontes consultadas para intencao de busca e vocabulario, sem copia literal de textos:

- Pacu Pesca Facebook: https://www.facebook.com/PACUPESCAVARZEAPAULISTA/
- Pacu Pesca Instagram: https://www.instagram.com/pacu_pesca/
- Tamakalu Pesk: https://www.facebook.com/tamakalupeskvarzeapaulista/
- Agropeska Tamakalu Instagram: https://www.instagram.com/agropeskatamakalu/
- Pescaki Jundiai: https://www.instagram.com/pescaki.agropesca/
- Cremonesi Jundiai: https://www.instagram.com/comercialcremonesi/
- NK Artigos para Pesca: https://nk-artigos-para-pesca.ueniweb.com/about-us/incrivel-loja-de-artigos-de-pesca-em-jundiai-3034907
- Triceleads Jundiai: https://triceleads.com/segmentos/loja-de-artigos-de-caca-pesca-e-camping/jundiai
- Lista Mais Campo Limpo Paulista: https://www.listamais.com.br/local/cad_idXDX5Z99/o-pescador-loja-de-pesca-em-campo-limpo-paulista-sp
- Encontra Campo Limpo: https://www.encontracampolimpo.com/empresas/comercial-fauna-e-flora/

Primarias:

- loja de pesca em Varzea Paulista
- artigos de pesca em Varzea Paulista
- loja de pesca perto de mim
- loja de artigos de pesca Varzea Paulista
- Pacu Pesca Varzea Paulista

Secundarias:

- loja de pesca Jundiai
- loja de pesca Campo Limpo Paulista
- pesca esportiva
- artigos de caca pesca e camping
- varas de pesca
- molinetes
- carretilhas
- iscas artificiais
- iscas naturais
- linhas de pesca
- anzois
- acessorios para pesca
- pesca em pesqueiro
- tilapia
- pesca noturna
- camping e pesca
- WhatsApp loja de pesca

## Wireframe e conteudo

- Header compacto com logo, links ancora e CTA WhatsApp.
- Hero full-bleed com banner local, H1 focado em "loja de pesca em Varzea Paulista", subtitulo e CTAs para WhatsApp e catalogo.
- Faixa de confianca com endereco local, WhatsApp, catalogo e contato direto.
- Grid de categorias: iscas, varas, molinetes, carretilhas, linhas/anzois e acessorios.
- Blocos de uso: pesqueiro pronto, tilapia/carpa/lazer, pesca noturna/camping.
- Secao de regiao atendida: Varzea Paulista, Jardim Mirante, Jundiai, Campo Limpo Paulista, Louveira e Itupeva.
- Secao de prova de coerencia: catalogo real, linguagem local e SEO sem copia.
- FAQ original com schema `FAQPage`.
- Contato final com endereco, WhatsApp, rota no mapa e catalogo.

## Sistema visual

- Base: fundo carvao/preto, textura sutil, contraste alto, produtos de pesca em destaque.
- Paleta: carvao `#050607`, grafite `#111817`, verde-limao `#A9F000`, azul agua `#009FE3`, laranja peixe/logo `#F05A24`, branco `#F8FAFC`.
- Tipografia: Montserrat para texto e Oswald para titulos condensados.
- Componentes: botoes de CTA, trust strip, cards de categoria, cards de produto/uso, FAQ, bloco de contato.
- Imagens: apenas ativos existentes da pasta `imagens/`, copiados para `public/images/`.

## SEO tecnico validado

- H1 unico na landing.
- H2/H3 semanticos por secao.
- `generateMetadata` com title, description, canonical, keywords, Open Graph e Twitter card.
- JSON-LD `SportingGoodsStore`/`LocalBusiness` com endereco, telefone, e-mail, URL, redes e area atendida.
- JSON-LD `FAQPage`.
- `src/app/sitemap.ts` com landing e rotas principais da loja.
- `src/app/robots.ts` permitindo indexacao da landing e apontando para sitemap.
- SSG/ISR: `revalidate = 86400`.
- Imagens renderizadas com `next/image`, dimensoes estaveis e `alt` descritivo.
- Sem horarios, coordenadas ou promocoes inventadas.

## Relatorio do agente validador

Checks executados:

- `npm run lint`: aprovado.
- `npm run build`: aprovado.
- `npm audit --omit=dev`: aprovado, 0 vulnerabilidades apos override de `postcss@8.5.16`.
- `curl -I /loja-de-pesca-varzea-paulista`: HTTP 200.
- Inspecao de HTML: meta description, canonical, Open Graph, H1 e JSON-LD presentes.
- Inspecao visual desktop no Safari: hero, header, CTAs e imagens renderizados.
- Inspecao visual mobile por janela estreita no Safari: header compacto, H1 e CTAs cabem na viewport.

Pendencias:

- Validar a estrategia final de deploy/proxy para servir a rota Next.js no dominio `pacupesca.com` sem interferir na Nuvemshop.
- Confirmar horarios de funcionamento antes de adicionar `openingHoursSpecification`.
- Confirmar coordenadas exatas antes de adicionar latitude/longitude ao schema.
