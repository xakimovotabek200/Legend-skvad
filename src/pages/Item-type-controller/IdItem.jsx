import { Input } from "antd";
import React, { useEffect, useState } from "react";
import ItemController from "../Item-controller";
import PostItemId from "./PostIdItem";
import axios from "axios";
import { useParams } from "react-router-dom";

const { Search } = Input;

const IdItem = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const fetchItemTypeId = async () => {
    try {
      const response = await axios.get(`/item-types/${id}`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchItemTypeId();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div>
        <Search
          className="w-[660px]"
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>
      {/* <ItemController /> */}
      {/* <PostItemId /> */}
    </div>
  );
};

export default IdItem;
