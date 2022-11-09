import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <Navbar bg="light" sticky="top">
      <Container>
        <Navbar.Brand>URL Shrinker</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
