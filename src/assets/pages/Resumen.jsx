import React, { useMemo } from 'react'
import { useBudget } from '../hooks/useBudget.js'
import EmptyState from '../components/EmptyState.jsx'
import { money, toMonthKey } from '../../utils/format.js'
import {
  ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts'

export default function Resumen() {
  const { items, totals } = useBudget()

  const gastosByCat = useMemo(() => {
    const map = new Map()
    items.filter(i=>i.type==='gasto').forEach(i=>{
      map.set(i.cat, (map.get(i.cat) ?? 0) + i.amount)
    })
    return Array.from(map, ([name, value]) => ({ name, value }))
  }, [items])

  const mensual = useMemo(() => {
    const map = new Map()
    items.forEach(i=>{
      const k = toMonthKey(i.date)
      if (!map.has(k)) map.set(k, { month:k, ingresos:0, gastos:0, balance:0 })
      const row = map.get(k)
      if (i.type==='ingreso') row.ingresos += i.amount
      else row.gastos += i.amount
      row.balance = row.ingresos - row.gastos
    })
    return Array.from(map.values()).sort((a,b)=> a.month.localeCompare(b.month))
  }, [items])

  if (!items.length) return <EmptyState title="Sin datos para el resumen" hint="Agregá movimientos para ver gráficos." />

  const COLORS = ['#6a00ff','#0ea5e9','#34d399','#f59e0b','#ef4444','#8b5cf6','#22c55e','#fb7185']

  return (
    <>
      <div className="row" style={{marginBottom:16}}>
        <div className="card">
          <h3 style={{marginTop:0}}>Totales</h3>
          <p>Ingresos: <strong>{money(totals.ingresos)}</strong></p>
          <p>Gastos: <strong>{money(totals.gastos)}</strong></p>
          <p>Balance: <strong>{money(totals.balance)}</strong></p>
        </div>

        <div className="card">
          <h3 style={{marginTop:0}}>Distribución de gastos por categoría</h3>
          {gastosByCat.length ? (
            <div style={{width:'100%', height:300}}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={gastosByCat} dataKey="value" nameKey="name" outerRadius={110}>
                    {gastosByCat.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : <p className="helper">No hay gastos para graficar.</p>}
        </div>
      </div>

      <div className="card">
        <h3 style={{marginTop:0}}>Evolución mensual</h3>
        {mensual.length ? (
          <div style={{width:'100%', height:340}}>
          <ResponsiveContainer>
            <BarChart data={mensual}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.25)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,.6)" />
              <YAxis stroke="rgba(255,255,255,.6)" />
              <Tooltip
                contentStyle={{ background:'#111827', border:'1px solid rgba(255,255,255,.15)' }}
                itemStyle={{ color:'#fff' }}
                labelStyle={{ color:'#e5e7eb' }}
              />
              <Legend wrapperStyle={{ color:'#e5e7eb' }} />
              {/* Colores personalizados */}
              <Bar dataKey="ingresos" name="Ingresos" fill="#34d399" />   {/* verde */}
              <Bar dataKey="gastos"   name="Gastos"   fill="#f87171" />   {/* rojo */}
              <Bar dataKey="balance"  name="Balance"  fill="#60a5fa" />   {/* azul */}
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        ) : <p className="helper">No hay datos mensuales.</p>}
      </div>
    </>
  )
}
