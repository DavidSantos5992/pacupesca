const googleReviewsUrl =
  "https://www.google.com/search?q=pacu+pesca&hl=pt-BR#lrd=0x94cf21f254fa0195:0xc20a600ea2c30b8c,1,,,,";

export type GoogleReview = {
  id: string;
  author: string;
  comment: string;
  rating: 5;
  createdAt: string;
  dateLabel?: string;
  profilePhotoUrl?: string;
};

export type GoogleReviewsFeed = {
  reviews: GoogleReview[];
  averageRating: number | null;
  totalReviewCount: number | null;
  sourceUrl: string;
  isConfigured: boolean;
  isFallback: boolean;
};

const fallbackReviews: GoogleReview[] = [
  {
    id: "anderson-oliveira",
    author: "Anderson oliveira",
    comment:
      "Gostaria de registrar minha satisfação com a empresa pelo excelente atendimento prestado. A equipe demonstrou profissionalismo, agilidade e comprometimento em todas as etapas do processo. O atendente foi extremamente prestativo, atencioso e sempre disposto a ajudar com todas as demandas apresentadas, oferecendo suporte de forma eficiente e cordial.\n\nParabenizo toda a equipe pela qualidade dos serviços e pelo atendimento de excelência.",
    rating: 5,
    createdAt: "",
    dateLabel: "2 semanas atrás",
  },
  {
    id: "maycon-giuseppe-guariento",
    author: "Maycon Giuseppe Guariento",
    comment:
      "Loja excelente, ótimo atendimento preços sem comparação estou muito satisfeito com os produtos e equipamentos adquiridos.\nAgora só compro lá.\nObg",
    rating: 5,
    createdAt: "",
    dateLabel: "6 meses atrás",
  },
  {
    id: "gabriel-grecco",
    author: "gabriel grecco",
    comment:
      "Lugar top , super bem atendido , tem tudo que precisa para pesca com preço acessível ate o mais top , recomendo !!",
    rating: 5,
    createdAt: "",
    dateLabel: "5 meses atrás",
  },
  {
    id: "rodrigo-silva-m",
    author: "Rodrigo silva m",
    comment: "Loja top compro meus materiais de pesca só nessa loja",
    rating: 5,
    createdAt: "",
    dateLabel: "7 meses atrás",
  },
  {
    id: "alex-barras-girau",
    author: "alex barras girau",
    comment: "Ótimo lugar para adquirir sua traía..",
    rating: 5,
    createdAt: "",
    dateLabel: "3 semanas atrás",
  },
  {
    id: "lima",
    author: "Lima",
    comment: "Ótimos preços com produtos de qualidades , super recomendo .",
    rating: 5,
    createdAt: "",
    dateLabel: "4 meses atrás",
  },
  {
    id: "cliente-pacu-pesca",
    author: "Cliente Pacu Pesca",
    comment:
      "Minha primeira experiência:\n\nÓtimo atendimento\nPreço incomparável\nDiversidade de equipamentos e produtos\nDiversas marcas\nFácil acesso\nEntre outras qualidades\n\nCom certeza voltarei",
    rating: 5,
    createdAt: "",
    dateLabel: "Avaliação do Google",
  },
  {
    id: "antonio-aparecido-chancehnow",
    author: "Antonio Aparecido Chanchencow",
    comment:
      "Um ótimo lugar para comprar material de pesca, variedade de produtos ótimo preço e bom atendimento",
    rating: 5,
    createdAt: "",
    dateLabel: "um ano atrás",
  },
  {
    id: "walderly-costa",
    author: "Walderly Costa",
    comment:
      "A melhor loja da região,uns dos melhores preços,não hesita em ajudar,sana todas as suas dúvidas e fora atendimento não é nota 10,é nota 1000.",
    rating: 5,
    createdAt: "",
    dateLabel: "4 anos atrás",
  },
  {
    id: "maicon-donizetti-da-silva",
    author: "Maicon Donizetti Da Silva",
    comment:
      "Fui muito bem atendido pelo dono da loja ME TIRO VARIAS DUVIDAS DE ISCAS VARAS DE PESCA e me forneceu uns de seus produto no preço maravilhoso ..... PACU PESCA SIM EU RECOMENDO.......",
    rating: 5,
    createdAt: "",
    dateLabel: "4 anos atrás",
  },
];

const fallbackFeed = (isConfigured: boolean): GoogleReviewsFeed => ({
  reviews: fallbackReviews,
  averageRating: 5,
  totalReviewCount: null,
  sourceUrl: googleReviewsUrl,
  isConfigured,
  isFallback: true,
});

type GoogleReviewsResponse = {
  reviews?: Array<{
    name?: string;
    reviewId?: string;
    reviewer?: {
      displayName?: string;
      profilePhotoUrl?: string;
      isAnonymous?: boolean;
    };
    starRating?: string;
    comment?: string;
    createTime?: string;
  }>;
  averageRating?: number;
  totalReviewCount?: number;
};

const stripResourcePrefix = (value: string) =>
  value.replace(/^(accounts|locations)\//, "");

async function getAccessToken() {
  const directToken = process.env.GOOGLE_BUSINESS_PROFILE_ACCESS_TOKEN;

  if (directToken) {
    return directToken;
  }

  const refreshToken = process.env.GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN;
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

  if (!refreshToken || !clientId || !clientSecret) {
    return null;
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Google OAuth respondeu com ${response.status}`);
  }

  const data = (await response.json()) as { access_token?: string };
  return data.access_token ?? null;
}

export async function getGoogleReviews(): Promise<GoogleReviewsFeed> {
  const accountId = process.env.GOOGLE_BUSINESS_PROFILE_ACCOUNT_ID;
  const locationId = process.env.GOOGLE_BUSINESS_PROFILE_LOCATION_ID;
  const isConfigured = Boolean(accountId && locationId);

  if (!isConfigured) {
    return fallbackFeed(false);
  }

  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      throw new Error("Credencial do Google Business Profile ausente");
    }

    const parent = `accounts/${stripResourcePrefix(accountId!)}/locations/${stripResourcePrefix(locationId!)}`;
    const params = new URLSearchParams({
      pageSize: "50",
      orderBy: "updateTime desc",
    });
    const response = await fetch(
      `https://mybusiness.googleapis.com/v4/${parent}/reviews?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      throw new Error(`Google Reviews respondeu com ${response.status}`);
    }

    const data = (await response.json()) as GoogleReviewsResponse;
    const reviews = (data.reviews ?? [])
      .filter((review) => review.starRating === "FIVE")
      .slice(0, 10)
      .map((review, index) => ({
        id: review.reviewId ?? review.name ?? `google-review-${index}`,
        author: review.reviewer?.displayName || "Cliente Pacu Pesca",
        comment: review.comment?.trim() || "Cliente avaliou a Pacu Pesca com 5 estrelas.",
        rating: 5 as const,
        createdAt: review.createTime ?? "",
        profilePhotoUrl: review.reviewer?.profilePhotoUrl,
      }));

    return {
      reviews,
      averageRating: data.averageRating ?? null,
      totalReviewCount: data.totalReviewCount ?? null,
      sourceUrl: googleReviewsUrl,
      isConfigured: true,
      isFallback: false,
    };
  } catch (error) {
    console.error("Não foi possível atualizar as avaliações do Google.", error);
    return fallbackFeed(true);
  }
}
