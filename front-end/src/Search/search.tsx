import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

interface PropsDefinition {
  setSearchText(data: string): void;
}

function Search(props: PropsDefinition) {
  const [searchUrl, setSearchUrl] = React.useState<string>("");

  React.useEffect(() => {
    props.setSearchText(searchUrl);
  }, [searchUrl]);

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
          value={searchUrl}
          onChange={(event) => setSearchUrl(event.target.value)}
        />
      </InputGroup>
    </Col>
  );
}

export default Search;
