import {BrowserRouter, Routes, Route} from "react-router-dom"

import Home from "./assets/pages/Home.jsx";
import Edición from "./assets/components/Edición.jsx";
import Estadísticas from "./assets/components/Estadisticas.jsx";
import Form from "./assets/components/Form.jsx";

import Layout from "./assets/components/Layout.jsx";

import './App.css'

function App() {

  return (
    <>
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
