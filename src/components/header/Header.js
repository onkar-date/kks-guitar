import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from "./header.module.scss";
import logo from "../../images/logo.png";
const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>
          <Link to="/">
            <img
              src={logo}
              width="60"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/">Batches</Nav.Link>
            <Nav.Link href="/">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
