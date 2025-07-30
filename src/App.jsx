import { BrowserRouter as Router, Routes, Route } from "react-router"
import NavbarC from "./componentes/navbar/NavbarC"
import PaginaPrincipal from "./paginas/PaginaPrincipal"
import Contacto from "./paginas/Contacto"
import AcercaDeNosotros from "./paginas/AcercaDeNosotros"
import IniciarSesion from "./paginas/IniciarSesion"
import Registrarse from "./paginas/Registrarse"
import FooterC from "./componentes/footer/FooterC"
import Error404 from "./paginas/Error404"
import Planes from "./paginas/PaginaPlanes"
import DetallePlan from "./paginas/detallePlan"


const App = () => {
  return (
    <>
<<<<<<< HEAD
      <Router>
        <NavbarC />
        <Routes>
          <Route path="/" element={<PaginaPrincipal />} />
           <Route path="/planes" element={<Planes />} />
          <Route path="/planes/:nombrePlan" element={<DetallePlan />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/acercaDeNosotros" element={<AcercaDeNosotros />} />
          <Route path="/iniciarSesion" element={<IniciarSesion />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/error404" element={<Error404 />} />
        </Routes>
        <FooterC />
      </Router>
=======
    <Router>
      <NavbarC/>
      <Routes>
        <Route path="/" element={<PaginaPrincipal/>}/>
        <Route path="/contacto" element={<Contacto/>}/>
        <Route path="/acercaDeNosotros" element={<AcercaDeNosotros/>}/>
        <Route path="/iniciarSesion" element={<IniciarSesion/>}/>
        <Route path="/registrarse" element={<Registrarse/>}/>
        <Route path="*" element={<Error404/>}/>
      </Routes>
      <FooterC/>
    </Router>
>>>>>>> 08d6e7345b23ea55a49aab37f4904b628c26a8ee
    </>
  )
}

export default App