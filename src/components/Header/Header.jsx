import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Header/Header.css";

const Header = () => {
  // eslint-disable-next-line
  const [scrollPosition, setScrollPosition] = useState(0);
  const [username, setUserName] = useState();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/api/v1/user`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: process.env.REACT_APP_APIKEY,
        },
      })
        .then((response) => {
          setUserName(response.data.user.name);
        })
        .catch((error) => {
        });
    }

    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/logout`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: process.env.REACT_APP_APIKEY,
      },
    })
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navbarBackground = {
    backgroundColor: scrollPosition > 0 ? "#222222" : "transparent",
    transition: "background-color 0.3s ease-in-out",
  };
  return (
    <>
      <Navbar className="nav" expand="lg" sticky="top" style={navbarBackground}>
        <Container fluid className="px-lg-5">
        <Navbar.Brand as={Link} to="/">
              <span className="mx-1 logo fs-1 text-focus-in">HealthyFeast</span>
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportContent" id="togle" />
          <Navbar.Collapse id="navbarSupportContent">
            <Nav className="link" variant="tabs" defaultActiveKey="/">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/allfood">
                All Food
              </Nav.Link>
              {localStorage.getItem("token") && (
                <Nav.Link as={Link} to="/favorite">
                  Favorite
                </Nav.Link>
              )}
              {localStorage.getItem("role") === "admin" && (
                <Nav.Link as={Link} to="/add-food">
                  Add Food
                </Nav.Link>
              )}
            </Nav>
            <Nav className="link">
              {localStorage.getItem("token") ? (
                <NavDropdown title={username} id="basic-nav-dropdown drp">
                  <NavDropdown.Item as={Link} to={`/profile`}>
                    My Profile
                  </NavDropdown.Item>
                  {localStorage.getItem("role") === "admin" && (
                    <NavDropdown.Item as={Link} to="/all-users">
                      All User
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login" className="log">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
