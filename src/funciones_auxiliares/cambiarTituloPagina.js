export const cambiarTituloPagina = (idPagina) => {
  switch (idPagina) {
    case "Pagina Principal":
      document.title = "Pagina Principal";
      break;
    case "Contacto":
      document.title = "Contacto";
      break;
    case "AcercaDeNosotros":
      document.title = "Acerca de Nosotros";
      break;
    case "Iniciar Sesion":
      document.title = "Iniciar Sesion";
      break;
    case "Registro":
      document.title = "Registro";
      break;
    case "Error404":
      document.title = "Error 404";
      break;
    case "reservarTurno":
      document.title = "Reservar Turno";
      break;
    case "panelUsuario":
      document.title = "Panel de usuario";
      break;
    case "turnosUsuario":
      document.title = "Tus turnos";
      break;
    case "carrito":
      document.title = "Tus productos";
      break;
    case "Admin":
      document.title = "Admin";
      break;
    case "Pacientes":
      document.title = "Admin Pacientes";
      break;
    case "Productos":
      document.title = "Admin Productos";
      break;
    case "Turnos":
      document.title = "Admin Turnos";
      break;
    default:
      document.title = "Pagina";
      break;
  }
};
