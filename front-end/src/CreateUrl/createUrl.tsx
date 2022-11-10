import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import React from "react";
import axios from "axios";
import "./createUrl.css";

interface PropsDefinition {
  fullList: any[];
}
const baseURL = "http://localhost:5003/api/url/shorten";

function CreateUrl(props: PropsDefinition) {
  const [longUrl, setLongUrl] = React.useState<string>("");
  const [urlCode, setUrlCode] = React.useState<string>("");
  const [resError, setResError] = React.useState<string>("");

  function isValidHttpUrl(string: string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  const handleSubmit = (event: any) => {
    if (!isValidHttpUrl(longUrl)) {
      event.preventDefault();
      const urlInvalid = "Invalid long url";
      console.log(urlInvalid);
      setResError(urlInvalid);
      return;
    }

    let errCheck = 0;
    props.fullList.map((url: any) => {
      if (url.urlCode === urlCode) {
        errCheck = 1;
      }
    });

    if (errCheck === 1) {
      event.preventDefault();
      const urlInvalid = "Url code has already been used";
      console.log(urlInvalid);
      setResError(urlInvalid);
      return;
    }

    axios
      .post(baseURL, {
        urlCode: urlCode,
        longUrl: longUrl,
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  return (
    <div className="pb-3">
      <Form onSubmit={handleSubmit}>
        <Row className="align-items-center">
          <Col sm={12} className="my-1 pt-2">
            <Form.Label htmlFor="inlineFormInputName">LongUrl</Form.Label>
            <Form.Control
              id="inlineFormLongUrl"
              placeholder="Enter Long Url..."
              required
              value={longUrl}
              onChange={(event) => setLongUrl(event.target.value)}
            />
          </Col>
        </Row>
        {resError && (
          <Row className="error-spacing">
            <Col sm={12} className="my-1 pt-2">
              <div className="alert alert-danger" role="alert">
                {resError}
              </div>
            </Col>
          </Row>
        )}
        <Row className="align-items-center">
          <Col sm={4} className="my-1 pt-2">
            <Form.Label htmlFor="inlineFormInputGroupUsername">
              UrlCode
            </Form.Label>
            <InputGroup>
              <InputGroup.Text>optional</InputGroup.Text>
              <Form.Control
                id="inlineFormInputUrlCode"
                placeholder="Enter Url Code..."
                value={urlCode}
                onChange={(event) => setUrlCode(event.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col xs="auto" className="my-1 pt-3 pb-3">
            <Button
              type="submit"
              variant="success"
              disabled={longUrl.length === 0}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      <hr />
    </div>
  );
}

export default CreateUrl;
