import { Empty } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";
import PostCategory from "./PostCategory";

const Index = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function getData() {
    await axios
      .get("/categories")
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
    <div className="">
      <PostCategory getData={getData} />
      <div className="grid  sm:grid-cols-3 justify-center gap-4">
        {data?.length > 0 ? (
          data?.map((item) => {
            return (
              <div
                className="bg-white border mt-5 rounded-md shadow-md px-4 flex flex-col-2 items-center p-4 justify-between"
                key={item?.id}
              >
                <p className="text-xl font-semibold">{item?.name}</p>
                <div className="mt-4">
                  <DeleteCategory id={item.id} getData={getData} />
                  <EditCategory data={item} id={item.id} getData={getData} />
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-3">
            <div className="flex flex-col items-center gap-3">
              <Empty />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
