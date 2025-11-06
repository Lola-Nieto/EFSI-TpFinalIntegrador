import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { iso } from '../../utils/format.js'

const Schema = Yup.object({
  desc: Yup.string().min(3,'Mínimo 3 caracteres').required('Requerido'),
  cat: Yup.string().required('Requerido'),
  type: Yup.mixed().oneOf(['ingreso','gasto']).required('Requerido'),
  amount: Yup.number().typeError('Debe ser número').positive('Debe ser positivo').required('Requerido'),
  date: Yup.date().max(new Date(), 'No puede ser futura').required('Requerido'),
})

export default function TransactionForm({ initialValues, onSubmit, onCancel }) {
  const init = initialValues ?? { desc:'', cat:'', type:'gasto', amount:'', date: iso(new Date()) }

  return (
    <div className="card">
      <Formik initialValues={init} validationSchema={Schema} onSubmit={onSubmit} enableReinitialize>
        {({ isSubmitting }) => (
          <Form className="row">
            <div>
              <label>Descripción</label>
              <Field name="desc" className="input" placeholder="Ej: Supermercado" />
              <div className="error"><ErrorMessage name="desc" /></div>
            </div>

            <div>
              <label>Categoría</label>
              <Field name="cat" className="input" placeholder="Ej: Alimentación" />
              <div className="error"><ErrorMessage name="cat" /></div>
            </div>

            <div>
              <label>Tipo</label>
              <Field as="select" name="type" className="select">
                <option value="gasto">Gasto</option>
                <option value="ingreso">Ingreso</option>
              </Field>
              <div className="error"><ErrorMessage name="type" /></div>
            </div>

            <div>
              <label>Monto</label>
              <Field name="amount" type="number" className="input" placeholder="Ej: 15000" />
              <div className="error"><ErrorMessage name="amount" /></div>
            </div>

            <div>
              <label>Fecha</label>
              <Field name="date" type="date" className="input" />
              <div className="error"><ErrorMessage name="date" /></div>
            </div>

            <div className="actions" style={{flexBasis:'100%'}}>
              {onCancel && <button type="button" className="btn ghost" onClick={onCancel}>Cancelar</button>}
              <button type="submit" className="btn" disabled={isSubmitting}>Guardar</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
