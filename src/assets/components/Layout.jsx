import { Link, NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../context/useTheme';

export default function Layout() {
  const { theme, toggle } = useTheme();

  const getNavLinkClasses = ({ isActive }) =>
    `nav-link ${isActive ? 'nav-link--active' : 'nav-link--inactive'}`;

  return (
    <div className="app-container">
      <header className="app-header">
        <nav className="app-nav">
          <Link to="/" className="brand">
            Mi Presupuesto
          </Link>

          <div className="nav-actions">
            <NavLink to="/" className={getNavLinkClasses}>Inicio</NavLink>
            <NavLink to="/nuevo" className={getNavLinkClasses}>Nuevo</NavLink>
            <NavLink to="/resumen" className={getNavLinkClasses}>Resumen</NavLink>
            <NavLink to="/ajustes" className={getNavLinkClasses}>Ajustes</NavLink>

            <button onClick={toggle} className="btn btn-outline theme-toggle">
              {theme === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}
            </button>
          </div>
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
