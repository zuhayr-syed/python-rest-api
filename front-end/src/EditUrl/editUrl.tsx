import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import React from "react";
import axios from "axios";

interface PropsDefinition {
  editLongUrl: string;
  editUrlCode: string;
  editUrlId: string;
  setShowEditUrl(data: boolean): void;
  fullList: any[];
}

const baseUpdateURL = "http://localhost:5003/api/url/update";

function isValidHttpUrl(string: string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function UpdateUrl(props: PropsDefinition) {
  const [editFullList, setEditFullList] = React.useState<any[]>([]);
  const [longUrl, setLongUrl] = React.useState<string>("");
  const [urlCode, setUrlCode] = React.useState<string>("");
  const [urlId, setUrlId] = React.useState<string>("");
  const [resError, setResError] = React.useState<string>("");
  const createUrlText = "Exit Url Edit";
  const initLongUrl = props.editLongUrl;
  const initUrlCode = props.editUrlCode;

  const handleMenuClick = () => {
    props.setShowEditUrl(false);
  };

  const handleSubmit = (event: any) => {
    if (!isValidHttpUrl(longUrl)) {
      event.preventDefault();
      const urlInvalid = "Invalid long url";
      console.log(urlInvalid);
      setResError(urlInvalid);
      return;
    }

    const filteredList = editFullList.filter((url) => url._id !== urlId);

    let errCheck = 0;
    filteredList.map((url: any) => {
      if (url.urlCode === urlCode) {
        errCheck = 1;
      }
      if (url.longUrl === longUrl) {
        errCheck = 2;
      }
    });

    if (errCheck === 1) {
      event.preventDefault();
      const urlInvalid = "Url code has already been used";
      console.log(urlInvalid);
      setResError(urlInvalid);
      return;
    }

    if (errCheck === 2) {
      event.preventDefault();
      const urlInvalid = "Long url code has already been shortened";
      console.log(urlInvalid);
      setResError(urlInvalid);
      return;
    }

    axios
      .put(`${baseUpdateURL}/${urlId}`, {
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

  React.useEffect(() => {
    setLongUrl(props.editLongUrl);
    setUrlCode(props.editUrlCode);
    setUrlId(props.editUrlId);
    setEditFullList(props.fullList);
  }, [props.editLongUrl, props.editUrlCode, props.editUrlId, props.fullList]);

  return (
    <div className="pt-3 pb-3">
      <div className="pb-2">
        <Button variant="dark" onClick={handleMenuClick}>
          {createUrlText} &nbsp;
          <i className="bi bi-x-square-fill"></i>
        </Button>
      </div>
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
          <Col xs="auto" className="my-1 pt-3">
            <Button
              type="submit"
              variant="success"
              disabled={longUrl === initLongUrl && urlCode === initUrlCode}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>

      <div className="pt-3">
        <hr />
      </div>
    </div>
  );
}

export default UpdateUrl;
