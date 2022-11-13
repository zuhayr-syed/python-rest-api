import React from "react";
import "./App.css";
import UrlList from "./list/list";
import Header from "./Header/header";
import CreateUrl from "./CreateUrl/createUrl";
import UpdateUrl from "./EditUrl/editUrl";
import Search from "./Search/search";

function App() {
  const [fullList, setFullList] = React.useState<any[]>([]);
  const [showEditUrl, setShowEditUrl] = React.useState<boolean>(false);
  const [editLongUrl, setEditLongUrl] = React.useState<string>("");
  const [editUrlCode, setEditUrlCode] = React.useState<string>("");
  const [editUrlId, setEditUrlId] = React.useState<string>("");

  return (
    <div>
      <div className="root">
        <Header />
      </div>
      {!showEditUrl && (
        <div className="urlFields">
          <CreateUrl fullList={fullList} />
        </div>
      )}
      {showEditUrl && (
        <div className="urlFields">
          <UpdateUrl
            editLongUrl={editLongUrl}
            editUrlCode={editUrlCode}
            editUrlId={editUrlId}
            setShowEditUrl={setShowEditUrl}
            fullList={fullList}
          />
        </div>
      )}
      <div className="search">
        <Search />
      </div>
      <div className="fullList">
        <UrlList
          setFullList={setFullList}
          showEditUrl={showEditUrl}
          setShowEditUrl={setShowEditUrl}
          setEditLongUrl={setEditLongUrl}
          setEditUrlCode={setEditUrlCode}
          editUrlId={editUrlId}
          setEditUrlId={setEditUrlId}
        />
      </div>
    </div>
  );
}

export default App;
