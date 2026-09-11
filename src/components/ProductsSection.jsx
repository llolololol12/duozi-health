import { useMemo, useState } from 'react'
import { Search, Heart, SlidersHorizontal, X } from 'lucide-react'
import { PRODUCTS, CATEGORY_FILTERS } from '../data/products.js'
import { categoryName } from '../data/categories.js'
import ProductCard from './ProductCard.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'

export default function ProductsSection({ category, onCategoryChange }) {
  const [query, setQuery] = useState('')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const { isFavorite, count } = useFavorites()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PRODUCTS.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (favoritesOnly && !isFavorite(p.id)) return false
      if (!q) return true
      const haystack = [
        p.name,
        p.shortDescription,
        categoryName(p.category),
        ...p.tags,
        ...p.benefits,
        ...p.forms,
      ]
        .join(' ')
        .toLowerCase()
      return q.split(/\s+/).every((term) => haystack.includes(term))
    })
  }, [category, query, favoritesOnly, isFavorite])

  return (
    <section id="products" className="scroll-mt-24 py-20 lg:py-24">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Our Products</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Featured OEM supplement formulas
            </h2>
            <p className="mt-4 text-slate-600">
              Every product is available for OEM, private label and custom formulation — with low MOQ and
              full packaging support.
            </p>
          </div>
          <div className="shrink-0 text-sm font-medium text-slate-500">
            <span className="font-semibold text-brand-700">{results.length}</span> product{results.length === 1 ? '' : 's'} available
          </div>
        </div>

        {/* Controls */}
        <div className="mt-10 flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative flex-1 sm:max-w-md">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Collagen, Glutathione, Vitamin C, Gummy…"
                className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </label>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {CATEGORY_FILTERS.map((filter) => {
                const active = category === filter.id
                return (
                  <button
                    key={filter.id}
                    onClick={() => onCategoryChange(filter.id)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-brand-600 text-white shadow-soft'
                        : 'border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-700'
                    }`}
                  >
                    {filter.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setFavoritesOnly((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                favoritesOnly
                  ? 'bg-rose-50 text-rose-600 ring-1 ring-rose-200'
                  : 'border border-slate-200 text-slate-600 hover:border-rose-200 hover:text-rose-500'
              }`}
            >
              <Heart size={16} fill={favoritesOnly ? 'currentColor' : 'none'} />
              Saved
              {count > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-100 px-1 text-[11px] font-bold text-rose-600">
                  {count}
                </span>
              )}
            </button>
            {(query || category !== 'all' || favoritesOnly) && (
              <button
                onClick={() => {
                  setQuery('')
                  onCategoryChange('all')
                  setFavoritesOnly(false)
                }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-700"
              >
                <X size={15} />
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {results.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-16 text-center">
            <SlidersHorizontal size={28} className="text-slate-300" />
            <p className="mt-4 font-semibold text-slate-700">No products match your search</p>
            <p className="mt-1 text-sm text-slate-500">Try a different keyword or clear the filters.</p>
            <button
              onClick={() => {
                setQuery('')
                onCategoryChange('all')
                setFavoritesOnly(false)
              }}
              className="btn-outline mt-6"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
