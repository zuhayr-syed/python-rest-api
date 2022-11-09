import Table from "react-bootstrap/Table";
import axios from "axios";
import React from "react";
import moment from "moment";

const baseURL = "http://localhost:5003/api/all";

function UrlList() {
  const [urlList, setList] = React.useState<any[]>([]);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setList(response.data);
    });
  }, []);

  return (
    <div>
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
                    <a href={url.shortUrl}>{url.shortUrl}</a>
                  </td>
                  <td>{url.longUrl}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p>Urls list is empty</p>
      )}
    </div>
  );
}

export default UrlList;
