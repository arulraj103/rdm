// ============================================================
// data.js — Centralized data store for categories and products
// No DOM manipulation. No event listeners. Data only.
// ============================================================

export const categories = [
  {
    id: "polo",
    name: "Polo",
    description: "Comfortable and stylish polo shirts for everyday wear. Crafted from breathable fabrics perfect for any casual or semi-formal setting.",
    image: "assets/images/categories/polo.jpg",
    priceRange: "₹220 – ₹250"
  },
  {
    id: "tshirts",
    name: "T-Shirts",
    description: "Classic and trendy tees for every mood. From solid basics to graphic prints, find the perfect fit for your style.",
    image: "assets/images/categories/tshirts.jpg",
    priceRange: "₹150 – ₹200"
  },
  {
    id: "shirts",
    name: "Shirts",
    description: "Versatile shirts that transition effortlessly from work to weekend. Available in a range of fabrics and patterns.",
    image: "assets/images/categories/shirts.jpg",
    priceRange: "₹350 – ₹550"
  },
  {
    id: "jeans",
    name: "Jeans",
    description: "Durable denim in every cut — slim, straight, or relaxed. Built to last and styled for everyday confidence.",
    image: "assets/images/categories/jeans.jpg",
    priceRange: "₹599 – ₹999"
  },
  {
    id: "formal",
    name: "Formal",
    description: "Sharp, professional attire for meetings, events, and occasions that demand a polished look.",
    image: "assets/images/categories/formal.jpg",
    priceRange: "₹699 – ₹1,200"
  },
  {
    id: "casual",
    name: "Casual",
    description: "Laid-back styles for everyday life. Comfortable cuts and easy-wearing fabrics you'll reach for again and again.",
    image: "assets/images/categories/casual.jpg",
    priceRange: "₹199 – ₹499"
  },
  {
    id: "kids",
    name: "Kids",
    description: "Playful, durable clothing made for active kids. Soft on skin, easy to wash, and made to move.",
    image: "assets/images/categories/kids.jpg",
    priceRange: "₹99 – ₹299"
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Complete your look with belts, caps, scarves, and more. The right accessory makes every outfit.",
    image: "assets/images/categories/accessories.jpg",
    priceRange: "₹99 – ₹399"
  }
];

export const products = [
  // ── Polo ────────────────────────────────────────────────────
  {
    id: "p001",
    name: "Premium Cotton Polo",
    category: "polo",
    price: 250,
    images: [
      "assets/images/products/polo-black-1.jpg",
      "assets/images/products/polo-black-2.jpg",
      "assets/images/products/polo-black-3.jpg"
    ],
    description: "Premium cotton polo designed for comfort and everyday style. The breathable fabric keeps you cool through long days.",
    material: "100% Cotton",
    fit: "Regular",
    gender: "Men",
    occasion: "Casual",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White"],
    availability: true,
    featured: true
  },
  {
    id: "p002",
    name: "Classic Pique Polo",
    category: "polo",
    price: 230,
    images: [
      "assets/images/products/polo-navy-1.jpg",
      "assets/images/products/polo-navy-2.jpg"
    ],
    description: "A timeless pique-textured polo in a range of versatile shades. Works as well at brunch as it does at the office.",
    material: "Cotton Pique",
    fit: "Slim",
    gender: "Men",
    occasion: "Casual",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Grey", "Olive"],
    availability: true,
    featured: false
  },
  {
    id: "p003",
    name: "Sport Performance Polo",
    category: "polo",
    price: 220,
    images: [
      "assets/images/products/polo-sport-1.jpg",
      "assets/images/products/polo-sport-2.jpg"
    ],
    description: "Moisture-wicking performance polo built for active use. Lightweight and quick-drying for sport and leisure alike.",
    material: "Polyester Blend",
    fit: "Athletic",
    gender: "Men",
    occasion: "Sport",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Red", "Blue"],
    availability: true,
    featured: true
  },

  // ── T-Shirts ─────────────────────────────────────────────────
  {
    id: "p004",
    name: "Essential Crew Neck Tee",
    category: "tshirts",
    price: 150,
    images: [
      "assets/images/products/tshirt-white-1.jpg",
      "assets/images/products/tshirt-white-2.jpg"
    ],
    description: "The essential everyday tee. Soft, durable, and available in multiple colours to build your wardrobe basics.",
    material: "100% Cotton",
    fit: "Regular",
    gender: "Unisex",
    occasion: "Casual",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Grey", "Navy"],
    availability: true,
    featured: true
  },
  {
    id: "p005",
    name: "Graphic Print Tee",
    category: "tshirts",
    price: 180,
    images: [
      "assets/images/products/tshirt-graphic-1.jpg",
      "assets/images/products/tshirt-graphic-2.jpg"
    ],
    description: "Express yourself with bold graphic prints on premium cotton. Preshrunk fabric that stays the same size wash after wash.",
    material: "100% Combed Cotton",
    fit: "Oversized",
    gender: "Unisex",
    occasion: "Casual",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    availability: true,
    featured: false
  },
  {
    id: "p006",
    name: "Women's V-Neck Tee",
    category: "tshirts",
    price: 160,
    images: [
      "assets/images/products/tshirt-vneck-1.jpg",
      "assets/images/products/tshirt-vneck-2.jpg"
    ],
    description: "A flattering V-neck cut in soft cotton jersey. Lightweight and relaxed for all-day comfort.",
    material: "Cotton Jersey",
    fit: "Relaxed",
    gender: "Women",
    occasion: "Casual",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blush", "White", "Teal"],
    availability: true,
    featured: false
  },

  // ── Shirts ────────────────────────────────────────────────────
  {
    id: "p007",
    name: "Oxford Button-Down Shirt",
    category: "shirts",
    price: 450,
    images: [
      "assets/images/products/shirt-oxford-1.jpg",
      "assets/images/products/shirt-oxford-2.jpg",
      "assets/images/products/shirt-oxford-3.jpg"
    ],
    description: "A wardrobe staple in classic Oxford cloth. Neat enough for the office, relaxed enough for weekends.",
    material: "Oxford Cotton",
    fit: "Regular",
    gender: "Men",
    occasion: "Smart Casual",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Light Blue", "Pink"],
    availability: true,
    featured: true
  },
  {
    id: "p008",
    name: "Linen Summer Shirt",
    category: "shirts",
    price: 380,
    images: [
      "assets/images/products/shirt-linen-1.jpg",
      "assets/images/products/shirt-linen-2.jpg"
    ],
    description: "Breathable linen construction ideal for warm days. A relaxed fit that keeps you cool and stylish.",
    material: "100% Linen",
    fit: "Relaxed",
    gender: "Men",
    occasion: "Casual",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "White", "Sage"],
    availability: true,
    featured: false
  },
  {
    id: "p009",
    name: "Slim Fit Check Shirt",
    category: "shirts",
    price: 420,
    images: [
      "assets/images/products/shirt-check-1.jpg",
      "assets/images/products/shirt-check-2.jpg"
    ],
    description: "A classic check pattern in a modern slim fit. Versatile enough for work and casual outings.",
    material: "Cotton Blend",
    fit: "Slim",
    gender: "Men",
    occasion: "Smart Casual",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blue Check", "Red Check"],
    availability: false,
    featured: false
  },

  // ── Jeans ─────────────────────────────────────────────────────
  {
    id: "p010",
    name: "Slim Fit Dark Denim",
    category: "jeans",
    price: 799,
    images: [
      "assets/images/products/jeans-slim-1.jpg",
      "assets/images/products/jeans-slim-2.jpg",
      "assets/images/products/jeans-slim-3.jpg"
    ],
    description: "Dark indigo slim-fit denim that dresses up or down. Five-pocket construction with a comfortable stretch.",
    material: "98% Cotton, 2% Elastane",
    fit: "Slim",
    gender: "Men",
    occasion: "Casual",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Dark Indigo", "Black"],
    availability: true,
    featured: true
  },
  {
    id: "p011",
    name: "Women's Straight Leg Jeans",
    category: "jeans",
    price: 699,
    images: [
      "assets/images/products/jeans-straight-1.jpg",
      "assets/images/products/jeans-straight-2.jpg"
    ],
    description: "Timeless straight-leg jeans with a high-rise waist. Medium-weight denim that holds its shape throughout the day.",
    material: "100% Cotton Denim",
    fit: "Straight",
    gender: "Women",
    occasion: "Casual",
    sizes: ["26", "28", "30", "32", "34"],
    colors: ["Light Wash", "Mid Wash", "Dark Wash"],
    availability: true,
    featured: false
  },

  // ── Formal ────────────────────────────────────────────────────
  {
    id: "p012",
    name: "Classic Formal Trousers",
    category: "formal",
    price: 850,
    images: [
      "assets/images/products/formal-trousers-1.jpg",
      "assets/images/products/formal-trousers-2.jpg"
    ],
    description: "Sharply tailored trousers in a wrinkle-resistant fabric. A professional essential that keeps its crease all day.",
    material: "Polyester Viscose",
    fit: "Regular",
    gender: "Men",
    occasion: "Formal",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Charcoal", "Navy", "Black"],
    availability: true,
    featured: true
  },
  {
    id: "p013",
    name: "Formal Blazer",
    category: "formal",
    price: 1200,
    images: [
      "assets/images/products/formal-blazer-1.jpg",
      "assets/images/products/formal-blazer-2.jpg",
      "assets/images/products/formal-blazer-3.jpg"
    ],
    description: "A structured single-breasted blazer that elevates any outfit. Notch lapels and a two-button front for a timeless look.",
    material: "Wool Blend",
    fit: "Tailored",
    gender: "Men",
    occasion: "Formal",
    sizes: ["38", "40", "42", "44", "46"],
    colors: ["Navy", "Charcoal"],
    availability: true,
    featured: false
  },

  // ── Casual ────────────────────────────────────────────────────
  {
    id: "p014",
    name: "Cotton Jogger Pants",
    category: "casual",
    price: 350,
    images: [
      "assets/images/products/casual-jogger-1.jpg",
      "assets/images/products/casual-jogger-2.jpg"
    ],
    description: "Super-soft cotton joggers with an elasticated waist and cuffed ankles. Perfect for home, gym, or errands.",
    material: "French Terry Cotton",
    fit: "Relaxed",
    gender: "Unisex",
    occasion: "Casual",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Navy", "Olive", "Black"],
    availability: true,
    featured: false
  },
  {
    id: "p015",
    name: "Hooded Sweatshirt",
    category: "casual",
    price: 499,
    images: [
      "assets/images/products/casual-hoodie-1.jpg",
      "assets/images/products/casual-hoodie-2.jpg",
      "assets/images/products/casual-hoodie-3.jpg"
    ],
    description: "A cosy pull-over hoodie in heavyweight fleece. Kangaroo pocket, adjustable drawstring hood, and ribbed cuffs.",
    material: "80% Cotton, 20% Polyester Fleece",
    fit: "Regular",
    gender: "Unisex",
    occasion: "Casual",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Grey Melange", "Navy", "Black"],
    availability: true,
    featured: true
  },

  // ── Kids ──────────────────────────────────────────────────────
  {
    id: "p016",
    name: "Kids Printed Tee",
    category: "kids",
    price: 149,
    images: [
      "assets/images/products/kids-tee-1.jpg",
      "assets/images/products/kids-tee-2.jpg"
    ],
    description: "Fun and colourful printed tees for active kids. Made from soft, breathable cotton that's gentle on young skin.",
    material: "100% Soft Cotton",
    fit: "Regular",
    gender: "Kids",
    occasion: "Casual",
    sizes: ["2–3Y", "4–5Y", "6–7Y", "8–9Y", "10–11Y"],
    colors: ["Red", "Blue", "Yellow", "Green"],
    availability: true,
    featured: true
  },

  // ── Accessories ───────────────────────────────────────────────
  {
    id: "p017",
    name: "Woven Leather Belt",
    category: "accessories",
    price: 299,
    images: [
      "assets/images/products/belt-leather-1.jpg",
      "assets/images/products/belt-leather-2.jpg"
    ],
    description: "A classic woven leather belt with a brushed-metal pin buckle. Pairs perfectly with jeans or formal trousers.",
    material: "Genuine Leather",
    fit: "One Size",
    gender: "Men",
    occasion: "Casual / Formal",
    sizes: ["S/M", "L/XL"],
    colors: ["Brown", "Black"],
    availability: true,
    featured: false
  },
  {
    id: "p018",
    name: "Structured Baseball Cap",
    category: "accessories",
    price: 199,
    images: [
      "assets/images/products/cap-baseball-1.jpg",
      "assets/images/products/cap-baseball-2.jpg"
    ],
    description: "A clean, structured six-panel cap with an adjustable back strap. UV-protective fabric for sunny days.",
    material: "Cotton Twill",
    fit: "Adjustable",
    gender: "Unisex",
    occasion: "Casual",
    sizes: ["One Size"],
    colors: ["Black", "Navy", "Olive", "White"],
    availability: true,
    featured: false
  }
];

// ── Helper functions ─────────────────────────────────────────────────────────

/**
 * Returns a category object by ID (case-insensitive, trimmed).
 * @param {string} id
 * @returns {object|undefined}
 */
export function getCategoryById(id) {
  if (!id) return undefined;
  const normalized = id.trim().toLowerCase();
  return categories.find((c) => c.id === normalized);
}

/**
 * Returns all products belonging to a given category ID.
 * @param {string} categoryId
 * @returns {Array}
 */
export function getProductsByCategory(categoryId) {
  if (!categoryId) return [];
  const normalized = categoryId.trim().toLowerCase();
  return products.filter((p) => p.category === normalized);
}

/**
 * Returns a product object by ID.
 * @param {string} id
 * @returns {object|undefined}
 */
export function getProductById(id) {
  if (!id) return undefined;
  return products.find((p) => p.id === id);
}

/**
 * Returns related products: same category, excluding the given product ID, up to `limit`.
 * @param {string} categoryId
 * @param {string} excludeId
 * @param {number} limit
 * @returns {Array}
 */
export function getRelatedProducts(categoryId, excludeId, limit = 4) {
  return getProductsByCategory(categoryId)
    .filter((p) => p.id !== excludeId)
    .slice(0, limit);
}

/**
 * Returns the store name used in document titles.
 */
export const STORE_NAME = "YourStore";

/**
 * WhatsApp number placeholder — replace with your actual number (digits only, with country code).
 * Example: "919876543210"
 */
export const WHATSAPP_NUMBER = "91XXXXXXXXXX";

/**
 * Store phone number placeholder.
 */
export const STORE_PHONE = "+91XXXXXXXXXX";
