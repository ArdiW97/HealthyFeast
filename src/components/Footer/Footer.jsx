import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6} className="fs-1 logo">
            HealthyFeast
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <p>
              2023 &copy; All Rights Reserved. Made By
              <span className="copy"> HealthyFeast</span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
