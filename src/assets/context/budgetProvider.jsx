import React, { useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { BudgetContext, MOCK, DEFAULT_SETTINGS } from './budget.js'

export function BudgetProvider({ children }) {
  const [items, setItems] = useLocalStorage('mp_movs', MOCK)
  const [settings, setSettings] = useLocalStorage('mp_settings', DEFAULT_SETTINGS)

  const totals = useMemo(() => {
    const ingresos = items.filter(i=>i.type==='ingreso').reduce((a,b)=>a+b.amount,0)
    const gastos   = items.filter(i=>i.type==='gasto').reduce((a,b)=>a+b.amount,0)
    return { ingresos, gastos, balance: ingresos - gastos }
  }, [items])

  const api = {
    items,
    settings,
    totals,
    add(item)         { setItems(prev => [{...item, id: crypto.randomUUID()}, ...prev]) },
    update(id, patch) { setItems(prev => prev.map(i => i.id===id ? {...i, ...patch} : i)) },
    remove(id)        { setItems(prev => prev.filter(i => i.id!==id)) },
    reset()           { setItems([]) },
    setTheme(theme)   { setSettings(s => ({...s, theme})) },
  }

  // tema claro/oscuro
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', settings.theme === 'dark' ? 'dark' : 'light')
  }

  return <BudgetContext.Provider value={api}>{children}</BudgetContext.Provider>
}
