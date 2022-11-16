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
  searchText: string;
}
const baseURL = "http://localhost:5003/api/all";
const baseDeleteURL = "http://localhost:5003/api/url/delete";

function UrlList(props: PropsDefinition) {
  const [urlList, setList] = React.useState<any[]>([]);
  const [listOption, setListOption] = React.useState<number>(0);
  const [isLoading, setLoader] = React.useState<boolean>(true);
  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  let emptyText = "Urls list is empty";
  const searchEmptyText = "No results for your search";
  const [searchedList, setSearchedList] = React.useState<any[]>([]);
  const [isSearch, setIsSearch] = React.useState<boolean>(false);
  const [finalList, setFinalList] = React.useState<any[]>([]);

  const IsUrlSearched = (url: any) => {
    const code = url.urlCode.toLowerCase();
    const search = props.searchText.toLowerCase();
    for (let x = 0; x < code.length; x++) {
      let length = search.length + x;
      if (code.length - x >= search.length) {
        const slice = code.slice(x, length);
        if (slice === search) {
          return true;
        }
      }
    }
  };

  const UrlCodeHighlight = (url: any) => {
    if (props.searchText.length !== 0) {
      const code = url.urlCode.toLowerCase();
      let firstLetter = 0;
      const searchLength = props.searchText.length;

      for (let x = 0; x < code.length; x++) {
        if (code[x] === props.searchText[0].toLowerCase()) {
          firstLetter = x;
          break;
        }
      }

      const startText = code.slice(0, firstLetter);
      const highlightText = code.slice(firstLetter, firstLetter + searchLength);
      const endText = code.slice(firstLetter + searchLength, code.length);

      return (
        <span>
          <span className="text-dark">{startText}</span>
          <span className="text-dark bg-warning">{highlightText}</span>
          <span className="text-dark">{endText}</span>
        </span>
      );
    }
  };

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

  const monthReturn = new Map([
    ["Jan", 1],
    ["Feb", 2],
    ["Mar", 3],
    ["Apr", 4],
    ["May", 5],
    ["Jun", 6],
    ["Jul", 7],
    ["Aug", 8],
    ["Sep", 9],
    ["Oct", 10],
    ["Nov", 11],
    ["Dec", 12],
  ]);

  const dateOrderLower = (urlCur: any, urlCheck: any) => {
    if (urlCur.date.slice(10, 15) > urlCheck.date.slice(10, 15)) {
      return true;
    } else if (urlCur.date.slice(10, 15) === urlCheck.date.slice(10, 15)) {
      if (
        (monthReturn.get(urlCur.date.slice(4, 7)) as number) >
        (monthReturn.get(urlCheck.date.slice(4, 7)) as number)
      ) {
        return true;
      } else if (
        (monthReturn.get(urlCur.date.slice(4, 7)) as number) ===
        (monthReturn.get(urlCheck.date.slice(4, 7)) as number)
      ) {
        if (urlCur.date.slice(7, 10) > urlCheck.date.slice(7, 10)) {
          return true;
        } else if (urlCur.date.slice(7, 10) === urlCheck.date.slice(7, 10)) {
          return false;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        await axios.get(baseURL).then((response) => {
          let orderList = response.data;
          const finalList = [];
          while (orderList.length !== 0) {
            let lowest = 0;
            if (orderList.length !== 1) {
              for (let y = 1; y < orderList.length; y++) {
                if (dateOrderLower(orderList[lowest], orderList[y])) {
                  lowest = y;
                }
              }
            }
            finalList.push(orderList[lowest]);
            orderList = orderList.filter(
              (url: any) => url._id !== orderList[lowest]._id
            );
          }

          setList(finalList);
          setFinalList(finalList);
          props.setFullList(finalList);
        });
        setLoader(false);
      } catch {
        setLoader(false);
      }
    };
    getData();
  }, []);

  React.useEffect(() => {
    if (props.searchText.length !== 0) {
      const filteredList = urlList.filter((url) => IsUrlSearched(url));
      setSearchedList(filteredList);
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  }, [props.searchText]);

  React.useEffect(() => {
    if (isSearch) {
      setFinalList(searchedList);
    } else {
      setFinalList(urlList);
    }
  }, [isSearch, searchedList]);

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
          setFinalList={setFinalList}
          finalList={finalList}
          showEditUrl={props.showEditUrl}
        />
      </div>
      {finalList.length !== 0 ? (
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
            {finalList.map((url: any) => {
              return (
                <tr
                  key={url.urlCode}
                  className={
                    props.showEditUrl && props.editUrlId === url._id
                      ? "border border-dark border-3"
                      : ""
                  }
                >
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteClick(url._id)}
                      disabled={props.showEditUrl}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-dark"
                      size="sm"
                      onClick={() => handleUpdateClick(url)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </td>
                  <td>{url.date.slice(3, 15)}</td>
                  <td>
                    {isSearch && UrlCodeHighlight(url)}
                    {!isSearch && (
                      <span className="text-dark">{url.urlCode}</span>
                    )}
                  </td>
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
      ) : urlList.length === 0 ? (
        <p>{emptyText}</p>
      ) : (
        <p>{searchEmptyText}</p>
      )}
    </div>
  );
}

export default UrlList;
