import Table from "react-bootstrap/Table";
import axios from "axios";
import React from "react";
import UrlListOrder from "./ListOrder";
import "./list.css";
import LoadingSpinner from "./Loader/loader";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

interface PropsDefinition {
  setFullList(data: any[]): void;
}
const baseURL = "http://localhost:5003/api/all";
const baseDeleteURL = "http://localhost:5003/api/url/delete";

function UrlList(props: PropsDefinition) {
  const [urlList, setList] = React.useState<any[]>([]);
  const [listOption, setListOption] = React.useState<number>(0);
  const [isLoading, setLoader] = React.useState<boolean>(true);
  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  let emptyText = "Urls list is empty";

  const handleDeleteClick = (id: string) => {
    axios.delete(`${baseDeleteURL}/${id}`).catch((error) => {
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
    setShowAlert(true);
    const filteredList = urlList.filter((url) => url._id !== id);
    setList(filteredList);
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        await axios.get(baseURL).then((response) => {
          setList(response.data);
          props.setFullList(response.data);
        });
        setLoader(false);
      } catch {
        setLoader(false);
      }
    };
    getData();
  }, []);

  return (
    <div>
      {showAlert && (
        <div className="pb-3">
          <Alert
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            Url Removed
          </Alert>
        </div>
      )}
      <div className="orderButton">
        <UrlListOrder
          setListOption={setListOption}
          setList={setList}
          urlList={urlList}
        />
      </div>
      {urlList.length !== 0 ? (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Date Created (dd/mm/yyyy)</th>
              <th>Url Code</th>
              <th>Short Url</th>
              <th>Long Url</th>
            </tr>
          </thead>
          <tbody>
            {urlList.map((url: any) => {
              return (
                <tr key={url.urlCode}>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteClick(url._id)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                  <td>{url.date.slice(3, 15)}</td>
                  <td>{url.urlCode}</td>
                  <td>
                    <a
                      href={url.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {url.shortUrl}
                    </a>
                  </td>
                  <td>{url.longUrl}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : isLoading ? (
        <LoadingSpinner />
      ) : (
        <p>{emptyText}</p>
      )}
    </div>
  );
}

export default UrlList;
