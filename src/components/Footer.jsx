import { useLocation, useNavigate } from 'react-router-dom'
import { Leaf, Mail, MapPin } from 'lucide-react'
import { CATEGORIES } from '../data/categories.js'

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  const goToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const linkClass = 'text-slate-500 transition-colors hover:text-brand-700'

  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
                <Leaf size={18} />
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-slate-900">
                DUOZI<span className="text-brand-600"> Health</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Premium OEM &amp; ODM health supplement manufacturer. Custom formulas, private label and
              global export for brands worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Products</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button onClick={() => goToSection('products')} className={linkClass}>
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><button onClick={() => goToSection('why-us')} className={linkClass}>Why Choose Us</button></li>
              <li><button onClick={() => goToSection('categories')} className={linkClass}>Categories</button></li>
              <li><button onClick={() => goToSection('contact')} className={linkClass}>Contact Us</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-brand-600" />
                sales@duozihealth.com
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-600" />
                Guangzhou Kangmeihui Biotechnology Co., Ltd.
                <br />
                Guangzhou, China
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Guangzhou Kangmeihui Biotechnology Co., Ltd. All rights reserved.</p>
          <p>OEM · ODM · Private Label · Global Export</p>
        </div>
      </div>
    </footer>
  )
}
