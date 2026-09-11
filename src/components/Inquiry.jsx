import { useState } from 'react'
import { Send, CheckCircle2, Mail, MapPin } from 'lucide-react'
import { PRODUCTS } from '../data/products.js'

const INITIAL = { name: '', company: '', email: '', product: '', message: '' }

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

export default function Inquiry({ defaultProduct = '', defaultMessage = '' }) {
  const [form, setForm] = useState({
    ...INITIAL,
    product: defaultProduct,
    message: defaultMessage,
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      // Submit to Netlify Forms (works when deployed on Netlify). The hidden
      // form in index.html registers the "inquiry" form for Netlify detection.
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'inquiry',
          name: form.name,
          company: form.company,
          email: form.email,
          product: form.product || 'General Inquiry',
          message: form.message,
        }),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100'

  return (
    <section id="contact" className="scroll-mt-24 bg-sand-50/60 py-20 lg:py-24">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Get in Touch</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Need your own supplement brand?
            </h2>
            <p className="mt-4 max-w-lg text-slate-600">
              We provide complete OEM/ODM solutions from formula development to finished products. Tell us
              about your project and our team will respond within 24 hours.
            </p>

            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-center gap-3 text-slate-600">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Mail size={18} />
                </span>
                sales@duozihealth.com
              </li>
              <li className="flex items-center gap-3 text-slate-600">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <MapPin size={18} />
                </span>
                Guangzhou Kangmeihui Biotechnology Co., Ltd. — Guangzhou, China
              </li>
            </ul>

            <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-6 shadow-card">
              <p className="font-semibold text-slate-900">What happens next?</p>
              <ol className="mt-4 space-y-3 text-sm text-slate-600">
                {[
                  'We review your requirements and product interests.',
                  'Our team replies with samples, pricing and MOQ details.',
                  'We develop your custom formula and packaging together.',
                ].map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="card p-6 sm:p-8">
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <CheckCircle2 size={48} className="text-brand-600" />
                <h3 className="mt-5 font-display text-2xl font-bold text-slate-900">Thank you!</h3>
                <p className="mt-2 max-w-sm text-slate-600">
                  Your inquiry has been received. Our team will contact you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setForm({ ...INITIAL, product: defaultProduct, message: defaultMessage })
                    setStatus('idle')
                  }}
                  className="btn-outline mt-6"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Name <span className="text-rose-500">*</span>
                    </label>
                    <input id="name" required value={form.name} onChange={update('name')} className={inputClass} placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Company
                    </label>
                    <input id="company" value={form.company} onChange={update('company')} className={inputClass} placeholder="Company name" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <input id="email" type="email" required value={form.email} onChange={update('email')} className={inputClass} placeholder="you@company.com" />
                </div>

                <div>
                  <label htmlFor="product" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Interested Product
                  </label>
                  <select id="product" value={form.product} onChange={update('product')} className={inputClass}>
                    <option value="">General Inquiry</option>
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                    <option value="Other">Other / Custom Product</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={update('message')}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about your target market, dosage form, packaging and order quantity…"
                  />
                </div>

                {status === 'error' && (
                  <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
                    Something went wrong. Please email us directly at sales@duozihealth.com
                  </p>
                )}

                <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60">
                  <Send size={18} />
                  {status === 'sending' ? 'Sending…' : 'Contact Us'}
                </button>
                <p className="text-center text-xs text-slate-400">
                  We respond within 24 hours. Your information is kept confidential.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
