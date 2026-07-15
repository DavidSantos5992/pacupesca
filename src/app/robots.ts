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
    sitemap: "https://pacupesca.com/sitemap.xml",
    host: "https://pacupesca.com",
  };
}
