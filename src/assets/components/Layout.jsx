import {Link, Outlet} from "react-router-dom"

//import './Layout.css'

const Layout = () => {

  return (
    <>
        <nav className="navbar">
          <Link to="/"> Inicio </Link>
          <Link to="/resumen"> Crear </Link>
          <Link to="/editar/:id"> Editar </Link>
          <Link to="/resumen"> Estadísticas </Link>
          <Link to="/ajustes"> Ajustes </Link>


        </nav>
          <Outlet /> 
    </>
  )
}

export default Layout;
