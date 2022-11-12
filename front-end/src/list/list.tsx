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
  showEditUrl: boolean;
  setShowEditUrl(data: boolean): void;
  setEditLongUrl(data: string): void;
  setEditUrlCode(data: string): void;
  editUrlId: string;
  setEditUrlId(data: string): void;
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

  const handleUpdateClick = (url: any) => {
    props.setShowEditUrl(true);
    props.setEditLongUrl(url.longUrl);
    props.setEditUrlCode(url.urlCode);
    props.setEditUrlId(url._id);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
                  <td
                    className={
                      props.showEditUrl && props.editUrlId === url._id
                        ? "border border-warning border-3"
                        : ""
                    }
                  >
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteClick(url._id)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                  <td
                    className={
                      props.showEditUrl && props.editUrlId === url._id
                        ? "border border-warning border-3"
                        : ""
                    }
                  >
                    <Button
                      variant="outline-dark"
                      size="sm"
                      onClick={() => handleUpdateClick(url)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </td>
                  <td
                    className={
                      props.showEditUrl && props.editUrlId === url._id
                        ? "border border-warning border-3"
                        : ""
                    }
                  >
                    {url.date.slice(3, 15)}
                  </td>
                  <td
                    className={
                      props.showEditUrl && props.editUrlId === url._id
                        ? "border border-warning border-3"
                        : ""
                    }
                  >
                    {url.urlCode}
                  </td>
                  <td
                    className={
                      props.showEditUrl && props.editUrlId === url._id
                        ? "border border-warning border-3"
                        : ""
                    }
                  >
                    <a
                      href={url.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {url.shortUrl}
                    </a>
                  </td>
                  <td
                    className={
                      props.showEditUrl && props.editUrlId === url._id
                        ? "border border-warning border-3"
                        : ""
                    }
                  >
                    {url.longUrl}
                  </td>
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
