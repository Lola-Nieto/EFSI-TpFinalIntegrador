import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeProvider from './assets/context/ThemeProvider';
import Layout from './assets/components/Layout';
import Listado from './assets/pages/Listado';
import Nuevo from './assets/pages/Nuevo';
import Edicion from './assets/pages/Edicion';
import Ajustes from './assets/pages/Ajustes';
import Resumen from './assets/pages/Resumen';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Listado />} />
            <Route path="/nuevo" element={<Nuevo />} />
            <Route path="/editar/:id" element={<Edicion />} />
            <Route path="/resumen" element={<Resumen />} />
            <Route path="/ajustes" element={<Ajustes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
