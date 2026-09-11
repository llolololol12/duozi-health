import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Check,
  Heart,
  FlaskConical,
  Package,
  Tags,
  Factory,
  ChevronRight,
} from 'lucide-react'
import { getProduct, PRODUCTS } from '../data/products.js'
import { categoryName } from '../data/categories.js'
import { useFavorites } from '../context/FavoritesContext.jsx'
import ProductCard from '../components/ProductCard.jsx'

const OEM_SERVICES = [
  { icon: FlaskConical, title: 'Formula Customization', desc: 'Tailored formulations developed by our R&D team.' },
  { icon: Package, title: 'Packaging Design', desc: 'Bottles, pouches, boxes and label-ready packaging.' },
  { icon: Tags, title: 'Label Development', desc: 'Compliant, brand-focused label artwork support.' },
  { icon: Factory, title: 'Production Support', desc: 'Full manufacturing from pilot batch to scale-up.' },
]

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProduct(id)
  const { isFavorite, toggleFavorite } = useFavorites()

  if (!product) {
    return (
      <div className="container-x flex flex-col items-center py-32 text-center">
        <h1 className="font-display text-2xl font-bold text-slate-900">Product not found</h1>
        <Link to="/" className="btn-primary mt-6">Back to home</Link>
      </div>
    )
  }

  const saved = isFavorite(product.id)
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const goToInquiry = (intent) => {
    navigate('/', { replace: true, state: { scrollTo: 'contact', product: product.name, intent } })
  }

  return (
    <div className="bg-white">
      <div className="container-x py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
          <Link to="/" className="transition-colors hover:text-brand-700">Home</Link>
          <ChevronRight size={15} className="text-slate-300" />
          <button onClick={() => navigate('/', { state: { scrollTo: 'products' } })} className="transition-colors hover:text-brand-700">
            Products
          </button>
          <ChevronRight size={15} className="text-slate-300" />
          <button onClick={() => navigate("/", { state: { scrollTo: "products" } })} className="transition-colors hover:text-brand-700">{categoryName(product.category)}</button>
          <ChevronRight size={15} className="text-slate-300" />
          <span className="truncate text-slate-700">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Image */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-brand-50 shadow-card">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              aria-label={saved ? 'Remove from saved' : 'Save product'}
              className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border shadow-sm backdrop-blur transition-colors ${
                saved
                  ? 'border-rose-200 bg-rose-50 text-rose-500'
                  : 'border-white/60 bg-white/80 text-slate-500 hover:text-rose-500'
              }`}
            >
              <Heart size={20} fill={saved ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Info */}
          <div>
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{product.shortDescription}</p>

            <div className="mt-8">
              <h2 className="font-display text-lg font-semibold text-slate-900">Product Benefits</h2>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="font-display text-lg font-semibold text-slate-900">Available Forms</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.forms.map((form) => (
                  <span key={form} className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700">
                    {form}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => goToInquiry('sample')} className="btn-primary">
                Request Sample
              </button>
              <button onClick={() => goToInquiry('inquiry')} className="btn-outline">
                Send Inquiry
              </button>
            </div>
          </div>
        </div>

        {/* OEM service */}
        <div className="mt-16 rounded-3xl bg-brand-900 p-8 sm:p-10 lg:p-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">OEM Service</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
              Everything you need to launch your brand
            </h2>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {OEM_SERVICES.map((service) => (
              <div key={service.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
                  <service.icon size={22} />
                </span>
                <h3 className="mt-4 font-semibold text-white">{service.title}</h3>
                <p className="mt-1.5 text-sm text-brand-100/70">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Factory features */}
        <div className="mt-10 flex flex-wrap gap-3">
          {product.features.map((feature) => (
            <span key={feature} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
              <Check size={15} className="text-brand-600" strokeWidth={3} />
              {feature}
            </span>
          ))}
        </div>

        <div className="mt-14 flex items-center gap-3">
          <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-700">
            <ArrowLeft size={17} />
            Back to products
          </button>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="border-t border-slate-100 bg-sand-50/60 py-16 lg:py-20">
          <div className="container-x">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">More in this category</p>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Related products
                </h2>
              </div>
              <button onClick={() => navigate('/', { state: { scrollTo: 'products' } })} className="hidden text-sm font-semibold text-brand-600 hover:text-brand-700 sm:block">
                View all →
              </button>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

