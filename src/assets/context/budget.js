import { createContext } from 'react'
import { iso } from '../../utils/format.js'

export const BudgetContext = createContext(null)

export const MOCK = () => ([
  { id: crypto.randomUUID(), desc:'Sueldo', cat:'Trabajo', type:'ingreso', amount: 500000, date: iso(new Date()) },
  { id: crypto.randomUUID(), desc:'Supermercado', cat:'Alimentación', type:'gasto', amount: 65000, date: iso(new Date()) },
  { id: crypto.randomUUID(), desc:'Colectivo', cat:'Transporte', type:'gasto', amount: 1200, date: iso(new Date()) },
])

export const DEFAULT_SETTINGS = { theme:'light' }
