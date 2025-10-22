import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Schema = Yup.object({
  descripcion: Yup.string().min(3, 'Mínimo 3 caracteres').required('Requerido'),
  categoria: Yup.string().required('Requerido'),
  tipo: Yup.string().oneOf(['ingreso', 'gasto']).required('Requerido'),
  monto: Yup.number().typeError('Debe ser número').positive('Debe ser > 0').required('Requerido'),
  fecha: Yup.date().max(new Date(), 'No puede ser futura').required('Requerido'),
});

export default function Formulario({ initialValues, onSubmit }) {
  return (
    <Formik initialValues={initialValues} validationSchema={Schema} onSubmit={onSubmit} enableReinitialize>
      {({ isSubmitting }) => (
        <Form className="form">
          <label className="form-field">
            <span className="form-label">Descripción</span>
            <Field name="descripcion" className="input" />
            <ErrorMessage name="descripcion" component="div" className="form-error" />
          </label>

          <label className="form-field">
            <span className="form-label">Categoría</span>
            <Field as="select" name="categoria" className="select">
              <option value="">Seleccionar…</option>
              <option value="Ingreso">Ingreso</option>
              <option value="Alimentación">Alimentación</option>
              <option value="Transporte">Transporte</option>
              <option value="Ocio">Ocio</option>
              <option value="Servicios">Servicios</option>
              <option value="Salud">Salud</option>
              <option value="Educación">Educación</option>
            </Field>
            <ErrorMessage name="categoria" component="div" className="form-error" />
          </label>

          <label className="form-field">
            <span className="form-label">Tipo</span>
            <Field as="select" name="tipo" className="select">
              <option value="">Seleccionar…</option>
              <option value="ingreso">Ingreso</option>
              <option value="gasto">Gasto</option>
            </Field>
            <ErrorMessage name="tipo" component="div" className="form-error" />
          </label>

          <label className="form-field">
            <span className="form-label">Monto</span>
            <Field name="monto" type="number" step="0.01" className="input" />
            <ErrorMessage name="monto" component="div" className="form-error" />
          </label>

          <label className="form-field">
            <span className="form-label">Fecha</span>
            <Field name="fecha" type="date" className="input" />
            <ErrorMessage name="fecha" component="div" className="form-error" />
          </label>

          <div className="form-actions">
            <button type="submit" disabled={isSubmitting} className="btn btn-accent">Guardar</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
