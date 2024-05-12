import { Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostId from "./PostId";

const { Search } = Input;

const CategoryId = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const fetchItemTypeCategory = async () => {
    try {
      const response = await axios.get(`/item-types/category/${id}`);
      setCategoryData(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchItemTypeCategory();
  }, []);

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
      <PostId />
    </div>
  );
};

export default CategoryId;
