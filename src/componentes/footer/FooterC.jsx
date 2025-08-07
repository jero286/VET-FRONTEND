import { Col, Container, Row } from "react-bootstrap"
import { NavLink } from "react-router"
import "./footerC.css"
import ObtenerClimaTucuman from "../clima/obtenerClima"

const FooterC = () => {
  return (
    <Container fluid className="body-tertiary">
        <Row>
            <Col className="d-flex justify-content-center align-items-center">
            <NavLink className={"nav-link"} to={"/"}>
            <img src="/logo3.jpeg" alt="Logo" style={{width: '120px'}} />
            </NavLink>
            </Col>
            <Col className="text-center d-flex align-items-center">
            <NavLink className={"nav-link"} to={"/error404"}>
            <img src="/Instagram.png" alt="Instagram"/>
            <p>Instagram</p>
            </NavLink>
            <NavLink className={"nav-link mx-3"} to={"/error404"}>
            <img src="/Facebook.png" alt="Facebook"/>
            <p>Facebook</p>
            </NavLink>
            <NavLink className={"nav-link"} to={"/error404"}>
            <img src="/Tik-Tok.png" alt="Tik-Tok"/>
            <p>Tik Tok</p>
            </NavLink>
            </Col>
            <Col className="d-flex justify-content-center">
            <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.118032695642!2d-65.20965262556423!3d-26.83619789000926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c0e8d0271b7%3A0x7946062ac490db30!2sGral.%20Jos%C3%A9%20Mar%C3%ADa%20Paz%20576%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1753465981600!5m2!1ses!2sar"
  style={{ border: 0 }}
  allowFullScreen/>
            </Col>
            <Col>
            <ObtenerClimaTucuman/>
            </Col>
        </Row>
    </Container>
  )
}

export default FooterC