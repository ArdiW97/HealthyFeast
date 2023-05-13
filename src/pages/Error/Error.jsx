import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Error/Error.css";

const Error = () => {
  return (
    <>
      <Container fluid className="min-vh-100 d-flex align-items-center">
        <Row className="mx-auto">
          <Col className="col-md-12 text-center">
            <span className="fs-error">404 not found</span>
            <div className="mb-4 fs-4 text-uppercase fs-error">
              The page you requested could not found
            </div>
            <Link to="/" className="btn fs-6">
              Back to Home
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Error;
