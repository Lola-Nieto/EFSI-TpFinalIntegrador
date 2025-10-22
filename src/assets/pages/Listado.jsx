import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

/* ====== almacenamiento local sin helpers ====== */
const LS_KEY = 'movimientos';

const lsGet = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); }
  catch { return []; }
};
const lsSet = (arr) => localStorage.setItem(LS_KEY, JSON.stringify(arr));
const seed = () => ([
  { id: crypto.randomUUID(), descripcion: 'Sueldo',       categoria: 'Ingreso',     tipo: 'ingreso', monto: 500000, fecha: '2025-10-01' },
  { id: crypto.randomUUID(), descripcion: 'Supermercado', categoria: 'Alimentación', tipo: 'gasto',   monto: 68000,  fecha: '2025-10-05' },
  { id: crypto.randomUUID(), descripcion: 'SUBE',         categoria: 'Transporte',  tipo: 'gasto',   monto: 2500,   fecha: '2025-10-06' },
]);
const ensureSeed = () => { const cur = lsGet(); if (!cur.length) lsSet(seed()); };
const delById = (id) => lsSet(lsGet().filter(m => m.id !== id));
/* =============================================== */

export default function Listado() {
  const [items, setItems] = useState([]);
  const [filtro, setFiltro] = useState({ q: '', tipo: '', categoria: '' });

  useEffect(() => {
    ensureSeed();          // si está vacío, carga 3
    setItems(lsGet());     // lee storage
  }, []);

  const recargar = () => setItems(lsGet());
  const vaciar = () => { localStorage.removeItem(LS_KEY); recargar(); };
  const cargarDemo = () => { lsSet(seed()); recargar(); };
  const onDelete = (id) => { delById(id); recargar(); };

  const handleChange = (e) => setFiltro(f => ({ ...f, [e.target.name]: e.target.value }));

  const filtrados = useMemo(() => {
    const q = filtro.q.trim().toLowerCase();
    return items.filter(m => {
      const matchQ = !q || m.descripcion?.toLowerCase().includes(q) || m.categoria?.toLowerCase().includes(q);
      const matchTipo = !filtro.tipo || m.tipo === filtro.tipo;
      const matchCat  = !filtro.categoria || m.categoria === filtro.categoria;
      return matchQ && matchTipo && matchCat;
    });
  }, [items, filtro]);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Listado de movimientos</h1>
        <div style={{display:'flex', gap:8}}>
          <Link to="/nuevo" className="btn btn-accent">+ Nuevo</Link>
        </div>
      </div>

      {/* Panel de diagnóstico SIEMPRE visible */}
      <div className="card" style={{display:'flex', gap:12, alignItems:'center', flexWrap:'wrap'}}>
        <span>Guardados: <b>{items.length}</b></span>
        <span>Filtrados: <b>{filtrados.length}</b></span>
        <button className="btn btn-outline" onClick={recargar}>↻ Recargar</button>
        <button className="btn" onClick={cargarDemo}>Cargar ejemplos</button>
        <button className="btn btn-outline" onClick={vaciar}>Vaciar datos</button>
        <button className="btn btn-outline" onClick={() => alert(localStorage.getItem(LS_KEY) || '[]')}>Ver JSON</button>
      </div>

      {/* Filtros inline */}
      <div className="filters">
        <input
          className="input"
          name="q"
          placeholder="Buscar por descripción o categoría…"
          value={filtro.q}
          onChange={handleChange}
        />
        <select className="select" name="tipo" value={filtro.tipo} onChange={handleChange}>
          <option value="">Tipo (todos)</option>
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
        <select className="select" name="categoria" value={filtro.categoria} onChange={handleChange}>
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

      {filtrados.length === 0 ? (
        <div className="card">No hay movimientos que coincidan con tu búsqueda.</div>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr className="table-head-row">
                <th className="table-head">Descripción</th>
                <th className="table-head">Categoría</th>
                <th className="table-head">Tipo</th>
                <th className="table-head">Monto</th>
                <th className="table-head">Fecha</th>
                <th className="table-head">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(m => (
                <tr key={m.id} className="table-row">
                  <td className="table-cell">{m.descripcion}</td>
                  <td className="table-cell">{m.categoria}</td>
                  <td className="table-cell">{m.tipo}</td>
                  <td className="table-cell">${Number(m.monto).toLocaleString('es-AR')}</td>
                  <td className="table-cell">{m.fecha}</td>
                  <td className="table-cell">
                    <div className="action-group">
                      <a className="btn btn-primary btn-sm" href={`/editar/${m.id}`}>Editar</a>
                      <button className="btn btn-danger btn-sm" onClick={() => onDelete(m.id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
