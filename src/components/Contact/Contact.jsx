import { Container, Row, Col } from "react-bootstrap";
import contact from "../../assets/img/sosmed.png";
import "./Contact.css";
import TrackVisibility from "react-on-screen";
import email from "../../assets/img/email.svg";
import instagram from "../../assets/img/Instagram.svg";
import linkedin from "../../assets/img/linkedin.svg";
import whatsapp from "../../assets/img/whatsapp.svg";
import github from "../../assets/img/github.svg";

const Contact = () => {
  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <img
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                  src={contact}
                  alt="Contact Us"
                />
              )}
            </TrackVisibility>
          </Col>
          <Col size={6} md={4}>
            <h2 className="tc">Contact</h2>
            <Col>
              <div className="touch">
                <a href="https://www.linkedin.com/in/ardi-wiranto-856352261/">
                  <img src={linkedin} target="_blank" title="linkedin" alt="" />
                </a>
                <p>linkedin</p>
              </div>
              <div className="touch">
                <a href="https://wa.me/6282281967202">
                  <img src={whatsapp} target="_blank" title="linkedin" alt="" />
                </a>
                <p>WhatsApp</p>
              </div>
              <div className="touch">
                <a href="https://www.instagram.com/ardi_w97/?hl=id">
                  <img
                    src={instagram}
                    target="_blank"
                    title="linkedin"
                    alt=""
                  />
                </a>
                <p>Instagram</p>
              </div>
              <div className="touch">
                <a href="https://github.com/ArdiW97">
                  <img src={github} target="_blank" title="linkedin" alt="" />
                </a>
                <p>Github</p>
              </div>
              <div className="touch">
                <a href="https://mail.google.com/mail/u/0/?view=cm&tf=1&fs=1&to=ardiwiranto057@gmail.com">
                  <img src={email} target="_blank" title="linkedin" alt="" />
                </a>
                <p>Email</p>
              </div>
            </Col>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Contact;
