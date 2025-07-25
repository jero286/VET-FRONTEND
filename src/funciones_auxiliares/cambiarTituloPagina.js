export const cambiarTituloPagina = (idPagina) => {
    switch (idPagina) {
        case "Pagina Principal" :
            document.title = "Pagina Principal"; 
            break;
        case "Contacto" :
            document.title = "Contacto";
            break;
        case "AcercaDeNosotros" : 
            document.title = "Acerca de Nosotros";
            break;
        case "Iniciar Sesion" :
            document.title = "Iniciar Sesion";
            break;
        case "Registrarse" : 
            document.title = "Registrarse";
            break;
        case "Error404" : 
            document.title = "Error 404";
            break;
        default: 
        document.title = "Pagina";
        break;
    }
}