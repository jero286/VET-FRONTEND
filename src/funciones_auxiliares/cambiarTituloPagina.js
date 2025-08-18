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
    default:
      document.title = "Pagina";
      break;
  }
};
