import { ArrowRight } from 'lucide-react'
import { CATEGORIES } from '../data/categories.js'

export default function Categories({ onSelect }) {
  return (
    <section id="categories" className="scroll-mt-24 bg-sand-50/60 py-20 lg:py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Product Categories</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            A full range of health supplement categories
          </h2>
          <p className="mt-4 text-slate-600">
            Explore our core categories and discover ready-to-customize formulas for your brand.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-brand-50">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold text-slate-900">{cat.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{cat.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Explore
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
