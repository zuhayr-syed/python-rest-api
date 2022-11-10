import React from "react";
import "./App.css";
import UrlList from "./list/list";
import Header from "./Header/header";
import CreateUrl from "./CreateUrl/createUrl";

function App() {
  const [fullList, setFullList] = React.useState<any[]>([]);

  return (
    <div>
      <div className="root">
        <Header />
      </div>
      <div className="createUrl">
        <CreateUrl fullList={fullList} />
      </div>
      <div className="fullList">
        <UrlList setFullList={setFullList} />
      </div>
    </div>
  );
}

export default App;
