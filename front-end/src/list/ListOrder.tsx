import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React from "react";

interface PropsDefinition {
  setListOption(data: number): void;
  urlList: any[];
  setList(data: any[]): void;
  finalList: any[];
  setFinalList(data: any[]): void;
  showEditUrl: boolean;
  searchText: string;
}
const optionArray = ["Newest", "Oldest"];

function UrlListOrder(props: PropsDefinition) {
  const [option, setOption] = React.useState<string>(optionArray[1]);

  React.useEffect(() => {
    const setData = async () => {
      await props.setList(props.urlList.reverse());
      if (props.searchText.length !== 0) {
        await props.setFinalList(props.finalList.reverse());
      }
    };

    if (option === optionArray[0]) {
      props.setListOption(0);
      setData();
    } else if (option === optionArray[1]) {
      props.setListOption(1);
      setData();
    }
  }, [option]);

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={option}
      disabled={props.showEditUrl}
    >
      <Dropdown.Item
        active={option === optionArray[0]}
        onClick={() => setOption(optionArray[0])}
      >
        {optionArray[0]}
      </Dropdown.Item>
      <Dropdown.Item
        active={option === optionArray[1]}
        onClick={() => setOption(optionArray[1])}
      >
        {optionArray[1]}
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default UrlListOrder;
