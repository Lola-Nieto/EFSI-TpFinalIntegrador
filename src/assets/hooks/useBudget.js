import { useContext } from 'react'
import { BudgetContext } from '../context/budget.js'

export const useBudget = () => useContext(BudgetContext)
