import React from "react";
import { Container, Col } from "react-bootstrap";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./Carousel.css";

const Carousel = () => {
  const options = {
    loop: true,
    center: true,
    items: 3,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 4500,
    smartSpeed: 450,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  return (
    <Container fluid className="car">
      <Col>
        <OwlCarousel className="owl-theme" {...options}>
          <div className="item">
            <img
              src="https://www.astronauts.id/blog/wp-content/uploads/2022/07/Resep-Bakwan-Sayur-Renyah-dan-Nikmat-1024x683.jpg"
              alt="Image1"
            />
          </div>
          <div className="item">
            <img
              src="https://www.generasimaju.co.id/articles/Resep/Pempek%20Palembang.jpg"
              alt="Image2"
            />
          </div>
          <div className="item">
            <img
              src="https://www.masakapahariini.com/wp-content/uploads/2022/09/resep-tempe-goreng-tepung-pedas.jpg"
              alt="Image3"
            />
          </div>
          <div className="item">
            <img
              src="https://kbu-cdn.com/dk/wp-content/uploads/tahu-poll-pedas.jpg"
              alt="Image4"
            />
          </div>
          <div className="item">
            <img
              src="https://asset.kompas.com/crops/BaFtDG-reldpvhTt0A1CrAWOLgk=/539x0:4996x2971/750x500/data/photo/2022/10/14/63490870bc30b.jpg"
              alt="Image5"
            />
          </div>
        </OwlCarousel>
      </Col>
    </Container>
  );
};

export default Carousel;
