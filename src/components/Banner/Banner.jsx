import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import "./Banner.css";

const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(100 - Math.random() * 10);
  const [, setIndex] = useState(1);
  const toRotate = ["HealthyFeast"];
  const period = 1500;

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(350);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
  };

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delta]);
  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col>
            <TrackVisibility responsive={responsive} infinite={true}>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h1>
                    {`Welcome To`} <br></br>
                    <span
                      className="txt-rotate"
                      dataperiod="1500"
                      data-rotate='[ "HealthyFeast" ]'
                    >
                      <span className="wrap">{text}</span>
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
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Banner;
