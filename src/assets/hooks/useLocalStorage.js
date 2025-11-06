import { useEffect, useState } from 'react'

const isBrowser = () => typeof window !== 'undefined' && !!window.localStorage

export default function useLocalStorage(key, initialValue) {
  const getInitial = () => {
    const fallback = typeof initialValue === 'function' ? initialValue() : initialValue
    if (!isBrowser()) return fallback
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? JSON.parse(raw) : fallback
    } catch (err) {
      // Puede fallar por JSON inválido o storage deshabilitado
      console.warn(`[useLocalStorage] read error for key "${key}":`, err)
      return fallback
    }
  }

  const [state, setState] = useState(getInitial)

  useEffect(() => {
    if (!isBrowser()) return
    try {
      window.localStorage.setItem(key, JSON.stringify(state))
    } catch (err) {
      // Puede fallar por cuota llena o modo privado
      console.warn(`[useLocalStorage] write error for key "${key}":`, err)
    }
  }, [key, state])

  return [state, setState]
}
