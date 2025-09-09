import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router";
import "./footerC.css";
import ObtenerClimaTucuman from "../clima/obtenerClima";

const FooterC = () => {
  return (
    <Container fluid className="body-tertiary">
      <Row className="footer-row">
        <Col
          xs={12}
          sm={6}
          md="auto"
          className="d-flex justify-content-center align-items-center mb-3 mb-md-0"
        >
          <NavLink className={"nav-link"} to={"/"}>
            <img src="/logo3.jpeg" alt="Logo" className="footer-logo" />
          </NavLink>
        </Col>

        <Col
          xs={12}
          sm={6}
          md={3}
          className="d-flex justify-content-center align-items-center mb-3 mb-md-0"
        >
          <div className="social-links d-flex justify-content-center">
            <NavLink className="nav-link mx-2" to="/error404">
              <img src="/Instagram.png" alt="Instagram" />
              <p>Instagram</p>
            </NavLink>
            <NavLink className="nav-link mx-2" to="/error404">
              <img src="/Facebook.png" alt="Facebook" />
              <p>Facebook</p>
            </NavLink>
            <NavLink className="nav-link mx-2" to="/error404">
              <img src="/Tik-Tok.png" alt="TikTok" />
              <p>TikTok</p>
            </NavLink>
          </div>
        </Col>
<<<<<<< HEAD
        <Col xs={12} md={3} className="d-flex justify-content-center align-items-center">
          <div className="mapa-responsive">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.118032695642!2d-65.20965262556423!3d-26.83619789000926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c0e8d0271b7%3A0x7946062ac490db30!2sGral.%20Jos%C3%A9%20Mar%C3%ADa%20Paz%20576%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1753465981600!5m2!1ses!2sar"
            
            allowFullScreen
           // loading="lazy"
            //referrerPolicy="no-referrer-when-downgrade"
            />
            </div>
=======

        <Col
          xs={12}
          md={3}
          className="d-flex justify-content-center mb-3 mb-md-0"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.118032695642!2d-65.20965262556423!3d-26.83619789000926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c0e8d0271b7%3A0x7946062ac490db30!2sGral.%20Jos%C3%A9%20Mar%C3%ADa%20Paz%20576%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1753465981600!5m2!1ses!2sar"
            className="footer-map"
            allowFullScreen
          />
>>>>>>> c8349805fa29d285fb152a830440bcb82c6a8962
        </Col>

        <Col
          xs={12}
          md={3}
          className="d-flex justify-content-center align-items-center"
        >
          <ObtenerClimaTucuman />
        </Col>
      </Row>
    </Container>
  );
};

export default FooterC;
