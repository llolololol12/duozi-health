export const CATEGORIES = [
  {
    id: "gummies", name: "Gummies", tagline: "112 products \u00b7 OEM / ODM ready", image: "/images/products/product-F1.webp", items: ["Skin Whitening Gummies", "Biotin Gummies", "Hip & Breast Gummies", "Multivitamin Gummies"],
  },
  {
    id: "capsules", name: "Capsules", tagline: "53 products \u00b7 OEM / ODM ready", image: "/images/products/product-G1.webp", items: ["Nmn Capsules", "Maca Capsules", "Maca Capsules", "Maca Plus 120pcs Capsules"],
  },
  {
    id: "powder", name: "Powder", tagline: "30 products \u00b7 OEM / ODM ready", image: "/images/products/product-B1.webp", items: ["Collagen Powder", "Collagen Powder", "Collagen Glutathione", "Collagen Glutathione"],
  },
  {
    id: "tablets", name: "Tablets", tagline: "26 products \u00b7 OEM / ODM ready", image: "/images/products/product-C1.webp", items: ["Butt Booster Tablets", "Fertility Tablets", "Fertility Tablets", "7Days Slim Plus Fat"],
  },
  {
    id: "softgels", name: "Softgels", tagline: "15 products \u00b7 OEM / ODM ready", image: "/images/products/product-D1.webp", items: ["Fish Oil Softgels", "Pure Evening Primrose Oil Softgel", "Royal Jelly Softgels", "Vitamin E Softgel"],
  },
  {
    id: "drinks", name: "Drinks", tagline: "22 products \u00b7 OEM / ODM ready", image: "/images/products/product-A1.webp", items: ["7D Alpha Arbutin Drink", "Shilijit resin 50Grams", "Skin Whitening +Brightening Drink", "Hip Enlargement Drink"],
  },
  {
    id: "syrups", name: "Syrups", tagline: "3 products \u00b7 OEM / ODM ready", image: "/images/products/product-I1.webp", items: ["Exotic Soursop Bitters Syrup", "Booty Syrup", "Multi Collagen Peptides Syrup"],
  },
  {
    id: "effervescent", name: "Effervescent Tablets", tagline: "4 products \u00b7 OEM / ODM ready", image: "/images/products/product-J19.webp", items: ["Vitamin C 1000mg Effervescent Tablet", "Gluta Whitening Glowing Effervescent Tablet", "Curvy Booster Effervescent Tablet", "Collagen Effervescent Tablet"],
  },
  {
    id: "supreme", name: "Supreme Series", tagline: "29 products \u00b7 OEM / ODM ready", image: "/images/products/product-H1.webp", items: ["Multi Collagen Softgel", "Liposomal Glutathione Softgel", "Super Evening Primrose Oil Softgel", "Calcium 1200mg Tablet"],
  },
  {
    id: "chocolate", name: "Chocolates", tagline: "1 products \u00b7 OEM / ODM ready", image: "/images/products/product-K1.webp", items: ["Collagen white beans probiotics prebiotics chocolate"],
  },
  {
    id: "others", name: "Others", tagline: "2 products \u00b7 OEM / ODM ready", image: "/images/products/product-H30.webp", items: ["L-Arginine L-Citrulline 100Tablets", "Glutathione 90000mg softgel"],
  },
]

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))
export function categoryName(id) { return CATEGORY_MAP[id]?.name ?? id }
