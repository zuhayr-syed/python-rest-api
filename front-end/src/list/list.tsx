import Table from "react-bootstrap/Table";

function UrlList() {
  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>Url Code</th>
          <th>Short Url</th>
          <th>Long Url</th>
          <th>Date Created (dd/mm/yyyy)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>pencil</td>
          <td>http://localhost:5003/pencil</td>
          <td>
            http://localhost:5003/pencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilpencilaaaaaaaa
          </td>
          <td>02/08/2022</td>
        </tr>
        <tr>
          <td>book</td>
          <td>http://localhost:5003/book</td>
          <td>http://localhost:5003/bookbookbookbook</td>
          <td>07/011/2022</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default UrlList;
