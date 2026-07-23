import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/loja-de-pesca-varzea-paulista"],
        disallow: ["/admin/", "/account/", "/checkout/", "/search/"],
      },
    ],
    sitemap: "https://www.pacupesca.com/sitemap.xml",
    host: "https://www.pacupesca.com",
  };
}
