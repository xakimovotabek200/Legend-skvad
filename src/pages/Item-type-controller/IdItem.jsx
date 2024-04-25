import { Input } from "antd";
import React from "react";
import ItemController from "../Item-controller";

const { Search } = Input;

const IdItem = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <div>
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <ItemController />
    </div>
  );
};

export default IdItem;
