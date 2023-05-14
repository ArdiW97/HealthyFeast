import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import "./Banner.css";

const Banner = () => {
 
  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col>
            
                <div
                  className="ban"
                >
                  <h1>
                    Welcome To <br></br>
                    <span
                      className="txt-rotate"
                    >HealthyFeast
                    </span>
                  </h1>
                  <p>
                  Discover new inspiration for your cooking with a variety of delicious and easy dishes presented here.
                  Make your dining experience more enjoyable with a complete food menu and a rich variety of dishes.
                  Serve special dishes at your table with authentic recipes and high-quality ingredients that we provide.
                  Don't miss the opportunity to taste the best dishes from different countries and cultures, only here on our platform.
                  Let's explore the amazing culinary world and find your favorite dishes with the help of our comprehensive food menu and nutritional information.
                  From classic dishes to innovative new creations, we offer a range of dish choices that are ready to delight your taste buds.
                  </p>
                </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Banner;
