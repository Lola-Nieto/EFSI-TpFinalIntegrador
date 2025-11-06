import React, { useState, useMemo } from 'react'

export default function Filtros({ onChange }) {
  const [q, setQ] = useState('')
  const [type, setType] = useState('all')
  const [cat, setCat] = useState('all')
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [order, setOrder] = useState('date_desc')

  const snapshot = useMemo(()=>({ q, type, cat, min, max, from, to, order }),[q,type,cat,min,max,from,to,order])
  function emit() { onChange && onChange(snapshot) }

  return (
    <div className="toolbar card">
      <input className="input" placeholder="Buscar descripción..." value={q} onChange={e=>setQ(e.target.value)} onBlur={emit} />
      <select className="select" value={type} onChange={e=>{setType(e.target.value); emit()}}>
        <option value="all">Tipo (todos)</option>
        <option value="ingreso">Ingreso</option>
        <option value="gasto">Gasto</option>
      </select>
      <input className="input" placeholder="Categoría (texto exacto)" value={cat} onChange={e=>setCat(e.target.value)} onBlur={emit} />
      <input className="input" type="number" placeholder="Monto mín." value={min} onChange={e=>setMin(e.target.value)} onBlur={emit} />
      <input className="input" type="number" placeholder="Monto máx." value={max} onChange={e=>setMax(e.target.value)} onBlur={emit} />
      <input className="input" type="date" value={from} onChange={e=>{setFrom(e.target.value); emit()}} />
      <input className="input" type="date" value={to} onChange={e=>{setTo(e.target.value); emit()}} />
      <select className="select" value={order} onChange={e=>{setOrder(e.target.value); emit()}}>
        <option value="date_desc">Fecha ↓</option>
        <option value="date_asc">Fecha ↑</option>
        <option value="amount_desc">Monto ↓</option>
        <option value="amount_asc">Monto ↑</option>
      </select>
      <button className="btn ghost" onClick={emit}>Aplicar</button>
    </div>
  )
}
