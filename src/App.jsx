import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarC from "./componentes/navbar/NavbarC";
import PaginaPrincipal from "./paginas/PaginaPrincipal";
import Contacto from "./paginas/Contacto";
import AcercaDeNosotros from "./paginas/AcercaDeNosotros";
import IniciarSesion from "./paginas/IniciarSesion";
import Registrarse from "./paginas/Registrarse";
import FooterC from "./componentes/footer/FooterC";
import Error404 from "./paginas/Error404";
import Planes from "./paginas/PaginaPlanes";
import DetallePlan from "./paginas/DetallePlan";
import RecuperarContraseniaEmail from "./paginas/RecuperarContraseniaEmail";
import NuevaContrasenia from "./paginas/NuevaContrasenia"
import Admin from "./paginas/Admin";
import AdminPacientes from "./paginas/AdminPacientes";
import AdminTurnos from "./paginas/AdminTurnos";
import AdminProductos from "./paginas/AdminProductos";
import PaginaUsuario from "./paginas/PaginaUsuario";
import ReservarTurno from "./paginas/reservarTurno";
import AdminEditarUsuarios from "./paginas/AdminEditarUsuarios";
import AdminCrearEditarProductos from "./paginas/AdminCrearEditarProductos";
/* import TablaUsuarios from "./componentes/tablas/TablaUsuarios"; */
import UsuarioTurnos from "./paginas/UsuarioTurnos";
import AdminEditarTurnos from "./paginas/AdminEditarTurnos"

const App = () => {
  return (
    <>
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
          <Route path="*" element={<Error404 />} />
          <Route path="/usuario" element={<PaginaUsuario />} />
          <Route path="/usuario/reservarTurnos" element={<ReservarTurno />} />
          <Route path="/usuario/turnos" element={<UsuarioTurnos />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/pacientes" element={<AdminPacientes />} />
          <Route path="/admin/turnos" element={<AdminTurnos />} />
          <Route path="/admin/productos" element={<AdminProductos />} />
          <Route path="/admin/usuarios/crearEditar" element={<AdminEditarUsuarios />} />
          <Route path="/admin/productos/crearEditar" element={<AdminCrearEditarProductos />} />
          <Route path="/admin/turnos/editarTurnos" element={<AdminEditarTurnos />} />
          <Route path="/emailRecuperarContrasenia" element={<RecuperarContraseniaEmail />} />
          <Route path="/recuperarContraseniaForm" element={<NuevaContrasenia />} />
          <Route
            path="/admin/usuarios/Editar"
            element={<AdminEditarUsuarios />}
          />
          <Route
            path="/admin/productos/crearEditar"
            element={<AdminCrearEditarProductos />}
          />
          <Route
            path="/admin/turnos/editarTurnos"
            element={<AdminEditarTurnos />}
          />

        </Routes>
        <FooterC />
      </Router>
    </>
  );
};

export default App;
