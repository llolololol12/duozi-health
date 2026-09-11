export const CATEGORIES = [
  {
    id: 'beauty',
    name: 'Beauty & Skin Care',
    tagline: 'Collagen, glutathione and whitening formulas for glow-from-within results.',
    image: '/images/category-beauty.svg',
    items: ['Collagen', 'Glutathione', 'Whitening Supplements'],
  },
  {
    id: 'womens-health',
    name: "Women's Health",
    tagline: 'Menopause support, probiotics and inositol crafted for every stage of life.',
    image: '/images/category-womens-health.svg',
    items: ['Menopause Support', 'Probiotics', 'Inositol'],
  },
  {
    id: 'vitamins',
    name: 'Vitamins & Minerals',
    tagline: 'Daily essential vitamins and minerals, from single nutrients to multivitamins.',
    image: '/images/category-vitamins.svg',
    items: ['Vitamin C', 'Magnesium', 'Calcium D3', 'Multivitamin'],
  },
  {
    id: 'sports',
    name: 'Sports Nutrition',
    tagline: 'Protein, ketone and muscle-support formulas built for active performance.',
    image: '/images/category-sports.svg',
    items: ['Protein Powder', 'BHB', 'Muscle Support'],
  },
]

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))

export function categoryName(id) {
  return CATEGORY_MAP[id]?.name ?? id
}
