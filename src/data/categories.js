export const CATEGORIES = [
  {
    id: 'beauty',
    name: 'Beauty & Skin Care',
    tagline: 'Collagen, glutathione and whitening formulas for glow-from-within results.',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
    items: ['Collagen', 'Glutathione', 'Whitening Supplements'],
  },
  {
    id: 'womens-health',
    name: "Women's Health",
    tagline: 'Menopause support, probiotics and inositol crafted for every stage of life.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    items: ['Menopause Support', 'Probiotics', 'Inositol'],
  },
  {
    id: 'vitamins',
    name: 'Vitamins & Minerals',
    tagline: 'Daily essential vitamins and minerals, from single nutrients to multivitamins.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
    items: ['Vitamin C', 'Magnesium', 'Calcium D3', 'Multivitamin'],
  },
  {
    id: 'sports',
    name: 'Sports Nutrition',
    tagline: 'Protein, ketone and muscle-support formulas built for active performance.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    items: ['Protein Powder', 'BHB', 'Muscle Support'],
  },
]

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))

export function categoryName(id) {
  return CATEGORY_MAP[id]?.name ?? id
}

