import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'duozi.favorites.v1'
const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // storage may be unavailable (private mode) — favorites simply won't persist
    }
  }, [favorites])

  const value = useMemo(() => {
    const isFavorite = (id) => favorites.includes(id)
    const toggleFavorite = (id) => {
      setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
    }
    return { favorites, isFavorite, toggleFavorite, count: favorites.length }
  }, [favorites])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider')
  return ctx
}
