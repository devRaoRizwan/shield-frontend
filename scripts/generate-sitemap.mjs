// Regenerates public/sitemap.xml from the bundled product list. Runs on `npm run build`.
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "https://shieldhouse.pk";
const products = JSON.parse(readFileSync("src/data/products.json", "utf8"));

const urls = [
  { loc: "/", priority: "1.0" },
  { loc: "/shop", priority: "0.9" },
  { loc: "/about", priority: "0.6" },
  { loc: "/contact", priority: "0.6" },
  ...products
    .filter((p) => p.is_active)
    .map((p) => ({ loc: `/shop/${p.slug}`, priority: "0.8" })),
];

const body = urls
  .map(
    ({ loc, priority }) =>
      `  <url>\n    <loc>${SITE}${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  )
  .join("\n");

writeFileSync(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
);

console.log(`sitemap.xml: ${urls.length} URLs`);
