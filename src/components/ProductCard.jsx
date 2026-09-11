import { Link } from 'react-router-dom'
import { Check, Heart, ArrowRight } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext.jsx'

export default function ProductCard({ product }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const saved = isFavorite(product.id)

  return (
    <Link
      to={`/product/${product.id}`}
      className="group card flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          aria-label={saved ? 'Remove from saved' : 'Save product'}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleFavorite(product.id)
          }}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border shadow-sm backdrop-blur transition-colors ${
            saved
              ? 'border-rose-200 bg-rose-50 text-rose-500'
              : 'border-white/60 bg-white/80 text-slate-500 hover:text-rose-500'
          }`}
        >
          <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-1.5">
          {product.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mt-3.5 font-display text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-brand-700">
          {product.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{product.shortDescription}</p>

        <ul className="mt-4 space-y-1.5">
          {product.benefits.slice(0, 3).map((benefit) => (
            <li key={benefit} className="flex items-center gap-2 text-sm text-slate-600">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Check size={11} strokeWidth={3} />
              </span>
              {benefit}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
            View Details
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}
