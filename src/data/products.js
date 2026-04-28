export const products = [
  {
    slug: "shield-panel-a1",
    name: "Shield Panel A1",
    image: "/image.png",
    description: "High-density panel for heavy-duty environments.",
    customizationOption:
      "Available in custom sizes, thickness levels, and finish variations to match different installation needs.",
    details:
      "Built for demanding applications, Shield Panel A1 delivers durable surface protection with a clean engineered finish.",
  },
  {
    slug: "shield-coating-b2",
    name: "Shield Coating B2",
    image: "/g.png",
    description: "Weather-resistant coating for extended surface life.",
    customizationOption:
      "Can be customized by surface type, protective layer preference, and coverage requirement for specific projects.",
    details:
      "Shield Coating B2 helps surfaces resist wear, moisture, and changing outdoor conditions while keeping a refined appearance.",
  },
  {
    slug: "shell-frame-c3",
    name: "Shell Frame C3",
    image: "/shield-house-logo.png",
    description: "Reinforced frame designed for long-term stability.",
    customizationOption:
      "Supports customization for frame dimensions, reinforcement level, and project-specific structural preferences.",
    details:
      "Shell Frame C3 is designed to support strong structural performance with reliable strength for long-term installation use.",
  },
];

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}
