import { BrowserRouter as Router, Routes, Route } from "react-router";
import NavbarC from "./componentes/navbar/NavbarC";
import PaginaPrincipal from "./paginas/PaginaPrincipal";
import Contacto from "./paginas/Contacto";
import AcercaDeNosotros from "./paginas/AcercaDeNosotros";
import IniciarSesion from "./paginas/IniciarSesion";
import Registrarse from "./paginas/Registrarse";
import FooterC from "./componentes/footer/FooterC";
import Error404 from "./paginas/Error404";
import Planes from "./paginas/PaginaPlanes";
import DetallePlan from "./paginas/detallePlan";
import ReservarTurno from "./paginas/reservarTurno";

const App = () => {
  return (
    <>
      <Router>
        <NavbarC />
        <Routes>
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/acercaDeNosotros" element={<AcercaDeNosotros />} />
          <Route path="/iniciarSesion" element={<IniciarSesion />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/reservarTurno" element={<ReservarTurno />} />
        </Routes>
        <FooterC />
      </Router>
    </>
  );
};

export default App;
