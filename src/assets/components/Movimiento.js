const Movimiento = ({ movimiento, eliminarMovimiento }) => {
    return (
      <div>
        <p>{movimiento.descripcion}</p>
        <p>{movimiento.categoria}</p>
        <p>{movimiento.tipo === 'ingreso' ? '+' : '-'} ${movimiento.monto}</p>
        <p>{movimiento.fecha}</p>
        <button onClick={() => eliminarMovimiento(movimiento.id)}>Eliminar</button>
      </div>
    );
  };
  
  export default Movimiento;
  