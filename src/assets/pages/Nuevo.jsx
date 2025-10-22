import Formulario from './Form';
import { addMovimiento } from '../helpers/storage';
import { useNavigate } from 'react-router-dom';

export default function Nuevo() {
  const navigate = useNavigate();

  const initialValues = { descripcion: '', categoria: '', tipo: '', monto: '', fecha: '' };

  const onSubmit = (values) => {
    const payload = { ...values, monto: Number(values.monto) };
    addMovimiento(payload);
    navigate('/');
  };
  

  return (
    <div className="page">
      <h1 className="page-title">Nuevo movimiento</h1>
      <div className="card">
        <Formulario initialValues={initialValues} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
