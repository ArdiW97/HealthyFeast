import React from "react";
import "../About/About.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const About = () => {
  return (
    <>
      <section className="home p-responsive animated-background">
        <Container fluid>
          <Row className="align-items-center g-lg-5 g-md-4 g-4">
            <Col lg={6} md={5} xs={12} className="text-center">
              <Image
                className="rounded-5 img-fluid img-about"
                src="https://cdn.urbandigital.id/wp-content/uploads/2018/11/food-1200x600-768x380.jpg"
                alt="about"
              />
            </Col>
            <Col lg={6} md={5}>
              <h1 className="title text-center">About us</h1>
              <div className="mt-3">
                <p className="about-lh">Welcome to our website</p>
                <p className="about-lh">
                Where we provide information about various dishes and food experiences. 
                We understand that food is not just fuel for the body, but also an important part of our social and cultural lives. 
                We are committed to providing a user-friendly experience with an easy-to-use interface and a comprehensive food menu. 
                Here, you can find detailed information about each dish, user reviews, and nutritional information to help you make the right food choices. 
                Let's explore and enjoy a variety of dishes from different parts of the world that we offer on our website.
                </p>
              </div>
              <Link to="/allfood" style={{ textDecoration: "none" }}>
                <Button
                  variant="success"
                  className="shadow d-flex align-items-center p-2"
                >
                  Explore Our Food
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;
