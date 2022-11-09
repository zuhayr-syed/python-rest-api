import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand>
            <h1>URL Shrinker</h1>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
