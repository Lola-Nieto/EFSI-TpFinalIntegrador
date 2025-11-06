import React from 'react'
import { useBudget } from '../hooks/useBudget.js'
import { money } from '../../utils/format.js'

export default function Header() {
  const { totals } = useBudget()
  return (
    <header className="header">
      <div className="brand">💸 Mi Presupuesto</div>
      <div className="kpis">
        <div className="kpi">Ingresos: <strong>{money(totals.ingresos)}</strong></div>
        <div className="kpi">Gastos: <strong>{money(totals.gastos)}</strong></div>
        <div className="kpi">Balance: <strong>{money(totals.balance)}</strong></div>
      </div>
    </header>
  )
}
