import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Listado from '../src/assets/pages/Listado'
import Nuevo from '../src/assets/pages/Nuevo';
import Resumen from '../src/assets/pages/Resumen';
import Ajustes from '../src/assets/pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listado />} />
        <Route path="/nuevo" element={<Nuevo />} />
        <Route path="/editar/:id" element={<Nuevo />} />
        <Route path="/resumen" element={<Resumen />} />
        <Route path="/ajustes" element={<Ajustes />} />
      </Routes>
    </Router>
  );
}

export default App;
