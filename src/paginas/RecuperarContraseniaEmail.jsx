import { useState } from "react";
import './RecuperarContrasena.css';
import clienteAxios, { configHeader } from "../funciones_auxiliares/configAxios";
import { Button, Container, Form } from "react-bootstrap";


const RecuperarContraseniaEmail = () => {
    const [emailUsuario, setEmailUsuario] = useState("");

    const handleClickFormRecuperarContrasenia = async (ev) => {
        ev.preventDefault()
        try {
            const res = await clienteAxios.post("/usuarios/recoveryPassEmail",
                { emailUsuario }, configHeader)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Container className="my-5 w-50">
                <Form>
                    <Form.Group className="mb-3" controlId="idEmail">
                        <Form.Label>Ingresa tu Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Ingrese su email"
                            name="emailUsuario"
                            onChange={(ev) => setEmailUsuario(ev.target.value)} />
                        <Container className="text-center">
                            <Button className="mt-3"
                                onClick={handleClickFormRecuperarContrasenia}
                            >Enviar Correo</Button>
                        </Container>
                    </Form.Group>
                </Form>
            </Container>
        </>
    )
}

export default RecuperarContraseniaEmail