import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Formulario from './Form';
import { getMovimientoById, updateMovimiento } from '../helpers/storage';

export default function Edicion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const m = getMovimientoById(id);
    if (!m) { navigate('/'); return; }
    setInitialValues({
      descripcion: m.descripcion ?? '',
      categoria: m.categoria ?? '',
      tipo: m.tipo ?? '',
      monto: String(m.monto ?? ''),
      fecha: m.fecha ?? '',
    });
  }, [id, navigate]);

  const onSubmit = (values) => {
    const payload = { ...values, monto: Number(values.monto) };
    updateMovimiento(id, payload);
    navigate('/');
  };

  if (!initialValues) return null;

  return (
    <div className="page">
      <h1 className="page-title">Editar movimiento</h1>
      <div className="card">
        <Formulario initialValues={initialValues} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
