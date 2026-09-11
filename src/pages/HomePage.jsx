import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import Categories from '../components/Categories.jsx'
import ProductsSection from '../components/ProductsSection.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import Inquiry from '../components/Inquiry.jsx'

export default function HomePage() {
  const [category, setCategory] = useState('all')
  const [inquiry, setInquiry] = useState({ product: '', message: '' })
  const location = useLocation()

  useEffect(() => {
    const state = location.state
    if (state?.product) {
      setInquiry({
        product: state.product,
        message:
          state.intent === 'sample'
            ? `I would like to request a sample of ${state.product}.`
            : `I would like to inquire about ${state.product}.`,
      })
    }
    if (state?.scrollTo) {
      requestAnimationFrame(() => {
        document.getElementById(state.scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
    if (state && (state.scrollTo || state.product)) {
      window.history.replaceState({}, '')
    }
  }, [location.state])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      <Hero onViewProducts={() => scrollTo('products')} onGetQuote={() => scrollTo('contact')} />
      <Categories
        onSelect={(id) => {
          setCategory(id)
          scrollTo('products')
        }}
      />
      <ProductsSection category={category} onCategoryChange={setCategory} />
      <WhyChooseUs />
      <Inquiry defaultProduct={inquiry.product} defaultMessage={inquiry.message} />
    </>
  )
}
