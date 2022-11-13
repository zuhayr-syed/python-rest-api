import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

function Search() {
  return (
    <Col xs={7}>
      <Form.Label htmlFor="search" visuallyHidden>
        Search
      </Form.Label>
      <InputGroup className="mb-2">
        <InputGroup.Text>
          <i className="bi bi-search"></i>
        </InputGroup.Text>
        <Form.Control
          id="searchText"
          type="search"
          placeholder="Search though url codes..."
          size="lg"
        />
      </InputGroup>
    </Col>
  );
}

export default Search;
