/**
 * Product content is bundled with the site instead of fetched from an API, so
 * the shop and detail pages render with no network request and no cold start.
 * The catalogue is edited by changing data/products.json in the repository, which
 * makes Vercel rebuild and publish.
 */
import productsData from "../data/products.json";

const products = productsData.filter((product) => product.is_active !== false);

export function getProducts() {
  return products;
}

export function getProduct(slug) {
  return products.find((product) => product.slug === slug) || null;
}
