import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useBudget } from '../hooks/useBudget.js'
import TransactionForm from '../components/TransactionForm.jsx'

export default function Nuevo() {
  const { add } = useBudget()
  const nav = useNavigate()

  async function handleSubmit(values, { setSubmitting }) {
    add({ ...values, amount: Number(values.amount) })
    setSubmitting(false)
    nav('/')
  }

  return (
    <>
      <h2 className="card" style={{marginBottom:12}}>Nuevo movimiento</h2>
      <TransactionForm onSubmit={handleSubmit} onCancel={()=>nav('/')} />
    </>
  )
}
