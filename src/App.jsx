import {BrowserRouter, Routes, Route} from "react-router-dom"

import Home from "./assets/pages/Home.jsx";
import Edición from "./assets/pages/Edición.jsx";
import Estadísticas from "./assets/components/Estadisticas.jsx";
import Form from "./assets/pages/Form.jsx";
import { useEffect, useState } from "react";
import Layout from "./assets/components/Layout.jsx";
import './App.css'

const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved) return saved; // "light" | "dark"
  // Primera vez: respeta preferencia del sistema
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};



function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  // Sincroniza <html data-theme="..."> y guarda en localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };
  return (
    <>
     {/* === Botón tema === */}
<button
  type="button"
  onClick={toggleTheme}
  aria-label={`Cambiar a tema ${theme === "dark" ? "claro" : "oscuro"}`}
  style={{
    cursor: "pointer",
    padding: "0.5rem 0.75rem",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    background: "var(--panel)",
    color: "var(--text)",
    fontSize: "0.9rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem"
  }}
>
  <span role="img" aria-hidden="true">{theme === "dark" ? "🌙" : "☀️"}</span>
  {theme === "dark" ? "Oscuro" : "Claro"}
</button>
{/* === fin botón tema === */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>}></Route>
            <Route path="/editar/:id" element={<Edición />}></Route>
            <Route path="/nuevo" element={<Form />}></Route>
            <Route path="/resumen" element={<Estadísticas />}></Route>
            <Route path="/ajustes" element={<Ajustes />}></Route>
            <Route path="*" element={<NotFound/>}> </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
