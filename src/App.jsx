import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarC from "./componentes/navbar/NavbarC";
import PaginaPrincipal from "./paginas/PaginaPrincipal";
import Contacto from "./paginas/Contacto";
import AcercaDeNosotros from "./paginas/AcercaDeNosotros";
import IniciarSesion from "./paginas/IniciarSesion";
import Registrarse from "./paginas/Registrarse";
import FooterC from "./componentes/footer/FooterC";
import Error404 from "./paginas/Error404";
/* import Planes from "./paginas/PaginaPlanes";
import DetallePlan from "./paginas/detallePlan"; */
import Admin from "./paginas/Admin";
import AdminPacientes from "./paginas/AdminPacientes";
import AdminTurnos from "./paginas/AdminTurnos";
import AdminProductos from "./paginas/AdminProductos";
import PaginaUsuario from "./paginas/PaginaUsuario";
import ReservarTurno from "./paginas/reservarTurno";
import AdminCrearEditarUsuarios from "./paginas/AdminCrearEditarUsuarios";
import AdminCrearEditarProductos from "./paginas/AdminCrearEditarProductos";
import AdminCrearEditarTurnos from "./paginas/AdminCrearEditarTurnos";
/* import TablaUsuarios from "./componentes/tablas/TablaUsuarios"; */
import UsuarioTurnos from "./paginas/UsuarioTurnos";

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
          <Route path="/usuario" element={<PaginaUsuario />} />
          <Route path="/usuario/reservarTurnos" element={<ReservarTurno />} />
          <Route path="/usuario/turnos" element={<UsuarioTurnos />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/pacientes" element={<AdminPacientes />} />
          <Route path="/admin/turnos" element={<AdminTurnos />} />
          <Route path="/admin/productos" element={<AdminProductos />} />
          <Route
            path="/admin/usuarios/crearEditar"
            element={<AdminCrearEditarUsuarios />}
          />
          <Route
            path="/admin/productos/crearEditar"
            element={<AdminCrearEditarProductos />}
          />
          <Route
            path="/admin/turnos/crearEditar"
            element={<AdminCrearEditarTurnos />}
          />
        </Routes>
        <FooterC />
      </Router>
    </>
  );
};

export default App;
