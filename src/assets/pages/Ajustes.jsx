import { useTheme } from '../context/useTheme';
import { saveMovimientos } from '../helpers/storage';

export default function Ajustes() {
  const { theme, toggle } = useTheme();

  const resetAll = () => {
    if (confirm('¿Seguro que querés borrar todos los movimientos?')) {
      saveMovimientos([]);
      alert('Datos borrados.');
    }
  };

  return (
    <div className="page page--stack">
      <h1 className="page-title">Ajustes</h1>

      <section className="card">
        <h2 className="card-title">Tema</h2>
        <p>Tema actual: <b>{theme}</b></p>
        <button onClick={toggle} className="btn btn-outline">Cambiar a {theme === 'dark' ? 'claro' : 'oscuro'}</button>
      </section>

      <section className="card">
        <h2 className="card-title">Datos</h2>
        <p>Podés limpiar todos los movimientos guardados en el navegador.</p>
        <button onClick={resetAll} className="btn btn-danger">Limpiar localStorage</button>
      </section>
    </div>
  );
}
