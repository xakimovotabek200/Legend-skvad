import { Input } from "antd";
import React from "react";
import ItemController from "../Item-controller";
import PostItemId from "./PostIdItem";

const { Search } = Input;

const IdItem = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <div>
      <div>
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <ItemController />
      <PostItemId />
    </div>
  );
};

export default IdItem;
