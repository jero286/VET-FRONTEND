import { BrowserRouter as Router, Routes, Route} from "react-router"
import NavbarC from "./componentes/navbar/NavbarC"
import PaginaPrincipal from "./paginas/PaginaPrincipal"
import Contacto from "./paginas/Contacto"
import AcercaDeNosotros from "./paginas/AcercaDeNosotros"
import IniciarSesion from "./paginas/IniciarSesion"
import Registrarse from "./paginas/Registrarse"

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
      </Routes>
    </Router>
    </>
  )
}

export default App