import React from "react";
import "./App.css";
import UrlList from "./list/list";
import Header from "./Header/header";

function App() {
  return (
    <div>
      <div className="root">
        <Header />
      </div>
      <div className="root">
        <UrlList />
      </div>
    </div>
  );
}

export default App;
