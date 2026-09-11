import { ArrowRight, BadgeCheck, Factory, Globe2, PackageCheck } from 'lucide-react'

const TRUST = [
  { icon: BadgeCheck, label: 'GMP Certified' },
  { icon: PackageCheck, label: 'Low MOQ' },
  { icon: Factory, label: 'Factory Direct' },
  { icon: Globe2, label: 'Global Export' },
]

export default function Hero({ onViewProducts, onGetQuote }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-900">
      <img
        src="https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=1600&q=80"
        alt="Premium health supplement manufacturing"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/95 via-brand-900/85 to-brand-800/40" />

      <div className="container-x py-20 sm:py-24 lg:py-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-50 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            OEM / ODM Supplement Manufacturer
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Premium OEM &amp; ODM
            <br className="hidden sm:block" /> Health Supplement
            <br className="hidden sm:block" /> Manufacturer
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-100/90">
            Custom Formula&nbsp;&nbsp;|&nbsp;&nbsp;Private Label&nbsp;&nbsp;|&nbsp;&nbsp;Global Export
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button onClick={onViewProducts} className="btn-light group">
              View Products
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={onGetQuote}
              className="btn inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Get Quote
            </button>
          </div>

          <ul className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3">
            {TRUST.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-sm font-medium text-brand-50/90">
                <item.icon size={17} className="text-emerald-300" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}


