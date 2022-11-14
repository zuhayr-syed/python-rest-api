import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <h1 className="pt-3 pb-2">URL Shrinker</h1>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
