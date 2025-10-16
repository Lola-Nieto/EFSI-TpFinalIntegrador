import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  descripcion: Yup.string().min(3, 'Debe tener al menos 3 caracteres').required('Requerido'),
  categoria: Yup.string().required('Requerido'),
  tipo: Yup.string().oneOf(['ingreso', 'gasto'], 'Debe ser ingreso o gasto').required('Requerido'),
  monto: Yup.number().positive('Debe ser un monto positivo').required('Requerido'),
  fecha: Yup.date().max(new Date(), 'La fecha no puede ser futura').required('Requerido')
});

const Formulario = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ descripcion: '', categoria: '', tipo: 'ingreso', monto: '', fecha: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Field type="text" name="descripcion" placeholder="Descripción" />
        <ErrorMessage name="descripcion" component="div" />
        <Field type="text" name="categoria" placeholder="Categoría" />
        <ErrorMessage name="categoria" component="div" />
        <Field as="select" name="tipo">
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </Field>
        <ErrorMessage name="tipo" component="div" />
        <Field type="number" name="monto" placeholder="Monto" />
        <ErrorMessage name="monto" component="div" />
        <Field type="date" name="fecha" />
        <ErrorMessage name="fecha" component="div" />
        <button type="submit">Guardar</button>
      </Form>
    </Formik>
  );
};

export default Formulario;
