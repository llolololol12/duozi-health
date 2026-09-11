// ---------------------------------------------------------------------------
// DUOZI Health — Product catalog
// ---------------------------------------------------------------------------
// This file is the single source of truth for the product catalog.
// It is intentionally a plain, flat array so it can be regenerated later from
// an Excel / CSV product library (one row per product).
//
// Field reference:
//   id             : stable slug used in URLs  (e.g. /product/marine-collagen)
//   name           : product name
//   category       : one of  beauty | womens-health | vitamins | sports
//   image          : path to the product image asset
//   shortDescription: one-line selling point shown on the card
//   tags           : short labels shown on the card (OEM / private label / etc.)
//   benefits       : product benefits shown on the detail page
//   forms          : available dosage forms (Powder / Capsule / Tablet / Gummy / Softgel)
//   oem            : whether OEM/ODM service is available
//   features       : factory-level advantages shown as a checklist
// ---------------------------------------------------------------------------

export const PRODUCTS = [
  // ── Beauty & Skin Care ────────────────────────────────────────────────
  {
    id: 'marine-collagen',
    name: 'OEM Marine Collagen Peptide Powder',
    category: 'beauty',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Low-molecular-weight marine collagen peptides for skin elasticity and daily beauty nutrition.',
    tags: ['OEM Available', 'Private Label', 'Custom Formula', 'Low MOQ'],
    benefits: ['Supports Skin Elasticity', 'Helps Beauty Nutrition', 'Easy Customization'],
    forms: ['Powder', 'Capsule', 'Tablet', 'Gummy', 'Softgel'],
    oem: true,
    features: ['Factory Direct', 'Low MOQ', 'Custom Packaging'],
  },
  {
    id: 'glutathione-complex',
    name: 'Glutathione Complex Capsules',
    category: 'beauty',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Antioxidant glutathione blends for brightening, detox and inner-glow support.',
    tags: ['OEM Available', 'Private Label', 'Custom Formula'],
    benefits: ['Antioxidant Protection', 'Brightening Support', 'Detox & Radiance'],
    forms: ['Capsule', 'Tablet', 'Softgel', 'Gummy'],
    oem: true,
    features: ['Factory Direct', 'Low MOQ', 'Custom Packaging'],
  },
  {
    id: 'whitening-softgels',
    name: 'Skin Whitening Softgels',
    category: 'beauty',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Multi-ingredient whitening softgels combining glutathione, vitamin C and botanicals.',
    tags: ['OEM Available', 'Private Label', 'Custom Formula'],
    benefits: ['Evens Skin Tone', 'Combats Dullness', 'Antioxidant Blend'],
    forms: ['Softgel', 'Capsule', 'Tablet'],
    oem: true,
    features: ['Factory Direct', 'Low MOQ', 'Custom Packaging'],
  },
  {
    id: 'beauty-collagen-gummies',
    name: 'Beauty Collagen Gummies',
    category: 'beauty',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Delicious collagen gummies that make daily beauty nutrition easy and enjoyable.',
    tags: ['OEM Available', 'Private Label', 'Custom Formula'],
    benefits: ['Supports Skin Elasticity', 'Hair & Nail Support', 'Great Taste'],
    forms: ['Gummy', 'Tablet'],
    oem: true,
    features: ['Factory Direct', 'Low MOQ', 'Custom Packaging'],
  },

  // ── Women's Health ────────────────────────────────────────────────────
  {
    id: 'menopause-support',
    name: 'Menopause Support Complex',
    category: 'womens-health',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Botanical and nutrient blends formulated to support comfort during menopause.',
    tags: ['OEM Available', 'Private Label', 'Custom Formula'],
    benefits: ['Hormonal Balance Support', 'Supports Comfort', 'Botanical Ingredients'],
    forms: ['Capsule', 'Tablet', 'Softgel'],
    oem: true,
    features: ['Factory Direct', 'Low MOQ', 'Custom Packaging'],
  },
  {
    id: 'womens-probiotics',
    name: "Women's Probiotics",
    category: 'womens-health',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Targeted probiotic strains for feminine, digestive and immune wellness.',
    tags: ['OEM Available', 'Private Label', 'Custom Formula'],
    benefits: ['Supports Gut Health', 'Feminine Wellness', 'Immune Support'],
    forms: ['Capsule', 'Powder', 'Tablet'],
    oem: true,
    features: ['Factory Direct', 'Low MOQ', 'Custom Packaging'],
  },
  {
    id: 'inositol-powder',
    name: 'Inositol Powder',
    category: 'womens-health',
    image: 'https://images.unsplash.com/photo-1557174361-f19736f5ca44?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Myo-inositol powder for metabolic and hormonal wellness in women.',
    tags: ['OEM Available', 'Private Label', 'Custom Formula'],
    benefits: ['Metabolic Support', 'Hormonal Wellness', 'Easy to Blend'],
    forms: ['Powder', 'Capsule', 'Tablet'],
    oem: true,
    features: ['Factory Direct', 'Low MOQ', 'Custom Packaging'],
  },
  {
    id: 'womens-multivitamin-gummies',
    name: "Women's Multivitamin Gummies",
    category: 'womens-health',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Complete daily multivitamin gummies designed for modern women on the go.',
    tags: ['OEM Available', 'Private Label', 'Custom Formula'],
    benefits: ['Daily Nutrient Coverage', 'Energy & Vitality', 'Great Taste'],
    forms: ['Gummy', 'Tablet'],
    oem: true,
    features: ['Factory Direct', 'Low MOQ', 'Custom Packaging'],
  },

  // ── Vitamins & Minerals ───────────────────────────────────────────────
  {
    id: 'vitamin-c-tablets',
    name: 'Vitamin C Tablets',
    category: 'vitamins',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'High-potency vitamin C for immunity, collagen support and antioxidant defense.',
    tags: ['OEM Available', 'Private Label', 'Custom Formula'],
    benefits: ['Immune Support', 'Antioxidant Defense', 'Collagen Synthesis'],
    forms: ['Tablet', 'Capsule', 'Powder', 'Gummy'],
    oem: true,
    features: ['Factory Direct', 'Low MOQ', 'Custom Packaging'],
  },
  {
    id: 'magnesium-complex',
    name: 'Magnesium Complex',
    category: 'vitamins',
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Highly bioavailable magnesium blends for muscle, sleep and recovery support.',
    tags: ['OEM Available', 'Private Label', 'Custom Formula'],
    benefits: ['Supports Relaxation', 'Muscle Recovery', 'Better Bioavailability'],
    forms: ['Capsule', 'Tablet', 'Powder', 'Gummy'],
    oem: true,
    features: ['Factory Direct', 'Low MOQ', 'Custom Packaging'],
  },
  {
    id: 'calcium-d3-softgels',
    name: 'Calcium + D3 Softgels',
    category: 'vitamins',
    image: 'https://images.unsplash.com/photo-1583912086096-8c60d75a53f9?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Calcium with vitamin D3 for bone strength and better calcium absorption.',
    tags: ['OEM Available', 'Private Label', 'Custom Formula'],
    benefits: ['Supports Bone Health', 'Enhanced Absorption', 'Muscle Function'],
    forms: ['Softgel', 'Capsule', 'Tablet'],
    oem: true,
    features: ['Factory Direct', 'Low MOQ', 'Custom Packaging'],
  },
  {
    id: 'daily-multivitamin',
    name: 'Daily Multivitamin Capsules',
    category: 'vitamins',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'All-in-one daily multivitamin capsules covering essential vitamins and minerals.',
    tags: ['OEM Available', 'Private Label', 'Custom Formula'],
    benefits: ['Complete Daily Coverage', 'Energy & Immunity', 'Convenient One-a-Day'],
    forms: ['Capsule', 'Tablet', 'Gummy'],
    oem: true,
    features: ['Factory Direct', 'Low MOQ', 'Custom Packaging'],
  },

  // ── Sports Nutrition ──────────────────────────────────────────────────
  {
    id: 'whey-protein',
    name: 'Whey Protein Isolate Powder',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Clean, fast-absorbing whey protein isolate for lean muscle and recovery.',
    tags: ['OEM Available', 'Private Label', 'Custom Formula'],
    benefits: ['Lean Muscle Support', 'Fast Absorption', 'Clean Label Option'],
    forms: ['Powder', 'Capsule', 'Tablet'],
    oem: true,
    features: ['Factory Direct', 'Low MOQ', 'Custom Packaging'],
  },
  {
    id: 'bhb-ketone',
    name: 'BHB Ketone Powder',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Exogenous BHB ketone powder for energy, focus and keto-lifestyle support.',
    tags: ['OEM Available', 'Private Label', 'Custom Formula'],
    benefits: ['Clean Energy', 'Focus Support', 'Keto Friendly'],
    forms: ['Powder', 'Capsule'],
    oem: true,
    features: ['Factory Direct', 'Low MOQ', 'Custom Packaging'],
  },
  {
    id: 'muscle-support',
    name: 'Muscle Support Capsules',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Amino-acid and botanical capsules formulated to support strength and recovery.',
    tags: ['OEM Available', 'Private Label', 'Custom Formula'],
    benefits: ['Supports Strength', 'Faster Recovery', 'Endurance Support'],
    forms: ['Capsule', 'Tablet', 'Powder'],
    oem: true,
    features: ['Factory Direct', 'Low MOQ', 'Custom Packaging'],
  },
  {
    id: 'pre-workout-sticks',
    name: 'Pre-Workout Stick Packs',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Portable single-serve pre-workout stick packs for energy and focus anywhere.',
    tags: ['OEM Available', 'Private Label', 'Custom Formula'],
    benefits: ['On-the-Go Convenience', 'Energy & Focus', 'Single-Serve Dosing'],
    forms: ['Powder', 'Stick Pack'],
    oem: true,
    features: ['Factory Direct', 'Low MOQ', 'Custom Packaging'],
  },
]

export const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Products' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'womens-health', label: "Women's Health" },
  { id: 'vitamins', label: 'Vitamins' },
  { id: 'sports', label: 'Sports Nutrition' },
]

export const FORM_OPTIONS = [
  'Powder',
  'Capsule',
  'Tablet',
  'Gummy',
  'Softgel',
]

export function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id)
}

