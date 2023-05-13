import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../Top/Top.css";

const Top = () => {
  const [food, setFood] = useState([]);

  const getFoodData = () => {
    const headers = localStorage.getItem("token")
      ? {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        }
      : { apiKey: `${process.env.REACT_APP_APIKEY}` };
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/foods`,
      headers: headers,
    })
      .then((response) => {
        console.log(response);
        setFood(response.data.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error, reload the page!");
      });
  };

  useEffect(() => {
    getFoodData();
  }, []);

  return (
    <>
      <Container className="p-home p-responsive">
        <h1 className="title text-center">The Most Favorite Food</h1>
        <Row className="mt-4 space">
          {food &&
            food
              .sort((a, b) => (a.totalLikes < b.totalLikes ? 1 : -1))
              .slice(0, 4)
              .map((r) => {
                return (
                  <Col xs={12} sm={6} md={6} lg={3} key={r.id}>
                    <Card className="tp">
                      <Card.Img
                        variant="top"
                        className="pic"
                        src={r.imageUrl}
                        alt={r.name}
                      />
                      <Card.Body>
                        <Card.Title className="text-center">
                          {r.name}
                        </Card.Title>
                        <Link
                          style={{ textDecoration: "none", width: "100%" }}
                          className="btn"
                          to={`/detail/${r.id}`}
                        >
                          Click for Details
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
        </Row>
      </Container>
    </>
  );
};

export default Top;
