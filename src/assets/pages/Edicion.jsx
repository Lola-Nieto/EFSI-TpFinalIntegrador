import React, { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBudget } from '../hooks/useBudget.js'
import TransactionForm from '../components/TransactionForm.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function Editar() {
  const { id } = useParams()
  const nav = useNavigate()
  const { items, update, remove } = useBudget()
  const current = useMemo(()=> items.find(i=>i.id===id), [items, id])

  if (!current) return <EmptyState title="Movimiento no encontrado" hint="Volvé al listado para continuar." />

  async function handleSubmit(values, { setSubmitting }) {
    update(id, { ...values, amount: Number(values.amount) })
    setSubmitting(false)
    nav('/')
  }

  return (
    <>
      <div className="card" style={{marginBottom:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2 style={{margin:0}}>Editar movimiento</h2>
        <div className="actions">
          <button className="btn danger" onClick={()=>{
            if (confirm('¿Eliminar este movimiento?')) { remove(id); nav('/') }
          }}>Eliminar</button>
        </div>
      </div>

      <TransactionForm initialValues={current} onSubmit={handleSubmit} onCancel={()=>nav('/')} />
    </>
  )
}
