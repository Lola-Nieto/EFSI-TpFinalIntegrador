export default function Movimiento({ m, onDelete }) {
  if (!m) return null;

  return (
    <tr className="table-row">
      <td className="table-cell">{m.descripcion}</td>
      <td className="table-cell">{m.categoria}</td>
      <td className="table-cell">{m.tipo}</td>
      <td className="table-cell">${Number(m.monto).toLocaleString('es-AR')}</td>
      <td className="table-cell">{m.fecha}</td>
      <td className="table-cell">
        <div className="action-group">
          <a href={`/editar/${m.id}`} className="btn btn-primary btn-sm">Editar</a>
          <button onClick={() => onDelete?.(m.id)} className="btn btn-danger btn-sm">Eliminar</button>
        </div>
      </td>
    </tr>
  );
}
