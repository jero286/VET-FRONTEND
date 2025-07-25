import { BrowserRouter as Router, Routes, Route} from "react-router"
import NavbarC from "./componentes/navbar/NavbarC"
import PaginaPrincipal from "./paginas/PaginaPrincipal"
import Contacto from "./paginas/Contacto"
import AcercaDeNosotros from "./paginas/AcercaDeNosotros"
import IniciarSesion from "./paginas/IniciarSesion"
import Registrarse from "./paginas/Registrarse"
import FooterC from "./componentes/footer/FooterC"
import Error404 from "./paginas/Error404"

const App = () => {
  return (
    <>
    <Router>
      <NavbarC/>
      <Routes>
        <Route path="/" element={<PaginaPrincipal/>}/>
        <Route path="/contacto" element={<Contacto/>}/>
        <Route path="/acercaDeNosotros" element={<AcercaDeNosotros/>}/>
        <Route path="/iniciarSesion" element={<IniciarSesion/>}/>
        <Route path="/registrarse" element={<Registrarse/>}/>
        <Route path="/error404" element={<Error404/>}/>
      </Routes>
      <FooterC/>
    </Router>
    </>
  )
}

export default App