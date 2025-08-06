import Table from 'react-bootstrap/Table';
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import clienteAxios from '../../funciones_auxiliares/configAxios';

const TablaProductos = ({ idPagina, array, usuarioLogueado, obtenerTodosLosProductos }) => {
    const botonEliminarProducto = (idProducto) => {
        if (usuarioLogueado) {
            Swal.fire({
                title: "¿Estás seguro de que quieres eliminar este producto?",
                text: "¡Si lo borras no lo podrás recuperar!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "¡Sí!",
                cancelButtonText: "¡No!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const res = await clienteAxios.delete(`/productos/${idProducto}`);
                        console.log(res);
                        if (res.status === 200) {
                            Swal.fire({
                                title: "¡Producto eliminado!",
                                icon: "success"
                            });
                            obtenerTodosLosProductos()
                        }
                    } catch (error) {
                        console.error("Error al eliminar el producto:", error);
                        Swal.fire({
                            title: "Error",
                            text: "Hubo un problema al intentar eliminar el producto.",
                            icon: "error"
                        });
                    }
                }
            })
        }
    }
    return (
        <>
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Descripcion</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            array.map((producto, index) => (
                                <tr key={producto.id || index}>
                                    <th>{index + 1}</th>
                                    <th>{producto.nombre}</th>
                                    <th>${producto.precio}</th>
                                    <th>{producto.descripcion}</th>
                                    <th><img src={producto.imagen} alt={producto.nombre} width="50" /></th>
                                    <th className='w-25'>
                                        <Link className='btn btn-warning mx-3' variant='warning'
                                            to={usuarioLogueado ?
                                                `/admin/productos/crearEditar?id=${producto._id}` : "#"}>Editar</Link>
                                        <Button variant='danger'
                                            onClick={() => botonEliminarProducto(producto._id)}>Eliminar</Button>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default TablaProductos