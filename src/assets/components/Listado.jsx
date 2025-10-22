import { useState } from 'react';
import Movimiento from '../components/Movimiento';
import useLocalStorage from '../hooks/useLocalStorage';

const Listado = () => {
  const [movimientos, setMovimientos] = useLocalStorage('movimientos', []);
  const [filtro, setFiltro] = useState('');

  const eliminarMovimiento = (id) => {
    setMovimientos(movimientos.filter((movimiento) => movimiento.id !== id));
  };

  const movimientosFiltrados = movimientos.filter(
    (movimiento) =>
      movimiento.descripcion.toLowerCase().includes(filtro.toLowerCase()) ||
      movimiento.categoria.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      {movimientosFiltrados.map((movimiento) => (
        <Movimiento key={movimiento.id} movimiento={movimiento} eliminarMovimiento={eliminarMovimiento} />
      ))}
    </div>
  );
};

export default Listado;
