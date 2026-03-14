export const categories = [
  {
    slug: "new-arrivals",
    name: "New Arrivals",
    tagline: "Fresh silhouettes for after-dark confidence.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "tailored-sets",
    name: "Tailored Sets",
    tagline: "Sharp lines with soft movement.",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "night-edit",
    name: "Night Edit",
    tagline: "Monochrome essentials for city nights.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
  },
];

export const products = [
  {
    id: "od-001",
    slug: "obsidian-corset-top",
    name: "Obsidian Corset Top",
    price: "$128",
    category: "new-arrivals",
    sizeGuide: "True to size with structured bodice fit.",
    description:
      "A contour-focused corset top cut in matte stretch sateen. Built for sharp tailoring, clean layering, and main-character exits.",
    image:
      "https://images.unsplash.com/photo-1506629905607-c94296f4b3b0?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "od-002",
    slug: "midnight-column-skirt",
    name: "Midnight Column Skirt",
    price: "$146",
    category: "new-arrivals",
    sizeGuide: "Skims hips and falls straight through the hem.",
    description:
      "High-rise column skirt with a clean waistband and back slit. Minimal hardware, maximum presence.",
    image:
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "od-003",
    slug: "charcoal-blazer-dress",
    name: "Charcoal Blazer Dress",
    price: "$210",
    category: "tailored-sets",
    sizeGuide: "Relaxed shoulder with waist-defining single button.",
    description:
      "Sculpted mini blazer dress finished with satin lapels and discreet pocketing. Boardroom to rooftop without a costume change.",
    image:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "od-004",
    slug: "ink-wide-leg-trouser",
    name: "Ink Wide Leg Trouser",
    price: "$174",
    category: "tailored-sets",
    sizeGuide: "High waist, long inseam, fluid drape.",
    description:
      "Crisp pleated trousers designed to elongate and move with intent. Pair with corsetry or oversized shirting.",
    image:
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "od-005",
    slug: "void-slip-dress",
    name: "Void Slip Dress",
    price: "$164",
    category: "night-edit",
    sizeGuide: "Bias cut with adjustable straps.",
    description:
      "Liquid-touch slip dress with a minimalist neckline and barely-there seams. Engineered for low lighting and high impact.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "od-006",
    slug: "onyx-mesh-bodysuit",
    name: "Onyx Mesh Bodysuit",
    price: "$112",
    category: "night-edit",
    sizeGuide: "Body-skimming stretch mesh with snap base.",
    description:
      "Semi-sheer long-sleeve bodysuit made to layer under tailoring or wear solo with unapologetic confidence.",
    image:
      "https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=900&q=80",
  },
];

export const featuredProducts = products.slice(0, 4);

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(slug) {
  return products.filter((product) => product.category === slug);
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}
