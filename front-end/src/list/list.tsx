import Table from "react-bootstrap/Table";
import axios from "axios";
import React from "react";
import UrlListOrder from "./ListOrder";
import "./list.css";
import LoadingSpinner from "./Loader/loader";

interface PropsDefinition {
  setFullList(data: any[]): void;
}
const baseURL = "http://localhost:5003/api/all";

function UrlList(props: PropsDefinition) {
  const [urlList, setList] = React.useState<any[]>([]);
  const [listOption, setListOption] = React.useState<number>(0); // use
  const [isLoading, setLoader] = React.useState<boolean>(true); // use
  let emptyText = "Urls list is empty";

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
