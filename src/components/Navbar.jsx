import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Heart, Leaf } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext.jsx'

const LINKS = [
  { id: 'products', label: 'Products' },
  { id: 'categories', label: 'Categories' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { count } = useFavorites()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goToSection = (id) => {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? 'border-slate-100 bg-white/90 shadow-sm backdrop-blur-md' : 'border-transparent bg-white'
      }`}
    >
      <div className="container-x flex min-h-[72px] items-center justify-between py-3.5">
        <Link to="/" className="flex items-center gap-2.5" aria-label="DUOZI Health home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft">
            <Leaf size={20} strokeWidth={2.2} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold tracking-tight text-slate-900">
              DUOZI<span className="text-brand-600"> Health</span>
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
              OEM · ODM Manufacturer
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => goToSection(link.id)}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() => goToSection('products')}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-700"
            aria-label="Saved products"
            title="Saved products"
          >
            <Heart size={18} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <button onClick={() => goToSection('contact')} className="btn-primary">
            Get Quote
          </button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-5 pb-5 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => goToSection(link.id)}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <button onClick={() => goToSection('contact')} className="btn-primary mt-3 w-full">
            Get Quote
          </button>
        </div>
      )}
    </header>
  )
}

