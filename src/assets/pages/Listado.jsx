import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useBudget } from '../hooks/useBudget.js'
import Filters from '../components/Filtros.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { money } from '../../utils/format.js'


function applyFilters(items, f) {
  if (!f) return items
  let out = [...items]
  if (f.q) {
    const q = f.q.toLowerCase()
    out = out.filter(i => i.desc.toLowerCase().includes(q))
  }
  if (f.type && f.type !== 'all') out = out.filter(i => i.type === f.type)
  if (f.cat && f.cat !== 'all' && f.cat.trim() !== '') {
    const c = f.cat.toLowerCase()
    out = out.filter(i => i.cat.toLowerCase() === c)
  }
  if (f.min !== '' && !Number.isNaN(Number(f.min))) out = out.filter(i => i.amount >= Number(f.min))
  if (f.max !== '' && !Number.isNaN(Number(f.max))) out = out.filter(i => i.amount <= Number(f.max))
  if (f.from) out = out.filter(i => i.date >= f.from)
  if (f.to) out = out.filter(i => i.date <= f.to)

  switch (f.order) {
    case 'date_asc': out.sort((a,b)=> a.date.localeCompare(b.date)); break
    case 'amount_desc': out.sort((a,b)=> b.amount - a.amount); break
    case 'amount_asc': out.sort((a,b)=> a.amount - b.amount); break
    case 'date_desc':
    default: out.sort((a,b)=> b.date.localeCompare(a.date)); break
  }
  return out
}

export default function Listado() {
  const { items, remove } = useBudget()
  const [filters, setFilters] = useState(null)
  const data = useMemo(()=>applyFilters(items, filters), [items, filters])

  if (!items.length) return <EmptyState title="No hay movimientos" hint="Cargá tu primer movimiento desde la pestaña Nuevo." />

  return (
    <>
      <Filters onChange={setFilters} />
      <div className="card">
        <div className="actions" style={{marginBottom:8}}>
          <Link to="/nuevo" className="btn small">+ Nuevo</Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Tipo</th>
              <th>Monto</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map(m => (
              <tr key={m.id}>
                <td>{m.date}</td>
                <td>{m.desc}</td>
                <td><span className="badge">{m.cat}</span></td>
                <td><span className={`badge ${m.type}`}>{m.type}</span></td>
                <td>{money(m.amount)}</td>
                <td className="actions">
                  <Link to={`/editar/${m.id}`} className="btn small ghost">Editar</Link>
                  <button className="btn small danger" onClick={()=>{
                    if (confirm('¿Eliminar este movimiento?')) remove(m.id)
                  }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!data.length && <p className="helper center" style={{marginTop:10}}>No hay resultados con los filtros aplicados.</p>}
      </div>
    </>
  )
}
