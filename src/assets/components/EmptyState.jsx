import React from 'react'

export default function EmptyState({ title="Sin datos", hint="Agregá tu primer movimiento desde la pestaña Nuevo." }) {
  return (
    <div className="card center">
      <h3>{title}</h3>
      <p className="helper">{hint}</p>
    </div>
  )
}
