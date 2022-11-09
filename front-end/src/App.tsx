import React from "react";
import "./App.css";
import UrlList from "./list/list";
import Header from "./Header/header";

function App() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="urlList">
        <UrlList />
      </div>
    </>
  );
}

export default App;
