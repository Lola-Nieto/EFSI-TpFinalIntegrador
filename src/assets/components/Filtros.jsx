export default function Filtros({ filtro, onChange }) {
  const handle = (e) => onChange({ ...filtro, [e.target.name]: e.target.value });

  return (
    <div className="filters">
      <input
        type="text"
        name="q"
        value={filtro.q}
        onChange={handle}
        placeholder="Buscar por descripción o categoría…"
        className="input"
      />

      <select name="tipo" value={filtro.tipo} onChange={handle} className="select">
        <option value="">Tipo (todos)</option>
        <option value="ingreso">Ingreso</option>
        <option value="gasto">Gasto</option>
      </select>

      <select name="categoria" value={filtro.categoria} onChange={handle} className="select">
        <option value="">Categoría (todas)</option>
        <option value="Ingreso">Ingreso</option>
        <option value="Alimentación">Alimentación</option>
        <option value="Transporte">Transporte</option>
        <option value="Ocio">Ocio</option>
        <option value="Servicios">Servicios</option>
        <option value="Salud">Salud</option>
        <option value="Educación">Educación</option>
      </select>
    </div>
  );
}
