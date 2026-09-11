import { CheckCircle2 } from 'lucide-react'

const POINTS = [
  {
    title: 'GMP Certified Factory',
    desc: 'Manufacturing in certified facilities with strict hygiene and safety standards.',
  },
  {
    title: 'Professional R&D Team',
    desc: 'In-house formulation experts to develop products that match your market needs.',
  },
  {
    title: 'Flexible MOQ',
    desc: 'Low minimum order quantities to help emerging brands launch without heavy risk.',
  },
  {
    title: 'Global Export Experience',
    desc: 'Reliable international logistics and compliance support for markets worldwide.',
  },
  {
    title: 'Quality Control System',
    desc: 'Third-party tested raw materials and finished products for consistent quality.',
  },
]

const STATS = [
  { value: '10+', label: 'Years Experience' },
  { value: '500+', label: 'Custom Formulas' },
  { value: '50+', label: 'Export Countries' },
  { value: '100%', label: 'QC Inspected' },
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="scroll-mt-24 bg-brand-900 py-20 lg:py-24">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Why Choose Us</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your trusted OEM &amp; ODM manufacturing partner
            </h2>
            <p className="mt-4 max-w-xl text-brand-100/80">
              From formula development to finished products, we handle every step so you can focus on
              building your brand.
            </p>

            <ul className="mt-8 space-y-4">
              {POINTS.map((point) => (
                <li key={point.title} className="flex gap-3.5">
                  <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-emerald-300" />
                  <div>
                    <p className="font-semibold text-white">{point.title}</p>
                    <p className="mt-0.5 text-sm text-brand-100/70">{point.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-bold text-white">{stat.value}</dd>
                  <dd className="mt-1 text-xs font-medium text-brand-100/60">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <img
                  src="/images/factory/factory-overview.webp"
                  alt="GMP certified supplement manufacturing facility"
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-2xl border border-white/10 shadow-xl">
                  <img
                    src="/images/factory/factory-line.webp"
                    alt="Dietary supplement production line"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/10 shadow-xl">
                  <img
                    src="/images/factory/team.webp"
                    alt="DUOZI manufacturing team and company culture"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-brand-100 bg-white px-5 py-4 shadow-soft sm:block">
              <p className="font-display text-lg font-bold text-brand-700">GMP Certified</p>
              <p className="text-xs text-slate-500">Strict quality &amp; safety control</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


