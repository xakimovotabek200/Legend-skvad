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

  async function getData() {
    await axios
      .get(`/categories/${id}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  useEffect(() => {
    getData();
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
      {/* <ItemController /> */}
      <PostId />
    </div>
  );
};

export default CategoryId;
