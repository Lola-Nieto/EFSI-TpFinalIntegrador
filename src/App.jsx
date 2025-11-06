// src/App.jsx
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Listado from './assets/pages/Listado.jsx'
import Nuevo from './assets/pages/Nuevo.jsx'
import Editar from './assets/pages/Edicion.jsx'
import Resumen from './assets/pages/Resumen.jsx'
import Ajustes from './assets/pages/Ajustes.jsx'
import Header from './assets/components/Header.jsx'

export default function App() {
  const { pathname } = useLocation();
  return (
    <div className="app" data-app>
      <Header />
      <nav className="nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Listado</NavLink>
        <NavLink to="/nuevo" className={({ isActive }) => (isActive ? "active" : "")}>Nuevo</NavLink>
        <NavLink to="/resumen" className={({ isActive }) => (isActive ? "active" : "")}>Resumen</NavLink>
        <NavLink to="/ajustes" className={({ isActive }) => (isActive ? "active" : "")}>Ajustes</NavLink>
      </nav>
      <main className={`container ${pathname === "/" ? "wide" : ""}`}>
        <Routes>
          <Route path="/" element={<Listado />} />
          <Route path="/nuevo" element={<Nuevo />} />
          <Route path="/editar/:id" element={<Editar />} />
          <Route path="/resumen" element={<Resumen />} />
          <Route path="/ajustes" element={<Ajustes />} />
        </Routes>
      </main>
    </div>
  );
}
